// TODO replace with sql database
quizzes = []
users = []

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
        userid: parseInt(userid)
    });
    console.log(quizzes);
    return uid;
}

function getQuiz(quizid, userid) {
    for (let q of quizzes) {
        console.log(q, quizid, userid);
        if (q.quizid == quizid) {
            if (q.userid == userid) {
                return q;
            } else {
                return null;
            }
        }
    }
    return undefined;
}

module.exports = { createUser, createQuiz, getQuiz };