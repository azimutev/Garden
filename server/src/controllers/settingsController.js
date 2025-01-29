const Settings = require("../database/schemas/Settings");

// Функция за извличане на настройки
const getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne(); // Търси първия запис
        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Функция за записване на настройки
const saveSettings = async (req, res) => {
    try {
        const { PUMP_ON_THRESHOLD_LOW, PUMP_OFF_THRESHOLD_HIGH, MAX_LIGHT_THRESHOLD } = req.body;

        let settings = await Settings.findOne();
        if (!settings) {
            // Ако няма запис, създайте нов
            settings = await Settings.create({ PUMP_ON_THRESHOLD_LOW, PUMP_OFF_THRESHOLD_HIGH, MAX_LIGHT_THRESHOLD });
        } else {
            // Актуализирайте съществуващите настройки
            settings.PUMP_ON_THRESHOLD_LOW = PUMP_ON_THRESHOLD_LOW;
            settings.PUMP_OFF_THRESHOLD_HIGH = PUMP_OFF_THRESHOLD_HIGH;
            settings.MAX_LIGHT_THRESHOLD = MAX_LIGHT_THRESHOLD;
            await settings.save();
        }

        res.status(200).json({ message: 'Settings saved successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { getSettings, saveSettings };

