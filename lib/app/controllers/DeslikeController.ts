import { Router, Request, Response } from "express";
import { Post, router } from "../../utils/decorators";
import User from "./../models/User";

export default class DislikeController {
    private router: Router = router;

    @Post("/:id/likes")
    public async deslike(req: Request, res: Response) {
        try {
            const { _id } = req.query;
            const { userId } = req.headers;

            const loggedDev = await User.findById(_id);
            const targetDev = await User.findById(userId);

            if (!targetDev) {
                res.send("User not found!");
            }

            loggedDev.schema.methods.likes.push(targetDev);

            await loggedDev.save();

            return res.send(loggedDev);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    get Router() {
        return this.router;
    }
}
