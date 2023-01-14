
/* Afichage des kanap + Data et Error */

function getProduct() {
      // Utilisation de fetch permet de faire une requete http vers l'api
      fetch("http://localhost:3000/api/products")
          .then(function (res) {
              if (res.ok) {
                  return res.json();
              }
          })
          // Utilisation de then pour gére la promesse
          .then(function (data) {
              let products = data;
              // Création d'une boucle for in pour parcourir tour les élement de l'objet Products
              for (let product in products) {
                  // Déclaration de la variable lienProduct += On crée l'element a
                  let lienProduct = document.createElement("a");
                  // Utilisation de appendchild pour ajouter un élement enfants à l'element parent
                  document.querySelector(".items").appendChild(lienProduct);
                  // Utilisation de href pour trouver le chemin et l'id
                  lienProduct.href = "./product.html?id=" + data[product]._id;
                  // Idem 
                  // articleProducts enfant de lienproduct
                  let articleProduct = document.createElement("article");
                  lienProduct.appendChild(articleProduct);
                  // Idem
                  let imageProduct = document.createElement("img");
                  articleProduct.appendChild(imageProduct);
                  // Utilisation de src pour l'image = data[on repure la variable declaré dans la boucle].imageUrl(qui est enregistré sous ce nom dans data)
                  // src contient l'url de l'image   
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
          // Catch est utilisé pour gere les erreurs de requete
          // Utilisation de catch pour afficher une erreur si l'API n'est pas envoyé
          .catch(function (error) {
              let erreur = document.getElementById('items');
              erreur.innerText = "aucun produit disponible";
          });
  
  }
  // Appel de la fonction
  getProduct();
  

