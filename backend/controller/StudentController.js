import Student from "../models/StudentsModels.js";
import path from "path";
import fs from "fs";

export const getStudents = async (req, res) => {
  try {
    const response = await Student.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// get product by id

export const getStudentsById = async (req, res) => {
  try {
    const response = await Student.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const saveStudents = (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const tugas = req.body.tugas;
  const nilai = req.body.nilai;
  const detail = req.body.detail;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Student.create({
        name: name,
        image: fileName,
        url: url,
        tugas: tugas,
        detail: detail,
        nilai: nilai,
      });
      res.status(201).json({ msg: "Product Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};
export const updateStudents = async (req, res) => {
  const product = await Student.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!product) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = product.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${product.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const name = req.body.title;
  const tugas = req.body.tugas;
  const detail = req.body.detail;
  const nilai = req.body.nilai;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Student.update(
      {
        name: name,
        image: fileName,
        url: url,
        tugas: tugas,
        detail: detail,
        nilai: nilai,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Product Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteStudents = async (req, res) => {
  const student = await Student.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!student) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/images/${student.image}`;
    fs.unlinkSync(filepath);
    await Student.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Data Pelajar dihapus" });
  } catch (error) {
    console.log(error.message);
  }
};
