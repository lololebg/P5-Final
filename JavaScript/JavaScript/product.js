
/* Manipulation de L'URL + id */

const params = new URLSearchParams(document.location.search); 
const id = params.get("id");


/* Affichage des Kanaps */

function detailProduct() {

    fetch("http://localhost:3000/api/products/" + id)

        .then(function (res) {

            if (res.ok) {
                return res.json();
            }
        })

        // Récupération des information enregistré dans data
        .then(function (data) {

            // Déclaration de la variable product qui est égal a data
            let product = data;

            // Déclaration de la variable imageProduct + Création de l'element html img
            let imageProduct = document.createElement("img");

            // Utilisation de appendChild pour ajouter un noeud a la fin de la liste des enfants d'un noeud parent spécifié
            // On ajoute la variable imageProduct a appenChild
            document.querySelector(".item__img").appendChild(imageProduct);

            // ImageProduct.src est egal a data.imageUrl, imageUrl est enregistre dans data
            imageProduct.src = product.imageUrl;
            imageProduct.alt = product.altTxt;

            // Déclaration de la variable titleProduct qui est égal a l'id title 
            let titleProduct = document.getElementById("title");

            // Utilisation de innerText pour afficher le nom, product.name est égal data.name, name est enregistré dans data
            titleProduct.innerText = product.name;

            // Idem
            let priceProduct = document.getElementById("price");
            priceProduct.innerText = product.price;

            let descriptionProduct = document.getElementById("description");
            descriptionProduct.innerText = product.description;

            let quantityProduct = document.getElementById("quantity");
            quantityProduct.innerText = product.quantity;

            // Déclaration de la variable item qui va cherche la class item
            let item = document.querySelector(".item");

            // Item va chercher l'id colors

            // Utilisation de inserAdjacentHTML pour analyse le texte specifié en tant que html et pour ajouter les noeud resultant dans le DOM
            item.querySelector("#colors").insertAdjacentHTML("beforeend", product.colors.map(color => `<option value="${color}">${color}</option>`).join());

        })

        // Création d'une erreur
        .catch(function (error) {

            // Déclaration d'une variable erreur qui est égal a l'id item___img
            let erreur = document.querySelector("#item__img");

            // Affichage de l'erreur avec innerText
            erreur.innerText = "API na pas envoyé le canapé";

        });
}
detailProduct();


/****Ajout kanap dans localStorage + validation quantité**** */

let articleClient = document.querySelector("#quantity");
let color = document.querySelector('#colors');
const boutonPanier = document.querySelector("#addToCart");
const erreurBouton = document.createElement("div"); 
document.querySelector(".item__content__addButton").appendChild(erreurBouton);

// Creation du tableau
let tableauProduit = [];

// On écoute le click
boutonPanier.addEventListener("click", function(){
    erreurBouton.innerText = "";
    // value pour récupere les valeur
    // !== pour verifer si elle n'est pas vide
    // On verifie si les condition sont remplie / Si elle ne sont pas remplie le code continue
    if(document.querySelector("#quantity").value > 0 && document.querySelector("#quantity").value <= 100 && document.querySelector("#colors").value !== "" ){
        erreurBouton.innerText = "";
        // Objet
        let nouveauProduit = {
            _id: id,
            color: document.querySelector("#colors").value,
            quantity: document.querySelector("#quantity").value,
        };
        // On Verifie si un element existe dans le localStorage sous le nom de stock 
        // Si la valeur n'est pas null alors ce qui y a en {} sera excute
        if(localStorage.getItem("stock") !== null){
            // Utilisation de parse pour convertir la chaine de caractere en objet qui ensuite est affecte a tableauProduit
            tableauProduit = JSON.parse(localStorage.getItem("stock"));
        }
        // Utilisation de for of pour parcourir chaque élement de tableauProduit
        for(let unElementTableau of tableauProduit){
            // On verifie si l'id et la couleur de tableauProduit correspond a ceux de nouveauProduit
            // Si c'est la cas alors le produit deja present dans le tableau doit mettre ajour la quantite
            if(unElementTableau._id  === nouveauProduit._id && unElementTableau.color === nouveauProduit.color  ){
                // Utiliation  de parseInt pour convertir les valeur en nombre entier / puis on ajoute les quantité ensemble
                let ajout = parseInt(unElementTableau.quantity) + parseInt(nouveauProduit.quantity);
                // On verifie si la somme est superieur a 100 et si c'est la cas la quantité est reglée a 100
                  if(ajout > 100){
                      ajout = 100;
                // On verifie si la somme est inferieur a 0 et si c'est la cas la quantité est reglée a 0
                    }else if(ajout < 0){
                        ajout = 0;}
                 // On met a jour la quantité
                  unElementTableau.quantity = JSON.stringify(ajout);
                  // On stock le tableau mis a jour
                    return localStorage.setItem("stock", JSON.stringify(tableauProduit));}}
                    // On ajoute nouveauProduit(a la fin) de tableauProduit
                        tableauProduit.push(nouveauProduit);
                    // On stock le tableau mis a jour
                      localStorage.setItem("stock", JSON.stringify(tableauProduit));
                        alert("Le kanap a bien été ajouté");
                    // Si aucune couleur ou quantité n'est remplie une alert apparait
              }else{
                  erreurBouton.innerText = "Veuillez renseigner une quantité et une couleur";
                    }})













