const mongoose = require('mongoose')

mongoose.connect(process.env.URL)

mongoose.connection.on('connect', () => {
    console.log("Mongoose Connected ✅")
})

mongoose.connection.on('error', (error) => {
    console.log("Mongoose Error ❌")
    console.log(`Error: ${error}`)
})
