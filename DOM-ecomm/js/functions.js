//--------Eventos

const buyButton = document.querySelector('.buy_cart');
const elemButton = buyButton;
buyButton.addEventListener('click', () => {
    elemButton.classList.toggle("toggle");
});

const iconRemove = document.querySelectorAll('.delete-icon');

iconRemove.forEach(elem => {
    elem.addEventListener("click", () => {
        const divToRemove = elem.parentElement.parentElement;
        divToRemove.remove();
    })
})

const header = document.querySelector("header");
const cartIcon = header.lastElementChild;
const cart = document.querySelector(".cart");

cartIcon.addEventListener("click", () => {
    cart.classList.toggle("show");
})

const cartClose = document.querySelector(".cart__close-button");

if (cartClose) {
    cartClose.addEventListener("click", () => {
        cart.classList.remove("show");
        console.log("Cart close button clicked");
    });
}
//------Menu Toogle

document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector(".menu");
    const menuClose = document.querySelector(".menu__close-button"); // Cambiado aquí

    if (menuIcon && menu) {
        menuIcon.addEventListener("click", () => {
            menu.classList.add("show");
            console.log("Icono del menú clickeado");
        });
    }

    if (menuClose && menu) {
        menuClose.addEventListener("click", () => {
            menu.classList.remove("show");
            console.log("Botón de cierre clickeado");
        });
    }
});

//-------Add to cart

const cartItems = []; 
const cartBadge = document.querySelector(".cart-badge"); 

const addToCartButtons = document.querySelectorAll(".add_cart");

addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const productItem = event.target.parentElement;

        if (productItem.classList.contains("unavailable")) {
            alert("Este producto no está disponible.");
            return; 
        }

        const productName = productItem.querySelector(".products__title").textContent;
        const productPrice = productItem.querySelector(".products__price").textContent;
        const productImage = productItem.querySelector(".products__img").src;

        const product = {
            name: productName,
            price: productPrice,
            image: productImage,
        };

        cartItems.push(product);
        updateCart();
        updateCartBadge(); 
        cart.classList.add("show");
    });
});

function updateCart() {
    const cartItemsContainer = document.querySelector(".cart");
    

    cartItemsContainer.innerHTML = `
        <i class="cart__close-button"><img src="img/x-square.svg" alt="Close Cart"></i> <!-- Ensure close button stays -->
        <h2 class="cart__main">CARRITO</h2>
    `;

    cartItems.forEach((item) => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
            <p>${item.price}</p>
            <i class="delete-icon"><img src="img/trash.svg" alt="Icono Quitar"></i>
        `;
        cartItemsContainer.appendChild(cartItemDiv);

        const deleteIcon = cartItemDiv.querySelector(".delete-icon");
        deleteIcon.addEventListener("click", () => {
            const index = cartItems.indexOf(item);
            if (index > -1) {
                cartItems.splice(index, 1);
                updateCart();
                updateCartBadge(); 
            }
        });
    });

    const buyButton = document.createElement("button");
    buyButton.classList.add("buy_cart");
    buyButton.textContent = "BUY";
    cartItemsContainer.appendChild(buyButton);

    buyButton.addEventListener("click", () => {
        alert("¡Compra realizada!");
        cartItems.length = 0; 
        updateCart();
        updateCartBadge();
    });


    const cartClose = document.querySelector(".cart__close-button");
    cartClose.addEventListener("click", () => {
        const cart = document.querySelector(".cart");
        cart.classList.remove("show");
    });
}

function updateCartBadge() {
    cartBadge.textContent = cartItems.length;
}


function updateCartBadge() {
    cartBadge.textContent = cartItems.length;
}


updateCartBadge();
