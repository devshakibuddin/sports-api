const loadData = () => {
    const inputElement = document.getElementById("search-value");
    document.getElementById('single-player-info').innerHTML ="";
    const inputValue = inputElement.value ;
    document.getElementById('spinner').classList.remove('d-none');
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${inputValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayData(data.player);
        document.getElementById('spinner').classList.add('d-none');
    })

}

const displayData = (players) =>{
    document.getElementById("search-value").value = "";
    const container = document.getElementById("player-info");
    container.innerHTML = "";
    players.forEach(player => {
        // console.log(player.idPlayer);
            const div = document.createElement('div');
            div.classList.add("col");
            div.innerHTML=`
                <div class="card h-100">
                <img src="${player.strThumb ? player.strThumb : "https://random.imagecdn.app/500/150"}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${player.strPlayer}</h5>
                    <p class="card-text">Nationality: ${player.strNationality}</p>
                </div>
                <div class="mb-3">
                <button onclick="singlePlayer('${player.idPlayer}')" type="button" class="btn btn-success">Details</button>
                <button type="button" class="btn btn-danger">Delete</button>
                </div>
                </div>
            `;
    container.appendChild(div);
    });
}

const singlePlayer = (id) =>{
    const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}
    `;
    fetch(url)
    .then(res => res.json())
    .then ( data => showDisplayDetails(data.players[0]))
}

const showDisplayDetails = (data) => {
    
    console.log(data);
    const showDetailsContainer = document.getElementById('single-player-info');
    const div = document.createElement("div");
    div.classList.add("col")
    div.innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
      <img src="${data.strThumb}" class="card-img-top" alt="...">      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${data.strPlayer}</h5>
          <p class="card-text">BioData : ${data.strDescriptionEN}</p>
          <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>
    `;
    showDetailsContainer.appendChild(div);
}

// loadData();