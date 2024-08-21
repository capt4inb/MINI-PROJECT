// DOM elements
const swiperContainer = document.getElementById("swiperContainer");
const tbody = document.getElementById("tbody");
const btnSort = document.getElementById("btnSort");
const header = document.getElementById("header");
const search = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn"); // Ensure searchBtn is defined

let searchData, swiper, dataArray, dataArraySort;
let isSorted;

// Handle scroll event for header opacity
const handleScroll = () => {
  header.style.opacity = window.scrollY > 0 ? "0.7" : "1";
};

// Handle focus event for search bar
const handleFocus = (event) => {
  header.style.opacity = event.type === "focus" ? "1" : "0.7";
};

// Initialize Swiper instance
const initSwiper = (id) => {
  swiper = new Swiper(".mySwiper", {
    initialSlide: id,
    slidesPerView: 1,
    loop: true,
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: true,
    },
    effect: "cards",
    grabCursor: true,
    keyboard: true,
  });
};

// Fetch and display data
const fetchData = async () => {
  try {
    const response = await fetch(
      "https://ktc-player-base-production.up.railway.app/api/v1/player",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aGFuaGJlbjAxIiwiaWF0IjoxNzI0MjI0Njg0LCJleHAiOjE4MTA2MjQ2ODR9.sJY921lTVrq5LFjx144-5T2m669EZlqTE3tavhr6z3I",
        },
      }
    );
    const data = await response.json();
    dataArray = data.data;
    displaySwiperSlides(dataArray);
    isSorted = false
    displayPlayerList(dataArray)
    // console.log(dataArray)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchDataSort = async () => {
  try {
    const response = await fetch(
      "https://ktc-player-base-production.up.railway.app/api/v1/player/sort?type=salary&order=asc",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aGFuaGJlbjAxIiwiaWF0IjoxNzI0MjI0Njg0LCJleHAiOjE4MTA2MjQ2ODR9.sJY921lTVrq5LFjx144-5T2m669EZlqTE3tavhr6z3I",
        },
      }
    );
    const data = await response.json();
    dataArraySort = data.data;
    console.log(dataArraySort)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
fetchDataSort()
// Display swiper slides
const displaySwiperSlides = (players) => {
  swiperContainer.innerHTML = ''; // Clear existing slides
  players.forEach((player) => {
    const newDiv = document.createElement("div");
    newDiv.className = "swiper-slide";
    newDiv.setAttribute("data-id", player.id); // Set data-id to player's ID
    newDiv.innerHTML = `
      <div class="hero h-full">
        <div class="hero-content flex flex-col h-full">
          <div class="player flex gap-5 h-1/2 items-center justify-center">
            <img style="box-shadow: inset 3px 3px 6px rgba(204, 219, 232), inset -3px -3px 6px rgba(255, 255, 255, 0.5);" 
                 src="${player.avatar || 'https://picsum.photos/200/300'}" 
                 class="max-w-sm rounded-lg shadow-2xl w-[200px] h-[200px]" />
            <div class="flex items-center justify-center">
              <h1 class="text-5xl font-bold">${player.name}</h1>
            </div>
          </div>
          <div class="player-info flex flex-col w-full text-center gap-5">
            <div class="flex justify-center gap-10">
              <p class="p-4 rounded bg-gray-200"><b>Năm sinh:</b> ${player.yearOfBirth}</p>
              <p class="p-4 rounded bg-gray-200"><b>Quê quán:</b> ${player.country}</p>
              <p class="p-4 rounded bg-gray-200"><b>Chiều cao:</b> ${player.height}</p>
              <p class="p-4 rounded bg-gray-200"><b>Cân nặng:</b> ${player.weigh}</p>
            </div>
            <div class="flex justify-center gap-10">
              <p class="p-4 rounded bg-gray-200"><b>Vị trí:</b> ${player.position}</p>
              <p class="p-4 rounded bg-gray-200"><b>Đội tuyển:</b> ${player.team.name}</p>
              <p class="p-4 rounded bg-gray-200"><b>Lương:</b> ${player.salary}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    swiperContainer.appendChild(newDiv);

  });
  initSwiper(0);

  swiper.update(); // Update swiper after all slides are added
};

// Display player list in table
const displayPlayerList = (players) => {
  tbody.innerHTML = ''; // Clear existing content
  players.forEach((player) => {
    const newTr = document.createElement("tr");
    newTr.innerHTML = `
      <td class="list cursor-pointer" data-id="${player.id}">
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="mask mask-squircle h-12 w-12">
              <img src="${player.avatar || 'https://picsum.photos/200/300'}" alt="Avatar" />
            </div>
          </div>
          <div>
            <div class="font-bold">${player.name}</div>
            <div class="text-sm opacity-50">Team: ${player.team.name}</div>
          </div>
        </div>
      </td>
      <td class="text-center">${player.height}cm | ${player.weigh}kg</td>
      <td class="text-center">${player.salary}</td>
      <td class="text-center">${player.sp}</td>
      <td class="text-center">${player.ss}</td>
      <td class="text-center">${player.bc}</td>
      <td class="text-center">${player.ls}</td>
    `;
    newTr.querySelector(".list").addEventListener("click", () => {
      
      const index = dataArray.findIndex((dataItem) => dataItem.id === player.id);
      ()=>{
        initSwiper(0);
      }
      if (index !== -1) {
        
        window.scrollTo({ top: 0, behavior: "instant" });
        swiper.slideTo(index);
      }
    });
    tbody.appendChild(newTr);
  });
};

const searchPlayer = (query, arraydata) => {
  
  const lowerCaseQuery = query.toLowerCase();
  
  // Find the player whose name matches the search query
  const player = arraydata.find(item => item.name.toLowerCase().includes(lowerCaseQuery));
  
  if (player) {
    ()=>{
      initSwiper(0);
    }

    // Find the index of the player in the swiper slides using the data-id
    const index = Array.from(swiper.slides).findIndex(slide => slide.dataset.id === player.id.toString());
    
    if (index !== -1) {
      // Slide to the player's position in the Swiper
      swiper.slideTo(index);
      console.log(`Found player: ${player.name} at index ${index}`);
    } else {
      console.log("No matching slide found for the player.");
    }
  } else {
    alert("Player not found. Please try a different name.");
  }
};

// Event listeners
window.addEventListener("scroll", handleScroll);
search.addEventListener("focus", handleFocus);
search.addEventListener("focusout", handleFocus);
searchBtn.addEventListener("click", () => {
  const query = search.value.trim();
  if (query) {
    searchPlayer(query, dataArray);
  } else {
    console.log("Please enter a search query.");
  }
});
fetchData();
btnSort.addEventListener('click',()=>{
  displayPlayerList(isSorted ?  dataArray : dataArraySort );
  console.log(isSorted)
  isSorted = !isSorted
})
// Initial data fetch
initSwiper()
