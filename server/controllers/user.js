import { db } from "../config/connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
    const userId = req.params.userId;

    const q = "SELECT * FROM users WHERE id = ?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        const { password, ...info } = data[0];
        return res.json(info);
    });
};

export const updateUser = (req, res) => {
    // grabbing token from cookies 
    const token = req.cookies.accessToken;

    // if no token than the user is not logged in and cant reach posts
    if (!token) return res.status(401).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid")
        const q = "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";

        db.query(q, [
            req.body.name,
            req.body.city,
            req.body.website,
            req.body.coverPic,
            req.body.profilePic,
            userInfo.id,
        ], (err, data) => {
            if(err) res.status(500).json(err);
            // have updated user info
            if(data.affectedRows > 0) return res.json("Updated!");
            // if didnt change any row, the profile isn't users
            return res.json(403).json("You can update only your profile");
        });
    })
}
