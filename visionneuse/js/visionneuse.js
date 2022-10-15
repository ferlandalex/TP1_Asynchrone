window.addEventListener("load",fetchFilms);
let url = "https://swapi.dev/api/films/";
let arrListeFilms = [];
let arrListePlanetes = [];


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

function fetchPlanetes(planete){

    arrListePlanetes = [];
    leFilm = arrListeFilms[this.id];

    for (i=0; i< leFilm.planets.length;i++) {
        fetch(leFilm.planets[i])
            .then(function (tableau) {
                tableau.json()
                    .then(function (json) {
                        laPlanete = json;
                        arrListePlanetes.push(laPlanete.name);
                        if (arrListePlanetes.length == leFilm.planets.length){
                            afficherPlanetes();
                        }
                    })
            })
    }


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
        element_button.setAttribute("id",i)
        element_li.appendChild(element_button)
        element_ul.appendChild(element_li);
        ajouterClickEvent(i);
    }
}

function ajouterClickEvent(titre){
    bouton = document.getElementById(titre);
    bouton.addEventListener("click", fetchPlanetes);
}

function afficherPlanetes(){
    document.getElementById("planete").innerHTML = "";
    let element_div = document.getElementById("planete");
    let element_span = document.createElement("span");
    let element_p = document.createElement("p");
    let element_img = document.createElement("img");

    element_div.appendChild(element_span);
    element_span.appendChild(element_img);
    element_span.appendChild(element_p);

    element_p.textContent = arrListePlanetes[0];
    nomImg = "images/" + arrListePlanetes[0] +".jpeg";
    element_img.setAttribute("src",nomImg);
    element_img.setAttribute("alt", arrListePlanetes[0])

}