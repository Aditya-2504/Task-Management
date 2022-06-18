const express=require('express');
const router=express.Router();
const {registerUser,userPage,singleUser,updateTask}=require('./route-callbacks');

router.route('/login').get(singleUser);
router.route('/registerUser').post(registerUser);
router.route('/userNotes').get(userPage).patch(updateTask);

module.exports=router;