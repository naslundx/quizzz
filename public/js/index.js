function create() {
    const userid = getCookie("userid");

    makeRequest("GET", "/create?userid=" + userid)
        .then((result) => {
            window.location.href = "/edit?userid=" + userid + "&quizid=" + result;
        })
        .catch((reason) => console.log(reason));
}

function save() {
    // TODO update entry on quiz
}

function submitanswer() {
    // TODO submit answer
}