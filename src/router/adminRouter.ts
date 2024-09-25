import { Router } from "express";
import { addAdmin, authentication, deleteAdmin, findAdmin, readAdmin, updateAdmin } from "../controller/adminController";
import { addValidation, authValidation, updateValidation } from "../middleware/adminValidation";

const router = Router()

router.post(`/`, [addValidation],  addAdmin)
router.get(`/`, readAdmin)
router.get(`/findAdmin`, findAdmin)
router.put(`/:id`, [updateValidation], updateAdmin)
router.delete(`/:id`, deleteAdmin)
router.post(`/auth`, [authValidation], authentication)

export default router