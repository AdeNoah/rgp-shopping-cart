console.log('Hello show room!')

const url = 'resources/products.json';
const showRoom = document.querySelector('.container');
const items = document.querySelector('.products');
const template = document.querySelector('.product-template');

const cart = document.querySelector('.cart');



async function loadProducts() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log('Data loaded:', data);
        console.log('Template:', template);  
        console.log('Items container:', items);

        data.forEach(product => {
            const clone = template.content.cloneNode(true);

            clone.querySelector('.name').textContent = `${product.name}`;
            clone.querySelector('.price').textContent = `$${product.price}`;
            clone.querySelector('img').src = product.image;
            clone.querySelector('img').alt = product.name;
            clone.querySelector('.add-to-cart').dataset.id = product.id;

            items.appendChild(clone);
        });


        // const AddButton = document.querySelectorAll('.add-to-cart');
        // AddButton.forEach(button => {
        //     button.addEventListener('click', () => {
        //         console.log(`${button.textContent}`)
        //     })
        // })


        return data;
    } catch (error) {
        console.log('Error:',error);
    }
}
loadProducts();


document.querySelector('.items').addEventListener('click', (e) => {
    if (e.target.matches('.add-to-cart')) {
        console.log(e.target.dataset.id);  // Works even for future buttons!
    }
});

