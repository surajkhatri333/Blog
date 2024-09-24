import dotenv from 'dotenv'
import { connectDB } from './public/src/db/index.js'
import { app } from './App.js'


dotenv.config({
    path: './.env'
})


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, (req, res) => {
            console.log(`Server is listening at port :${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Mongodb connection falied !!!!", err);
    })
