/***RECUPERATION ****/

const page = document.location.href;

if (page.match("cart")) {
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((products) => {
    data(products);
  })
  .catch((err) => {
    document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";;
  });
}

/****DATA + DATASET*****/


function data(now) {
  // Déclaration de stock qui est egal a la ligne panieStocke dans le localStorage
  stock = JSON.parse(localStorage.getItem("stock"));

  // Vérification pour voir si stock existe et si il n'est pas vide 
  if (stock && stock.length != 0) {

      // Si c'est le cas alors Creation d'une boucle, ou on excute produit et stock
      for (let produit of stock) {
          // Création d'une autre boucle 
          // Déclaration de la variable k qui est egal a 0; f est egal a now, k est a inferieur a f; alors k++
          for (let k = 0, f = now.length; k < f; k++) {
              // Verfication pour voir si produit._id est egal a now[k]._id
              // Si c'est le cas alors les propriete de produit sont mis a jour avec les valeur correspondante de now[k]
              if (produit._id === now[k]._id) {
                  // Produit.name = now[k].name, name est deja enristré, ex: produit.name = kanap cynopé
                  produit.name = now[k].name; 
                  produit.prix = now[k].price; 
                  produit.image = now[k].imageUrl;
                  produit.description = now[k].description; 
                  produit.alt = now[k].altTxt;
              }
          }
      }
      // Appel de la fonction affiche pour faire le lien avec data
      affiche(stock);

  } else {
      // Si aucun article est enregistré dans la page panier alors une alerte apparait
      document.querySelector("h1").style.color = "red";
      document.querySelector("h1").innerText = "Vous avez 0 article dans votre panier";
  }
  deleteItem();
  changeArticle();
  total();
  formul();
}

/****AFFIGAGE DES ELEMENTS ENREGISTRES DANS LE LOCAL-STORAGE + DATA******/

function affiche(panier) {
 
// Déclaration de la variable item qui est égale a l'id cart__items

  let item = document.querySelector("#cart__items");

// Utilisation de innerHtml + map pour l'affichage
// Enregistrement des dataSet
  item.innerHTML += panier.map((produit) => 
  `<article class="cart__item" data-id="${produit._id}" data-couleur="${produit.color}" data-quantité="${produit.quantity}" data-prix="${produit.prix}"> 
    <div class="cart__item__img">
      <img src="${produit.image}" alt="${produit.alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${produit.name}</h2>
        <span>couleur : ${produit.color}</span>
        <p data-prix="${produit.prix}">${produit.prix} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="0" max="100" value="${produit.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${produit._id}" data-couleur="${produit.color}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
    ).join(""); 


}


/****MODIFIER  LA QUANTITE + REMPLACE LES VALEURS DANS LE LOCALSTORAGE*****/

function changeArticle() {
  // Déclaration de la variable item
  const item = document.querySelectorAll(".cart__item");
  // Utilisation de forEarch pour parcourir chaque element du tableau
  item.forEach((cart) => {
    // Utilisation de change au lieu de click, eq pour selectionne l'element specifique, addEventListener une fonction qui sera appelée chaque fois que l'événement spécifié est livré à la cible.
    cart.addEventListener("change", (eq) => {
      let stocki = JSON.parse(localStorage.getItem("stock"));

      // Création d'une boucle pour parcourir tout les élement de l'objet stocki
      for (let article of stocki)
        // Si l'id et la couleur corresponde a celui de l'element alors
        if (
          article._id === cart.dataset.id &&
          cart.dataset.couleur === article.color
        ) {
          // On target.value la quantity
          // Sert a recupére la nouvelle valeur de la quantité saisi par l'utilisateur
          article.quantity = eq.target.value;
          // On return stocki dans le localStorage
          localStorage.stock = JSON.stringify(stocki);
          // on target.value la dataset quantite
          cart.dataset.quantité = eq.target.value;
          // On appel la fonction la total pour que la quantité/prix final soit rectifier
          total();
        }
    });
  });
}


/*********SUPPRIMESSION DES ELEMENTS******** ***/


function deleteItem() {
  let delets = document.querySelectorAll(".deleteItem");
  
  delets.forEach((delet) => {
    delet.addEventListener("click", () => {
        // On convertie les donne stocke dans le localStorage en objet
        let stock = JSON.parse(localStorage.getItem("stock"));
        // For pour parcourir tout les element dans l'objet stock
        // Création d'une boucle et de la variable A qui est egal a 0, b egal a stock.lenght qui represent le nombre d'element,
        // A est plus petit que b, on incrémente A
        for (let a = 0, b = stock.length; a < b; a++)
        // Si l'ID est bon alors
        // If pour verfier si l'element actuel de la boucle a un id ou couleur correspondant a l'element de la class deletitem
         if (
          stock[a]._id === delet.dataset._id || stock[a].color === delet.dataset.couleur
        ) {
        // Création d'une variable pour la suppression
          const supp = [a];
        // Utilisation de splice pour modifier le contenu d'un tableau en retirant des éléments
          stock.splice(supp, 1);
        // On retourne stock dans le localStorage
        // Stock sous forme de chaine
          localStorage.stock = JSON.stringify(stock);
        // Rechargement de la page quand un élement est supprimer
          return location.reload(0.1);
        }
    });
    // Appel de la fonction total pour modifer la quantité et le prix
    total();
  });
}




/****AFFICHAGE TOTAL DU PRIX + QUANTITES ***********/

function total() {
  // Déclaration de deux variable qui sont egal a 0
    let article = 0;
    let price = 0;
  // Déclaration d'un constante qui est egal a cart__item
    const item = document.querySelectorAll(".cart__item");
  // On regarde ce qui y a dans cart__item
    item.forEach((item) => {
  // On calcul la quantité
      article += JSON.parse(item.dataset.quantité);
  // On multiplie la quantité et le prix
      price += item.dataset.quantité * item.dataset.prix;
    });
  // Affichage de la quantité et du prix
    document.querySelector("#totalQuantity").innerText = article;
    document.querySelector("#totalPrice").innerText = price;
  }; 


/**********FORMULAIRE************/


function formul(){

// Déclaration d'une constante qui est egal au bouton commande
const commande = document.querySelector("#order");
// Utilisation de addEventListener pour ecoute 
commande.addEventListener("click", ()=> {
// Utilisation de Class pour manipuler plus facilement l'heritage
class entre {
  constructor(prenom,nom,adresse,ville,email){
    this.prenom = document.querySelector("#firstName").value
    this.nom = document.querySelector("#lastName").value
    this.adresse= document.querySelector("#address").value
    this.ville = document.querySelector("#city").value
    this.email = document.querySelector("#email").value
}}
    const formulairVal = new entre();

/*****Création regExp ******/

const regExpPrenomEtNom = (value) => {
  return /^[a-zA-Z0-10]{1,15}$/.test(value);
}

const regExpAdresse = (value) => {
  return /^[a-zA-Z0-85]{1,70}$/.test(value);
}

const regExpVille =(value) => {
  return /^[a-zA-z]{5,100}$/.test(value)
}

const regExpMail = (value) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value);
 
}

/*Function Validation et Récuperation regExp */

//Confirmation Prénom 

function prenonControl(){
// déclaration d'un constante qui est égale a formulairVal.prenom qui est dans la class
  const prenomn = formulairVal.prenom;
// Si le regExpPrenom est valide a prenom alors On affiche un message de validation
if(regExpPrenomEtNom(prenomn)){
  document.querySelector("#firstNameErrorMsg").style.color = "green";
  document.querySelector("#firstNameErrorMsg").innerText = "Valid";
  return true
} {
// Si il n'est pas valide alors affiche un message d'erreur
  document.querySelector("#firstNameErrorMsg").style.color = "red";
  document.querySelector("#firstNameErrorMsg").innerText = " Chiffre et symbole ne sont pas autorise \n minimun 1 caractére \n maximum 15 caractére`";
   return false;
}}


