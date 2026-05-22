import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// GET ALL EVENTS
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany();

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data",
      error,
    });
  }
};

// CREATE EVENT
export const createEvent = async (req: Request, res: Response) => {
  try {
    // 1. Tambahkan pembicaraId ke dalam destructuring req.body
    const { name, categoryId, location, dateEvent, description, pembicaraId } = req.body;

    // 2. Tambahkan pembicaraId ke validasi
    if (!name || !categoryId || !location || !dateEvent || !description || !pembicaraId) {
      return res.status(400).json({
        message: "Semua field wajib diisi (termasuk pembicara)",
      });
    }

    const newEvent = await prisma.event.create({
      data: {
          name,
        categoryId: Number(categoryId), // Pastikan tipenya Int
        location,
        dateEvent: new Date(dateEvent),
        description,
        pembicaraId: Number(pembicaraId), // Pastikan tipenya Int
      },
    });

    res.status(201).json({
      message: "Event berhasil dibuat",
      data: newEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      message: "Gagal membuat event",
      error: error,
    });
  }
};

// GET EVENT BY ID
export const showEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return res.status(404).json({
        message: "Event tidak ditemukan",
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil detail event",
      error,
    });
  }
};

// UPDATE EVENT
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return res.status(404).json({
        message: "Event tidak ditemukan",
      });
    }

    const { name, categoryId, location, dateEvent, description } = req.body;

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        name,
        categoryId,
        location,
        dateEvent: new Date(dateEvent),
        description,
      },
    });

    res.json({
      message: "Event berhasil diupdate",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal update event",
      error,
    });
  }
};

// DELETE EVENT
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.event.delete({
      where: { id },
    });

    res.json({
      message: "Event berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus event",
      error,
    });
  }
};