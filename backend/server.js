import express from "express";
import Fileupload from "express-fileupload";
import cors from "cors";
import StudentRoute from "./routes/StudentRoute.js";

const app = express();

//midleware
app.use(cors());
app.use(express.json());
app.use(Fileupload());
app.use(express.static("public"))
app.use(StudentRoute);

app.listen(3000, () => console.log("server sedang berjalan"));
