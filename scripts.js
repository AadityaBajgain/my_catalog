
// importing memes array from the data.js folder
import {memes} from "./data.js"


// this creates the layout of the card and returns it
function createCard(meme){
  const card = document.createElement("article")
  card.className = "card";

  const image = document.createElement("img");
  image.src = meme.image;
  image.alt = `${meme.name} image`


  const body = document.createElement("div");
  body.className = "cardBody"

  const title = document.createElement("h3");
  title.className = "cardTitle"
  title.textContent = meme.title

  const info = document.createElement("p");
  info.className = "info"
  info.textContent = `${meme.duration} hrs | ${meme.platform} | ${meme.category}`;

  const desc = document.createElement('p');
  desc.className = "desc";
  desc.textContent = meme.description;

  const liveLink = document.createElement("a");  
  liveLink.href = meme.link
  liveLink.target = "_blank"
  liveLink.textContent = "let's Learn ->"


  body.append(title, info, desc, liveLink)
  card.append(image, body);

  return card

}

// renders cards
function renderMemeCard(items){
  const grid = document.querySelector(".catalog-grid")
  const resultCount = document.getElementById("resultCount")
  const categoryFilter = document.getElementById("categoryFilter")
  const platformFilter = document.getElementById("platformFilter")
  const searchInput = document.getElementById("searchInput")
  const sortBy = document.getElementById("sortBy")
  if(!grid) return;

  let filteredItems = items;


  // this allows the lives search 
  if (searchInput) {
    const word = searchInput.value.trim().toLowerCase();
    filteredItems = filteredItems.filter((meme) => {
      return (
        meme.title.toLowerCase().includes(word) ||
        meme.platform.toLowerCase().includes(word) ||
        meme.category.toLowerCase().includes(word) ||
        meme.description.toLowerCase().includes(word) ||
        String(meme.duration).includes(word)
      )
    })  
  }

  // if specific category is selected this will change the content based on the category
  if (categoryFilter && categoryFilter.value !== "all") {
    filteredItems = filteredItems.filter((meme) => meme.category === categoryFilter.value)
  }

  // if any platform is selected this will change the items based on the selected platform
  if(platformFilter && platformFilter.value !== "all"){
    filteredItems = filteredItems.filter((meme)=> meme.platform === platformFilter.value)
  }
  grid.innerHTML = "";

  if(sortBy && sortBy.value !== "Default"){
    if(sortBy.value === "duration-asc"){
      filteredItems.sort((a,b)=>a.duration-b.duration);
    }
    else if(sortBy.value === "duration-desc"){
      filteredItems.sort((a,b)=>b.duration-a.duration)
    }
    else{
      filteredItems.sort((a,b)=>a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
    }
  }
  // this will add the items that is left after the filter process
  filteredItems.forEach((meme)=>{
    grid.appendChild(createCard(meme))
  })

  // this will give the count of the items left after the filter
  if(resultCount){
    resultCount.textContent = `${filteredItems.length} courses found`
  }
}

// clears the filter, set the filters to default and rerenders 
function resetFilter(){
  const search = document.getElementById("searchInput")
  const platform = document.getElementById("platformFilter")
  const category = document.getElementById("categoryFilter")
  const sortFilter = document.getElementById("sortBy")

  // setting the value to defaults
  search.value = ""
  platform.value = "all"
  category.value = "all"
  sortFilter.value = "Default"

  renderMemeCard(memes)
}

// based on the different event ( change in the filter options or change in input fields), the data will change and displayed
const categoryFilter = document.getElementById("categoryFilter")
if (categoryFilter) {
  categoryFilter.addEventListener("change", () => renderMemeCard(memes))
}

const platformFilter = document.getElementById("platformFilter");
if(platformFilter){
  platformFilter.addEventListener("change",()=>renderMemeCard(memes))
}

const searchInput = document.getElementById("searchInput")
if (searchInput) {
  searchInput.addEventListener("input", () => renderMemeCard(memes))
}

const sortByDate = document.getElementById("sortBy")
if(sortByDate){
  sortByDate.addEventListener("change",()=>renderMemeCard(memes))
}



// if reset button is clicked this will call the reset function
const reset = document.getElementById("clearFilters")
if(reset){
  reset.addEventListener("click",()=>{
    resetFilter()
  })
}

// its main work is the render all the data at the booting of the site (when all the filters are default and none events are triggered)
renderMemeCard(memes);