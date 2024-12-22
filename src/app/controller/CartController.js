import * as yup from 'yup'

import Cart from '../models/Cart.js'

class CartController{
    async index(req,res){
        try {

            const { id: user_id } = req.user;
            const cart = await Cart.findAll({
                where:{user_id}
            })
            return res.status(200).json(cart)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                error: 'Erro ao buscar produtos',
                message: e.message,
            })
        }
    }
    async store(req,res){
        const schema = yup.object().shape({
            name:yup.string().required(),
            price: yup.number().required(),
            image_url: yup.string()
        })

        try{
            await schema.validate(req.body,{abortEarly:false})

            const {name, price,image_url} = req.body
            const user_id = req.user.id;

            const cart = await Cart.create({
                name, 
                price,
                image_url,
                user_id
            })

            return res.status(201).json({cart})
        }catch (e) {
            if (e instanceof yup.ValidationError) {
                return res.status(400).json({ errors: e.errors });
            }
            console.log(e);
            return res.status(500).json({ message: 'Erro interno no servidor. Tente novamente.' });
        }
    }
    async delete(req,res){

        try {
            const { id } = req.params;

            const { id: user_id } = req.user; 
        
            const cart = await Cart.findOne({
                where:{id,user_id}
            })

            if (!cart) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            await cart.destroy();    

            return res.status(204).send();

        } catch (e) {
            return res.status(500).json({
                error: 'Erro ao deletar produto',
                message: e.message,
            });
        }
        
    }
}

export default new CartController()