/***RECUPERATION ****/

const page = document.location.href;

if (page.match("cart")) {
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((products) => {
      console.log(products);
      data(products);
  })
  .catch((err) => {
    document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api: " + err);
  });
}

/****DATA + DATASET*****/

function data(now) {
  
// Déclaration de stock qui est egal a la ligne panieStocke dans le localStorage

 stock = JSON.parse(localStorage.getItem("stock"));

// Si un des stock est superieur a 0 alors
  if (stock && stock.length != 0) {
// Creation d'une boucle, ou on excute produit et stock
  for (let produit of stock) {
    console.log(produit);
// Création d'une autre boucle 
// Déclaration de la variable k qui est egal a 0; f est egal a now, k est a inferieur a f; alors k++
  for (let k = 0, f = now.length; k < f; k++) {
// Si produit._id est égal a now[k]._id alors
  if (produit._id === now[k]._id) {
// Produit.name = now[k].name, name est deja enristré, ex: produit.name = kanap cynopé
    produit.name = now[k].name; produit.prix = now[k].price; produit.image = now[k].imageUrl;
    produit.description = now[k].description; produit.alt = now[k].altTxt;
  }}}
// Appel de la fonction affiche pour faire le lien avec data
affiche(stock);

  } else {
// Si aucun article est enregistré dans la page panier alors une alerte apparait
    document.querySelector("h1").style.color = "red";
    document.querySelector("h1").innerText =
    "Vous avez 0 article dans votre panier";
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
  let articleClient = document.querySelector("#quantity");
  let color = document.querySelector('#colors');
// Utilisation de forEarch pour regarde se qui si passe
  item.forEach((cart) => {
// Utilisation de change au lieu de click, eq pour selectionne l'element specifique, addEventListener une fonction qui sera appelée chaque fois que l'événement spécifié est livré à la cible.
   cart.addEventListener("change", (eq) => {

   
      const result = document.querySelector('.itemQuantity');
      console.log(result);
 
       let stocki = JSON.parse(localStorage.getItem("stock"));
      console.log(stocki);

// Création d'une boucle article et stocki
      for (let article of stocki)
// Si l'id et la couleur sont egale a dataset alors
      if (
        article._id === cart.dataset.id &&
        cart.dataset.couleur === article.color
      ) {

// On target.value la quantity

  article.quantity= eq.target.value;
// On return stocki dans le localStorage
  localStorage.stock = JSON.stringify(stocki);
// on target.value la dataset quantite
  cart.dataset.quantité = eq.target.value;
// On appel la fonction la total pour que la quantité/prix final soit rectifier
  total();
   }}
  );
})
}

/*********SUPPRIMESSION DES ELEMENTS******** ***/


function deleteItem() {
  let delets = document.querySelectorAll(".deleteItem");
    console.log(delets);
     delets.forEach((delet) => {
      delet.addEventListener("click", () => {
        console.log("click");
        let stock = JSON.parse(localStorage.getItem("stock"));
        console.log(stock);
// Création d'une boucle et de la variable A qui est egal a 0, b egal a stock.lenght qui represent le nombre d'element, A est plus petit que b, on incrémente A
        for (let a = 0, b = stock.length; a < b; a++)
// Si l'ID est bon alors
         if (
          stock[a]._id === delet.dataset._id || stock[a].color === delet.dataset.couleur
        ) {
// Création d'une variable pour la suppression
          const supp = [a];
// Utilisation de splice pour modifier le contenu d'un tableau en retirant des éléments
          stock.splice(supp, 1);
// On retourne stock dans le localStorage
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
console.log(commande);
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

  }
}
const formulairVal = new entre();
console.log(formulairVal);


/*Création alert */



/*Création regExp */

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
  console.log("ok");
  document.querySelector("#firstNameErrorMsg").style.color = "green";
  document.querySelector("#firstNameErrorMsg").innerText = "Valid";
  return true
} {
// Si il n'est pas valide alors affiche un message d'erreur
  console.log("Pas sa");
 
  document.querySelector("#firstNameErrorMsg").style.color = "red";
  document.querySelector("#firstNameErrorMsg").innerText = " Chiffre et symbole ne sont pas autorise \n minimun 1 caractére \n maximum 15 caractére`";
   return false;
}}


//Confirmation NOM  

function nomControl(){
  const nom = formulairVal.nom;
  if(regExpPrenomEtNom(nom)){
    console.log("ok");
    document.querySelector("#lastNameErrorMsg").style.color = "green";
    document.querySelector("#lastNameErrorMsg").innerText = "valid";
    return true
   
  }else {
    console.log("Pas sa");
    document.querySelector("#lastNameErrorMsg").style.color = "red";
    document.querySelector("#lastNameErrorMsg").innerText = "Chiffre et symbole ne sont pas autorise \n minimun 1 caractére \n maximum 15 caractére";
   
    return false;
}}


//Confirmation ADRESSE  

function adresseControl(){
  const adresse= formulairVal.adresse;
  if(regExpAdresse(adresse)){
    console.log("ok");
    document.querySelector("#addressErrorMsg").style.color = "green";
    document.querySelector("#addressErrorMsg").innerText = "valid";
    return true
  }else {
    console.log("Pas sa");
    document.querySelector("#addressErrorMsg").style.color = "red";
    document.querySelector("#addressErrorMsg").innerText = "Chiffre et symbole ne sont pas autorise \n minimun 1 caractére \n maximum 15 caractére";
   
    return false
    }}


//Confirmation VILLE  

function villeControl(){
  const ville = formulairVal.ville;
  if(regExpVille (ville)){
    console.log("ok");
    document.querySelector("#cityErrorMsg").style.color = "green";
    document.querySelector("#cityErrorMsg").innerText = "valid";
    return true
  }else {
    console.log("Pas sa");
    document.querySelector("#cityErrorMsg").style.color = "red";
    document.querySelector("#cityErrorMsg").innerText = "Chiffre et symbole ne sont pas autorise \n minimun 1 caractére \n maximum 15 caractére";
    
    return false
   
    }}

  
//Confirmation EMAIL

function mailControl(){
  const mail = formulairVal.email;
  if(regExpMail(mail)){
    console.log("ok");
    document.querySelector("#emailErrorMsg").style.color = "green";
    document.querySelector("#emailErrorMsg").innerText = "valid";
    return true
  }else {
    console.log("Pas sa");
    document.querySelector("#emailErrorMsg").style.color = "red";
    document.querySelector("#emailErrorMsg").innerText = "Chiffre et symbole ne sont pas autorise \n minimun 1 caractére \n maximum 15 caractére";
  
    return false
    }}

// Si prenom, nom, adresse, ville et mail sont valide alors
if(prenonControl() && nomControl() && adresseControl() && villeControl() && mailControl()){
// On envoie formulaireVal dans le localStorage
localStorage.setItem("formulaireVal", JSON.stringify(formulairVal));
  console.log(formulairVal);
const item = document.querySelectorAll(".cart__item");
  item.forEach((cart) => {
// Création de contact avec prenom + nom + adresse etc
    const contact = {
      firstName : formulairVal.prenom,
      lastName: formulairVal.nom,
      address: formulairVal.adresse,
      city: formulairVal.ville,
      email: formulairVal.email }
console.log(contact);
// Product est egal a ce qui y a enregistre dans stock
let products = JSON.parse(localStorage.getItem("stock"));
// Product est égal a l'Id du kanap
  products = [cart.dataset.id];
 console.log(products);
    const envoie = {
        contact,
        products,
                 }
console.log(envoie);
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
            console.log(orderId)
            document.location.href = "confirmation.html" + "?orderId=" + orderId
            return console.log(data);
            
})})
   }else{
 return alert("Veuillez remplir ou verifier le formulaire")
}
    
  
    
    /*AFFICHAGE PAGE CONFIRMATION + POST*/

    formul();
})
/*Envoie local-Storage */
}

/*localStorage.setItem("firstName", document.querySelector("#firstName").value);
localStorage.setItem("lastName", document.querySelector("#lastName").value);
localStorage.setItem("address", document.querySelector("#address").value);
localStorage.setItem("city", document.querySelector("#city").value);
localStorage.setItem("email", document.querySelector("#email").value);

const formulaire = {
  prenom: localStorage.getItem("firstName"),
  nom: localStorage.getItem("lastName"),
  adresse: localStorage.getItem("address"),
  ville: localStorage.getItem("city"),
email: localStorage.getItem("email")*/
