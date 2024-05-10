import express from "express";
import {
  getStudents,
  getStudentsById,
  saveStudents,
  updateStudents,
  deleteStudents,
} from "../controller/StudentController.js";

const router = express.Router();
router.get("/students", getStudents);
router.get("/students/:id", getStudentsById);
router.post("/students", saveStudents);
router.patch("/students/:id", updateStudents);
router.delete("/students/:id", deleteStudents);

export default router;
