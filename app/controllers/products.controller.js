const { JsonWebTokenError } = require('jsonwebtoken');
const Products = require('../../models/products.model');
const jwt = require('jsonwebtoken');
class ProductsController {
   middlewareAuthor(req, res, next) {
      const token = req.cookies.access_token;
      try {
         jwt.verify(token, process.env.SECRET_KEY);
         next();
      } catch (error) {
         res.status(404).send(error);
      }
   }
   index(req, res) {
      Products.find({})
         .then((data) => res.send(data))
         .catch((error) => res.send(error));
   }
   async post(req, res) {
      const newProduct = await new Products({
         product_name: req.body.product_name,
         price: req.body.price,
         amount: req.body.amount,
      });
      return await newProduct
         .save()
         .then(() =>
            res.status(200).send({
               message: 'successfully',
               product: newProduct,
            })
         )
         .catch((error) => res.status(404).send(error));
   }
   async patch(req, res) {
      try {
         const _id = req.params;
         const product = await Products.findOne(_id);
         const keys = Object.keys(req.body);
         keys.forEach((key) => {
            product[key] = req.body[key];
         });
         await product
            .save()
            .then(() =>
               res.status(200).send({
                  message: 'sucessfully',
                  product,
               })
            )
            .catch((error) => res.status(404).send(error));
      } catch (error) {
         res.status(404).send(error);
      }
   }
   async delete(req, res) {
      try {
         const _id = req.params;
         await Products.findByIdAndDelete(_id)
            .then((product) =>
               res.status(200).send({
                  message: 'Delete successfully',
                  product
               })
            )
            .catch((error) => res.send(error));
      } catch (error) {
         res.status(404).send(error);
      }
   }
}

module.exports = new ProductsController();
