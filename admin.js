const apiRenderall = 'https://ktc-player-base-production.up.railway.app/api/v1/player';

async function fetchApiRenderall() {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aGFuaGJlbjAxIiwiaWF0IjoxNzIzNjMyMDkxLCJleHAiOjE4MTAwMzIwOTF9.x2kxoVO-9P_iAkLNIEEYcweksrg5L7b9zdBRDC2O1do'; // Replace with your actual token

  try {
    const response = await fetch(apiRenderall, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Now you can use the data as needed
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchApiRenderall();

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
// ------------------------------------------------------

// DECLARE VARIABLES TABLE 
const tableList = document.querySelector('.danhsach tbody');
const row = document.querySelector('tr');
const editBtn = document.querySelector('#editBtn');
const delBtn = document.querySelector('#delBtn');
// ------------------------------------------------------

// FUNCTIONS 