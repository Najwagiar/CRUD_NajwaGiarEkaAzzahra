import express from "express";
import { getSpeakers, createSpeaker, showSpeaker,updateSpeakerById, deleteSpeakerById } from "../controllers/speakerController";

const router = express.Router();


router.get("/", getSpeakers);
router.post("/", createSpeaker);
router.get("/:id", showSpeaker);
router.put("/:id", updateSpeakerById);
router.delete("/:id", deleteSpeakerById);

export default router;