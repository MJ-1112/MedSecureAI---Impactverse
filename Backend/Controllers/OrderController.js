import Order from '../Modules/Order.js';

export const createOrder = async (req,res) => {
    try{
        const { contractAddress, amount } = req.body;
        const order = new Order({ userId: req.user.id, contractAddress, amount });
        await order.save();
        res.status(201).json({message:'Order created', order});
    }catch(err){
        res.status(500).json({message:'Order creation error', error: err.message});
    }
}
