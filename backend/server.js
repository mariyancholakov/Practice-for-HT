const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes.js')

dotenv.config()
app.use(cors())
const app = express()
app.use(express.json())

app.use('/api/auth/', authRoutes)
//connect to mongoDb

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})