const express = require('express');
const contractController = require('../controllers/contract.controller');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const { OnlyAdminCanAccess } = require('../middleware/admin.midlleware');
router.get('/backups-contracts', contractController.getAllContractsBackups,auth, OnlyAdminCanAccess,);

router.get('/autoinc', contractController.getAutoInc,auth, OnlyAdminCanAccess);




router.post('/',auth, OnlyAdminCanAccess, contractController.createContract,);
router.get('/', auth, OnlyAdminCanAccess,contractController.getAllContracts);
router.put('/:id',auth, OnlyAdminCanAccess, contractController.updateContract);
router.delete('/:id',auth, OnlyAdminCanAccess, contractController.deleteContract);
router.get('/:id',auth, OnlyAdminCanAccess,contractController.getContractById);











module.exports = router;