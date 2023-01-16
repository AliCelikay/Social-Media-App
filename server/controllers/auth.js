import { db } from "../connect.js";
// for hashing password
import bcrypt from "bcrypt";

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

        const values = [req.body.username,req.body.email, hashedPassword, req.body.name]
        
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("User has been created");
        });
        
    });

    
}

export const login = (req, res) => {
    
}

export const logout = (req, res) => {

}
