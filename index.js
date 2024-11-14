let express = require("express");
let app = express();
let path = require("path");
// Import the pages get routes from pageRoutes.js (for navigation between pages)
let pagesRouter = require("./routes/pageRoutes");
const port = 5001;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
// Serve static files (css, js, images) from the "public" folder
// For example you can link to a css file like this no matter what page you are on: <link rel="stylesheet" href="/styles.css">
app.use(express.static("public"));

// Uncomment when we want to set things up
// const knex = require("knex")({
//     client: "pg",
//     connection: {
//         host: "localhost",
//         user: "postgres",
//         password: "admin",
//         database: "assignment3",
//         port: 5432
//     }
// })

app.get("/login", (req, res) => {
    res.render("pages/login"); // This will probably need to change to index if we want honestly. Or we can move the login page as a redirect
});
// the routes are imported as pagesRouter and defined in /routes/pageRoutes.js
// example: if we get a request to /home, the pagesRouter will handle it and render the home page
app.use("/", pagesRouter);

app.listen(port, () => {
    console.log("Listening on port " + port);
    console.log(`Click here to open: http://localhost:${port}`);
});
