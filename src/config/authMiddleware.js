import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const secret = process.env.TOKEN_SECRET

export default function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'acesso negado' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, secret);

        req.user = {
            id:decoded.id
        }

        return next();
    } catch (e) {

        console.log(e)
        return res.status(401).json({ error: 'Acesso negado' });
    }
}