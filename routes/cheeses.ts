import express from 'express'
import {verifyToken} from "../controllers/authMiddleware"
const router = express.Router()

import {getAllCheeses, getOneCheese, createCheese, updateOneCheese, deleteOneCheese, getAllPublicCheeses, getOnePublicCheeses} from "../controllers/cheese"

router.get("/", verifyToken, getAllCheeses)
router.get("/public", getAllPublicCheeses)
router.get("/public/:id", getOnePublicCheeses)
router.post("/public/:id/like", getOnePublicCheeses)
router.get("/:id", verifyToken, getOneCheese)
router.post("/", verifyToken, createCheese)
router.put("/:id", verifyToken, updateOneCheese) 
router.delete("/:id", verifyToken, deleteOneCheese)

export default router