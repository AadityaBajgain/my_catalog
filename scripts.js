// importing courses array from the data.js file
import { courses } from "./data.js";

// this creates the layout of the card and returns it
function createCard(course) {
  const card = document.createElement("article");
  card.className = "card";

  const image = document.createElement("img");
  image.src = course.image;
  image.alt = `${course.title} image`;

  const body = document.createElement("div");
  body.className = "cardBody";

  const title = document.createElement("h3");
  title.className = "cardTitle";
  title.textContent = course.title;

  const info = document.createElement("p");
  info.className = "info";
  info.textContent = `${course.duration} hrs | ${course.platform} | ${course.category}`;

  const desc = document.createElement("p");
  desc.className = "desc";
  desc.textContent = course.description;

  const liveLink = document.createElement("a");
  liveLink.href = course.link;
  liveLink.target = "_blank";
  liveLink.textContent = "let's Learn ->";

  body.append(title, info, desc, liveLink);
  card.append(image, body);

  return card;
}

// uses the above card layout and renders cards
function renderCourseCard(items) {
  const grid = document.querySelector(".catalog-grid");
  const resultCount = document.getElementById("resultCount");
  const categoryFilter = document.getElementById("categoryFilter");
  const platformFilter = document.getElementById("platformFilter");
  const searchInput = document.getElementById("searchInput");
  const sortBy = document.getElementById("sortBy");
  if (!grid) return;

  let filteredItems = items;

  // this allows the lives search
  if (searchInput) {
    const word = searchInput.value.trim().toLowerCase();
    filteredItems = filteredItems.filter((course) => {
      return (
        course.title.toLowerCase().includes(word) ||
        course.platform.toLowerCase().includes(word) ||
        course.category.toLowerCase().includes(word) ||
        course.description.toLowerCase().includes(word)
      );
    });
  }

  // if specific category is selected this will change the content based on the category
  if (categoryFilter && categoryFilter.value !== "all") {
    filteredItems = filteredItems.filter(
      (course) => course.category === categoryFilter.value,
    );
  }

  // if any platform is selected this will change the items based on the selected platform
  if (platformFilter && platformFilter.value !== "all") {
    filteredItems = filteredItems.filter(
      (course) => course.platform === platformFilter.value,
    );
  }

  grid.innerHTML = "";

  if (sortBy && sortBy.value !== "Default") {
    if (sortBy.value === "duration-asc") {
      filteredItems.sort((a, b) => a.duration - b.duration);
    } else if (sortBy.value === "duration-desc") {
      filteredItems.sort((a, b) => b.duration - a.duration);
    } else {
      filteredItems.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      );
    }
  }

  // this will add the items that is left after the filter process
  filteredItems.forEach((course) => {
    grid.appendChild(createCard(course));
  });

  // this will give the count of the items left after the filter
  if (resultCount) {
    resultCount.textContent = `${filteredItems.length} courses found`;
  }
}

// clears the filter, set the filters to default and rerenders
function resetFilter() {
  const search = document.getElementById("searchInput");
  const platform = document.getElementById("platformFilter");
  const category = document.getElementById("categoryFilter");
  const sortFilter = document.getElementById("sortBy");

  // setting the value to defaults
  search.value = "";
  platform.value = "all";
  category.value = "all";
  sortFilter.value = "Default";

  renderCourseCard(courses);
}

// based on the different event ( change in the filter options or change in input fields), the data will be change and displayed
const categoryFilter = document.getElementById("categoryFilter");
if (categoryFilter) {
  categoryFilter.addEventListener("change", () => renderCourseCard(courses));
}

const platformFilter = document.getElementById("platformFilter");
if (platformFilter) {
  platformFilter.addEventListener("change", () => renderCourseCard(courses));
}

const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", () => renderCourseCard(courses));
}

const sortByDate = document.getElementById("sortBy");
if (sortByDate) {
  sortByDate.addEventListener("change", () => renderCourseCard(courses));
}

// if reset button is clicked this will call the reset function
const reset = document.getElementById("clearFilters");
if (reset) {
  reset.addEventListener("click", () => {
    resetFilter();
  });
}
// when add course button is clicked it will hide that button and then makes the hidden input form visible
const addCourse = document.getElementById("addButton");
if (addCourse) {
  addCourse.addEventListener("click", () => {
    const inputForm = document.getElementById("inputForm");
    if (inputForm) {
      inputForm.hidden = false;
      addCourse.hidden = true;
    }
  });
}


// this adds the submitted course on the catalog ( but not permanently, is removed when rendered, because its not added on our static data array )
const onSubmit = document.getElementById("inputForm");
if (onSubmit) {
  onSubmit.addEventListener("submit", (e) => {
    
    e.preventDefault(); // this will prevent default behavior of form, i.e, when submitted it reload the page

    const course = {
      title: document.getElementById("inputTitle")?.value,
      platform: document.getElementById("inputPlatform")?.value,
      category: document.getElementById("inputCategory")?.value,
      description: document.getElementById("inputDescription")?.value,
      duration: document.getElementById("inputDuration")?.value,
      image: document.getElementById("inputImage")?.value || "https://img.youtube.com/vi/oxuRxtrO2Ag/maxresdefault.jpg",
      link: document.getElementById("inputLink")?.value,
    };

    courses.push(course);

    renderCourseCard(courses);

    onSubmit.reset();
  });
}


// its main work is the render all the data at the booting of the site (when all the filters are default and none events are triggered)
renderCourseCard(courses);
