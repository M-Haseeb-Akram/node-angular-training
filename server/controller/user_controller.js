const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const Todo = require('../models/todos');

const app = express();
app.use(bodyParser.json());

module.exports = {
    AddTodoItem: async (req, res) => {
        try {
            const { title } = req.body;
            const new_item = await Todo.create({
                title: title,
                status: false,
                user_id: req['user']['id'],
            });
            res.status(201).json({
                success: true,
                message: { new_item },
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error! while adding. ${error}`,
            });
        }
    },

    getAllTodos: async (req, res) => {
        try {
            Todo.findAll({
                where: {
                    user_id: req['user']['id'],
                },
            }).then((todos) => {
                res.status(201).json(todos);
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Error! ${error}`,
            });
        }
    },

    deleteSingleItem: async (req, res) => {
        try {
            const id = req.params;
            Todo.destroy({
                where: {
                    id,
                    user_id: req['user']['id'],
                },
            }).then((response) => {
                res.status(201).json({
                    success: true,
                    message: 'Item Deleted Successfully!',
                });
            });
        } catch {
            res.status(400).json({
                success: false,
                message: `Error! ${error}`,
            });
        }
    },

    updateTodoItem: async (req, res) => {
        try {
            const id = req.params;
            const { title } = req.body;
            Todo.update(
                {
                    title: title,
                },
                {
                    where: {
                        id,
                        user_id: req['user']['id'],
                    },
                }
            ).then((response) => {
                res.status(201).json({
                    success: true,
                    message: 'Item Updated Successfully!',
                });
            });
        } catch {
            res.status(400).json({
                success: false,
                message: `Error! ${error}`,
            });
        }
    },

    updateTodoItemStatus: async (req, res) => {
        try {
            const id = req.params;
            const { status } = req.body;
            Todo.update(
                {
                    status: status,
                },
                {
                    where: {
                        id,
                        user_id: req['user']['id'],
                    },
                }
            ).then((response) => {
                res.status(201).json({
                    success: true,
                    message: 'Item Status Updated Successfully!',
                });
            });
        } catch {
            res.status(400).json({
                success: false,
                message: `Error! ${error}`,
            });
        }
    },
};