//Confirmation NOM  

function nomControl(){
  const nom = formulairVal.nom;
  if(regExpPrenomEtNom(nom)){
    document.querySelector("#lastNameErrorMsg").style.color = "green";
    document.querySelector("#lastNameErrorMsg").innerText = "valid";
    return true
   
  }else {
    document.querySelector("#lastNameErrorMsg").style.color = "red";
    document.querySelector("#lastNameErrorMsg").innerText = "Chiffre et symbole ne sont pas autorise \n minimun 1 caractére \n maximum 15 caractére";
   
    return false;
}}


//Confirmation ADRESSE  

function adresseControl(){
  const adresse= formulairVal.adresse;
  if(regExpAdresse(adresse)){
    document.querySelector("#addressErrorMsg").style.color = "green";
    document.querySelector("#addressErrorMsg").innerText = "valid";
    return true
  }else {
    document.querySelector("#addressErrorMsg").style.color = "red";
    document.querySelector("#addressErrorMsg").innerText = "Chiffre et symbole ne sont pas autorise \n minimun 1 caractére \n maximum 15 caractére";
   
    return false
    }}


//Confirmation VILLE  

function villeControl(){
  const ville = formulairVal.ville;
  if(regExpVille (ville)){
    document.querySelector("#cityErrorMsg").style.color = "green";
    document.querySelector("#cityErrorMsg").innerText = "valid";
    return true
  }else {
    document.querySelector("#cityErrorMsg").style.color = "red";
    document.querySelector("#cityErrorMsg").innerText = "Chiffre et symbole ne sont pas autorise \n minimun 1 caractére \n maximum 15 caractére";
    
    return false
   
    }}

  
//Confirmation EMAIL

function mailControl(){
  const mail = formulairVal.email;
  if(regExpMail(mail)){
    document.querySelector("#emailErrorMsg").style.color = "green";
    document.querySelector("#emailErrorMsg").innerText = "valid";
    return true
  }else {
    document.querySelector("#emailErrorMsg").style.color = "red";
    document.querySelector("#emailErrorMsg").innerText = "Chiffre et symbole ne sont pas autorise \n minimun 1 caractére \n maximum 15 caractére";
  
    return false
    }}


// Si prenom, nom, adresse, ville et mail sont valide alors
if(prenonControl() && nomControl() && adresseControl() && villeControl() && mailControl()){
  // On envoie formulaireVal dans le localStorage
  localStorage.setItem("formulaireVal", JSON.stringify(formulairVal));
  const item = document.querySelectorAll(".cart__item");
  item.forEach((cart) => {
  // Création de contact avec prenom + nom + adresse etc
  const contact = {
  firstName : formulairVal.prenom,
  lastName: formulairVal.nom,
  address: formulairVal.adresse,
  city: formulairVal.ville,
  email: formulairVal.email
  }
  // Product est egal a ce qui y a enregistre dans stock
  let products = JSON.parse(localStorage.getItem("stock"));
  // Product est égal a l'Id du kanap
  products = [cart.dataset.id];
  const envoie = {
  contact,
  products,
  }

const body = envoie;
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
      "Content-Type": "application/json"
            }})
          .then((res) => res.json())
          .then((data) => {
                   
          const orderId = data.orderId;
            document.location.href = "confirmation.html" + "?orderId=" + orderId
            return console.log(data);
})
})
   }else{
   
}
formul();   
})

}


