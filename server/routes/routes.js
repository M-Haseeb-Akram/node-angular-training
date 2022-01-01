const express = require('express');
const bodyParser = require('body-parser');
const AccessController = require('../controller/access_controller');
const UserController = require('../controller/user_controller');
const MiddlewareValidator = require('../middleware/express_validator');
const AuthMiddleware = require('../middleware/middleware_auth');
const app = express();
app.use(bodyParser.json());

const router = express.Router();
router.post(
    '/login',
    MiddlewareValidator.UserLogin(),
    MiddlewareValidator.validateInput,
    AuthMiddleware.UserLogin,
    AccessController.UserLogin
);

router.post(
    '/register',
    MiddlewareValidator.UserRegister(),
    MiddlewareValidator.validateInput,
    AccessController.UserRegister
);
router.post('/test', AuthMiddleware.auth, AccessController.test);

router.post(
    '/add-todo',
    MiddlewareValidator.ItemValidity(),
    MiddlewareValidator.validateInput,
    AuthMiddleware.auth,
    UserController.AddTodoItem
);

router.get('/todos', UserController.getAllTodos);

router.put(
    '/edit-todo/:id',
    MiddlewareValidator.ItemValidity(),
    MiddlewareValidator.validateInput,
    AuthMiddleware.auth,
    UserController.updateTodoItem
);

router.put(
    '/update-todo-status/:id',
    AuthMiddleware.auth,
    UserController.updateTodoItemStatus
);

router.delete(
    '/delete-todo/:id',
    AuthMiddleware.auth,
    UserController.deleteSingleItem
);

module.exports = router;
