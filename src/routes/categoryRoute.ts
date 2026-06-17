import { authenticat } from "../middlewares/authMiddleware.js";
import express from "express";
import { getCategories, createCategory, showCategory, updateCategory,deleteCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", authenticat, createCategory);
router.get("/:id", showCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;