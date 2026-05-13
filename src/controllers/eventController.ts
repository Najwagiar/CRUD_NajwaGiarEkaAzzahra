import { Request, Response } from "express";
import { Event } from "../types/event";

let event: Event[] = [];

// 1. Menampilkan data event
export const getEvents = (req: Request, res: Response) => {
  res.json(event);
};

// 2. Menyimpan data event
export const createEvents = (req: Request, res: Response) => {
  const { name, date, location, description } = req.body;

  // Validasi Sederhana, jika name belum diisi
  if (!name || !date || !location) {
    res.status(500).json({ message: "Nama,Date dan Location harus diisi" });
  }

  // Jika validasi berhasil
  const newEvent: Event = {
    id: Date.now(),
    name: name,
    date: date,
    location: location,
    description: description,
  };

  // Jika sudah disusun, simpan ke array atau database
  event.push(newEvent);

  // Jika data berhasil disimpan
  res.status(200).json({ message: "Data berhasil disimpan", event: newEvent });
};

// 3. Menampilkan data event berdasarkan id
export const showEvents = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const dataEvent = event.find((item) => item.id === id);

  if (!dataEvent) {
    return res.status(404).json({
      message: "Event tidak ditemukan",
    });
  }

  res.status(200).json(dataEvent);
};

// 4. Mengupdate event berdasarkan id
export const updateEvents = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const { name, date, location, description } = req.body;

  const dataEvent = event.find((item) => item.id === id);

  if (!dataEvent) {
    return res.status(404).json({
      message: "Event tidak ditemukan",
    });
  }

  // Update data
  dataEvent.name = name || dataEvent.name;
  dataEvent.date = date || dataEvent.date;
  dataEvent.location = location || dataEvent.location;
  dataEvent.description = description || dataEvent.description;

  res.status(200).json({
    message: "Event berhasil diupdate",
    event: dataEvent,
  });
};

// 5. Menghapus event berdasarkan id
export const deleteEvents = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const dataEvent = event.find((item) => item.id === id);

  if (!dataEvent) {
    return res.status(404).json({
      message: "Event tidak ditemukan",
    });
  }

  event = event.filter((item) => item.id !== id);

  res.status(200).json({
    message: "Event berhasil dihapus",
  });
};
