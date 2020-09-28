class Game {
    constructor(id, title, imageUrl, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;

    }
}

class NewGame {
    constructor(title, description, imageUrl, releaseDate, genre, publisher) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.releaseDate = releaseDate;
        this.genre = genre;
        this.publisher = publisher;
    }
}

const encodeFormData = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
}

var gamesModel = [];

Game.BASE_URL = "https://games-world.herokuapp.com";

function getGames() {
    return fetch(Game.BASE_URL + "/games")
        .then(response => response.json())
        .then(responseBody => {
            responseBody.forEach(el => {
                let game = new Game(el._id, el.title, el.imageUrl, el.description);
                gamesModel.push(game);
            });
            gamesModel.forEach(key => {
                console.log(key.id);
            })
        })

}
var idObj = [];
var gameDetail = [];
async function getGameDetails(gameId) {
    await fetch(Game.BASE_URL + "/games");
    gamesModel.forEach(el => {
        let gameId = el.id;

        let gameTitle = el.title;
        let gameDescription = el.description;

        let gameImage = el.imageUrl;

        console.log(gameId);
        });

        return fetch(Game.BASE_URL + "/games/" + gameId)
            .then(response => response.json())
            .then(function (responseDetail) {
                var gameDetails = responseDetail;
                gameDetail.push(gameDetails);
            localStorage.setItem("id",gameId);
       // console.log(responseDetail);            
        fillUpdateForm(responseDetail)  ;
    });
    
}

function createGame(newGame) {
    var inputTitle = getTitle();
    console.log(inputTitle);
    var inputDescription = getDescription();
    var inputImage = getImage();
    var inputReleaseDate = getReleaseDate();
    var inputGenre = getGenre();
    var inputPublisher = getPublisher();
    var newGame = new NewGame(inputTitle, inputDescription, inputImage, inputReleaseDate, inputGenre, inputPublisher) //va trebui sa vina din formular  
    console.log(newGame);
    fetch(Game.BASE_URL + "/games", {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
        body: encodeFormData(newGame)
    })
        .then(response => console.log(response.json()))
        .catch(error => console.log(error));
}

function updateGame(alteredGame) {

}

function deleteGame(gameId) {
    gamesModel.forEach(el => {
        var gameId = el.id;
        console.log(gameId);
    })
    return fetch(Game.BASE_URL + "/games/" + gameId, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(responseBody => {
            document.getElementById("games_container").innerHTML = "";
            gamesModel = [];
        });
}

function resetGames() {
    const request = new XMLHttpRequest();
    const url = "https://games-world.herokuapp.com/regenerate-games";
    request.open("GET", url);
    request.send();
}

function updateGame(GameId, updatedGame) {   
    var GameId=localStorage.getItem("id");
    console.log(GameId);
    var inputTitle = getUpdatedTitle();
    var  inputDescription = getUpdatedDescription();
    var  inputImage = getUpdatedImage();
    var  inputReleaseDate = getUpdatedReleaseDate();
    var  inputGenre = getUpdatedGenre();
    var  inputPublisher = getUpdatedPublisher();
    var updatedGame = new NewGame(inputTitle, inputDescription, inputImage, inputReleaseDate, inputGenre, inputPublisher );
   console.log(updatedGame);
    return fetch(Game.BASE_URL + "/games/" + GameId,{
        method: 'PUT',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'Accept': 'application/json'},
        body:encodeFormData(updatedGame)
    })
    .then(response => console.log(response.json()))
    .catch(error => console.log(error))
    
}

