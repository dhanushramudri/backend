const router = require('express').Router();
const auth = require('../middleware/auth.js');
const authAdmin = require('../middleware/authAdmin.js');
const taskCtrl = require('../ctrls/taskCtrl.js');

router.route('/tasks')
    .get(auth, taskCtrl.getTasks) 
    .post(auth, taskCtrl.createTask);

router.route('/tasks/:id')
    .get(auth,taskCtrl.getTaskById)
    .delete(auth, taskCtrl.deleteTask)
    .put(auth, taskCtrl.updateTask); 

module.exports = router;
