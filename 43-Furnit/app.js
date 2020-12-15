// Elements
const $ = x => document.querySelector(x);

const items = $('.items');
const totalQuantity = $('.total-quantity');
const totalPrice = $('.total-price');
const cartBtn = $('.cart-btn');
const cartClose = $('.cart-close');
const cartClear = $('.cart-clear');
const cartContent = $('.cart-content');


// cart Array
let cartArr = [];

// arr for selected btns
let selectedBtns = [];



class UI {

    displayItems(container, arr = []) {
        container.innerHTML = arr.map(el => {
            return `<div class="card">
            <img class="card-img-top" src="${el.img}" alt="${el.name}">
            <div class="card-body">
            <h4 class="card-title">${el.name}</h4>
            <p class="card-text">$ ${el.price}</p>
            <button class="btn btn-warning btn-lg toCart" data-id="${el.id}">Add to Cart</button>
            </div>
            </div>`;
        }).join('');
    }

    displayInCart() {
        const btns = [...document.querySelectorAll('.toCart')];

        selectedBtns = btns;

        btns.forEach(btn => {
            let id = btn.dataset.id;

            // find the cartArr if that has that id
            let inCart = cartArr.find(el => el.id === Number(id));

            // IF the id matches, disable button
            if (inCart) {
                btn.textContent = 'In the cart';
                btn.disabled = true;
            }

            // event to the btn
            btn.addEventListener('click', e => {
                e.target.textContent = 'In the cart';
                e.target.disabled = true;

                // new obj by joining products
                let cartObj = {
                    ...this.getProductId(id),
                    quantity: 1
                };

                // push the obj in cart
                cartArr = [...cartArr, cartObj];

                // save the cartArr in storage
                Storage.saveCart(cartArr);
                // set the values of total price & quantity
                this.setCartValues(cartArr);
                // show cart
                this.showCart();
                // set up app
                this.setup();
            });
        });
    }

    getProductId(id) {
        return products.find(el => el.id === Number(id));
    }
    showCart () {
        document.body.classList.add('show-cart');
    }
    hideCart () {
        document.body.classList.remove('show-cart');
    }

    setCartValues(arr) {
        let tempPrice = 0;
        let tempQuantity = 0;
        // return the current values from the arr
        arr.map(el => {
            tempPrice += el.price * el.quantity;
            tempQuantity += el.quantity;
        });
        // change the text
        totalPrice.textContent = parseFloat(tempPrice.toFixed(2));
        totalQuantity.textContent = tempQuantity;
    }

    populateCart(box,
        arr) {
        //arr.forEach(el => this.showItem(el) );
        box.innerHTML = arr.map(obj => {
            return `<div class="cart-item mt-2 mb-2">
            <div class="cart-desc">
            <img src="${obj.img}" alt="${obj.name}" class="mr-3 cart-desc-img">
            <div>
            <h3 class="cart-item-name">${obj.name}</h3>
            <p class="cart-item-price">$ ${obj.price}</p>
            <button class="btn btn-danger cart-item-remove" data-id="${obj.id}">Remove</button>
            </div>
            </div>
            <div class="tools">
            <button class="btn btn-success cart-item-minus" data-id="${obj.id}"> - </button>
            <button class="btn btn-outline-dark cart-item-quantity">
            ${obj.quantity}
            </button>
            <button class="btn btn-success cart-item-plus" data-id="${obj.id}"> + </button>
            </div>
            </div>`;
        })
        .join('');
    }

    setup() {
        // get cart items from Storage & keep them in cartArr
        cartArr = Storage.getCart();
        // set values to cart
        this.setCartValues(cartArr);
        // populate cart in DOM
        this.populateCart(cartContent,
            cartArr); // repeating the cart items

        // show cart on click
        cartBtn.addEventListener('click',
            this.showCart);
        // hide cart on click
        cartClose.addEventListener('click',
            this.hideCart);
    }

    ////////////        Now clear, increase, decrease etc
    cartFunctions() {
        //1. clear all
        cartClear.addEventListener('click',
            ()=> {
                this.clearCart();
            });
        cartContent.addEventListener('click',
            e => {
                let [el,
                    id] = [e.target,
                    e.target.dataset.id];
                // get the arr that has similar id
                let tempObj = cartArr.find(el=>el.id === Number(id));

                //2. remove one
                if (e.target.classList.contains('cart-item-remove')) {
                    // remove the cart-item div / DOM
                    cartContent.removeChild(el.parentElement.parentElement.parentElement);
                    // remove from cartArr
                    this.removeItem(id);
                }
                //3.  +1
                else if (e.target.classList.contains('cart-item-plus')) {
                    // update in the arr
                    tempObj.quantity += 1;
                    // save in storage
                    Storage.saveCart(cartArr);
                    // set the values
                    this.setCartValues(cartArr);
                    // show in DOM
                    el.previousElementSibling.textContent = tempObj.quantity;
                }
                //4.  -1
                else if (e.target.classList.contains('cart-item-minus')) {
                    // get the arr that has similar id
                    //let tempObj = cartArr.find(el=>el.id === Number(id) ) ;
                    // update in the arr
                    tempObj.quantity -= 1;
                    // if the arr has > 0 el, update, save, show
                    // else remove & delete
                    if (tempObj.quantity > 0) {
                        Storage.saveCart(cartArr);
                        this.setCartValues(cartArr);
                        el.nextElementSibling.textContent = tempObj.quantity;
                    } else {
                        cartContent.removeChild(el.parentElement.parentElement);
                        this.removeItem(id);
                    }
                }
            });
    }

    clearCart() {
        // get the cartArr's ids
        let cartItems = cartArr.map(el => el.id);
        // for each id, remove the child
        cartItems.forEach(id => this.removeItem(id));
        // while the box has any child, remove the child
        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }
        // hide the cart
        this.hideCart();
    }

    removeItem(id) {
        // filter the cartArr that doesn't have the id
        cartArr = cartArr.filter(el => el.id !== Number(id));
        // update the values
        this.setCartValues(cartArr);
        // save on storage
        Storage.saveCart(cartArr);
        // get the each btn with id same to the data-id
        let btn = this.getBtnId(id);
        // change btn text & enable
        btn.disabled = false;
        btn.textContent = '+ to cart';
    }

    getBtnId(id) {
        return selectedBtns.find(el => el.dataset.id === String(id));
    }

}// end of UI



// Local storage
class Storage {
    // save the cart
    static saveCart(cartArr) {
        localStorage.setItem('cartArr', JSON.stringify(cartArr));
    }

    // get cart for cart content
    static getCart() {
        return localStorage.getItem('cartArr')
        ? JSON.parse(localStorage.getItem('cartArr')): [];
    }

    static remCart() {
        localStorage.removeItem('cartArr');
    }
}




// Main Event
document.addEventListener('DOMContentLoaded', ()=> {
    // get UI
    const ui = new UI();
    // setup the app before anything
    ui.setup();
    // show items
    ui.displayItems(items, products);
    // take items to the cart
    ui.displayInCart();
    // add card functionality
    ui.cartFunctions();
});