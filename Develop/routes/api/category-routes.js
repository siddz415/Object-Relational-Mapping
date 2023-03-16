const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [Product]
    });
    return res.status(200).json(categoryData);
  }catch(err) {
    console.log('err', err);
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk({
      include: [Product],
    });
    return res.status(200).json(categoryData);
  }catch(err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create(req.body);
    return res.statusMessage(200).json(categoryData);
  }catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true
    });
    res.status(200).json(categoryData);
  }
  catch(err) {
    res.status(400).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json('category has been removed', categoryData);
    
    }catch (err) {
      res.status(500).json(err);
    }
  
  // delete a category by its `id` value
});

module.exports = router;
