import { Router } from "express";
import { createTransaction, deleteTransaction, readTransaction } from "../controller/transactionController";
import { createValidation } from "../middleware/transactionValidation";
import { verifyToken } from "../middleware/authorization";

const router = Router()

router.post(`/`, [createValidation], createTransaction)
router.get(`/`, [verifyToken], readTransaction)
router.delete(`/:id`, [verifyToken], deleteTransaction)

export default router