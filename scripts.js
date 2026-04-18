import {memes} from "./data.js"

console.log(memes[0]);


// document.getElementById("clearFilters").addEventListener("click",()=>location.reload())


// create a card 
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
  title.textContent = meme.name

  const info = document.createElement("p");
  info.className = "info"
  info.textContent = `${meme.year} | ${meme.platform} | ${meme.category}`;

  const desc = document.createElement('p');
  desc.className = "desc";
  desc.textContent = meme.description;

  const liveLink = document.createElement("a");  
  liveLink.href = meme.link
  liveLink.target = "_blank"
  liveLink.textContent = "Open Source Link"


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
        meme.name.toLowerCase().includes(word) ||
        meme.type.toLowerCase().includes(word) ||
        meme.platform.toLowerCase().includes(word) ||
        meme.category.toLowerCase().includes(word) ||
        meme.description.toLowerCase().includes(word)
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
    if(sortBy.value === "year-asc"){
      filteredItems.sort((a,b)=>a.year-b.year);
    }
    else if(sortBy.value === "year-desc"){
      filteredItems.sort((a,b)=>b.year-a.year)
    }
    else{
      filteredItems.sort((a,b)=>a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    }
  }
  // this will add the items that is left after the filter process
  filteredItems.forEach((meme)=>{
    grid.appendChild(createCard(meme))
  })

  // this will give the count of the items left after the filter
  if(resultCount){
    resultCount.textContent = `${filteredItems.length} no of memes`
  }
}

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



function resetFilter(){
  const search = document.getElementById("searchInput")
  const platform = document.getElementById("platformFilter")
  const category = document.getElementById("categoryFilter")
  const sortFilter = document.getElementById("sortBy")


  search.value = ""
  platform.value = "all"
  category.value = "all"
  sortFilter.value = "Default"

  renderMemeCard(memes)
}


const reset = document.getElementById("clearFilters")
if(reset){
  reset.addEventListener("click",()=>{
    resetFilter()
  })
}

renderMemeCard(memes);