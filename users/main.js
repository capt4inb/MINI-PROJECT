// DOM elements
const swiperContainer = document.getElementById("swiperContainer");
const tbody = document.getElementById("tbody");
const btnSort = document.getElementById("btnSort");
const header = document.getElementById("header");
const search = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn"); // Ensure searchBtn is defined
const selectTeam = document.getElementById("selectTeam");
const selectPosition = document.getElementById("selectPosition");

let searchData, swiper, dataArray, dataArraySort;
let isSorted;

// Handle scroll event for header opacity
const handleScroll = () => {
  header.style.opacity = window.scrollY > 0 ? "0.8" : "1";
};

// Handle focus event for search bar
const handleFocus = (event) => {
  header.style.opacity = event.type === "focus" ? "1" : "0.8";
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
    dataArray = await data.data;
    await displaySwiperSlides(dataArray);
    isSorted = false;
    await displayPlayerList(dataArray);
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
    dataArraySort = await data.data;
    // console.log(dataArraySort)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
// Display swiper slides
const displaySwiperSlides = (players) => {
  swiperContainer.innerHTML = ""; // Clear existing slides
  players.forEach((player) => {
    const newDiv = document.createElement("div");
    newDiv.className =
      "swiper-slide md:flex md:flex-col md:items-center md:justify-center";
    newDiv.setAttribute("data-id", player.id); // Set data-id to player's ID
    newDiv.innerHTML = `
      <div class="hero h-full">
    <div class="hero-content flex flex-col h-full">
      <div class="player flex flex-col md:flex-row gap-5 items-center justify-center">
        <img style="box-shadow: inset 3px 3px 6px rgba(204, 219, 232), inset -3px -3px 6px rgba(255, 255, 255, 0.5);"
             src="${player.avatar || "https://picsum.photos/200/300"}"
             class="max-w-sm rounded-lg shadow-2xl w-[200px] h-[200px]" />
        <div class="flex flex-col md:flex-row items-center justify-center gap-5">
          <h1 class="text-2xl md:text-5xl font-bold">${player.name}</h1>
          <canvas id="playerStatsChart-${
            player.id
          }" class="bg-white w-full h-full"></canvas>
        </div>
      </div>
      <div class="player-info flex flex-col w-full text-center gap-5">
        <div class="flex flex-wrap justify-center gap-4 md:gap-10">
          <p class="p-2 md:p-4 rounded bg-gray-200"><b>Năm sinh:</b> ${
            player.yearOfBirth
          }</p>
          <p class="p-2 md:p-4 rounded bg-gray-200"><b>Quê quán:</b> ${
            player.country
          }</p>
          <p class="p-2 md:p-4 rounded bg-gray-200"><b>Chiều cao:</b> ${
            player.height
          } cm</p>
          <p class="p-2 md:p-4 rounded bg-gray-200"><b>Cân nặng:</b> ${
            player.weigh
          } kg</p>
          <p class="p-2 md:p-4 rounded bg-gray-200"><b>Vị trí:</b> ${
            player.position
          }</p>
          <p class="p-2 md:p-4 rounded bg-gray-200"><b>Đội tuyển:</b> ${
            player.team.name
          }</p>
          <p class="p-2 md:p-4 rounded bg-gray-200"><b>Lương:</b> ${
            player.salary 
          } £</p>
        </div>
      </div>
    </div>
  </div>
    `;
    swiperContainer.appendChild(newDiv);
  });
  initSwiper(0);
  swiper.update(); // Update swiper after all slides are added
  players.forEach((player) => {
    displayRadarChart(
      player.name,
      player.sp,
      player.ss,
      player.bc,
      player.ls,
      player.id
    );
  });
};

// Display player list in table
const displayPlayerList = (players) => {
  tbody.innerHTML = ""; // Clear existing content
  players.forEach((player) => {
    const newTr = document.createElement("tr");
    newTr.innerHTML = `
      <td class="list cursor-pointer" data-id="${player.id}">
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="mask mask-squircle h-12 w-12">
              <img src="${
                player.avatar || "https://picsum.photos/200/300"
              }" alt="Avatar" />
            </div>
          </div>
          <div>
            <div class="font-bold">${player.name}</div>
            <div class="text-sm opacity-50">Team: ${player.team.name}</div>
          </div>
        </div>
      </td>
      <td class="text-center">${player.height}cm | ${player.weigh}kg</td>
      <td class="text-center">${player.salary} £</td>
      <td class="text-center">${player.sp}</td>
      <td class="text-center">${player.ss}</td>
      <td class="text-center">${player.bc}</td>
      <td class="text-center">${player.ls}</td>
    `;
    newTr.querySelector(".list").addEventListener("click", () => {
      initSwiper(0);
      const playerClick = dataArray.find((item) => item.id === player.id);

      if (playerClick) {
        // Find the index of the player in the swiper slides using the data-id
        const index = Array.from(swiper.slides).findIndex(
          (slide) => slide.dataset.id === playerClick.id.toString()
        );

        if (index !== -1) {
          // Slide to the player's position in the Swiper
          swiper.slideTo(index);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    });
    tbody.appendChild(newTr);
  });
};

const searchPlayer = (query, arraydata) => {
  const lowerCaseQuery = query.toLowerCase();

  // Find the player whose name matches the search query
  const player = arraydata.find((item) =>
    item.name.toLowerCase().includes(lowerCaseQuery)
  );

  if (player) {
    // Find the index of the player in the swiper slides using the data-id
    const index = Array.from(swiper.slides).findIndex(
      (slide) => slide.dataset.id === player.id.toString()
    );

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



let team, position;

// Event listener for the team selection
selectTeam.addEventListener('change', (e) => {
  team = e.target.value;
  renderDataTeamForFilter(team, position);

  
   // Call the function to fetch and render data
});

// Event listener for the position selection
selectPosition.addEventListener('change', (e) => {
  position = e.target.value;
  renderDataTeamForFilter(team, position); // Call the function to fetch and render data
});

const renderDataTeamForFilter = async (team, position) => {
  console.log('Selected Team:', team, 'Selected Position:', position);

  try {
    const response = await fetch(
      "https://ktc-player-base-production.up.railway.app/api/v1/player/filter",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZW52bzEyMDIiLCJpYXQiOjE3MjQzODgyNjQsImV4cCI6MTgxMDc4ODI2NH0.2N72inxcBbNsXXNVqaxA6sLTQibxTcX-yh3aYTho97U",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team_id: team,
          position: position
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const { data } = await response.json();
    console.log('Data:', data);
    const tbody = document.getElementById('tbodyFilter');
    tbody.innerHTML = ''; // Clear previous rows

    data.forEach(player => {
      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.textContent = player.name;
      row.appendChild(nameCell);

      const heightWeightCell = document.createElement('td');
      heightWeightCell.textContent = `${player.height} cm | ${player.weigh} kg`;
      row.appendChild(heightWeightCell);

      const salaryCell = document.createElement('td');
      salaryCell.textContent = `${player.salary} £`;
      row.appendChild(salaryCell);

      const spCell = document.createElement('td');
      spCell.textContent = player.sp;
      row.appendChild(spCell);

      const ssCell = document.createElement('td');
      ssCell.textContent = player.ss;
      row.appendChild(ssCell);

      const bcCell = document.createElement('td');
      bcCell.textContent = player.bc;
      row.appendChild(bcCell);

      const lsCell = document.createElement('td');
      lsCell.textContent = player.ls;
      row.appendChild(lsCell);

      tbody.appendChild(row);
    })

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
//render team
const renderDataTeamOptions = async () => {
  try {
    const response = await fetch(
      "https://ktc-player-base-production.up.railway.app/api/v1/team",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZW52bzEyMDIiLCJpYXQiOjE3MjQzODgyNjQsImV4cCI6MTgxMDc4ODI2NH0.2N72inxcBbNsXXNVqaxA6sLTQibxTcX-yh3aYTho97U",
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const { data } = await response.json();
    console.log('Data:', data);

    const selectTeam = document.getElementById('selectTeam');
    selectTeam.innerHTML = '<option disabled selected>Choose your team</option>'; // Reset the options

    data.forEach(team => {
      const option = document.createElement('option');
      option.value = team.id; // Assuming team has an `id` field
      option.textContent = team.name; // Assuming team has a `name` field
      selectTeam.appendChild(option);
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Call the function to populate the options when the page loads



// Event listeners
window.addEventListener("scroll", handleScroll);
search.addEventListener("focus", handleFocus);
search.addEventListener("focusout", handleFocus);
(async function init() {
  await fetchData();
  await fetchDataSort();
  await renderDataTeamOptions();
 
})();
initSwiper(0);

searchBtn.addEventListener("click", () => {
  initSwiper(0);
  window.scrollTo({ top: 0, behavior: "smooth" });
  const query = search.value.trim();
  if (query) {
    searchPlayer(query, dataArray);
  } else {
    console.log("Please enter a search query.");
  }
});

btnSort.addEventListener("click", () => {
  displayPlayerList(isSorted ? dataArray : dataArraySort);
  console.log(isSorted);
  isSorted = !isSorted;
});
// Initial data fetch

const displayRadarChart = (name, sp, ss, bc, ls, id) => {
  const ctx = document
    .getElementById(`playerStatsChart-${id}`)
    .getContext("2d");

  // Destroy existing chart instance if it exists for this particular canvas
  if (window[`playerStatsChart-${id}`] instanceof Chart) {
    window[`playerStatsChart-${id}`].destroy();
  }

  // Create a new chart instance for this specific canvas
  window[`playerStatsChart-${id}`] = new Chart(ctx, {
    type: "radar",
    data: {
      labels: ["SP", "SS", "BC", "LS"],
      datasets: [
        {
          label: name,
          data: [sp, ss, bc, ls],
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scale: {
        ticks: { beginAtZero: true },
      },
    },
  });
};
