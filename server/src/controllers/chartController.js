const Sensor = require("../database/schemas/Sensor");
const { Op } = require("sequelize"); // За оператори в Sequelize

// Функция за извличане на данни за графиките
const getChartData = async (req, res) => {
  try {
    const { period } = req.query; // Вземаме периода от заявката

    if (!period) {
      return res.status(400).json({ error: "Period is required" });
    }

    // Определяме началната дата въз основа на периода
    let startDate;
    const now = new Date();

    switch (period) {
      case "day":
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Последен ден
        break;
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Последна седмица
        break;
      case "month":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // Последен месец
        break;
      case "3months":
        startDate = new Date(now.getTime() - 3 * 30 * 24 * 60 * 60 * 1000); // Последни 3 месеца
        break;
      case "6months":
        startDate = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000); // Последни 6 месеца
        break;
      case "year":
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000); // Последна година
        break;
      case "all":
        startDate = null; // Връщаме всички записи
        break;
      default:
        return res.status(400).json({ error: "Invalid period" });
    }

    // Заявка към базата данни
    let sensor_db;
    if (startDate) {
      // Ако имаме начална дата, филтрираме данните
      sensor_db = await Sensor.findAll({
        where: {
          createdAt: {
            [Op.gte]: startDate, // Само записи с createdAt >= startDate
          },
        },
        order: [["createdAt", "ASC"]], // Подреждаме резултатите по време
      });
    } else {
      // Връщаме всички данни, ако периодът е "all"
      sensor_db = await Sensor.findAll({
        order: [["createdAt", "ASC"]],
      });
    }

    // Връщаме празен масив, ако няма данни
    if (!sensor_db || sensor_db.length === 0) {
      return res.json([]);
    }

    // Връщаме данните
    res.json(sensor_db);
  } catch (error) {
    console.error("Error fetching chart data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

module.exports = {
  getChartData,
};
