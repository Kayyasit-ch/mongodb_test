const express = require('express');
const app = express.Router();
const Employees = require('../models/employees');
const cors =require('cors')


app.use(cors());

app.use(express.json());

app.get('/employees', async (req, res) => {
    try {
        const data = await Employees.find({});
        res.json(data);
    } catch (err) {
        console.error('Error fetching employees:', err);
        res.status(500).send('Internal server error');
    }
});

app.get('/employee/:name', async (req, res) => {
    const {name} = req.params;
    try {
        const employee = await Employees.findOne({name});
        if (!employee) {
            return res.status(404).json({message: 'Employee not found!'});
        }res.json(employee);
    }catch (err) { console.error('Error fetching employee:', err);
        }
})

app.post('/add-employee', async (req, res) => {
    const {name, salary, address, general, social, department} = req.body;
    const newEmployees =new Employees({
        name,
        salary,
        address,
        general,
        social,
        department
    });
    try{
        await newEmployees.save();
        res.status(201).json({message: 'Employee added successfully!'});
    }catch(err){
        console.error('Error adding employee:', err);
        res.status(500).send('Internal server error');
    }
})

app.delete('/delete-employee/:name', async (req, res) => {
    const {name } =req.params;
    try{
        const result =await Employees.deleteOne({name});
        if(result.deletedCount === 0){
            return res.status(404).json({message: 'Employee not found!'});
        }
        res.status(200).json({message: 'Employee deleted successfully!'});
    }catch(err){
        console.error('Error deleting employee:', err);
        res.status(500).send('Internal server error');
    }
})

app.put('/update-employee/:name', async (req, res) => {
    const {name} =req.params;
    const {salary, address, general, social, department} = req.body;
    try{
        const result =await Employees.updateOne({name},{$set:{salary, address, general, social, department}});
        if(result.modifiedCount === 0){
            return res.status(404).json({message: 'Employee not found!'});
        }console.log(result);
        res.status(200).json({message: 'Employee updated successfully!'});
    }catch(err){
        console.error('Error updating employee:', err);
        res.status(500).send('Internal server error');
    }
})


module.exports = app;