// Récuperation de l'orderId dans l'url

localStorage.clear();
const orderId = getId()
display(orderId);
function getId() {
    const string = window.location.search
    const urlParams = new URLSearchParams(string)
    const orderId = urlParams.get("orderId")
    return orderId
}

function display(orderId) {
    const element = document.getElementById("orderId");
    element.textContent = orderId
}



