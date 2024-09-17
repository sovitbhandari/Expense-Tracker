const express = require('express');
const { signUp, signIn, updateProfile} = require('../controllers/userController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.put('/update-profile', protect, updateProfile);

module.exports = router;
