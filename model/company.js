const { truncate } = require('fs-extra')
const { model, Schema } = require('mongoose')

const newCompanySchema = new Schema({
    company_name: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    adress_name: {
        type: String,
        required: true
    },
    adress_number: {
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
    siret: {
        type: String,
        required: true
    },
    
})



module.exports = model('company', newCompanySchema)