

let products = JSON.parse(localStorage.getItem('shoppingList')) || [
    {
        id: 1,
        name: 'Помідори',
        count: 2,
        isBought: false
    },
    {
        id: 2,
        name: 'Печиво',
        count: 2,
        isBought: false
    },
    {   
        id: 3,
        name: 'Сир',
        count: 1,
        isBought: true
    }
]

let nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

const container = document.querySelector('.shopping-list');
const remainContainer = document.getElementById('remaining');
const boughtContainer = document.getElementById('bought');

renderProducts();
addNewProduct();

container.addEventListener('click', (event) => {
    const productItem = event.target.closest('[data-id]');

    if (!productItem) {
        return; 
    }

    const productId = productItem.dataset.id;
    const foundProduct = products.find(product => product.id === parseInt(productId));

    const redButton = event.target.closest('.button-red');
    if (redButton) {
            foundProduct.count += 1;
    }

    const greenButton = event.target.closest('.button-green');
    if (greenButton) {
            if (foundProduct.count > 0) {
                foundProduct.count -= 1;
            }
    }

    const deleteButton = event.target.closest('.button-delete');
    if (deleteButton) { 
        products = products.filter(product => product.id !== parseInt(productId));
    }

    const changeNameButton = event.target.closest('.product__name');
    if (changeNameButton) {
        changeNameOfProduct(productId);
        return;
    }

    const buyButton = event.target.closest('.button-buy');
    if (buyButton) { 
        foundProduct.isBought = true;
    }

    renderProducts();
});

function changeNameOfProduct(productId) { 

    const foundProduct = products.find(product => product.id === parseInt(productId));
    const inputElement = document.createElement('input');
    const productCard = container.querySelector(`[data-id="${productId}"]`);
    const currentParagraph = productCard.querySelector('.product__name');

    inputElement.type = 'text';
    inputElement.value = foundProduct.name;
    currentParagraph.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener('blur', (event) => { 
        if (inputElement.value.trim() !== '') {
            foundProduct.name = inputElement.value;
        }
        inputElement.replaceWith(currentParagraph);
        renderProducts();
    });
    
    inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (inputElement.value.trim() !== '') {
                foundProduct.name = inputElement.value;
            }
            inputElement.replaceWith(currentParagraph);
            renderProducts();
        }
    });
    
}

function addNewProduct() { 
    const addNewProductInput = document.getElementById('addNewProduct');
    const addButton = document.getElementById('addButton');
    const addItem = (event) => {
        
        if (event) {
            event.preventDefault();
        }

        if (addNewProductInput.value.trim() !== '') {
            products.push({
                id: nextId,
                name: addNewProductInput.value.trim(),
                count: 1,
                isBought: false
            });
            addNewProductInput.value = '';
            nextId++;
            renderProducts();
           }}
    addNewProductInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addItem(event);
        }
    });
    addButton.addEventListener('click', () => {
        addItem(event);
    });
        renderProducts();
}

function renderProducts() { 
    localStorage.setItem('shoppingList', JSON.stringify(products));
    const containerProductsDel = document.querySelectorAll('.list-item');
    remainContainer.innerHTML = '';
    boughtContainer.innerHTML = '';
    containerProductsDel.forEach(product => { 
        product.remove();
    });
    products.forEach(product => { 
        if (!product.isBought) {
            const productBlock = `
            <div class="list-item" data-id="${product.id}">
          <p class="product__name">${product.name}</p>
          <div class="inner__button">
            <button data-tooltip="Додати один товар" class="button-red">+</button>
            <div class=""><p class="count-product">${product.count}</p></div>
            <button data-tooltip="Видалити один товар" class="button-green">-</button>
          </div>
          <div class="inner__button">
              <button data-tooltip="Купити товар" class="item__button button-buy">Купити</button>
            <button data-tooltip="Видалити товар" class="item__button button-delete">Видалити
            </button>
          </div>
        
        </div>`
            const sideBarItem = `<div>${product.name} <span>${product.count}</span></div>
            `;
            remainContainer.insertAdjacentHTML('beforeend', sideBarItem);
            container.insertAdjacentHTML('beforeend', productBlock); 
        } else {
            const productBlock = `<div class="list-item" data-id="${product.id}">
          <p class="product__name">${product.name}</p>
          <div><p class="count-product">${product.count}</p></div>
          <button data-tooltip="Товар вже куплено!" class="item__button">Куплено!</button>
        </div>`
            const sideBarItem = `<div>${product.name} <span>${product.count}</span></div>
            `;
            boughtContainer.insertAdjacentHTML('beforeend', sideBarItem);
            container.insertAdjacentHTML('beforeend', productBlock); 
        }
    });
}