const express = require('express')

const router = express.Router();

const petController = require('../controllers/petController')
const upload = require('../config/multerConfig');

router.post('/offerPet', upload.single('petImage'), petController.savePet);
router.patch('/adoptPet/:petId', petController.adoptPet);
router.get('/getAvailablePets', petController.getAvailablePets);
router.get('/getPetByUser/:userId', petController.getPetsByUser);
router.delete('/delete/:petId', petController.deletePet);
router.put('/update/:petId', upload.single('petImage'), petController.updatePet);

module.exports = router;