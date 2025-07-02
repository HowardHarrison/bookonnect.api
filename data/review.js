import mongoose from "mongoose";

export const review = [
    {
        id: new mongoose.Types.ObjectId(),
        userId: "6856cb4f9c14b804948b7e3c",
        bookId: "685636ba9ddf61d16dbc8826",
        rating: 4,
        comment: "This book is so cool",
    },
    {
        id: new mongoose.Types.ObjectId(),
        userId: "6856cb4f9c14b804948b7e3c",
        bookId: "685636ba9ddf61d16dbc8828",
        rating: 4,
        comment: "This book is so awesome",
    },
    {
        id: new mongoose.Types.ObjectId(),
        userId: "6856cb4f9c14b804948b7e3c",
        bookId: "685636ba9ddf61d16dbc8825",
        rating: 4,
        comment: "This book is good to read.",
    },
]