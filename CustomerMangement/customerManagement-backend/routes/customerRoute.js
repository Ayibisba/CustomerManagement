const express = require('express');
const customerController = require('../Controllers/customerController');

const router = express.Router();

//Routes pour les crud
 router.get('/',customerController.getAllCustomers);
 router.get('/search',customerController.searchCustomer);
 router.get('/:id', customerController.getCustomerById);
 router.post('/',customerController.createCustomer);
 router.put('/:id',customerController.updateCustomer);
 router.delete('/:id',customerController.deleteCustomer);

 module.exports = router;