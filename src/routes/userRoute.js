// const { Router } = require('express');
const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/userController')

/*
const data = {
   name: 'andi',
   dob: 'kundi'
}
const data2 = {
   name: 'a2ndi',
   dob: 'kundi'
}

const printName = (person) => {
   console.log(`welcome ${person.name}`);
}

const printName2 = (person) => {
   const name = person.name;
   console.log(`welcome ${name}`);
}

const printName3 = ({ name }) => {
   console.log(`welcome ${name}`);
}

printName(data2);
printName2(data2);
printName3(data2);
*/


module.exports = () => {
   var UserRouter = Router;
   const _usrCtrl = new UserController()

   UserRouter.get('/', async function(req, res){
      try {
         const users = await _usrCtrl.getAllUsers();
         res.send(users);
      } catch (error) {
         console.log(error)
         res.status(501).send('Internal Server Error');
      }
   });

   UserRouter.post('/', async (req, res) => {
      try {
         const user = await _usrCtrl.createUser(req.body)
         res.send(user);
      } catch (error) {
         console.log(error)
         res.status(501).send('Internal Server Error');
      }
   });

   UserRouter.put('/', async function(req, res){
      try {
         const user = await _usrCtrl.createUser_legacy(req.body)
         res.send(user);
      } catch (error) {
         console.log(error)
         res.status(501).send('Internal Server Error');
      }
   });

   return UserRouter;
}