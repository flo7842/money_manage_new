const { model, Schema } = require('mongoose')

const newTaskSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    info: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    }
})

module.exports = model('income-statement', newTaskSchema)