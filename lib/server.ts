import * as express from "express";
import { json, urlencoded } from "body-parser";
import * as cors from "cors";

import "dotenv/config";
import UserController from "./app/controllers/UserController";
import LikeController from "./app/controllers/LikeController";
import DislikeController from "./app/controllers/DeslikeController";

const app = express();
const User = new UserController();
const Likes = new LikeController();
const Dislikes = new DislikeController();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/user", [User.Router, Likes.Router, Dislikes.Router]);

app.listen(process.env.PORT, () => console.log(`Port: ${process.env.PORT}`));
