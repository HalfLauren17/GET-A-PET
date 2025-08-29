const User = require("../models/User");
const bcrypt = require("bcrypt");

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

    //Create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //Create user
    const user = new User({
      name,
      email,
      password: passwordHash,
      image,
      phone,
    });

    try {
      const newUser = await user.save();
      res.status(201).json({ message: "Usuário criado.", newUser });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
};
