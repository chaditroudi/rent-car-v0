const express = require('express');
const router = express();

const auth = require('../middleware/auth.middleware');
const { OnlyAdminCanAccess } = require('../middleware/admin.midlleware');

const reportController = require('../controllers/report.controller');

const roleController = require('../controllers/role.controller');


const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator, storeRoleValidator } = require('../helper/admin-validator.helper');


router.post('/add-report', auth, reportController.createReport);
router.get('/get-reports', auth, reportController.getAllReports);
router.get('/get-monthly-reports', auth, reportController.fetchMonthlyRep);
router.delete('/delete-permission/:id', auth, reportController.deleteReport);
router.put('/update-report/:id', auth, reportController.updateReport);


module.exports = router;