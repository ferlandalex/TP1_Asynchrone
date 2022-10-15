window.addEventListener("load",fetchFilms);
let url = "https://swapi.dev/api/films/";
let arrListeFilms = [];


function fetchFilms(){

    fetch(url)
        .then(function (tableau){
            tableau.json()
                .then(function (json){
                    arrListeFilms = json.results;
                    console.log(arrListeFilms);
                    afficherListeFilms();
                })
        })
}

function afficherListeFilms(){

    let element_div = document.getElementById("contenu");
    let element_ul = document.createElement("ul");
    element_div.appendChild(element_ul);

    for (i=0; i < 3; i++){
        let element_li = document.createElement("li");
        let element_button = document.createElement("button");
        let titreFilm = arrListeFilms[i].title;
        element_button.textContent = titreFilm;
        element_button.setAttribute("id",enleverEspace(arrListeFilms[i].title))
        element_li.appendChild(element_button)
        element_ul.appendChild(element_li);
    }
}
function enleverEspace(titre){
    //code trouver sur https://www.geeksforgeeks.org/how-to-remove-spaces-from-a-string-using-javascript/ et adapté pour le tp.
    resultat = titre.replace(/ /g, "");
    return resultat;
}