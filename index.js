console.log('Hello show room!')

const showRoom = document.querySelector('.container');
let items = document.querySelector('items');
const template = document.querySelector('item-template');


async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        data.forEach(product => {});
        return data;
    } catch (error) {
        console.log('Error loading products:',error);
    
    }
}

items.style.backgroundColor = 'red'