import { Router } from "express";
import { createMedicine, deleteMedicine, readMedicine, updateMedicine } from "../controller/medicineController";
import { createValidation, updateValidation } from "../middleware/validateMedicine"

const router = Router()

// router for add newMedicine
router.post(`/`, [createValidation], createMedicine)
// router for get all data
router.get(`/`, readMedicine)
// router for update
router.put(`/:id`, [updateValidation], updateMedicine)
// router for delete
router.delete(`/:id`, deleteMedicine)

export default router