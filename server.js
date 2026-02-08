require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');
const app = express();

connectDB();

app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(helmet({
    contentSecurityPolicy: false, 
}));
app.use(mongoSanitize());
app.use(xss());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

const PORT = process.env.PORT || 3000;
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/categories', require('./src/routes/categoryRoutes'));
app.use('/api/posts', require('./src/routes/postRoutes'));
app.use('/', require('./src/routes/viewRoutes'));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));