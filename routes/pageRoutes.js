const express = require("express");
const router = express.Router();

// Define routes for each page
router.get("/home", (req, res) => {
  // Render the layout with home page content in the body
  res.render("layout", {
    title: "Home",
    page: "home", // Dynamically include the home page
    // the page content is included in the layout.ejs file. passing include("pages/home") will
    // include the home.ejs file in the body of the layout.ejs file
  });
});

router.get("/account", (req, res) => {
  // Render the layout with account page content in the body
  res.render("layout", {
    title: "Account",
    page: "account", // Dynamically include the account page
  });
});
router.get("/contact", (req, res) => {
  // Render the layout with contact page content in the body
  res.render("layout", {
    title: "Contact",
    page: "contact", // Dynamically include the contact page
  });
});

router.get("/shop", (req, res) => {
  // Render the layout with shop page content in the body
  res.render("layout", {
    title: "Shop",
    page: "shop", // Dynamically include the shop page
  });
});

module.exports = router;
