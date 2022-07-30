const Users = require('../../models/users.model');
class UserControllers {
   get(req, res) {
      try {
         Users.find({})
            .then((users) => res.send(users))
            .catch((error) => res.status(404).send(error));
      } catch (error) {
         res.status(404).send(error);
      }
   }
}

module.exports = new UserControllers();
