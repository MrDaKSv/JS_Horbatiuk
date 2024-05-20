class Product {
    constructor(id, name, price, photoSrc) {
        this.name = name;
        this.price = price;
        this.photoSrc = photoSrc;
        this.id = id;
    }
    render() {
        const container = document.getElementById("productElementsDiv");
        const element = document.createElement("div");
        element.classList.add("productElement" + this.id);
        element.innerHTML = `
        <div class="productPhoto">
            <div class="productPhotoSubDiv">
                <img class="photo" src="${this.photoSrc}" alt="${this.name}">
            </div>
        </div>
        <div class="productName${this.id}">${this.name}</div>
        <div class="productPrice${this.id}">Price: $${this.price}</div>
        <div class="productHandle">
            <button class="button${this.id}">Delete Product</button>
        </div>
    `;
        container.appendChild(element);
        Product.addToProductArray(this);

        const deleteButton = element.querySelector(`.button${this.id}`);
        deleteButton.addEventListener('click', () => {
            deleteProduct(this.id);
        });

        const productNameTextElement = element.querySelector(`.productName${this.id}`);
        productNameTextElement.addEventListener('click', () => {
            productNameTextElement_Click(this.id, `productName${this.id}`);
        });

        const productPriceTextElement = element.querySelector(`.productPrice${this.id}`);
        productPriceTextElement.addEventListener('click', () => {
            productPriceTextElement_Click(this.id, `productPrice${this.id}`);
        });
    }

    static addToProductArray(product) {
        if (!Product.productArray) {
            Product.productArray = [];
        }
        Product.productArray.push(product);
    }
}

// MAIN
let productMainId = 0;
let elementClassName = "none";
let editMode = "none";
let elementToEditId = 0;

let downloadedProducts = null;

// MANIPULATION WITH PRODUCTS

document.querySelector('.createProductButton').addEventListener('click', () => {
    productMainId++;
    const product = new Product(productMainId,"New Product", "0", "images/shopping-cart.png");
    product.render();

    calculatePriceSum();
});

function deleteProduct(elementId) {
    const productIndex = Product.productArray.findIndex(product => product.id === elementId);
    if (productIndex !== -1) {
        // Видаляємо продукт з DOM
        const productElement = document.querySelector(`.productElement${elementId}`);
        if (productElement) {
            productElement.classList.add('fade-out');
            setTimeout(() => {
                productElement.remove();
            }, 500);
        } else {
            console.log(`Product with ID ${elementId} not found in DOM.`);
        }
        // Видаляємо продукт з масиву
        Product.productArray.splice(productIndex, 1);
        console.log(`Product with ID ${elementId} has been deleted.`);
    } else {
        console.log(`Product with ID ${elementId} not found in productArray.`);
    }

    console.log(elementId);
    calculatePriceSum();
}

document.querySelector('.popupSaveChangesButton').addEventListener('click', () => {
    // UPDATE DOM
    let editValue;
    let elementToUpdate = document.querySelector(`.${elementClassName}`);
    let inputElement = document.querySelector('.popupInputField');
    editValue = inputElement.value;
    elementToUpdate.innerText = "Price: $" + editValue;
    hidePopup();

    // UPDATE ARRAY
    let foundProductIndex = Product.productArray.findIndex(product => product.id === elementToEditId);

    if (foundProductIndex !== -1) {
        if (editMode === "name"){
            Product.productArray[foundProductIndex].name = editValue;
        } else if (editMode === "price"){
            Product.productArray[foundProductIndex].price = editValue;
        }
    } else {
        console.log(`Product with ID ${elementToEditId} not found in the product array.`);
    }

    calculatePriceSum();
});

let searchInputText = document.querySelector('.searchInputField');

document.querySelector('.searchInputField').addEventListener('input', () => {
    searchInputText = document.querySelector('.searchInputField').value.trim();

    if (searchInputText === '') {
        console.log('Введіть запит для пошуку продуктів.');
        showAllProducts();
        return;
    }

    if (Product.productArray !== undefined) {
        for (let i = 0; i < Product.productArray.length; i++) {
            const currentProduct = Product.productArray[i];
            if (currentProduct.name.includes(searchInputText)) {
                console.log('Знайдено продукт:', currentProduct.name);
                showNecessaryProduct(Product.productArray[i].id);
            } else {
                hideUnnecessaryProduct(Product.productArray[i].id);
            }
        }
    }
});

function hideUnnecessaryProduct(elementId){
    const productElement = document.querySelector(`.productElement${elementId}`);
    if (productElement) {
        productElement.style.visibility = "hidden";
    } else {
        console.log(`Product with ID ${elementId} not found in DOM.`);
    }
}

function showNecessaryProduct(elementId){
    const productElement = document.querySelector(`.productElement${elementId}`);
    if (productElement) {
        productElement.style.visibility = "visible";
    } else {
        console.log(`Product with ID ${elementId} not found in DOM.`);
    }
}

function showAllProducts(){
    for (let i = 0; i < Product.productArray.length; i++) {
        let productId = Product.productArray[i].id;
        const productElement = document.querySelector(`.productElement${productId}`);
        if (productElement && productElement.style.visibility !== "visible") {
            productElement.style.visibility = "visible";
        }
    }
}

function calculatePriceSum() {
    let totalPrice = 0;
    for (const product of Product.productArray) {
        if (typeof parseInt(product.price) === 'number') {
            totalPrice += parseInt(product.price);
        } else {
            console.error(`Помилка: ціна продукту ${product.name} не є числом.`);
        }
    }

    let overallPriceElement = document.querySelector(".overallPrice");
    overallPriceElement.innerText = "Total Sum: " + totalPrice;
}

// POPUP MANAGING

function showPopup(){
    let popup = document.querySelector(".popup");
    popup.style.opacity = "1";
    popup.style.visibility = "visible";
}

function hidePopup(){
    let popup = document.querySelector(".popup");
    popup.style.opacity = "0";
    popup.style.visibility = "hidden";
}

// EVENT HANDLING

function productNameTextElement_Click(elementId, newElementClassName){
    elementToEditId = elementId;
    editMode = "name";
    elementClassName = newElementClassName;
    showPopup();
}

function productPriceTextElement_Click(elementId, newElementClassName){
    elementToEditId = elementId;
    editMode = "price";
    elementClassName = newElementClassName;
    showPopup();
}

// CONNECTIONS

document.querySelector('.popupClose').addEventListener('click', () => {
    hidePopup();
});
