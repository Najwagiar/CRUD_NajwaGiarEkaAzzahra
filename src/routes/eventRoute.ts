import express from "express";
import { createEvents, getEvents, showEvents, updateEvents, deleteEvents} from "../controllers/eventController";

const router = express.Router();

router.get("/", getEvents);
router.post("/", createEvents); //Menyimpan data
router.get("/:id", showEvents);
router.put("/:id", updateEvents);
router.delete("/:id", deleteEvents);

export default router;