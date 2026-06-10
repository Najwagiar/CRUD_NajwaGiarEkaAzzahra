import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. GET ALL USERS
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: "desc" },
    });
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Gagal mengambil data user", error });
  }
};

// 2. GET USER BY ID (Tambahan Baru - Sangat Penting untuk Mengisi Data di Form Edit)
export const showUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan!",
      });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Gagal mengambil detail user",
      error,
    });
  }
};

// 3. CREATE USER
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, foto } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, Email, dan Password wajib diisi!" });
    }

    // Validasi email unik
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar!" });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password, // Mengikuti instruksi dasar tanpa enkripsi bcript
        foto: foto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      },
    });

    return res.status(201).json({ message: "User berhasil ditambahkan!", data: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Gagal membuat user", error });
  }
};

// 4. UPDATE USER
export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, email, password, foto } = req.body;

    // Pastikan user ada
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    // Validasi: Jika mengganti email, pastikan email baru belum dipakai orang lain
    if (email && email !== existingUser.email) {
      const emailCheck = await prisma.user.findUnique({ where: { email } });
      if (emailCheck) {
        return res.status(400).json({ message: "Email sudah digunakan oleh user lain!" });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: name || existingUser.name,
        email: email || existingUser.email,
        password: password || existingUser.password, // Jika kosong, pakai yang lama
        foto: foto || existingUser.foto,
      },
    });

    return res.json({ message: "User berhasil diperbarui!", data: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Gagal memperbarui user", error });
  }
};

// 5. DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    // Validasi pencegahan jika id target tidak ditemukan sebelum di-delete
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    await prisma.user.delete({ where: { id } });
    return res.json({ message: "User berhasil dihapus!" });
  } catch (error) {
    return res.status(500).json({ message: "Gagal menghapus user", error });
  }
};