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

export const writers = [
  {
    _id: writerIds[0],
    name: "Tatkatho Bhone Naing",
    bio: "Romance author famous among teenagers.",
    birthDate: "",
    nationality: "Myanmar",
    profileImage: "profile.jpg",
  },
  {
    _id: writerIds[1],
    name: "Min Thane Kha",
    bio: "Famous author among teenage boys.",
    birthDate: "",
    nationality: "Myanmar",
    profileImage: "profile.jpg",
  },
  {
    _id: writerIds[2],
    name: "Bamaw Thein Pe",
    bio: "Author who already translated many inspirational books.",
    birthDate: "",
    nationality: "Myanmar",
    profileImage: "profile.jpg",
  }
]

export const categories = [
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

export const books = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: "သူငယ်ချင်းလို့ပဲဆက်၍ခေါ်မည်ခိုင်",
    description: "",
    publishDate: "",
    writer: "68562e67a7845c70fd666990",
    categories: ['68562e67a7845c70fd666993','68562e67a7845c70fd666994'],
    coverImage: "book1.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "တပြည်သူမရွှေထား",
    description: "",
    publishDate: "",
    writer: "68562e67a7845c70fd666990",
    categories: ['68562e67a7845c70fd666993','68562e67a7845c70fd666994'],
    coverImage: "book2.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
    {
    _id: new mongoose.Types.ObjectId(),
    title: "ဆာရစ်ချတ် ဘရင်ဆန်",
    description: "Virgin Group ၏စွန့်ဦးတီထွင်သူကိုဖော်ပြသည်။",
    publishDate: "",
    writer: '68562e67a7845c70fd666992',
    categories: ['68562e67a7845c70fd666997','68562e67a7845c70fd666998'],
    coverImage: "branson.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "လီကာရှင်း",
    description: "",
    publishDate: "",
    writer: '68562e67a7845c70fd666992',
    categories: ['68562e67a7845c70fd666997','68562e67a7845c70fd666998'],
    coverImage: "lee.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "ကမ္ဘာကုန်ကျယ်သရွေ့ဝယ်",
    description: "",
    publishDate: "",
    writer: "68562e67a7845c70fd666990",
    categories: ['68562e67a7845c70fd666993','68562e67a7845c70fd666994'],
    coverImage: "book3.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "နွေကန္တာဦး",
    description: "",
    publishDate: "",
    writer: "68562e67a7845c70fd666990",
    categories: ['68562e67a7845c70fd666993','68562e67a7845c70fd666994'],
    coverImage: "book4.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "ရှန်ဂရီလာ",
    description: "",
    publishDate: "",
    writer: "68562e67a7845c70fd666991",
    categories: ['68562e67a7845c70fd666995','68562e67a7845c70fd666996'],
    coverImage: "book5.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "တို့ယာမြေ",
    description: "",
    publishDate: "",
    writer: "68562e67a7845c70fd666991",
    categories: ['68562e67a7845c70fd666995','68562e67a7845c70fd666996'],
    coverImage: "book6.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "အီလွန်မတ်",
    description: "နည်းပညာရဲ့ဦးဆောင်သူ Elon Musk ၏ဘဝဇာတ်ကြောင်း။",
    publishDate: "",
    writer: '68562e67a7845c70fd666992',
    categories: ['68562e67a7845c70fd666997','68562e67a7845c70fd666998'],
    coverImage: "elon.JPG",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "ဂျက်မားနှင့် အလီဘာဘာ",
    description: "Alibaba ၏တည်ထောင်သူအကြောင်း။",
    publishDate: "",
    writer: '68562e67a7845c70fd666992',
    categories: ['68562e67a7845c70fd666997','68562e67a7845c70fd666998'],
    coverImage: "jackma.JPG",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
    {
    _id: new mongoose.Types.ObjectId(),
    title: "ဝံပုလွေများနှင့်ကခုန်သူ",
    description: "",
    publishDate: "",
    writer: "68562e67a7845c70fd666991",
    categories: ['68562e67a7845c70fd666995','68562e67a7845c70fd666996'],
    coverImage: "book7.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "နောက်ဆုံးမြေ",
    description: "",
    publishDate: "",
    writer: "68562e67a7845c70fd666991",
    categories: ['68562e67a7845c70fd666995','68562e67a7845c70fd666996'],
    coverImage: "book8.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];




