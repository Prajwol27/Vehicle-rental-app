const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const authRouter = require('./Routes/AuthRouter');
const vehicleRoutes = require('./Routes/VehicleRouter');
const connectDB = require('./Models/db');
const bookingRoutes = require('./Routes/BookingRouter');

require('dotenv').config();
connectDB();


const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}



const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/api/vehicles', vehicleRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));