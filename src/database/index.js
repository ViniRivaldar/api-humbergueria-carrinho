import Sequelize  from "sequelize";

import database from '../config/database.js';
import Cart from '../app/models/Cart.js'

class Database{
    constructor(){
        this.connection= new Sequelize (database)
        this.init()
    }

    init(){
        Cart.init(this.connection)
    }
}

export default new Database()