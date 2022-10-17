window.addEventListener("load",fetchFilms);
let url = "https://swapi.dev/api/films/";
let arrListeFilms = [];
let arrListePlanetes = [];
let planeteCurrente = 0;
let minuterie = null;
let toggleMode = false;
let vitesse = null;
let intervalVitesse = [1500,1000,500]

let btnNext = document.getElementById("btnNext");
let btnBack = document.getElementById("btnBack");
let btnToggle = document.getElementById("btnToggle");
let listeVitesses = document.getElementById("vitesse");

btnNext.addEventListener("click", changerPlanete);
btnBack.addEventListener("click", changerPlanete);
btnToggle.addEventListener("click",toggleRotation);

function fetchFilms(){
    //Fetch une liste de 3 films
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
    //fetch la liste des planêtes du film selectionné
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
                            vitesse = intervalVitesse[1];
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
    //debut de la minuterie
    toggleMode = true;
    clearInterval(minuterie);
    minuterie = window.setInterval(changerPlanete, vitesse);
    //remettre le bon texte dans le bouton toggle
    btnToggle.innerText = "Arrêter";

    //affichage de la liste des vitesses
    afficherListeVitesses();

    planeteCurrente = 0;

    document.getElementById("planete").innerHTML = "";
    let element_div = document.getElementById("planete");
    let element_span = document.createElement("span");
    let element_p = document.createElement("p");
    let element_img = document.createElement("img");

    element_div.appendChild(element_span);
    element_span.appendChild(element_img);
    element_span.appendChild(element_p);

    element_p.textContent = arrListePlanetes[planeteCurrente];
    element_p.setAttribute("id","planeteNom");
    nomImg = "images/" + arrListePlanetes[planeteCurrente] +".jpeg";
    element_img.setAttribute("src",nomImg);
    element_img.setAttribute("alt", arrListePlanetes[planeteCurrente])
    element_img.setAttribute("id", "planeteImg")
    element_img.setAttribute("style", "max-height: 200px")
    element_img.addEventListener("error",afficherImgManquante);
}

function changerPlanete(){

    //reset du timer de la minuterie quand on click sur suivant/precedent
    if (toggleMode == true) {
        clearInterval(minuterie);

        minuterie = window.setInterval(changerPlanete, vitesse);
    }

    nomPlanet = document.getElementById("planeteNom");
    imgPlanet = document.getElementById("planeteImg");
    nbPlanetes = (arrListePlanetes.length - 1);

    if (this.id == "btnBack"){
        if(planeteCurrente > 0) {
            planeteCurrente = planeteCurrente - 1;
        }
        else if (planeteCurrente == 0){
            planeteCurrente = nbPlanetes;
        }
    }else {
        if (planeteCurrente < nbPlanetes) {
            planeteCurrente = planeteCurrente + 1;
        } else if (planeteCurrente == nbPlanetes) {
            planeteCurrente = 0;
        }
    }

    nomPlanet.innerText = arrListePlanetes[planeteCurrente];
    imgPlanet.setAttribute("src","images/" + arrListePlanetes[planeteCurrente] +".jpeg")
    imgPlanet.setAttribute("alt",arrListePlanetes[planeteCurrente]);
}

function afficherImgManquante(){
    this.setAttribute("src","images/planete.jpg");
}

function toggleRotation(){
    if (!toggleMode){
        minuterie = window.setInterval(changerPlanete, 1000);
        changerTexteToggle();
        toggleMode = true;
    }else {
        clearInterval(minuterie);
        changerTexteToggle();
        toggleMode = false;
    }
}
function changerTexteToggle(){
    if (btnToggle.innerText == "Arrêter"){
        btnToggle.innerText = "Activer";
    } else {
        btnToggle.innerText = "Arrêter";
    }
}

function afficherListeVitesses(){
    //reset
    listeVitesses.innerHTML = "";

    //affichage
    let nomVitesse = ["Lent","Moyen","Rapide"]
    let element_select = document.createElement("select");
    let element_label = document.createElement("label");

    element_select.appendChild(element_label);
    element_select.setAttribute("id","vitesseSelectionnee");
    element_label.innerText = "Vitesse de défilement"
    element_label.setAttribute("for","vitesseSelectionnee");
    element_select.addEventListener("change",changerVitesse);

    for (i=0; i <=2; i++){
        let element_option = document.createElement("option");
        element_option.setAttribute("value",i);
        element_option.innerText = nomVitesse[i];
        if (element_option.innerText == "Moyen"){
            element_option.setAttribute("selected","selected");
        }
        element_select.appendChild(element_option);
    }
    listeVitesses.appendChild(element_select);
}

function changerVitesse(){
    vitesse = intervalVitesse[this.value];
    clearInterval(minuterie);
    minuterie= window.setInterval(changerPlanete, vitesse);
}