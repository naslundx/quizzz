// TODO replace with sql database
let quizzes = [];
let users = [];
let answers = [];

function getUUID() {
    return Math.floor(Math.random() * 10000) + 1;
}

function createUser() {
    const uid = getUUID();
    users.push(uid);
    return uid;
}

function createQuiz(userid) {
    const uid = getUUID();
    quizzes.push({
        quizid: uid, 
        userid: parseInt(userid),
        question: "",
        answers: ""
    });
    console.log(quizzes);
    return uid;
}

function getQuiz(quizid, userid) {
    for (let q of quizzes) {
        console.log(q, quizid, userid);
        if (q.quizid === quizid) {
            if (userid === undefined || q.userid === userid) {
                return q;
            } else {
                return null;
            }
        }
    }
    return null;
}

function setQuiz(quizid, userid, question, answers) {
    const q = getQuiz(quizid);
    if (q === null) {
        return null;
    }

    q.question = question;
    q.answers = answers;
}

function setAnswer(quizid, userid, answer) {
    const q = getQuiz(quizid);
    if (q === null) {
        return null;
    }

    answers.push({
        quizid,
        userid,
        answer
    });
}

function getStats(quizid, userid) {
    const q = getQuiz(quizid, userid);
    if (q === null) {
        return null;
    }

    let result = answers.filter(a => a.quizid === quizid);

    var occurances = result.reduce((acc, curr) => {
        let value = curr.answer;
        if (acc[value]) {
            acc[value] += 1;
        } else {
            acc[value] = 1;
        }
        return acc;
    }, {});

    return occurances;
}

module.exports = { createUser, createQuiz, getQuiz, setQuiz, setAnswer, getStats };