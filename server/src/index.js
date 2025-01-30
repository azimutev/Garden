const express = require('express');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { verifyToken } = require('./controllers/authController');

const app = express();

app.use(express.json());

// Маршрути за аутентикация
app.use('/api/auth', authRoutes);

// Маршрути за администратори
app.use('/api/admin', verifyToken, adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});