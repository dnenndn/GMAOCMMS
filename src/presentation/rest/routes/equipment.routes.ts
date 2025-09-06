import { Router } from 'express';
import { EquipmentController } from '../controllers/equipment.controller';

const router = Router();
const controller = new EquipmentController();

router.post('/', (req, res, next) => {
    controller.createEquipment(req, res, next);
});

router.get('/', (req, res, next) => {
    controller.getEquipmentList(req, res, next);
});

router.get('/stats', (req, res, next) => {
    controller.getEquipmentStats(req, res, next);
});

router.get('/qr/:qrCode', (req, res, next) => {
    controller.getEquipmentByQRCode(req, res, next);
});

export const equipmentRoutes = router;