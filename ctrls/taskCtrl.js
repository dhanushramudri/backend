const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Tasks = require('../model/taskModel');
const { successResponse, errorResponse } = require('../utils/responseUtils'); 


const APIfeatures = require('../utils/APIfeatures'); 
const taskCtrl = {
    getTasks: asyncHandler(async (req, res) => {
        const features = new APIfeatures(Tasks.find(), req.query)
            .filtering()
            .sorting()
            .pagination();

        const tasks = await features.query;
        successResponse(res, 'Tasks retrieved successfully', tasks);
    }),

    getTaskById: asyncHandler(async (req, res) => {
        const task = await Tasks.findById(req.params.id);
        if (!task) return errorResponse(res, 'Task not found', 404);
        successResponse(res, 'Task retrieved successfully', task);
    }),

    createTask: [
        asyncHandler(async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return errorResponse(res, errors.array().map(err => err.msg).join(', '), 400);
            }

            const { title, description } = req.body;
            const newTask = new Tasks({ title, description });
            await newTask.save();
            successResponse(res, "Task created successfully", newTask);
        })
    ],

    deleteTask: asyncHandler(async (req, res) => {
        const task = await Tasks.findByIdAndDelete(req.params.id);
        if (!task) return errorResponse(res, "Task not found", 404);
        successResponse(res, "Task deleted successfully");
    }),

    updateTask: asyncHandler(async (req, res) => {
        const updatedTaskData = {
            ...req.body,
            updated_at: Date.now()
        };
        const task = await Tasks.findByIdAndUpdate(req.params.id, updatedTaskData, { new: true });
        if (!task) return errorResponse(res, "Task not found", 404);
        successResponse(res, "Task updated successfully", task);
    })
};

module.exports = taskCtrl;
