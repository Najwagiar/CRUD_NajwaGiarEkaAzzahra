import { Request, Response } from "express";
import { Category } from "../types/category";

let categories: Category[] = [];

// 1. Menampilkan daftar category
export const getCategories = (req: Request, res: Response) => {
  res.json(categories);
};

// 2. Menyimpan data category baru
export const createCategory = (req: Request, res: Response) => {
  const { id, name } = req.body;

  // Validasi Sederhana, jika name belum diisi
  if (!id || !name) {
    res.status(500).json({ message: "Id dan Name harus diisi" });
  }

  // Jika validasi berhasil
  const newCategory: Category = {
    id: Date.now(),
    name: name,
  };

  // Jika sudah disusun, simpan ke array atau database
  categories.push(newCategory);

  // Jika data berhasil disimpan
  res
    .status(200)
    .json({ message: "Data berhasil disimpan", Category: newCategory });
};

// 3. Menampilkan detail category berdasarkan ID
export const showCategory = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const category = categories.find((item) => item.id === id);

  if (!category) {
    return res.status(404).json({
      message: "Category tidak ditemukan",
    });
  }

  res.status(200).json(category);
};

// 4. Mengupdate data category berdasarkan ID
export const updateCategory = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const category = categories.find((item) => item.id === id);

  if (!category) {
    return res.status(404).json({
      message: "Category tidak ditemukan",
    });
  }

  // update data
  category.name = name || category.name;

  res.status(200).json({
    message: "Category berhasil diupdate",
    category,
  });
};

// 5. Menghapus data category berdasarkan ID
export const deleteCategory = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const category = categories.find((item) => item.id === id);

  if (!category) {
    return res.status(404).json({
      message: "Category tidak ditemukan",
    });
  }

  categories = categories.filter((item) => item.id !== id);

  res.status(200).json({
    message: "Category berhasil dihapus",
  });
};
