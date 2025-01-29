const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db'); // Импортиране на връзката с базата данни
sequelize.sync({ force: false }) // `force: false` предотвратява презаписването на таблици
   .then(() => {
        console.log('Database synced successfully.');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

const Settings = sequelize.define('settings', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    PUMP_ON_THRESHOLD_LOW: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    PUMP_OFF_THRESHOLD_HIGH: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    MAX_LIGHT_THRESHOLD: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'settings', // Указване на името на таблицата
    timestamps: false,     // Ако няма `createdAt` и `updatedAt` колони
});

module.exports = Settings;
