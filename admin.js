fetch('https://ktc-player-base-production.up.railway.app/api/v1/player',
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aGFuaGJlbjAxIiwiaWF0IjoxNzIzNjI5NDQ1LCJleHAiOjE4MTAwMjk0NDV9.skX38OzMOckcrknTdIojoLzLcmPeesMlXCUUj1l3tnM`
      }
    }
  
)
.then(response => response.json)
.then((data=>{
    console.log(data.data);
  
}))
.cat