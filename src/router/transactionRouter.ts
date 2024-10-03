import { Router } from "express";
import { createTransaction, deleteTransaction, readTransaction, updateTransaction } from "../controller/transactionController";
import { createValidation, updateValidation } from "../middleware/transactionValidation";
import { verifyToken } from "../middleware/authorization";

const router = Router()

router.post(`/`, [createValidation], createTransaction)
router.get(`/`, [verifyToken], readTransaction)
router.delete(`/:id`, [verifyToken], deleteTransaction)
router.put(`/:id`, [updateValidation], updateTransaction)

export default router