const express = require('express')
const app = express()
const cors = require('cors')

const router = require('./src/routes')

app.use(express.json())
app.use(cors())
app.use('/api', router)

app.listen(5000, () => console.log('server running on port 5000'))
