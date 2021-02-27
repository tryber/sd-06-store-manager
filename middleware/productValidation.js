const productsModels = require('../models/productsModels')
const { status, Messages } = require('../util/dataStatus');

const { notFormated } = status;
const { invalidName, largerZero, invalidQtt, productExist } = Messages;

const productValidated = async (req , res, next) => {
    const { name, quantity } = req.body
    console.log(name)
    const nameInMongoDb = await productsModels.findByName(name);

     if(name.length < 5) return res.status(notFormated).json(invalidName);
     if(quantity < 0 || quantity === 0) return res.status(notFormated).json(largerZero)
     if(typeof quantity === 'string') return res.status(notFormated).json(invalidQtt);
     if(!nameInMongoDb) return res.status(notFormated).json(productExist)
    
    next();
}



module.exports = {
    productValidated
}