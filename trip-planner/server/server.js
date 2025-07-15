const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/auth')
const protectedRoutes = require('./routes/protected')
const tripRoutes = require('./routes/trip')

app.use('/api/auth', authRoutes)
app.use('/api', protectedRoutes)
app.use('/api/trip', tripRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))