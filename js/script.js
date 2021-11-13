let storageLocal = window.localStorage;

const form = document.getElementById('form');
form.addEventListener('submit', validation);
form.addEventListener('change', (event) => {
    let text = `Invalid ${event.target.name} given`;
    checkInput(event.target, text);
});

const progressBar = document.getElementsByClassName("progress-bar")[0];
window.addEventListener("scroll", changeProgress);

function changeProgress() {
    let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let windowScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let progress = (windowScroll/windowHeight) * 100;
    progressBar.style.width = progress + "%";
}

function showMenu() {
    document.getElementsByClassName("menu-items")[0].classList.toggle("menu-items-show");
    document.getElementsByClassName("menu-button")[0].classList.toggle("menu-close-button");
}

function openModal() {
    document.getElementsByClassName("modal")[0].style.display = "block";
}

function closeModal() {
    document.getElementsByClassName("modal")[0].style.display = "none";
}

function validation(event) {
    let success = 1;

    for (let i = 0; i < form.elements.length; i++) {
        let elem = form.elements[i];

        if (elem.type !== "submit") {
            let text = `Invalid ${elem.name} given`;

            if(!checkInput(elem, text)) {
                event.preventDefault();
                success = 0;
            }
        }
    }

    if(success) {
        const userFields = {
            "name": form.elements[0].value,
            "email": form.elements[1].value,
            "message": form.elements[2].value
        }

        let users = JSON.parse(storageLocal.getItem('users'));
        if(users === null) {
            users = [];
        }

        storageLocal.setItem('user', JSON.stringify(userFields));
        users.push(userFields);
        storageLocal.setItem('users', JSON.stringify(users));
    }
}

function checkInput(elem, text) {
    clearError(elem, elem.parentElement);

    let reg;

    switch(elem.name) {
        case "name":
            reg = /^[a-zA-Z]+$/;
            break;
        case "email":
            reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
            break;
        default:
            return 1;
    }

    if(elem.value.trim().length === 0) {
        addError(elem, elem.parentElement, "Required");
        return 0;
    } else if (!reg.test(elem.value.trim())) {
        addError(elem, elem.parentElement, text);
        return 0;
    }

    return 1;
}

function addError(elem, parent, text) {
    elem.classList.add('error');
    let span = document.createElement('span');
    span.textContent = text;
    parent.appendChild(span);
}

function clearError(elem, parent) {
    elem.classList.remove('error');
    if(parent.querySelector('span') !== null) {
        parent.removeChild(parent.querySelector('span'));
    }
}