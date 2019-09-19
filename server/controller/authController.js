const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    try {
      const db = req.app.get("db");
      const {
        email,
        hash,
        first_name,
        last_name,
        gender,
        user_age,
        zipcode,
        bio,
        status,
        topic_id,
        profile_pic
      } = req.body;
      // console.log(req.body)
      const user = await db.find_email([email]);
      if (user.length > 0) {
        return res.status(400).send({ message: "Email in use." });
      }
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(hash, salt);
      const newUser = await db.create_user_profile([
        email,
        password,
        first_name,
        last_name,
        gender,
        user_age,
        zipcode,
        bio,
        status,
        topic_id,
        profile_pic
      ]);
      req.session.user = newUser[0];
      // console.log(req.session.user)
      delete newUser[0].password;
      res.status(200).send({
        message: "Logged in",
        user: req.session.user,
        loggedIn: true
      });
    } catch (err) {
      res.status(500).send({ message: "Failed to register" });
    }
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    // console.log(req.body)
    try {
      const user = await db.find_email([email]);
      if (user.length === 0) {
        return res
          .status(400)
          .send({ message: "Email not found" })
      }
      const result = bcrypt.compareSync(password, user[0].password);
      // console.log(password, user[0].password)
      if (result) {
        delete user[0].password;
        req.session.user = user[0];
        return res.status(200).send({
          message: "Logged in",
          user: req.session.user,
          loggedIn: true
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  getSession: (req, res) => {
    if (req.session) {
      res.status(200).send(req.session);
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send({ message: "Logged out" });
  }
};
