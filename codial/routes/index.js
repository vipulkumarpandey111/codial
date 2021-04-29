//file which guides to all other routes
const express = require('express');
//express.Router helps separate app route and controller
const router=express.Router();
//access home_controller from controllers
const homeController = require('../controllers/home_controller');


console.log('router loaded');
//runs home function of home_controller.js
router.get('/',homeController.home);
//handles users.js requests
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

router.use('/api',require('./api'));

//for any further routes,access from here
//router.use('/routerName',require('./routerfile));

module.exports=router;