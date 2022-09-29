window.addEventListener("load", getUsers);
listeImages = document.getElementById("liste")

userNom = document.getElementById("data-nom");
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
                    displayAllUsers();
                })
            }
        )

}

function displayAllUsers(){
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
        elementbBtn.addEventListener("click",afficherInfo);
    }
}
function afficherInfo(i){
    // effacerInfo();
    test = this.id;
    console.log(this);
    userNom.innerText = arrUtilisateurs[1].name.first + " " + arrUtilisateurs[1].name.last
    userAdresse.innerText = arrUtilisateurs[1].location.street.number + " " + arrUtilisateurs[1].location.name;
    userVille.innerText = arrUtilisateurs[1].location.country;
    userEtat.innerText = arrUtilisateurs[1].location.state;
    userPostal.innerText = arrUtilisateurs[1].location.postcode;
}

// function effacerInfo(){
//     userNom.innerText = "";
//     userAdresse.innerText = "";
//     userVille.innerText = "";
//     userEtat.innerText = "";
//     userPostal.innerText = "";
// }