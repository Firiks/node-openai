const router = require('express').Router();
const path = require('path');

const generateImg = require('../controllers/openAIController').generateImg;

router.get('/', (req, res) => {
  res.render('img', {layout : 'layout'});
})

router.post('/generate', generateImg);

module.exports = router;
