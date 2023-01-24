// require('dotenv').config();
import { db } from "../config/connect.js";
// for hashing password
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    //check user if exists
    // ? provides extra security over req.body.username
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if(err) return res.status(500).json(err);
        // if the username exists 
        if(data.length) return res.status(409).json("User already exists");
        
        //else create new user
         // hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?)";

        const values = [
            req.body.username,
            req.body.email, 
            hashedPassword, 
            req.body.name,
        ]
        
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("User has been created");
        });
        
    });
    
}

export const login = (req, res) => {
    //check if user exists
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, (req.body.username), (err, data) => {
        // if err exists
        if(err) return res.status(500).json(err);

        // if no username
        if(data.length === 0) return res.status(404).json("User not found");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);

        // if password doesnt match
        if(!checkPassword) return res.status(400).json("Wrong password or username")

        const token = jwt.sign({id:data[0].id}, 'secretkey');

        const {password, ...userInfo} = data[0];
        console.log(password);
        // cookie name is accessToken
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(userInfo)
    });
}

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite:"none"
    }).status(200).json("User has been logged out")
}
