/*jshint globalstrict: true*/

const express = require('express');
const { query, validationResult } = require('express-validator');
const { createUser, createQuiz, getQuiz } = require('./storage'); 

const app = express();
app.set('view engine', 'ejs');

// Endpoints
app.get('/create', [query("userid").isInt()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.writeHead(400);
        return res.end(errors[0]);
    }

    const uid = createQuiz(req.query.userid);
    res.writeHead(200);
    res.end(uid.toString());
});

app.get("/createuuid", (req, res) => {
    const uid = createUser();
    res.writeHead(200);
    res.end(uid.toString());
});

// Pages
app.get("/", (req, res) => {
    res.render("pages/index");
});

app.get("/edit", [query("quizid").isInt(), query("userid").isInt()], (req, res) => {
    const quizid = req.query.quizid;
    const userid = req.query.userid;

    const result = getQuiz(quizid, userid);

    if (result === null) {
        return res.render("pages/refused");
    }

    res.render("pages/edit", result);
})

app.get("/answer", (req, res) => {
    const quizid = req.params.quizid;
    const userid = req.params.userid;

    // TODO check if already answered, if so get results

    const result = getQuiz(quizid, userid);

    if (result === null) {
        return res.render("pages/refused");
    }

    res.render("pages/answer", result)
})

app.get("/result", (req, res) => {
    const quizid = req.params.quizid;
    const userid = req.params.userid;

    const result = getQuiz(quizid, userid);

    if (result === null) {
        return res.render("pages/refused");
    }

    // TODO get answer stats

    res.render("pages/result", result)
})

// Static data
app.use(express.static('public'));

app.listen(process.env.PORT || 5000);
