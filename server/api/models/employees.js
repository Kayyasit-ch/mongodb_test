const mongoose = require('mongoose');

const EmployeesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    general: {
        weight: Number,
        height: Number,
        gender: {
            type: String,
            enum: ['male', 'female', 'other']
        }
    },
    social: {
        type: [String], // ชัดเจนว่าเป็น array ของ string
        default: []
    },
    department: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Employees', EmployeesSchema);
