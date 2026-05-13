import { Request, Response } from "express";
import { speaker } from "../types/speaker";

let speakers: speaker[] = [];

// 1. Menampilkan daftar speaker
export const getSpeakers = (req: Request, res: Response) => {
  res.json(speakers);
};

// 2. Menyimpan data speaker baru
export const createSpeaker = (req: Request, res: Response) => {
  const { name, role, image } = req.body;

  // buat validasi sederhana untuk memastikan semua field diisi
  if (!name || !role || !image) {
    return res.status(400).json({ message: "Semua field harus diisi" });
  }

  // Jika validasi berhasil
  const newSpeaker: speaker = {
    id: speakers.length + 1,
    name: name,
    role: role,
    image: image,
  };

  // Jika sudah diisi, maka akan di simpan di array atau database
  speakers.push(newSpeaker);

  // Jika berhasil disimpan
  res
    .status(201)
    .json({ message: "Data berhasil di simpan", speaker: newSpeaker });
};

// 3. Menampilkan detail speaker berdasarkan ID
export const showSpeaker = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const dataSpeaker = speakers.find((item) => item.id === id);

  if (!dataSpeaker) {
    return res.status(404).json({
      message: "Speaker tidak ditemukan",
    });
  }

  res.status(200).json(dataSpeaker);
};

// 4. Mengupdate data speaker berdasarkan ID
export const updateSpeakerById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const { name, role, image } = req.body;

  const dataSpeaker = speakers.find((item) => item.id === id);

  if (!dataSpeaker) {
    return res.status(404).json({
      message: "Speaker tidak ditemukan",
    });
  }

  // Update data
  dataSpeaker.name = name || dataSpeaker.name;
  dataSpeaker.role = role || dataSpeaker.role;
  dataSpeaker.image = image || dataSpeaker.image;

  res.status(200).json({
    message: "Speaker berhasil diupdate",
    speaker: dataSpeaker,
  });
};

// 5. Menghapus data speaker berdasarkan ID
export const deleteSpeakerById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const dataSpeaker = speakers.find((item) => item.id === id);

  if (!dataSpeaker) {
    return res.status(404).json({
      message: "Speaker tidak ditemukan",
    });
  }

  speakers = speakers.filter((item) => item.id !== id);

  res.status(200).json({
    message: "Speaker berhasil dihapus",
  });
};
