const User = require("../models/User");

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, password, confirmPassword, image, phone } = req.body;

    //Validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório." });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "O email é obrigatório." });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "O senha é obrigatório." });
      return;
    }
    if (!confirmPassword) {
      res
        .status(422)
        .json({ message: "A confirmação de senha é obrigatória." });
      return;
    }
    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório." });
      return;
    }
    if (password !== confirmPassword) {
      res.status(422).json({
        message: "A senha e a confirmação de senha precisam ser iguais.",
      });
      return;
    }
    //Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(422).json({ message: "Por favor, utilize outro e-mail." });
      return;
    }

    res.status(200).json({ message: "OK" });
  }
};
