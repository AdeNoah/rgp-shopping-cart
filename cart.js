const cartContainer = document.querySelector('.cart-container');
const cartItems = document.querySelector('.cart-items');
const template = document.querySelector('.cart-item-template');


// defining the toggle checkout item function 
function toggleCheckoutItem(item) {
    let checkout = JSON.parse(localStorage.getItem('checkout')) || [];
    const checkoutItem = checkout.find(cItem => cItem.id == item.id);

    if(checkoutItem) {
        checkout = checkout.filter(cItem => cItem.id != item.id)
    } else {
        checkout.push({...item})
    }
    localStorage.setItem('checkout', JSON.stringify(checkout));
}

// a function to restore selections 
function restoreSelections() {
    const checkout = JSON.parse(localStorage.getItem('checkout')) || [];
    document.querySelectorAll('.unselected').forEach(btn => {
        const itemId = btn.closest('.cart-item').dataset.id;
        if(checkout.find(item => item.id == itemId)) {
            btn.classList.add('selected');
        }
    })
}

// function to render the checkout items on the checkout 
function renderCheckout() {
    const checkoutItems = document.querySelector('.checkout-items')
    const totalPrice = document.querySelector('.total-price')
    // const checkoutBtn = document.querySelector('.checkout-btn')
    const checkout = JSON.parse(localStorage.getItem('checkout')) || [];

    checkoutItems.innerHTML = '';

    checkout.forEach(item => {
        const clone = document.querySelector('.checkout-template').content.cloneNode(true)
        clone.querySelector('.checkout-item-image img').src = item.image;
        clone.querySelector('.checkout-item-image img').alt = item.name;
        clone.querySelector('.checkout-item-name').textContent = item.name;
        clone.querySelector('.checkout-item-price').textContent = `$${item.price}`;
        clone.querySelector('.quantity').textContent = item.quantity;
        
        checkoutItems.appendChild(clone)
    })

    const total = checkout.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0)
    totalPrice.textContent = `$${total.toFixed(2)}`
    
    const footer = document.querySelector('footer');
    footer.style.display = checkout.length > 0 ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', async () =>{
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    console.log('cart loaded', cart)

    if(cart.length === 0) {
        showEmptyCart()
    }
    renderCartItems(cart)

    // event listner for the action buttons on each item
    cartItems.addEventListener('click', e => {
        const cartItem = e.target.closest('.cart-item')

        if (!cartItem) return;

        const cartItemId = cartItem.dataset.id;

        if (e.target.classList.contains('unselected')) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartDataItem = cart.find(item => item.id == cartItemId)
            
            if(!cartDataItem) return;
            
            e.target.classList.toggle('selected');
            toggleCheckoutItem(cartDataItem);
        } 

        if (e.target.classList.contains('subtract')) {
            updateQuantity(cartItemId, -1);
        } else if (e.target.classList.contains('add')) {
            updateQuantity(cartItemId, 1);
        } else if (e.target.classList.contains('remove')) {
            removeItem(cartItemId)
        }
        renderCheckout();
    })
    restoreSelections();
    renderCheckout();

})

// defining the empty cart message function 
function showEmptyCart() {
    const emptyCartMsg = document.createElement('div')
    emptyCartMsg.classList.add('empty-cart-msg')
    emptyCartMsg.textContent = 'Your cart is empty'
    cartItems.appendChild(emptyCartMsg)

    Object.assign(cartItems.style, {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    })

    Object.assign(emptyCartMsg.style, {
        fontSize: '30px',
        marginTop: 'calc(50% - 15px)',
        color: '#a03232'
    });
    return
}



// defining the render cart items function 
function renderCartItems(cart) {
    cart.forEach(cartItem => {
        const clone = template.content.cloneNode(true)
        
        clone.querySelector('.name').textContent = cartItem.name;
        clone.querySelector('.price').textContent = `$${cartItem.price}`;
        clone.querySelector('img').src = cartItem.image;
        clone.querySelector('img').alt = cartItem.name;
        clone.querySelector('.quantity').textContent = cartItem.quantity;
        clone.querySelector('.cart-item').dataset.id = cartItem.id;

        cartItems.appendChild(clone)
    })
}


// defining the update quantity function used in the action buttons above 
function updateQuantity(id, change) {
    const cart =JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id == id);
    
    if(cartItem) {
        cartItem.quantity += change;
        if(cartItem.quantity <= 0) {
            removeItem(id)
            return;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        reRenderCart();
    }
}

// the remove function definition 
function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id != id);
    localStorage.setItem('cart', JSON.stringify(cart))

    reRenderCart();
} 

// rerender function to automatically reload on removal so as to avoid manual reloads 
function reRenderCart() {
    cartItems.innerHTML = '';
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
       showEmptyCart()
       return;
    }
    renderCartItems(cart)
}
