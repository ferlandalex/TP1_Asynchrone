window.addEventListener("load", getUsers);
listeImages = document.getElementById("liste")

userNom = document.getElementById("data-nom");
userImg = document.getElementById("data-img");
userAdresse = document.getElementById("data-adresse");
userVille = document.getElementById("data-ville");
userEtat = document.getElementById("data-etat");
userPostal = document.getElementById("data-codepostal");


let url = "https://randomuser.me/api/?results=10";
let arrUtilisateurs = null;

function getUsers(){

    fetch(url)
        .then( function (users) {
            users.json()
                .then(function (json){
                    arrUtilisateurs = json.results;
                    console.log(arrUtilisateurs);
                    afficherUsers();
                })
            }
        )

}

function afficherUsers(){
    let elementul = document.createElement("ul");
    listeImages.appendChild(elementul);

    for(i=0;i < arrUtilisateurs.length;i++) {
        let elementli = document.createElement("li");
        elementul.appendChild(elementli);
        let elementbBtn = document.createElement("button");
        elementli.appendChild(elementbBtn);
        let elementImage = document.createElement("img");
        elementbBtn.appendChild(elementImage);
        let imageUtilisateur = arrUtilisateurs[i].picture.large;
        let altUtilisateur = "Afficher la fiche de " + arrUtilisateurs[i].name.first + " " + arrUtilisateurs[i].name.last;
        elementImage.setAttribute('src',imageUtilisateur);
        elementImage.setAttribute('alt',altUtilisateur);
        elementImage.setAttribute('id', i);
        elementImage.addEventListener("click",afficherInfo);
    }
}
function afficherInfo(i){
    idSelectionne = this.id;
    prenomNom =arrUtilisateurs[idSelectionne].name.first + " " + arrUtilisateurs[idSelectionne].name.last;
    userNom.innerText = prenomNom;

    userImg.setAttribute('src',arrUtilisateurs[idSelectionne].picture.large)
    userImg.setAttribute('alt',prenomNom)

    userAdresse.innerText = arrUtilisateurs[idSelectionne].location.street.number + " " + arrUtilisateurs[idSelectionne].location.street.name;
    userVille.innerText = arrUtilisateurs[idSelectionne].location.country;
    userEtat.innerText = arrUtilisateurs[idSelectionne].location.state;
    userPostal.innerText = arrUtilisateurs[idSelectionne].location.postcode;
}
