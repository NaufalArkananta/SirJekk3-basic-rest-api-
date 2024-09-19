import { Router } from "express";
import { createMedicine, deleteMedicine, readMedicine, updateMedicine } from "../controller/medicineController";
import { createValidation, updateValidation } from "../middleware/validateMedicine"
import { uploadMedicinePhoto } from "../middleware/uploadMedicinePhoto";

const router = Router()

// router for add newMedicine || single for up 1 photo
router.post(`/`, [uploadMedicinePhoto.single(`photo`), createValidation], createMedicine)
// router for get all data
router.get(`/`, readMedicine)
// router for update
router.put(`/:id`, [updateValidation], updateMedicine)
// router for delete
router.delete(`/:id`, deleteMedicine)

export default router