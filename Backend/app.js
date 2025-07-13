const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());




app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/TFG-Task-DataBase');

// Schema for storing product price
const Price = mongoose.model('Price', {
  productId: Number,
  value: Number,
  currency_code: { type: String, default: 'USD' },
});

// GET /products/:id
// GET /products - Fetch full list with merged data
app.get('/products', async (req, res) => {
  try {
    const productRes = await fetch('https://fakestoreapi.com/products');
    const productList = await productRes.json();

    const priceList = await Price.find({});

    // Merge prices into products
    const merged = productList.map((product) => {
      const priceEntry = priceList.find((p) => p.productId === product.id);
      return {
        id: product.id,
        title: product.title,
        current_price: {
          value: priceEntry ? priceEntry.value : 0,
          currency_code: priceEntry ? priceEntry.currency_code : 'USD',
        },
      };
    });

    res.json(merged);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product list' });
  }
});


// PUT /products/:id
app.put('/products/:id', async (req, res) => {
  const id = req.params.id;
  const { value } = req.body.current_price;

  try {
    await Price.findOneAndUpdate(
      { productId: id },
      { value },
      { upsert: true, new: true }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update price' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
