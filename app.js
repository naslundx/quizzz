const express = require('express');
const { query, validationResult } = require('express-validator');

const app = express();
app.set('view engine', 'ejs');

// app.get('/submit', [query("data").isString().isLength({min: 3, max: 50})], (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         res.writeHead(400);
//         res.end(errors[0].msg);
//         return;
//     }

//     all_messages.push(req.query.data);
//     res.writeHead(200);
//     res.end("OK");
// });

app.get("/", (req, res) => {
    res.render("pages/index", {messages: all_messages.slice().reverse()});
});

app.use(express.static('public'));

app.listen(process.env.PORT);
