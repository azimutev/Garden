require('dotenv').config();
const express = require('express');
const authRoute = require('./routes/authRoutes');
const profileRoute = require('./routes/profileRoute');
const settingsRoute = require('./routes/settingsRoutes');
const cors = require('cors');
const { index2, getChartData } = require('./controllers/chartController');
const { index3, getChartDataByDate } = require('./controllers/chartFromTime');
const { getSettings, saveSettings } = require('./controllers/settingsController');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Рути
app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.get('/getChartData', getChartData);
app.get('/getChartDataByDate', getChartDataByDate);
app.get('/getSettings', getSettings);
app.post('/saveSettings', saveSettings);
app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
})



