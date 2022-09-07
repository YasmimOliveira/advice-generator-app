var adviceTitle = document.querySelector(".advice-title");
var adviceText = document.querySelector(".advice-text");

document.addEventListener("DOMContentLoaded", () => {
    generateAdvice();
    document.getElementById("btn-advice").addEventListener("click", generateAdvice);
    document.getElementById("btn-search").addEventListener("click", showSweetAlert );
});

function showSweetAlert() {
    Swal.fire({
        title: "Look for advice by it's ID",
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonColor: '#1f2632',
        confirmButtonText: 'Search',
        showLoaderOnConfirm: true,
        preConfirm: (id) => {
          return fetch(`https://api.adviceslip.com/advice/${id}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
      }).then((result) => {
        if (result.isConfirmed) {
            replaceHtml(result.value.slip)
        }
    })
}

function replaceHtml(data) {
    id = data.id;
    advice = data.advice;
    adviceTitle.innerHTML = "ADVICE #" + id;
    adviceText.innerHTML = '"' + advice + '"';
}

function generateAdvice() {
    return fetch(`https://api.adviceslip.com/advice`).then(response => {
            return response.json();
    }).then (advice => {
        replaceHtml(advice.slip)
    })
    .catch(error => {
        console.log(error);
    })
}
