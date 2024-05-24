class Product {
    constructor(id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

class Order {
    constructor(id, productId, quantity) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
    }
}

class InventorySystem {
    constructor() {
        this.products = new Map(); // id -> Product
        this.orders = new Set(); // Order
        this.productHistory = new WeakMap(); // Product -> history
        this.userSessions = new WeakSet(); // user sessions
        this.nextProductId = 1;
        this.nextOrderId = 1;
    }

    addProduct(name, price, quantity) {
        const id = this.nextProductId++;
        const product = new Product(id, name, price, quantity);
        this.products.set(id, product);
        this.productHistory.set(product, []);
        console.log(`Product added: ${name}, ID: ${id}`);
        this.renderProducts();
    }

    removeProduct(id) {
        const product = this.products.get(id);
        if (product) {
            this.products.delete(id);
            console.log(`Product removed: ${product.name}`);
            this.renderProducts();
        } else {
            console.log(`Product with ID: ${id} not found.`);
        }
    }

    updateProduct(id, newPrice, newQuantity) {
        const product = this.products.get(id);
        if (product) {
            const history = this.productHistory.get(product);
            history.push({ price: product.price, quantity: product.quantity });
            product.price = newPrice;
            product.quantity = newQuantity;
            console.log(`Product updated: ${product.name}`);
            this.renderProducts();
        } else {
            console.log(`Product with ID: ${id} not found.`);
        }
    }

    findProductByName(name) {
        for (const product of this.products.values()) {
            if (product.name.toLowerCase() === name.toLowerCase()) {
                console.log(`Product found: ${product.name}, Price: ${product.price}, Quantity: ${product.quantity}`);
                this.displayProductInfo(product);
                return product;
            }
        }
        console.log(`Product with name: ${name} not found.`);
        return null;
    }

    placeOrder(productId, quantity) {
        const product = this.products.get(productId);
        if (product && product.quantity >= quantity) {
            product.quantity -= quantity;
            const order = new Order(this.nextOrderId++, productId, quantity);
            this.orders.add(order);
            console.log(`Order placed: Product ID: ${productId}, Quantity: ${quantity}`);
            this.renderOrders();
            this.renderProducts();
        } else {
            console.log(`Order failed: Insufficient quantity for Product ID: ${productId}`);
        }
    }

    renderProducts() {
        const productList = document.getElementById("productList");
        productList.innerHTML = "";
        this.products.forEach((product) => {
            const productItem = document.createElement("div");
            productItem.className = "product-item";
            productItem.textContent = `ID: ${product.id}, Name: ${product.name}, Price: ${product.price}, Quantity: ${product.quantity}`;
            productList.appendChild(productItem);
        });
    }

    renderOrders() {
        const orderList = document.getElementById("orderList");
        orderList.innerHTML = "";
        this.orders.forEach((order) => {
            const orderItem = document.createElement("div");
            orderItem.className = "order-item";
            orderItem.textContent = `Order ID: ${order.id}, Product ID: ${order.productId}, Quantity: ${order.quantity}`;
            orderList.appendChild(orderItem);
        });
    }

    displayProductInfo(product) {
        const productList = document.getElementById("productList");
        productList.innerHTML = `Found product - ID: ${product.id}, Name: ${product.name}, Price: ${product.price}, Quantity: ${product.quantity}`;
    }
}

const inventory = new InventorySystem();

document.getElementById("addProductBtn").addEventListener("click", () => {
    const name = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const quantity = parseInt(document.getElementById("productQuantity").value);
    if (name && price > 0 && quantity > 0) {
        inventory.addProduct(name, price, quantity);
    }
});

document.getElementById("updateProductBtn").addEventListener("click", () => {
    const id = parseInt(document.getElementById("updateProductId").value);
    const price = parseFloat(document.getElementById("updateProductPrice").value);
    const quantity = parseInt(document.getElementById("updateProductQuantity").value);
    if (id && price > 0 && quantity > 0) {
        inventory.updateProduct(id, price, quantity);
    }
});

document.getElementById("deleteProductBtn").addEventListener("click", () => {
    const id = parseInt(document.getElementById("deleteProductId").value);
    if (id) {
        inventory.removeProduct(id);
    }
});

document.getElementById("findProductBtn").addEventListener("click", () => {
    const name = document.getElementById("findProductName").value;
    if (name) {
        inventory.findProductByName(name);
    }
});

document.getElementById("placeOrderBtn").addEventListener("click", () => {
    const productId = parseInt(document.getElementById("orderProductId").value);
    const quantity = parseInt(document.getElementById("orderQuantity").value);
    if (productId && quantity > 0) {
        inventory.placeOrder(productId, quantity);
    }
});
