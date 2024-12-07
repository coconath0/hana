const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoURI = "mongodb+srv://naingol10:haru5@cluster0.p57sm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Flower Schema and Model
const flowerSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true }, // Flower name
    type: { type: String, required: true }, // Flower type
    price: { type: Number, required: true }, // Price of flower
    quantity: { type: Number, required: true }, // Available quantity in stock
    status: { type: String, default: 'Available' }, // Status: Available or Sold
    customer: { type: String, default: null }, // Customer name (if sold)
    dateSold: { type: Date, default: null }, // Date flower was sold
});


const Flower = mongoose.model('Flower', flowerSchema);

// Initialize Sample Data (Add This Here)
const initializeFlowers = async () => {
    const count = await Flower.countDocuments(); // Check if there are already documents
    if (count === 0) {
        const sampleFlowers = [
            { id: "1", name: "Rose", type: "Perennial", price: 10, quantity: 50 },
            { id: "2", name: "Tulip", type: "Annual", price: 7, quantity: 30 },
            { id: "3", name: "Orchid", type: "Perennial", price: 20, quantity: 15 },
            { id: "4", name: "Sunflower", type: "Annual", price: 5, quantity: 40 },
            { id: "5", name: "Daisy", type: "Annual", price: 4, quantity: 25 }
        ];
        await Flower.insertMany(sampleFlowers); // Insert sample data into database
        console.log("Sample flowers initialized");
    }
};
initializeFlowers();


// Routes
app.get('/flowers', async (req, res) => {
    const { status } = req.query;
    const filter = status ? { status } : {};  // Filter by status
    const flowers = await Flower.find(filter);
    res.json(flowers);
});

app.post('/flowers', async (req, res) => {
    try {
        // Find flower with highest 'id'
        const lastFlower = await Flower.findOne().sort({ id: -1 }).limit(1);

        // If no flowers exist, set first flower's id as "1"
        const newId = lastFlower ? (parseInt(lastFlower.id) + 1).toString() : "1";

        // Create a new flower with next id
        const newFlower = new Flower({
            id: newId,  // Dynamically assigned id
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            quantity: req.body.quantity,
        });

        // Save new flower to database
        await newFlower.save();

        res.status(201).send(`Flower with id ${newId} added`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.put('/flowers/:id/sell', async (req, res) => {
    const { id } = req.params;  // Flower id
    const { customer, dateSold } = req.body;  // Customer name and sale date

    const flower = await Flower.findOne({ id });  // Find flower by id
    if (!flower) return res.status(404).send('Flower not found');
    
    flower.status = 'Sold';  // Mark flower as sold
    flower.customer = customer;  // Assign customer name
    flower.dateSold = dateSold;  // Assign sale date
    await flower.save();  // Save  updated flower
    res.send('Flower marked as sold');
});

app.put('/flowers/:id/restock', async (req, res) => {
    const { id } = req.params;  // Flower id
    const { quantity } = req.body;  // Quantity to restock

    const flower = await Flower.findOne({ id });  // Find flower by id
    if (!flower) return res.status(404).send('Flower not found');
    
    flower.quantity += quantity;  // Increase quantity
    flower.status = 'Available';  // Mark flower as available
    await flower.save();  // Save updated flower
    res.send('Flower restocked');
});

// Start  server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
