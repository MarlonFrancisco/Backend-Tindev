import { Router, Request, Response } from "express";
import axios from "axios";
import User from "./../models/User";

import {
    router,
    Post,
    Get,
} from "./../../utils/decorators";

export default class UserController {
    private router: Router = router;

    @Get("/")
    public async index(req: Request, res: Response) {
        try {
            const { userId } = req.headers;

            const loggedDev = await User.findById(userId);

            const users = await User.find({
                $and: [
                    { _id: { $ne: loggedDev._id } },
                    { _id: { $nin: loggedDev.schema.methods.likes }},
                    { _id: { $nin: loggedDev.schema.methods.dislikes }},
                ],
            });

            return res.send(users);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @Post("/include")
    public async include(req: Request, res: Response) {
        try {
            const { username } = req.body;

            let user = await User.findOne({ name: username });

            if (user) {
                return res.status(200).send(user);
            }

            const response = await axios.get(`https://api.github.com/users/${username}`);

            const { name, bio, avatar_url: avatar} = response.data;

            user = await User.create({
                name,
                user: username,
                bio,
                avatar,
            });

            return res.status(200).send(user);
        } catch (err) {
            return res.send(err);
        }
    }

    get Router() {
        return this.router;
    }
}
