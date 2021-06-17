function create() {
    const userid = getCookie("userid");

    makeRequest("GET", "/create?userid=" + userid)
        .then((result) => {
            window.location.href = "/edit?userid=" + userid + "&quizid=" + result;
        })
        .catch((reason) => console.log(reason));
}

function save() {
    const userid = getCookie("userid");

    const question = document.querySelector("#question").value;
    const answers = document.querySelector("#answers").value;

    const url = "/setQuiz?userid=" + userid +
                "&quizid=" + quizid +
                "&question=" + question +
                "&answers=" + answers;

    makeRequest("GET", url);
}

function submitanswer() {
    const userid = getCookie("userid");

    const answer = document.querySelector('input[name="answer"]:checked').value;
    
    const url = "/setAnswer?quizid=" + quizid +
                "&userid=" + userid +
                "&answer=" + answer;

    makeRequest("GET", url);
}