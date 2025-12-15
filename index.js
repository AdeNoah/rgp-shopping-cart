console.log('Hello show room!')

const showRoom = document.querySelector('.container');
const items = document.querySelector('.items');
const template = document.querySelector('.item-template');


async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();

        console.log('Data loaded:', data);
        console.log('Template:', template);  
        console.log('Items container:', items);

        data.forEach(product => {
            const clone = template.content.cloneNode(true);

            clone.querySelector('.name').textContent = product.name;
            clone.querySelector('.price').textContent = product.price;
            clone.querySelector('img').src = product.image;
            clone.querySelector('img').alt = product.name;
            clone.querySelector('.add-to-cart').dataset.id = product.id;

            items.appendChild(clone);
        });
        return data;
    } catch (error) {
        console.log('Error:',error);
    }
}
loadProducts();

