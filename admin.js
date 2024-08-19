// DECLARE VARIABLES FORM 
const namePlayer = document.querySelector('#name');
const positionPlayer = document.querySelector('#position');
const salaryPlayer = document.querySelector('#salary');
const team = document.querySelector('#teamId');
const dobPlayer = document.querySelector('#yearOfBirth');
const country = document.querySelector('#country');
const heightPlayer = document.querySelector('#height');
const weighPlayer = document.querySelector('#weigh');
const addBtn = document.querySelector('#addPlayer');
const avatarPlayer = document.querySelector('#imagePlayer');
const tableList = document.querySelector('.danhsach tbody');
const row = document.querySelector('tr');
const editBtn = document.querySelector('#editBtn');
const delBtn = document.querySelector('#delBtn');
const inputFileAvatar = document.querySelector('#input__file-avatar');
const apiRenderall = 'https://ktc-player-base-production.up.railway.app/api/v1/player';
const apiUploadImg ='https://ktc-player-base-production.up.railway.app/api/v1/upload/image';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZW52bzEyMDIiLCJpYXQiOjE3MjM3OTI3MDcsImV4cCI6MTgxMDE5MjcwN30.KrTYRXUVSUZw5-ntBdnXV0IEkyCsDOZc2ESVe87f4DY'; // Replace with your actual token
function clearForm(){
  namePlayer.value = '';
  positionPlayer.value = '';
  salaryPlayer.value = '';
  team.value = '';
  dobPlayer.value = '';
  country.value = '';
  heightPlayer.value = '';
  weighPlayer.value = '';
}
// RENDER DATA TABLE
async function fetchApiRenderall() {

  fetch(apiRenderall, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.json())
  .then(data => {
    const dataResult = data.data.map(data => {
      return `
      <tr>
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="mask mask-squircle h-12 w-12">
                          <img src="${data['avatar'] || "https://picsum.photos/200/300"}" id="imagePlayer" alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">${data['name']}</div>
                        <div class="text-sm opacity-50">${data.team['name']}</div>
                      </div>
                    </div>
                  </td>
                  <td class="text-center">${data['height']+ 'cm' + ' '} ${data['weigh']+ 'kg'}</td>
                  <td class="text-center">${data['salary']+ '£'} </td>
                  <td class="text-center"><button onclick="editData(${data['id']})" id="editBtn" class="btn btn-success btn-md"><?xml version="1.0" ?><svg enable-background="new 0 0 32 32" width="1.5rem" height="1.5rem" id="svg2" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="background"><rect fill="none" height="32" width="32"/></g><g id="user_x5F_profile_x5F_edit"><path d="M12.001,18c2.209,0,4-1.791,4-4s-1.791-4-4-4s-4,1.791-4,4S9.792,18,12.001,18z M24.001,14.059V5.584L18.415,0H0.001v32h24   v-0.06C28.5,31.442,32,27.633,32,23S28.5,14.557,24.001,14.059z M17.999,2.413L21.587,6h-3.588V2.413z M2.001,30V1.998h14v6.001h6   v6.06c-3.477,0.385-6.348,2.75-7.477,5.941c-3.562,0-8.523,0-8.523,0s-2,0-2,2c0,1,0,6,0,6h11.518c0.506,0.756,1.125,1.43,1.832,2   H2.001z M23.001,29.999c-3.865-0.008-6.994-3.135-7-6.999c0.006-3.865,3.135-6.994,7-7c3.864,0.006,6.991,3.135,6.999,7   C29.992,26.864,26.865,29.991,23.001,29.999z"/><polygon points="22,27 19,27 19,24  "/><rect height="4.243" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 56.5269 20.5858)" width="7.071" x="20.464" y="19.879"/></g></svg></button></td>                    
                  <td class="text-center"><button onclick="deleteData(${data['id']})" id="delBtn" class="btn btn-error btn-md"><?xml version="1.0" ?><svg viewBox="0 0 448 512" width="1.5rem" height="1.5rem" xmlns="http://www.w3.org/2000/svg"><path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z"/></svg></button></td>
                </tr>`
    })
                tableList.innerHTML = dataResult.join('');
                deleteData
  })
  .catch(error => {
    console.error('Error:', error);
  });}
  

fetchApiRenderall();


//UPLOAD IMAGE 
inputFileAvatar.addEventListener('change', async (e) => {
  const getFile = e.target.files[0];
  console.log(getFile)
  const response = await uploadImage(getFile);

})

async function uploadImage(valueImage){
  // console.log(valueImage)
   // Get the selected file
const formData= new FormData()
formData.append("file", valueImage); // Append the file
formData.append("folder","avatar") // Append additional data
// console.log(...formData)
try {
  const res = await fetch('https://ktc-player-base-production.up.railway.app/api/v1/upload/image',{
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
  if(!res.ok){
    throw new Error(`Error status:${res.status()}`)
  }
  const data= await res.json()
  // console.log(data.secure_url)
  imagePreview.src = data.secure_url;
}
catch(error){
  console.log(error)
}}
// FUNCTIONS 
// ADD FORM
addBtn.addEventListener('click', async (e) => {
  e.preventDefault(); // Prevent the form from submitting
  // Get the values from the form inputs
  const playerName = namePlayer.value;
  const playerPosition = positionPlayer.value;
  const playerSalary = salaryPlayer.value;
  const playerTeam = team.value;
  const playerDOB = dobPlayer.value;
  const playerCountry = country.value;
  const playerHeight = heightPlayer.value;
  const playerWeight = weighPlayer.value; // Correct field name

  // Create a new player object with the form values
  const newPlayer =  {
    "avatar": imagePreview.src,
    "name": playerName,
    "position": playerPosition,
    "salary": playerSalary,
    "year_of_birth": playerDOB,
    "country": playerCountry | "England",
    "height": playerHeight,
    "weigh": playerWeight,
    "team_id":playerTeam | 3,
};
    fetch("https://ktc-player-base-production.up.railway.app/api/v1/player", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlayer),
    });
    clearForm();
    fetchApiRenderall();
  });
  async function deleteData(id) {
    try {
      const response = await fetch(`https://ktc-player-base-production.up.railway.app/api/v1/player/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error status: ${response.status()}`);
      }
  
      // Re-fetch the data to update the table
      fetchApiRenderall();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  // Add event listener to the delete button
  tableList.addEventListener('click', (e) => {
    if (e.target.id === 'delBtn') {
      const playerId = e.target.closest('tr').dataset.id;
      deleteData(playerId);
    }
  });

  tableList.addEventListener('click', (e) => {
    if (e.target.id === 'editBtn') {
      const playerId = e.target.closest('tr').dataset.id;
      editData(playerId)
    }
  });

  async function editData(id){
    console.log(id);
    try {
      const response = await fetch(`https://ktc-player-base-production.up.railway.app/api/v1/player/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error status: ${response.status()}`);
      }
  
      const data = await response.json();
      console.log(data); // Log the player's data
  
      // You can now use the player's data to populate the edit form or perform any other desired actions.
  
    } catch (error) {
      console.error('Error:', error);
    }
  }