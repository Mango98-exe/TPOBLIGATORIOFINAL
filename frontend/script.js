// Obtener todos los productos del backend y mostrarlos en la UI
fetch('http://localhost:5000/api/products')
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(products => {
        // Mostrar los productos en el HTML
        const productList = document.getElementById('product-list');
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <span>${product.price}</span>
                <button onclick="addToCart('${product._id}', 1)">Agregar al carrito</button>
            `;
            productList.appendChild(productDiv);
        });
    })
    .catch(error => console.error('Error al obtener productos:', error));

    // Función para agregar un producto al carrito
function addToCart(productId, quantity) {
    const userId = "someUserId"; // Reemplaza con el ID real del usuario
    fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, productId, quantity })
    })
    .then(response => response.json())
    .then(cart => {
        console.log('Producto agregado al carrito:', cart);
        // Aquí puedes actualizar la interfaz si es necesario (ej. mostrar el número de productos en el carrito)
    })
    .catch(error => console.error('Error al agregar producto al carrito:', error));
}


// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    const userId = "someUserId"; // Reemplaza con el ID real del usuario
    fetch(`http://localhost:5000/api/cart/${userId}/${productId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(cart => {
        console.log('Producto eliminado del carrito:', cart);
        // Actualiza la interfaz si es necesario
    })
    .catch(error => console.error('Error al eliminar producto del carrito:', error));
}
