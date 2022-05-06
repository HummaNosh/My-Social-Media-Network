const router = require('express').Router();
const userRoutes = require('./UserRoutes');
const thouRoutes = require('./ThoughtsRoutes');

router.use('/user', userRoutes);
router.use('/thoughts', thouRoutes);

module.exports = router;
