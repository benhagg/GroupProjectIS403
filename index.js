let express = require("express");
let app = express();
let path = require("path");
const port = 5001;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
    res.render("login"); // This will probably need to change to index if we want honestly. Or we can move the login page as a redirect
});


app.listen(port, () => console.log('Listening on port ' + port));