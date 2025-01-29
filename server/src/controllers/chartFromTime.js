const { Sequelize } = require("../database/db");
const Sensor = require("../database/schemas/Sensor");

// Function for retrieving sensor data by date range
const getChartDataByDate = async (req, res) => {
    try {
        const { fromDate, toDate, sensor } = req.query;

        const data = await Sensor.findAll({
            where: {
                createdAt: {
                    [Sequelize.Op.between]: [new Date(fromDate), new Date(toDate)],
                },
            },
        });

        if (!data || data.length === 0) {
            return res.json([]); // Връщаме празен масив, ако няма данни
        }

        res.json(data);
    } catch (error) {
        console.error('Error fetching chart data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getChartDataByDate };
