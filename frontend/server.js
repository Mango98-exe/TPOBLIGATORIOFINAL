const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();
const port = process.env.PORT || 5000;

// Middleware para manejar los datos en formato JSON
app.use(express.json());

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando!');
});

// Levantar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
});


const productRoutes = require('./routes/productRutas');
app.use('/api', productRoutes); // Ruta base para las API


// Middleware para manejo de errores
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});


fetch('http://localhost:5000/api/products')
    .then(response => response.json())
    .then(products => {
        console.log(products);
        // Aquí agregas los productos al DOM
    })
    .catch(error => console.error('Error al obtener productos:', error));


    router.post('/cart', (req, res) => {
        // Lógica para agregar productos al carrito
    });

    const cartRoutes = require('./rutas/rutasCrrito');
app.use('/api', cartRoutes);

    
