const cartContainer = document.querySelector('.cart-container')
cartItems = document.querySelector('.cart-items')
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
    
})

