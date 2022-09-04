document.addEventListener("DOMContentLoaded", () => {
    main ();
    document.getElementById("btn-advice").addEventListener("click", main);
})

var adviceTitle = document.querySelector(".advice-title");
var adviceText = document.querySelector(".advice-text");

function get (url) {
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
}

function main () {
    data = get('https://api.adviceslip.com/advice');
    advicesObject = JSON.parse(data)
    advicesId = advicesObject.slip.id
    advicesAdvice = advicesObject.slip.advice;
    adviceTitle.innerHTML = "ADVICE #" + advicesId;
    adviceText.innerHTML = '"' + advicesAdvice + '"';
}
