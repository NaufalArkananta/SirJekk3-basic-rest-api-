import { Router } from "express";
import { addAdmin, deleteAdmin, findAdmin, readAdmin, updateAdmin } from "../controller/adminController";
import { addValidation, updateValidation } from "../middleware/adminValidation";

const router = Router()

router.post(`/`, [addValidation],  addAdmin)
router.get(`/`, readAdmin)
router.get(`/findAdmin`, findAdmin)
router.put(`/:id`, [updateValidation], updateAdmin)
router.delete(`/:id`, deleteAdmin)

export default router