
window.onload = () => {
    getGameDetails(id);
 
}

var url = document.URL;
    var url_array = url.split("=");
    var id = url_array[url_array.length - 1];
    console.log(id);
console.log(1);

async function getGameDetails(id) {
    await fetch(Game.BASE_URL + "/games");
    var url = document.URL;
    var url_array = url.split("=");
    var id = url_array[url_array.length - 1];
    console.log(id);
  
      return fetch(Game.BASE_URL + "/games/"+id)
      .then(response => response.json())        
      .then(function(responseDetail){
          var gameDetails=responseDetail;
          gameDetail.push(gameDetails);
 
  console.log(gameDetail);
  fillGameDetails();
  });
 
  }

  function fillGameDetails(){
    document.getElementById("image").innerHTML="<img src=" +gameDetail[0].imageUrl+">";
    document.getElementById("title-description").innerHTML="<h3>"+gameDetail[0].title+"</h3>"+"<br>"+"</br>"+"<p>"+gameDetail[0].description+"</p>"+"</br>"+"</br>";
    document.getElementById("genre-publisher").innerHTML="Genre:  "+gameDetail[0].genre+"  |  "+"Publisher:  "+gameDetail[0].publisher+"  |  "+"Release Date:  "+gameDetail[0].releaseDate;

  }
