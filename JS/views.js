    window.onload = () => {
    initInterface();
}
window.addEventListener("popstate", ()=>{
    location.reload()
},false);

async function initInterface() {
    await fetch(Game.BASE_URL + "/games");
   document.getElementById("games_container").innerHTML="";
    gamesModel = [];
    getGames()
    .then(displayGamesDOM());
}
async function displayGamesDOM() {
    await fetch(Game.BASE_URL + "/games");

    gamesModel.forEach(key => {
            gameTitle=key.title;
        document.getElementById("games_container").innerHTML += "<div class='game_wrapper'>" +
            "<img id='image' src=" + key.imageUrl + ">" + "<br>" +
            "<div id= 'box1'>" + "<h3 id='title'>" + key.title + "</h3>" + "<br>" + "<p>" +
            key.description + "</p>" + "</div>" + "<div id= 'buttons'>" +
            "<div id='details_box'" + "<a class='details' target='_blank' rel='noopener noreferrer'  onclick=detailsDisplay('" + key.id + "')>Details</a>" + "</div>" + "<br>" +
            "<div id='update_box'" + "<a class='update' href='#' onclick=updateGameDetails('" + key.id + "')>Update</a>" + "</div>" + "<br>" +
            "<div id='delete_box'" + "<a class='delete' href='#' onclick=deleteThisGame('" + key.id + "')>Delete</a>" + "</div>" + "<br>" + "</div>" + "</div>" + "<br>";
    })
}

async function detailsDisplay(gameId) {
    getGameDetails(gameId)
    var response = await fetch(Game.BASE_URL + "/games/" + gameId);
    var parsed = await response.json();
    var id = parsed._id;
    console.log(parsed);
    console.log(parsed._id);
    console.log(gameDetail);
    location.href = "game.html" + "?id=" + id;
}

var newGame;
function getTitle(inputTitle) {
    if (document.getElementById("title-field").value != "") {
        var inputTitle = document.getElementById("title-field").value;
       
    } return(inputTitle);}

function getDescription() {

    if (document.getElementById("description-field").value != "") {
        var inputDescription = document.getElementById("description-field").value;
       
    } return(inputDescription);;}
function getImage() {

    if (document.getElementById("image-field").value != "") {
        var inputImage = document.getElementById("image-field").value;
        
    }return(inputImage);;}
function getReleaseDate() {

    if (document.getElementById("releaseDate-field").value != "") {
        var inputReleaseDate = document.getElementById("releaseDate-field").value;
        return(inputReleaseDate);
    };}
function getGenre() {

    if (document.getElementById("genre-field").value != "") {

    var inputGenre = document.getElementById("genre-field").value;
    return(inputGenre);

    };}
function getPublisher() {

    if (document.getElementById("publisher-field").value != "") {

    var inputPublisher = document.getElementById("publisher-field").value;
    return(inputPublisher);

    }}
    
function clearInputForm() {
    document.getElementById("title-field").value = "";
    document.getElementById("description-field").value = "";
    document.getElementById("image-field").value = "";
    document.getElementById("releaseDate-field").value = "";
    document.getElementById("genre-field").value = "";
    document.getElementById("publisher-field").value = "";

}
function refreshTable() {
    for (var i = 0; i < gamesModel.length; i++) {  
        displayGames(gamesModel[i].id);
    }
}

function getGameById(gameIdToSearch) {
    for (var i = 0; i < gamesModel.length; i++) {
        if (gamesModel[i].id === gameIdToSearch) {
            return gamesModel[i];
        }
    }
}

document.getElementById("create_game").addEventListener("click", () => {
    document.getElementById("add-game-wrapper").style.display = "block"
});

document.getElementById("add-game").addEventListener("click", async () => {
 await fetch(Game.BASE_URL + "/games");
 document.getElementById("games_container").innerHTML="";
 createGame();
    clearInputForm();
    initInterface();
    document.getElementById("add-game-wrapper").style.display = "none";
});
function reload() {
    location.reload();
    return false;
}

async function deleteThisGame(gameId) {
    await fetch(Game.BASE_URL + "/games");
gamesModel = [];

    deleteGame(gameId).then(initInterface());
}

async function updateGameDetails(gameId,updatedGame) {
    await fetch(Game.BASE_URL);
    console.log(gameId);
    getGameDetails(gameId).then
   ( document.getElementById("update-game-wrapper").style.display = "block");
 
}


function fillUpdateForm(response) {
    document.getElementById("update-title-field").value = response.title;
    document.getElementById("update-description-field").value = response.description;
    document.getElementById("update-image-field").value = response.imageUrl;
    document.getElementById("update-releaseDate-field").value = response.releaseDate;
    document.getElementById("update-genre-field").value = response.genre;
    document.getElementById("update-publisher-field").value = response.publisher;
    var id=response.id;
    console.log(id);
}








document.getElementById("regenerate_games").addEventListener("click",async(e)=>{
e.preventDefault();
 await fetch(Game.BASE_URL + "/games");
resetGames();
initInterface();

});

function getUpdatedTitle(inputTitle) {
    if (document.getElementById("update-title-field").value != "") {
        var inputTitle = document.getElementById("update-title-field").value;
       
    } return(inputTitle);}

function getUpdatedDescription() {

    if (document.getElementById("update-description-field").value != "") {
        var inputDescription = document.getElementById("update-description-field").value;
       
    } return(inputDescription);;}
function getUpdatedImage() {

    if (document.getElementById("update-image-field").value != "") {
        var inputImage = document.getElementById("update-image-field").value;
        
    }return(inputImage);;}
function getUpdatedReleaseDate() {

    if (document.getElementById("update-releaseDate-field").value != "") {
        var inputReleaseDate = document.getElementById("update-releaseDate-field").value;
        return(inputReleaseDate);
    };}
function getUpdatedGenre() {

    if (document.getElementById("update-genre-field").value != "") {

    var inputGenre = document.getElementById("update-genre-field").value;
    return(inputGenre);

    };}
function getUpdatedPublisher() {

    if (document.getElementById("update-publisher-field").value != "") {

    var inputPublisher = document.getElementById("update-publisher-field").value;
    return(inputPublisher);

    }}

    document.getElementById("update-game").addEventListener("click",async(e)=>{
        e.preventDefault();
        document.getElementById("update-game-wrapper").style.display = "none"
        updateGame();
        getGameDetails().then(
            clearInputUpdateForm()).then(initInterface());
            
    })

    function clearInputUpdateForm() {
        document.getElementById("update-title-field").value = "";
        document.getElementById("update-description-field").value = "";
        document.getElementById("update-image-field").value = "";
        document.getElementById("update-releaseDate-field").value = "";
        document.getElementById("update-genre-field").value = "";
        document.getElementById("update-publisher-field").value = "";
    
    }