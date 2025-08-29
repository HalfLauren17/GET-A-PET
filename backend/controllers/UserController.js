const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Helpers
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

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
      res.status(422).json({ message: "A senha é obrigatório." });
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

      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    //Validations
    if (!email) {
      res.status(422).json({ message: "O email é obrigatório." });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatório." });
      return;
    }

    //Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(422)
        .json({ message: "Usuário não encontrado com o e-mail fornecido." });
      return;
    }

    //Check if passwords match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ message: "Senha inválida." });
      return;
    }

    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "Segr3doD0token");

      currentUser = await User.findById(decoded.id).select("-password");
    } else {
      currentUser = null;
    }
    res.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado." });
      return;
    }

    res.status(200).json({ user });
  }

  static async editUser(req, res) {
    const id = req.params.id;

    //Get user by token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const { name, email, password, confirmPassword, phone } = req.body;

    let image = "";

    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado." });
      return;
    }

    //Validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório." });
      return;
    }

    user.name = name;

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório." });
      return;
    }

    //Check if email is taken
    const userExists = await User.findOne({ email });

    if (user.email !== email && userExists) {
      res.status(422).json({ message: "Por favor, utilize outro e-mail." });
      return;
    }

    user.email = email;

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório." });
      return;
    }

    user.phone = phone;

    if (password !== confirmPassword) {
      res.status(422).json({
        message: "A senha e a confirmação de senha precisam ser iguais.",
      });
      return;
    } else if (password === confirmPassword && password != null) {
      //Create password
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      user.password = passwordHash;
    }

    try {
      //Update user
      await User.findOneAndUpdate(
        { _id: user.id },
        { $set: user },
        { new: true }
      );

      res.status(200).json({ message: "Usuário atualizado com sucesso." });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
};
