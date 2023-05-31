const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const port = 5000
const app = express()
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const chefServiceRouter = require('./routes/chefService')
const actualiteRouter = require('./routes/actualite')
const reclamationRouter = require('./routes/reclamation')
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

mongoose
  .connect('mongodb://127.0.0.1:27017/POSTE_TN')
  .then(() => {
    console.log('connected to DB')
  })
  .catch((error) => {
    console.log(error.message)
  })
app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/chef_service', chefServiceRouter)
app.use('/actualite', actualiteRouter)
app.use('/reclamation', reclamationRouter)

app.listen(port, () => {
  console.log('application running on ' + port)
})
