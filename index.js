const url = 'resources/products.json';
const showRoom = document.querySelector('.container');
const items = document.querySelector('.items');
const template = document.querySelector('.item-template');

const cartButton = document.querySelector('.cart-button');
let allProducts = [];

async function loadProducts() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        allProducts = data;
        
        console.log('All Products:', allProducts);
        console.log('Template:', template);  
        console.log('Items container:', items);

        data.forEach(product => {
            const clone = template.content.cloneNode(true);

            clone.querySelector('.item-name').textContent = `${product.name}`;
            clone.querySelector('.item-price').textContent = `$${product.price}`;
            clone.querySelector('img').src = `${product.image}`;
            clone.querySelector('img').alt = `${product.name}`;
            clone.querySelector('.add-to-cart ').dataset.id = product.id;
            
            items.appendChild(clone);
        });

        // selecting the buttons from within the async function
        // const AddButton = document.querySelectorAll('.add-to-cart');
        // AddButton.forEach(button => {
        //     button.addEventListener('click', () => {
        //         console.log(`${button.textContent}`)
        //     })
        // })

        return allProducts;
    } catch (error) {
        console.log('Error:', error);
    }
}
loadProducts();
console.log(allProducts)


// selecting the buttons using event delegation from outside the async function 
items.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = e.target.dataset.id
        const product = allProducts.find(product => product.id == productId);
        console.log(product)

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product)

        localStorage.setItem('cart', JSON.stringify(cart))
        console.log('cart:', cart)
    }
});

