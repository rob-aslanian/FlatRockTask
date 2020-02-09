const   userController = require('../controllers/user.controller'),
        authController = require('../controllers/auth.controller'),
        API_PATH = '/api/v1';

module.exports = function(app) {
    // __ USERS __ // 
    app.get(`${API_PATH}/users` , userController.getAllUsers)
    app.get(`${API_PATH}/users/:id` , userController.getUserByID)
    app.post(`${API_PATH}/users/upload_avatar` , userController.uploadAvatar)
    app.put(`${API_PATH}/users/:id` , userController.updateUser)
    app.delete(`${API_PATH}/users/:id` , userController.deleteUser)


    // __ AUTH __ //
    app.post(`${API_PATH}/auth/register` , authController.register)
    
}