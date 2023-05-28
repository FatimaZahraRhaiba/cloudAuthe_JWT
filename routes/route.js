const LoginController=require('../controllers/LoginController');
const express=require('express');
const Route=express.Router();

Route.post('/auth/register',LoginController.SignUp)
Route.post('/auth/login',LoginController.Login)

module.exports=Route;
