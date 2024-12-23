import express from 'express'
import cors from 'cors'

import CartRoutes from './app/routes/CartRoutes.js'
import './database/index.js'

class App{
    constructor(){
        this.app = express()
        this.middleware()
        this.routes()
    }

    middleware(){
        this.app.use(cors(  
            origin: 'http://127.0.0.1:3000',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type', 'Authorization'], 
          credentials: true, 
))
        this.app.use(express.json())
    }

    routes(){
        this.app.use('/cart', CartRoutes)
    }
}

export default new App().app

