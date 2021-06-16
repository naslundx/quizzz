const inputEl = document.getElementById("msg");
const outputEl = document.getElementById("output");
const buttonEl = document.getElementById("submit");

function submitmessage() {
    let xml = new XMLHttpRequest();
    const msg = inputEl.value;
    xml.open("GET", "/submit?data=" + msg);
    xml.onreadystatechange = () => {
        if (xml.readyState == XMLHttpRequest.DONE) {
            outputEl.innerText = "Tack!";
            inputEl.value = "";
            buttonEl.disabled = true;
        }
    }
    xml.send();
}