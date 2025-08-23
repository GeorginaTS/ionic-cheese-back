import express from 'express'
import {verifyToken} from "../controllers/authMiddleware"
const router = express.Router()

import {getAllCheeses, getOneCheese, createCheese, updateOneCheese, deleteOneCheese} from "../controllers/cheese"

router.get("/", verifyToken, getAllCheeses)
router.get("/:id", verifyToken, getOneCheese)
router.post("/", verifyToken, createCheese)
router.put("/:id", verifyToken, updateOneCheese) 
router.delete("/:id", verifyToken, deleteOneCheese)

export default router