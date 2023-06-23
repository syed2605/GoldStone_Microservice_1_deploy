const mongoose = require('mongoose')
const env=require('dotenv').config();
const ATLAS_PASSWORD=process.env.ATLAS_PASSWORD;


async function connectDatabase() {
    await mongoose.connect(`mongodb+srv://gouse001122:${ATLAS_PASSWORD}@cluster0.pngg3lp.mongodb.net/?retryWrites=true&w=majority`)
    console.log('Connected to DB')
}

module.exports = connectDatabase;