const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/peopleController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', peopleController.getAllPeople);
router.post('/', peopleController.createEmployee);
router.put('/:id', peopleController.updateEmployee);
router.delete('/:id', peopleController.deleteEmployee);

module.exports = router;
