const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const resumeRoutes = require('./routes/resumeRoutes');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection failed', err));

app.get('/',(req,res) => {
    res.send('API is running');
});

app.use('/api/resumes',resumeRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
