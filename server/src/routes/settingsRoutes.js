const express = require('express');
const { getSettings, saveSettings } = require('../controllers/settingsController'); // Импортирайте функциите от контролера

const router = express.Router();

// Рут за получаване на настройки
router.get('/getSettings', getSettings);

// Рут за записване на настройки
router.post('/saveSettings', saveSettings);

module.exports = router; // Експортирайте маршрута
