import { Request, Response } from "express";
import { prisma } from "../lib/db.js";


// GET ALL CATEGORIES
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    // Kita bungkus jadi { data: [] } biar rapi
    res.json({ data: categories }); 
  } catch (error) {
    res.status(500).json({ message: "Gagal ambil data", error });
  }
};

// CREATE CATEGORY (Di backend)
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body; // Tambahkan description di sini

    if (!name) {
      return res.status(400).json({
        message: "Name wajib diisi",
      });
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
        description, // Pastikan ini sesuai dengan nama kolom di schema.prisma
      },
    });

    res.status(201).json({
      message: "Category berhasil dibuat",
      data: newCategory,
    });
  } catch (error) {
    console.error(error); // Tambahkan log ini untuk melihat error detail di Railway
    res.status(500).json({
      message: "Gagal membuat category",
      error: error,
    });
  }
};

// GET CATEGORY BY ID
export const showCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({
        message: "Category tidak ditemukan",
      });
    }

    res.json(category);

  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil detail category",
      error,
    });
  }
};


// UPDATE CATEGORY
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return res.status(404).json({
        message: "Category tidak ditemukan",
      });
    }

    const { name } = req.body;

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
      },
    });

    res.json({
      message: "Category berhasil diupdate",
      data: updatedCategory,
    });

  } catch (error) {
    res.status(500).json({
      message: "Gagal update category",
      error,
    });
  }
};


// DELETE CATEGORY
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.category.delete({
      where: { id },
    });

    res.json({
      message: "Category berhasil dihapus",
    });

  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus category",
      error,
    });
  }
};