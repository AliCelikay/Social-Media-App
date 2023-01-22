import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
    const userId = req.query.userId
    // grabbing token from cookies 
    const token = req.cookies.accessToken;

    // if no token than the user is not logged in and cant reach posts
    if (!token) return res.status(401).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // a token but not valid
        if (err) return res.status(403).json("Token is not valid!")

        //if token is correct the userInfo will be sent
        
        const q = userId ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ?` 
        
            :
            
        // grabbing friends posts and users posts
        // posts table also has an id so to not be confused we name u.id to userId
        `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE  r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`
        // r.followerUserId is users id and will fetch all relationships that belong to the user, r.followedUserId is the friend and selects only friends posts 

        const values = userId ? [userId] : [userInfo.id, userInfo.id];

        // in auth.js in server>controller we saved a token with object id key and now we can use it to get the value        
        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};


export const addPost = (req, res) => {
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
        const q = "INSERT INTO posts (`desc`, `img`, `createdAt`, `userId`) VALUES (?)";

        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been created");
        });
    });
};
