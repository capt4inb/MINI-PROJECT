const swiperContainer = document.getElementById('swiperContainer');
const tbody = document.getElementById('tbody')


// https://ktc-player-base-production.up.railway.app/api/v1/upload/image

const getData = () => {
  fetch('https://ktc-player-base-production.up.railway.app/api/v1/player',
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aGFuaGJlbjAxIiwiaWF0IjoxNzIzNjI3MjA4LCJleHAiOjE4MTAwMjcyMDh9.JioHBTgGGYSS5h8xk_JpR-fczgLwB1ToRaZqP6fv6dg'
      }
    }
  )
    .then(response => response.json())
    .then(data => {
      console.log(data)
      data.data.forEach(item => {
        const newDiv = document.createElement('div');
        newDiv.className = 'swiper-slide';
        newDiv.innerHTML = `
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
                    <p id="team" class="p-4 rounded bg-gray-200"><b>Đội tuyển:</b> ${item.teamId}</p>
                    <p id="" class="p-4 rounded bg-gray-200"><b>Lương:</b> ${item.salary}</p> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        swiperContainer.appendChild(newDiv);
      });
      swiper.update(); // update Swiper after adding new slides
    })
    .catch(error => console.error('Error:', error));
};

getData();

{/* <tr>
                  <th>
                    <label>
                      <input type="checkbox" class="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">Hart Hagerty</div>
                        <div class="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Zemlak, Daniel and Leannon
                    <br />
                    <span class="badge badge-ghost badge-sm">Desktop Support Technician</span>
                  </td>
                  <td>Purple</td>
                  <th>
                    <button class="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr> */}
const getDataForRenderList = () => {
  fetch('https://ktc-player-base-production.up.railway.app/api/v1/player',
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aGFuaGJlbjAxIiwiaWF0IjoxNzIzNjI3MjA4LCJleHAiOjE4MTAwMjcyMDh9.JioHBTgGGYSS5h8xk_JpR-fczgLwB1ToRaZqP6fv6dg'
      }
    }
  )
    .then(response => response.json())
    .then(data => {
      console.log(data)
      data.data.forEach(item => {
        const newTr = document.createElement('tr');
        newTr.innerHTML = `
          <tr>
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="mask mask-squircle h-12 w-12">
                          <img src="https://img.daisyui.com/images/profile/demo/2@94.webp" alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">Lê Triệu Phú</div>
                        <div class="text-sm opacity-50">Tên đội bóng</div>
                      </div>
                    </div>
                  </td>
                  <td class="text-center">173cm 65kg</td>
                  <td class="text-center">200.000</td>
                </tr> 
        `;
        tbody.appendChild(newTr);
      });
      // swiper.update(); // update Swiper after adding new slides
    })
    .catch(error => console.error('Error:', error));
};
getDataForRenderList()