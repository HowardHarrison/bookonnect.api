import mongoose from "mongoose";

const writerIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),  
]

const categoryIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),  
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(), 
]

const bookIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
]; 

const writers = [
  {
    _id: writerIds[0],
    name: "Jue",
    bio: "Famous author among teenage girls.",
    birthDate: "",
    nationality: "Myanmar"
  },
  {
    _id: writerIds[1],
    name: "Min Thane Kha",
    bio: "Famous author among teenage boys.",
    birthDate: "",
    nationality: "Myanmar"
  },
  {
    _id: writerIds[2],
    name: "Bamaw Thein Pe",
    bio: "Author who already translated many inspirational books.",
    birthDate: "",
    nationality: "Myanmar"
  }
]

const categories = [
  {
    _id: categoryIds[0],
    name: "Romance"
  },
  {
    _id: categoryIds[1],
    name: "Drama"
  },
  {
    _id: categoryIds[2],
    name: "Action"
  },
  {
    _id: categoryIds[3],
    name: "Adventure"
  },
  {
    _id: categoryIds[4],
    name: "Biography"
  },
  {
    _id: categoryIds[5],
    name: "Translation"
  },
]

// const books = [
//     {

//     }
// ]




