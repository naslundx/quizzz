let userid = getCookie("userid");
if (userid === "") {
    makeRequest("GET", "/createuuid")
        .then((result) => {
            userid = result; 
            setCookie("userid", result, 1);
        })
        .catch((reason) => console.log(reason));
}

console.log(userid);
