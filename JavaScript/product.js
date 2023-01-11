

/* Récupération de L'URL + id */

const params = new URLSearchParams(document.location.search); 
const id = params.get("id");

// Déclarion variable color



console.log(id);



/* Affichage des Kanaps */

function detailProduct(){

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
    console.log(data);

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
   console.log(quantityProduct);
   console.log(colors);

// Déclaration de la variable item qui va cherche la class item

    let item = document.querySelector(".item");

// Item va chercher l'id colors

// Utilisation de inserAdjacentHTML pour analyse le texte specifié en tant que html et pour ajouter les noeud resultant dans le DOM
    
     item.querySelector("#colors").insertAdjacentHTML("beforeend", product.colors.map(color => `<option value="${color}">${color}</option>`).join());
    console.log(item);
   
})

// Création d'une erreur

      .catch(function(error){

// Déclaration d'une variable erreur qui est égal a l'id item___img

          let erreur = document.querySelector("#item__img");

// Affichage de l'erreur avec innerText

          erreur.innerText = "API na pas envoyé le canapé";
          console.log("erreur");

});

}


//On appel detailProduct a la fin

detailProduct();
//Déclaration des variable articleClient + color + boutonPanier
//ajoute les information dans le tableau

// J'ai couper cette partie de code et je l'est mit dans suite-product.js


let articleClient = document.querySelector("#quantity");
let color = document.querySelector('#colors');
const boutonPanier = document.querySelector("#addToCart");
const erreurBouton = document.createElement("div"); 
document.querySelector(".item__content__addButton").appendChild(erreurBouton);

// Creation des tableaux
let tableauProduit = [];
boutonPanier.addEventListener("click", function(){
erreurBouton.innerText = "";
if(document.querySelector("#quantity").value > 0 && document.querySelector("#quantity").value <= 100 && document.querySelector("#colors").value !== "" ){
erreurBouton.innerText = "";
let nouveauProduit = {
  _id: id,
  color: document.querySelector("#colors").value,
  quantity: document.querySelector("#quantity").value,
};
if(localStorage.getItem("stock") !== null){
  tableauProduit = JSON.parse(localStorage.getItem("stock"));
}

for(let unElementTableau of tableauProduit){
  if(unElementTableau._id  === nouveauProduit._id && unElementTableau.color === nouveauProduit.color  ){
let ajout = parseInt(unElementTableau.quantity) + parseInt(nouveauProduit.quantity);
    if(ajout > 100){
      ajout = 100;
    }else if(ajout < 0){
      ajout = 0;
    }
    unElementTableau.quantity = JSON.stringify(ajout);
    return localStorage.setItem("stock", JSON.stringify(tableauProduit));
  }
}
tableauProduit.push(nouveauProduit);
localStorage.setItem("stock", JSON.stringify(tableauProduit));
alert("Le tableau a bien été ajouté");


}else{
  erreurBouton.innerText = "Veuillez renseigner une quantité et une couleur";
}
}
)

// = verifie la valeur 
// ==  verifie la valeur et le type
// === verifie la valeur, le type et verifie si c'est strictement egal



