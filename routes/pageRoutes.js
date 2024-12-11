const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const knex = require("knex")({
    client: "pg",
    connection: {
        host: process.env.RDS_HOSTNAME || "localhost",
        user: process.env.RDS_USERNAME || "postgres",
        password: process.env.RDS_PASSWORD || "Smores7531",
        database: process.env.RDS_DB_NAME || "bakery",
        port: process.env.RDS_PORT || 5434,
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
    res.render("layout", {
        title: "Home",
        page: "home",// Dynamically include the home page
    });
})

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

// mimics the post request but with a get request (so i can use an <a> tag in the navbar)
router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect("/account");
        }
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
        .catch((error) => {
            console.error(`\x1b[31m${error}\x1b[0m`);
            res.status(500).json({ success: false, message: "Error updating order status" });
        });
});

// this route is for test and debugging. if we dont figure out how to do the cart this could be used
// to create an order for every item submitted.
router.post("/createOrder", (req, res) => {
    console.log(req.body);
    console.log("order created")
    res.redirect("/shop");
})

router.get("/cart", (req, res) => {
    res.render("layout", {
        title: "Cart",
        page: "cart",
    });
});

router.post('/checkout', async (req, res) => {
    if (!req.session.user.username) {
        return res.status(401).send({ status: 'error', message: 'User not logged in' });
    }

    const username = req.session.user.username;
    const { cartItems } = req.body;

    try {
        await knex.transaction(async trx => {
            const orderResult = await trx('orders').insert({
                username: username,
                order_date: new Date()
            }).returning('order_id');

            const orderId = orderResult[0].order_id;
            console.log("Order ID:", typeof orderId, orderId);
           


            for (const item of cartItems) {
                await trx('order_items').insert({
                    order_id: orderId,
                    product_id: item.productId,
                    quantity: item.quantity
                });
            }
        });

        res.send({ status: 'success', message: 'Order placed successfully.' });
    } catch (error) {
        console.error('Transaction Error:', error);
        res.status(500).send({ status: 'error', message: 'Error processing order' });
    }
});

module.exports = router;