import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
dotenv.config();
import handler from './routes/therapistUser.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome back to On My Way!');
});

app.use('/api/SignUpTherapist', handler);
app.use('/api/SignInTherapist', handler);
app.use('/api/GetTherapistProfileData', handler);
app.use('/api/EditTherapistProfileData', handler);
app.use('/api/GetTherapistServicesData', handler);
app.use('/api/EditTherapistServicesData', handler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
