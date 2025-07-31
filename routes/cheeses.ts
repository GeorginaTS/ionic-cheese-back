import express from 'express'
const router = express.Router()

import {getAllCheeses, getOneCheese, createCheese, updateOneCheese, deleteOneCheese} from "../controllers/cheese"

router.get("/", getAllCheeses)
router.get("/:id", getOneCheese)
router.post("/", createCheese)
router.put("/:id", updateOneCheese) 
router.delete("/:id", deleteOneCheese)  

export default router