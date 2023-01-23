import { db } from "../config/connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {

    const q = "SELECT userId from likes WHERE postId = ?";

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(like => like.userId));
    });
};


export const addLike = (req, res) => {
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
        const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)";

        const values = [
            userInfo.id,
            req.body.postId,
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been liked");
        });
    });
};

export const deleteLike = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

        db.query(q, [userInfo.id, req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been disliked.");
        });
    });
};
