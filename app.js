/*jshint globalstrict: true*/

const express = require('express');
const { query, validationResult } = require('express-validator');
const db = require('./storage'); 

const app = express();
app.set('view engine', 'ejs');

// Endpoints
app.get('/create', [query("userid").isInt()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.writeHead(400);
        return res.end(errors[0]);
    }

    const uid = db.createQuiz(req.query.userid);
    res.writeHead(200);
    res.end(uid.toString());
});

app.get("/createuuid", (req, res) => {
    const uid = db.createUser();
    res.writeHead(200);
    res.end(uid.toString());
});

app.get("/setquiz", (req, res) => {
    const quizid = req.query.quizid;
    const userid = req.query.userid;
    const question = req.query.question;
    const answers = req.query.answers;

    db.setQuiz(quizid, userid, question, answers);

    res.writeHead(200);
    res.end("OK");
});

app.get("/setanswer", (req, res) => {
    const quizid = req.query.quizid;
    const userid = req.query.userid;
    const answer = req.query.answer;

    db.setAnswer(quizid, userid, answer);

    res.writeHead(200);
    res.end("OK");
});

// Pages
app.get("/", (req, res) => {
    res.render("pages/index");
});

app.get("/edit", [query("quizid").isInt(), query("userid").isInt()], (req, res) => {
    const quizid = req.query.quizid;
    const userid = req.query.userid;

    const result = db.getQuiz(quizid, userid);

    if (result === null) {
        return res.render("pages/refused");
    }

    res.render("pages/edit", result);
});

app.get("/answer", (req, res) => {
    const quizid = req.params.quizid;
    const userid = req.params.userid;

    const result = db.getQuiz(quizid, userid);

    if (result === null) {
        return res.render("pages/refused");
    }

    let quiz = {
        quizid,
        userid,
        question: result.question,
        answers: result.answers.split(",")
    };

    res.render("pages/answer", quiz);
});

app.get("/result", (req, res) => {
    const quizid = req.params.quizid;
    const userid = req.params.userid;

    const quiz = db.getQuiz(quizid, userid);
    const answers = db.getStats(quizid, userid);

    const data = {
        quizid,
        userid,
        question: quiz.question,
        answers
    };

    res.render("pages/result", data);
});

// Static data
app.use(express.static('public'));

app.listen(process.env.PORT || 5000);
