import Sequelize,{Model} from 'sequelize'

class Cart extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            image_url: {
                type: Sequelize.STRING,
                allowNull: false
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                  model: 'users', 
                  key: 'id',
                },
              },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            }
        }, 
        {
            sequelize,
            tableName: "cart",
            modelName: 'Cart'
        })
        return this
    }
}

export default Cart