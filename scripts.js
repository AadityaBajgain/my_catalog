import {memes} from "./data.js"

console.log(memes[0]);




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


function renderMemeCard(items){
  const grid = document.querySelector(".catalog-grid")
  const resultCount = document.getElementById("resultCount")
  
  
  if(!grid) return;

  grid.innerHTML = "";

  items.map((meme, key=meme.id)=>{
    grid.appendChild(createCard(meme))
  })

  if(resultCount){
    resultCount.textContent = `${items.length} no of memes`
  }
}

renderMemeCard(memes);