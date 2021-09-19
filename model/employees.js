const { truncate } = require('fs-extra')
const { model, Schema } = require('mongoose')

const newEmployeesSchema = new Schema({
    civility: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    address_number: {
        type: Number,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    social_number: {
        type: String,
        required: true
    },
    registration_number: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    gross_salary: {
        type: Number,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    entry_date: {
        type: String,
        required: true
    },
    paid_holidays: {
        type: Number,
        required: true
    },
    paid_holidays_rest: {
        type: Number,
        required: true
    }
})

module.exports = model('employees', newEmployeesSchema)