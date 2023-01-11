

/* Afichage des kanap + Data et Error */

function getProduct(){
// Utilisation de fetch permet d'aller chercher l'API
  fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
// Utilisation de then comme promesse
  .then(function (data) {
    let products = data;
    console.log(products);
// Création d'une boucle 
    for(let product in products){
// Déclaration de la variable lienProduct += On crée l'element a
      let lienProduct = document.createElement("a");
// Utilisation de appendchild pour ajouter un élement enfants à l'element parent
      document.querySelector(".items").appendChild(lienProduct);
// Utilisation de href pour trouver le chemin et l'id
      lienProduct.href = "./product.html?id=" + data[product]._id;
// Idem
      let articleProduct = document.createElement("article");
      lienProduct.appendChild(articleProduct);
// Idem
      let imageProduct = document.createElement("img");
      articleProduct.appendChild(imageProduct);
// Utilisation de src pour l'image = data[on repure la variable declaré dans la boucle].imageUrl(qui est enregistré sous ce nom dans data)
      imageProduct.src = data[product].imageUrl;
// Idem avec alt 
      imageProduct.alt = data[product].altTxt;
// Idem
      let productName = document.createElement("h3");
      imageProduct.appendChild(productName);
// Utilisation de innerText pour affiche le nom
      productName.innerText = data[product].name;
// Idem
      let productDescription = document.createElement("p");
      articleProduct.appendChild(productDescription);
      productDescription.innerText = data[product].description;
}

})
// Utilisation de catch pour afficher une erreur si l'API n'est pas envoyé
.catch(function(error){
  let erreur = document.getElementById('items');
  erreur.innerText = "aucun produit disponible";
});

}
// Appel de la fonction
getProduct();

