const swiperContainer = document.getElementById("swiperContainer");
const tbody = document.getElementById("tbody");
const header = document.getElementById("header");
const search = document.getElementById("search");
const dataList=[]

let swiper;
let dataArray;

// Function to handle scroll event
const handleScroll = () => {
  header.style.opacity = window.scrollY > 0 ? "0.7" : "1";
};

// Function to handle focus event
const handleFocus = (event) => {
  header.style.opacity = event.type === "focus" ? "1" : "0.7";
};

// Function to initialize Swiper and fetch data
const getData = () => {
  swiper = new Swiper(".mySwiper", {
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

  fetch("https://ktc-player-base-production.up.railway.app/api/v1/player", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aGFuaGJlbjAxIiwiaWF0IjoxNzIzNjI3MjA4LCJleHAiOjE4MTAwMjcyMDh9.JioHBTgGGYSS5h8xk_JpR-fczgLwB1ToRaZqP6fv6dg",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dataArray = data.data;
      dataArray.forEach((item) => {
        const newDiv = document.createElement("div");
        newDiv.className = "swiper-slide";
        newDiv.innerHTML = `
          <!-- Your slide HTML here -->
           <div key="${item.id}" class="hero h-full">
            <div class="hero-content flex flex-col h-full">
              <div class="player flex gap-5 h-1/2 items-center justify-center">
                <img style="box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;" src="${item.image}" class="max-w-sm rounded-lg shadow-2xl w-[200px] h-[200px]" />
                <div class="flex items-center justify-center">
                  <h1 class="text-5xl font-bold">${item.name}</h1>
                </div>
              </div>
              <div class="player-infor flex flex-col w-full text-center gap-5 w-full text-[black]">
                <div class="flex flex-col items-center justify-evenly gap-5 w-full">
                  <div class="flex justify-center gap-10 w-full">
                    <p id="birthday" class="p-4 rounded bg-gray-200"><b>Năm sinh:</b> ${item.yearOfBirth}</p>
                    <p id="country" class="p-4 rounded bg-gray-200"><b>Quê quán:</b> ${item.country}</p>
                    <p id="height" class="p-4 rounded bg-gray-200"><b>Chiều cao:</b> ${item.height}</p>
                    <p id="weight" class="p-4 rounded bg-gray-200"><b>Cân nặng:</b> ${item.weigh}</p>
                  </div>
                  <div class="flex justify-center gap-10 w-full">
                  <p id="" class="p-4 rounded bg-gray-200"><b>Chân Thuận:</b> ${item.favorableFoot}</p>
                    <p id="position" class="p-4 rounded bg-gray-200"><b>Vị trí:</b> ${item.position}</p>
                    <p id="team" class="p-4 rounded bg-gray-200"><b>Đội tuyển:</b> ${item.team.name}</p>
                    <p id="" class="p-4 rounded bg-gray-200"><b>Lương:</b> ${item.salary}</p> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        swiperContainer.appendChild(newDiv);
      });
      swiper.update();
    })
    .catch((error) => console.error("Error:", error));
};

// Function to render list and add click event listener
const getDataForRenderList = () => {
  fetch("https://ktc-player-base-production.up.railway.app/api/v1/player", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aGFuaGJlbjAxIiwiaWF0IjoxNzIzNjI3MjA4LCJleHAiOjE4MTAwMjcyMDh9.JioHBTgGGYSS5h8xk_JpR-fczgLwB1ToRaZqP6fv6dg",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((item) => {
        const newTr = document.createElement("tr");
        newTr.innerHTML = `
          <!-- Your list item HTML here -->
          <td class="list cursor-pointer" data-id="${item.id}">
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="mask mask-squircle h-12 w-12">
                          <img src="https://img.daisyui.com/images/profile/demo/2@94.webp" alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">${item.name}</div>
                        <div class="text-sm opacity-50">Team: ${item.team.name}</div>
                      </div>
                    </div>
                  </td>
                  <td class="text-center">${item.height}cm | ${item.weigh}kg</td>
                  <td class="text-center">${item.salary}</td>
                  <td class="text-center">${item.sp}</td>
                  <td class="text-center">${item.ss}</td>
                  <td class="text-center">${item.bc}</td>
                  <td class="text-center">${item.ls}</td>
        `;
        tbody.appendChild(newTr);

        newTr.querySelector(".list").addEventListener("click", function () {
          const index = dataArray.findIndex(
            (dataItem) => dataItem.id === item.id
          );
          window.scrollTo({
            top: 0,
            behavior: 'instant'
          });
          swiper.slideTo(index);
        });
      });
    })
    .catch((error) => console.error("Error:", error));
};

// Event listeners
window.addEventListener("scroll", handleScroll);
search.addEventListener("focus", handleFocus);
search.addEventListener("focusout", handleFocus);

// Function calls
getData();
getDataForRenderList();


const uploadImage= ()=>{
  fetch("https://ktc-player-base-production.up.railway.app/api/v1/upload/image",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aGFuaGJlbjAxIiwiaWF0IjoxNzIzNjI3MjA4LCJleHAiOjE4MTAwMjcyMDh9.JioHBTgGGYSS5h8xk_JpR-fczgLwB1ToRaZqP6fv6dg",
      },
      body: JSON.stringify({
        image: imageInput.files[0],
        playerId: 1, // Replace with your player ID
        type: "player",
      }),
    }
  )
  .then(res=>res.json())
  .then(data=>console.log(data))
}