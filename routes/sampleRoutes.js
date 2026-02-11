import express from 'express';
import { verifyCertificate, getAllCertificates } from '../controllers/sampleController.js'

const router = express.Router();

router.get('/verify/:certificateNo', verifyCertificate);
router.get('/certificates', getAllCertificates);

export default router;