const express= require ('express');
const auth=require ('../modules/authModule')
const productModule=require('../modules/productModule')
const router= express.Router();

router.get('/get',productModule.getProducts)
// here we give the auth.authorizedUser as 1st parameter then we give permit to create,update,delete access to admin.
router.post('/create',auth.authorizedUser,productModule.createProducts,)
router.put('/update/:id',auth.authorizedUser,productModule.updateProducts)
router.delete('/delete/:id',auth.authorizedUser,productModule.deleteProducts)

module.exports = router;