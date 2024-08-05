const express = require('express')
const app = express()
const authRoutes = require('./src/routes/authRoutes');
const sequelize = require('./src/config/db')
const adminRoutes = require('./src/routes/adminRoutes')
require('./src/config/db')
const PORT = process.env.PORT || 5000;
app.use(express.json());
// app.use('/uploads', express.static(path.resolve(__dirname, "..", 'uploads')));
// app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
// app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});