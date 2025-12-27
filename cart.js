const cartContainer = document.querySelector('.cart-container')
const cartItems = document.querySelector('.cart-items')
const template = document.querySelector('.cart-item-template')

document.addEventListener('DOMContentLoaded', async () =>{
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    console.log('cart loaded', cart)

    // const allProducts = await fetchProducts()

    if(cart.length === 0) {
        const emptyCartMsg = document.createElement('div')
        emptyCartMsg.classList.add('empty-cart-msg')
        emptyCartMsg.textContent = 'Your cart is empty'
        emptyCartMsg.style.fontSize = '26px'
        emptyCartMsg.style.marginTop = 'calc(50% - 13px)'
        emptyCartMsg.style.color = '#a03232'
        cartItems.appendChild(emptyCartMsg) 
        cartItems.style.display = 'flex'
        cartItems.style.flexDirection = 'row'
        cartItems.style.justifyContent = 'center'
        return
    }
    renderCartItems(cart)
})

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

cartItems.addEventListener('click', e => {
    const cartItem = e.target.closest('.cart-item')
    if(!cartItem) return;

    const cartItemId = cartItem.dataset.id;

    if(e.target.classList.contains('unselected')) {
        e.target.classList.toggle('selected')
    }
    
    if(e.target.classList.contains('subtract')) {
        updateQuantity(cartItemId, -1);
    }  else if(e.target.classList.contains('add')) {
        updateQuantity(cartItemId, 1);
    } else if(e.target.classList.contains('remove')) {
        removeItem(cartItemId)
    }
})

function updateQuantity(id, change) {
    const cart =JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id == id);
    
    if(cartItem) {
        cartItem.quantity += change;
        if(cartItem.quantity <= 0) {
            removeItem(cartItemId)
            return;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        reRenderCart();
    }
}

function removeItem(cartItemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(cartItem => cartItem.id != id);
    localStorage.setItem('cart', JSON.stringify(cart))

    reRenderCart();
} 

function reRenderCart() {
    cartItems.innerHTML = '';
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        return;
    }
    renderCartItems(cart)
}
