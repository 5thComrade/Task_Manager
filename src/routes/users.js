const express = require("express");
const validator = require("validator");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
  try {
    let name = req.body.name.trim();
    let email = req.body.email.trim();
    let password = req.body.password.trim();
    let password2 = req.body.password2.trim();
    let registration_error = [];

    const alreadyRegistered = await User.findOne({ email });

    if (name === "" || email === "" || password === "" || password2 === "") {
      registration_error.push("Please fill in all the fields to proceed");
    } else if (!validator.isEmail(email)) {
      registration_error.push("Please provide a valid email address");
    } else if (password.length < 7 || password2.length < 7) {
      registration_error.push("Password must have a minimum of 7 characters");
    } else if (
      password.toLowerCase().includes("password") ||
      password2.toLowerCase().includes("password")
    ) {
      registration_error.push(
        'The password should not contain the word "password"'
      );
    } else if (password !== password2) {
      registration_error.push("The passwords do not match");
    } else if (alreadyRegistered) {
      registration_error.push("The email is already registered!!!");
    }
    if (registration_error.length !== 0) {
      res.render("register", { registration_error, name, email });
    } else {
      const user = new User({
        name: name,
        email: email,
        password: password,
      });
      await user.save();
      const token = await user.generateToken();
      res.cookie("access_token", token);
      res.redirect("/users/dashboard");
    }
  } catch (err) {
    console.log(err);
    // console.log(err.errors[Object.keys(err.errors)[0]].properties.message);
    let registration_error = [];
    registration_error.push("Something went wrong, please contact the IT team");
    res.status(500).render("register", { registration_error });
  }
});

router.post("/login", async (req, res) => {
  try {
    let login_error = [];
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (user === "error") {
      login_error.push("Unable to login");
      res.render("login", { login_error });
    } else {
      const token = await user.generateToken();
      if (token === "error") {
        login_error.push(
          "You cannot have more than 4 open sessions! Logout from other devices."
        );
        res.render("login", { login_error });
      } else {
        res.cookie("access_token", token);
        res.redirect("/users/dashboard");
      }
    }
  } catch (err) {
    console.log(err);
    let login_error = [];
    login_error.push("Something went wrong, please contact the IT team");
    res.status(500).render("login", { login_error });
  }
});

router.get("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.redirect("/login");
  } catch (err) {
    res.status(500).send("Something went wrong. Contact the support team!!!");
  }
});

router.get("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send("Something went wrong. Contact the support team!!!");
  }
});

router.get("/dashboard", auth, (req, res) => {
  res.render("dashboard", {
    name: req.user.name,
  });
});

router.get("/me", auth, async (req, res) => {
  try {
    res.render("profile", {
      name: req.user.name,
      email: req.user.email,
      edit_path: `/users/${req.user._id}`,
    });
  } catch (err) {
    res.status(500).send("Something went wrong. Contact the support team!!!");
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password"];
    const isValidUpdation = updates.every((update) => {
      if (req.body[update] === "") {
        return false;
      } else if (update === "email") {
        return validator.isEmail(req.body[update]);
      } else {
        return allowedUpdates.includes(update);
      }
    });

    if (!isValidUpdation) {
      return res.status(500).send();
    }
    try {
      updates.forEach((update) => {
        req.user[update] = req.body[update];
      });
      await req.user.save();
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.delete("/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(202).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
