let carticon =document.querySelector("#icon");
let cart =document.querySelector(".cart");
let closecart =document.querySelector("#close-cart");


carticon.onclick=()=>{
cart.classList.add("active");
};

closecart.onclick=()=>{
cart.classList.remove("active");
};


if(document.readyState=='loading'){
document.addEventListener("DOMContentLoaded",ready)
}else{
  ready()
}

function ready(){
  var removeCartBtb=document.getElementsByClassName("cart-remove")
  console.log(removeCartBtb)
  for(var i=0; i<removeCartBtb.length;i++){
    var button=removeCartBtb[i];
    button.addEventListener("click", RemovarCartItem)
  }
  var quaniantityInputs=document.getElementsByClassName('cart-quantity')
  for(var i =0; i< quaniantityInputs.length; i++){
    var input=quaniantityInputs[i];
    input.addEventListener("change",quaniantityChanged)
  }
  //Add to cart//
  var addcart=document.getElementsByClassName("add-cart")
  for(var i=0; i<addcart.length;i++){
   var button=addcart[i]
   button.addEventListener("click",addcartClicked)
  }
}

function RemovarCartItem(event){
var buttonClicked=event.target;
buttonClicked.parentElement.remove();
Updatetotal();
}

function quaniantityChanged(event){
  var input=event.target
  if(isNaN(input.value)|| input.value <=0){
   input.value=1
  }
  Updatetotal();
}

//add to cart //



function addcartClicked(event) {
  var button = event.target;
  var productContainer = button.closest(".container"); // Obtener el contenedor del producto
  var title = productContainer.querySelector(".product-title, .product-text").innerText;
  var price = productContainer.querySelector(".prices").innerText;
  var productImg = productContainer.querySelector(".product-img").src;
  addProductoTocart(title,price,productImg);
  Updatetotal();
}


function addProductoTocart(title,price,productImg){
var cartShopBox = document.createElement("div")
cartShopBox.classList.add("cart-box");
var cartItems=document.getElementsByClassName("cart-content")[0];
var cartItemsNames=cartItems.getElementsByClassName("cart-product-title")
for(var i =0; i< cartItemsNames.length; i++){
if(cartItemsNames[i].innerText == title){

alert("You have already add this item to cart")
return;

}
}

var CarBoxContext=`
                <img src="${productImg}" alt="" srcset="" class="cart-img">
                 <div class="detail-box">
                   <div class="cart-product-title">${title}</div>
                   <div class="cart-price">${price}</div>
                   <input type="number" value="1" class="cart-quantity">
                 </div>
                 <i class='bx bxs-trash-alt  cart-remove'></i>`;

cartShopBox.innerHTML=CarBoxContext
cartItems.append(cartShopBox);
cartShopBox
.getElementsByClassName('cart-remove')[0]
.addEventListener('click',RemovarCartItem);

cartShopBox
.getElementsByClassName('cart-quantity')[0]
.addEventListener('change',quaniantityChanged);
}

function Updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0; // Declara la variable total fuera del bucle for
  for (var i = 0; i < cartBoxes.length; i++) {
      var cartbox = cartBoxes[i];
      var priceElement = cartbox.getElementsByClassName("cart-price")[0];
      var quantityElement = cartbox.getElementsByClassName("cart-quantity")[0]; // Corrige el nombre de la variable
      var price = parseFloat(priceElement.innerText.replace("$", ""));
      var quantity = parseInt(quantityElement.value); // Convierte la cantidad a un número entero
      total = total + (price * quantity);
      total = Math.round(total * 100) / 100;
  }
  document.getElementsByClassName("total-price")[0].innerHTML = "$" + total.toFixed(2); // Ajusta el formato del total
}



document.querySelector('.btn-buy').addEventListener('click', function() {
  window.location.href = 'Card.html'; // Cambia 'index.html' por la ruta de tu página principal
});
