const useCtrl = require('../ctrls/useCtrls.js')
const auth=require('../middleware/auth.js')
const router=require('express').Router()

router.post('/register',useCtrl.register);
router.post('/login',useCtrl.login);
router.post('/logout',useCtrl.logout);
router.post('/refresh_token',useCtrl.refreshtoken);
router.get('/infor',auth,useCtrl.getuser);
module.exports=router