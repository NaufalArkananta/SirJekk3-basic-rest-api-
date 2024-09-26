import { Router } from "express";
import { createMedicine, deleteMedicine, readMedicine, updateMedicine } from "../controller/medicineController";
import { createValidation, updateValidation } from "../middleware/validateMedicine"
import { uploadMedicinePhoto } from "../middleware/uploadMedicinePhoto";
import { verifyToken } from "../middleware/authorization";

const router = Router()

// router for add newMedicine || single for up 1 photo
router.post(`/`, [verifyToken, uploadMedicinePhoto.single(`photo`), createValidation], createMedicine)
// router for get all data
router.get(`/`, [verifyToken], readMedicine)
// router for update
router.put(`/:id`, [verifyToken, uploadMedicinePhoto.single(`photo`), updateValidation], updateMedicine)
// router for delete
router.delete(`/:id`, [verifyToken], deleteMedicine)

export default router