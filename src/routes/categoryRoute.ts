import express from "express";
import { getCategories, createCategory, showCategory, updateCategory,deleteCategory } from "../controllers/categoryController";

const router = express.Router();

router.get("/", getCategories);
router.post("/",createCategory);
router.get("/:id", showCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;