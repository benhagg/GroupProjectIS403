const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const knex = require("knex")({
    client: "pg",
    connection: {
        host: process.env.RDS_HOSTNAME || "localhost",
        user: process.env.RDS_USERNAME || "postgres",
        password: process.env.RDS_PASSWORD || "admin",
        database: process.env.RDS_DB_NAME || "graneBakery",
        port: process.env.RDS_PORT || 5432,
    },
});

// Middleware to parse JSON and URL-encoded data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    req.session.originalUrl = req.originalUrl;
    res.redirect("/login");
}

// Define routes for each page
router.get("/", (req, res) => {
    knex("products")
        .select()
        .then((products) => {
            // Render the layout with home page content in the body
            res.render("layout", {
                title: "Home",
                page: "home",// Dynamically include the home page
                products: products, //Pass in the product table to display products
            });
        })
});

router.get("/account", checkAuthenticated, (req, res) => {
    knex("users")
        .select()
        .where('username', req.session.user.username)
        .first()
        .then((user) => {
            // Render the layout with home page content in the body
            res.render("layout", {
                title: "Account",
                page: "account", // Dynamically include the account page
                user: user
            });
        })

});

router.get("/contact", (req, res) => {
    // Render the layout with contact page content in the body
    res.render("layout", {
        title: "Contact",
        page: "contact", // Dynamically include the contact page
    });
});

router.post("/contact", (req, res) => {
    const {
        name,
        email,
        message,
    } = req.body;
    knex("contacts")
        .insert({
            name: name || '',
            email: email || '',
            message: message || '',
        })

});

router.get("/shop", (req, res) => {
    knex("products")
        .select()
        .then((products) => {
            // Render the layout with home page content in the body
            res.render("layout", {
                title: "Shop",
                page: "shop", // Dynamically include the shop page
                products: products, //Pass in the product table to display products
            });
        })
    // Render the layout with shop page content in the body

});

router.get("/login", (req, res) => {
    res.render("pages/login", {
        originalUrl: req.session.originalUrl || '/'
    });
});

// Route to handle login form submission
router.post("/login", async (req, res) => {
    const username = req.body.username.toLowerCase();
    const password = req.body.password.toLowerCase();
    // Query the user table to find the record
    knex("users")
        .select()
        .where({ username, password })
        .first()
        .then((user) => {
            req.session.authenticated = true;
            req.session.user = {
                username: user.username,
            };
            res.redirect("/");
        })
        .catch((error) => {
            console.log(`\x1b[31m${error}\x1b[0m`);
            req.session.authenticated = false;
            res.redirect("/login");
        });
});

router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect("/account");
        }
        res.redirect("/login");
    });
});

router.get("/orders", (req, res) => {
    knex("orders as o")
        .join("order_items as oi", "o.order_id", "oi.order_id")
        .join("products as p", "oi.product_id", "p.product_id")
        .select(
            "o.*",
            knex.raw(`
                json_agg(json_build_object(
                    'order_item_id', oi.order_item_id,
                    'product_id', oi.product_id,
                    'quantity', oi.quantity,
                    'modifications', oi.modifications,
                    'name', p.name,
                    'description', p.description,
                    'price', p.price,
                    'image_url', p.image_url
                )) as products
            `)
        )
        .where("o.status", null)
        .groupBy("o.order_id")
        .then((orders) => {
            res.render("layout", {
                title: "Orders",
                page: "orders",
                orders: orders,
            });
        })
        .catch((error) => {
            console.log(`\x1b[31m${error}\x1b[0m`);
            res.status(500).send("Error retrieving orders");
        });
});

router.post("/updateOrderStatus", (req, res) => {
    const { orderId, status } = req.body;
    knex("orders")
        .where({ order_id: orderId })
        .update({ status: status })
        .then(() => {
            res.redirect("/orders");
        })
        .catch((error) => {
            console.error(`\x1b[31m${error}\x1b[0m`);
            res.status(500).json({ success: false, message: "Error updating order status" });
        });
});

module.exports = router;
