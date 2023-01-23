import { db } from "../config/connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
    const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u  ON (u.id = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC`;

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });

}

export const addComment = (req, res) => {
    // grabbing token from cookies 
    const token = req.cookies.accessToken;

    // if no token than the user is not logged in and cant reach posts
    if (!token) return res.status(401).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // a token but not valid
        if (err) return res.status(403).json("Token is not valid!")

        //if token is correct the userInfo will be sent
        // grabbing friends posts and users posts
        // posts table also has an id so to not be confused we name u.id to userId
        const q = "INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId`) VALUES (?)";

        const values = [
            req.body.desc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.postId,
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Comment has been created");
        });
    });
};
