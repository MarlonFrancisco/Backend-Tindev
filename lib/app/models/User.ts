import db from "./../../database";
import { Schema } from "mongoose";

const model = new db.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    deslikes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
});

const User = db.model("User", model);

export default User;
