import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {

    const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";

    db.query(q, [req.query.followedUserId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(relationship => relationship.followerUserId));
    });
};


export const addRelationship = (req, res) => {
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
        const q = "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?)";

        const values = [
            userInfo.id,
            req.body.userId,
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Following");
        });
    });
};

export const deleteRelationship = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";

        db.query(q, [userInfo.id, req.query.userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Unfollow.");
        });
    });
};
