const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/csv/' });

router.use(authMiddleware);

router.get('/', leadController.listLeads);
router.post('/', leadController.createLead);
router.post('/upload', upload.single('csvFile'), leadController.uploadCSV);
router.put('/:id', leadController.updateLead);
router.delete('/:id', leadController.deleteLead);

module.exports = router;
