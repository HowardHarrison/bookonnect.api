import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { seedAdmin } from "./data/admin.js";
import Writer from "./models/Writer.js";
import { books, categories, writers } from "./data/index.js";
import Category from "./models/Category.js";
import Book from "./models/Book.js";
import { seedUser } from "./data/user.js";
import bookRoutes from './routes/book.js'
import authRoutes from './routes/auth.js'
import reactionRoutes from './routes/reaction.js'
import reviewRoutes from './routes/review.js'
import Reaction from "./models/Reaction.js";
import { reaction } from "./data/reaction.js";
import Review from "./models/Review.js";
import { review } from "./data/review.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// routes
app.use('/books', bookRoutes);
app.use('/', authRoutes);
app.use('/reactions', reactionRoutes);
app.use('/reviews', reviewRoutes);

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // await seedAdmin();
    // Writer.insertMany(writers);
    // Category.insertMany(categories);
    // Book.insertMany(books);
    //Reaction.insertMany(reaction);
    //Review.insertMany(review);
    // await seedUser();
  })
  .catch((error) => console.log(`${error} did not connect`));    