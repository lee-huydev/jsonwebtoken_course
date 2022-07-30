const Users = require('../../models/users.model');
const bcrypt = require('bcrypt')
class RegisterUsers {
   async post(req, res) {
      const password = await bcrypt.hash(
         req.body.password,
         Number(process.env.SALT_PASS)
      );
      const emailExits = await Users.findOne({ email: req.body.email });
      if (!emailExits) {
         const newUser = await new Users({
            name: req.body.name,
            age: req.body.age,
            address: req.body.address,
            gender: req.body.gender,
            email: req.body.email,
            password,
         });
         return newUser
            .save()
            .then(() => {
               res.status(200).send({
                  message: 'successfully',
                  user: newUser,
               });
            })
            .catch((error) => {
               res.status(404).send({
                  message: 'failure',
                  error,
               });
            });
      } else {
         res.status(401).send({
            message: 'failure',
            error: 'Email already exist in systems',
         });
      }
   }
}

module.exports = new RegisterUsers()
