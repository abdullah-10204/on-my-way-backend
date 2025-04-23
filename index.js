const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/connectDB');

dotenv.config();



const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome back to On My Way!');
});
const authRoutes = require('./routes/v1/authRoute');
const appRoutes = require('./routes/v1/appRoute');

app.use('/api/auth', authRoutes);
app.use('/api', appRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
