const { Category, sequelize } = require("../../models");
const { Product } = require("../../models");

const productController = {
    createCategory: async (req, res) => {
        const {name} = req.body

        try{
            await sequelize.transaction (async (t) => {
                const result = await Category.create({
                    name: name
                }, {transaction: t})
                console.log(result)
                return res.status(200).json({
                    message: "Product's Category successfully created!"
                })
            })
            

        }catch(error){
            console.log(error)
            return res.status(500).json({
                message: error.message
            })
        }
    },
    editCategory: async (req, res) => {
        const {name} = req.body
        try{
            await sequelize.transaction (async (t) => {
                const result = await Category.update({
                    name
                },{
                    where: {id: req.params.id}
                }, {transaction: t})
    
                return res.status(200).json({
                    message: "Product's Category successfully changed!"
                })
            })
            

        }catch(error){
            return res.status(500).json({
                message: error.message
            })
        }
    },
    deleteCategory: async(req, res) => {
        try{
            await sequelize.transaction (async (t) => {

                const result = await Product.update({
                    isActive: false,
                  },
                  {
                    where: {
                      categoryId: req.params.id
                    }
                  })
                  Category.destroy({
                    where: {id: req.params.id}
                }, {transaction: t})
    
                return res.status(200).json({
                    message: "Product's Category successfully deleted."
                })
            })

        }catch(error){
            return res.status(500).json({
                message: error.message
            })
        }
    },
    createProduct: async (req, res) => {
        try{
            const {name, price, quantity, categoryId, isActive} = req.body
            const productImg = req.file.path

            await sequelize.transaction (async (t) => {
                const result = await Product.create({
                    name,
                    price,
                    quantity,
                    categoryId,
                    productImg: productImg,
                    isActive
                }, {transaction: t})
        
                return res.status(200).json({
                    message: "Product successfully created!",
                    data: result
                })
            })
        }
        catch(error){
            return res.status(500).json({
                message: error.message
            })
        }
    },
    editProduct: async (req, res) => {
        try{
            const {name, price, quantity, categoryId, isActive} = req.body;
            const productImg = req.file.path

            await sequelize.transaction (async (t) => {
                const result = await Product.update({
                    name,
                    price,
                    quantity,
                    categoryId,
                    productImg: productImg,
                    isActive
                },
                {
                    where: {
                        id: req.params.id
                    }
                }, {transaction: t})
                    return res.status(200).json({
                        message: "Product successfully updated!"
                    })
            })
        }
        catch(error){
            return res.status(500).json({
                message: error.message
            })
        }
    }
};

module.exports = productController;
