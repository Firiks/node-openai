const router = require('express').Router();
const path = require('path');

const chatMsg = require('../controllers/openAIController').chatMsg;

router.get('/', (req, res) => {
  res.render('chat', {layout : 'layout'});
})

router.post('/generate', chatMsg);

module.exports = router;
