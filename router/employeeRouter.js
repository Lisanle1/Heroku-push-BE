const express= require ('express');
const auth=require ('../modules/authModule')
const employeeModule=require('../modules/employeeModule')
const router= express.Router();

router.get('/get',employeeModule.getEmployees)
// here we give the auth.authorizedUser as 1st parameter then we give permit to create,update,delete access to admin.
router.post('/create',auth.authorizedUser,employeeModule.createEmployees,)
router.put('/update/:id',auth.authorizedUser,employeeModule.updateEmployees)
router.delete('/delete/:id',auth.authorizedUser,employeeModule.deleteEmployees)

module.exports = router;