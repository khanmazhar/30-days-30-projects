const formSubmit = document.getElementById('form');
const formControl = document.querySelectorAll('.form-control');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


//Show Success
function showSuccess(input) {
    input.parentElement.className = "form-control success";
}

//Show Error
function showError(input, message) {
    input.parentElement.className = "form-control error";
    input.parentElement.querySelector('small').innerText = message;
}

//Checks username
function checkUsername(input) {
    const usernameRegex = /^([a-zA-Z])([\w]{2})([a-zA-Z])?([a-zA-Z_-])?([a-zA-Z_-])?([a-zA-Z_-])?([a-zA-Z_-])?([a-zA-Z_-])?([a-zA-Z_-])?([a-zA-Z_-])?([a-zA-Z_-])?$/g;
    if (usernameRegex.test(input.value)) {
        showSuccess(input);
    } else {
        showError(input, "Username must be 3 to 12 characters long");
    }
}

//checks email
function checkEmail(input) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRegex.test(input.value)) {
        showSuccess(input);
    } else {
        showError(input, "Enter a valid email address");
    }
}

//checks passwords
function checkPasswords(input1, input2) {
    const input1Val = input1.value;
    const input2Val = input2.value;
    if (input1Val === input2Val && input1Val.length > 5 && input2Val.length > 5 && input1Val.length < 20 && input2Val.length < 20) {
        showSuccess(input1);
        showSuccess(input2);
    } else {
        showError(input1, "Password must be 5 to 20 characters long");
        showError(input2, "Password must be 5 to 20 characters long");
    }
}
/*Main event Listener*/
formSubmit.addEventListener('submit', function (e) {
    e.preventDefault();

    checkUsername(username);
    checkEmail(email);
    checkPasswords(password, password2);
});