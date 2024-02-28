import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload, // Parte a la que se genera token
            TOKEN_SECRET,  // Palabra secreta
            { expiresIn: "1d" },  // Tiempo de expiración
            (err, token) => {
                if (err) reject(err)
                resolve(token);
            }
        )
    })
}