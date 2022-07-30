const Users = require('../../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class LoginController {
   async post(req, res) {
      const user = await Users.findOne({ email: req.body.email });
      if (!user) return res.status(404).send('User not found in systems');
      const password = await bcrypt.compareSync(
         req.body.password,
         user.password
      );
      if (!password)
         return res.status(404).send('Password incorrect, please try again!');
      const token = jwt.sign(
         { email: req.body.email },
         process.env.SECRET_KEY,
         { expiresIn: '60s' }
      );
      res.cookie('access_token', token, {
         httpOnly: true,
      });
      res.status(200).send({ token });
   }
}

module.exports = new LoginController();
