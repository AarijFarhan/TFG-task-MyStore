const Price = require('../models/productModel');

// GET /products - Fetch external products and merge prices
const getAllProducts = async (req, res) => {
  try {
    const productRes = await fetch('https://fakestoreapi.com/products');
    const productList = await productRes.json();

    const priceList = await Price.find({});

    const merged = productList.map((product) => {
      const priceEntry = priceList.find((p) => p.productId === product.id);
      return {
        id: product.id,
        title: product.title,
        current_price: {
          value: priceEntry ? priceEntry.value : product.price,
          currency_code: priceEntry ? priceEntry.currency_code : 'USD',
        },
        description:product.description,
        image:product.image,
        category:product.category,
        rating:product.rating
      };
    });

    res.json(merged);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product list' });
  }
};

// PUT /products/:id - Update product price
const updateProductPrice = async (req, res) => {
  const id = parseInt(req.params.id);
  const { value } = req.body.current_price;

  try {
    await Price.findOneAndUpdate(
      { productId: id },
      { value },
      { upsert: true, new: true }
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update price' });
  }
};

module.exports = {
  getAllProducts,
  updateProductPrice,
};
