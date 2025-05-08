require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db');
const employeesRoutes = require('./routes/employees');
const port = process.env.PORT ;


connectDB();

app.use('/api', employeesRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
