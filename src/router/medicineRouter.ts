import { Router } from "express";
import { createMedicine, readMedicine } from "../controller/medicineController";
import { createValidation } from "../middleware/validateMedicine"

const router = Router()

// router for add newMedicine
router.post(`/`, [createValidation], createMedicine)
router.get(`/`, readMedicine)

export default router