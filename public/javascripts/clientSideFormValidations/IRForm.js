const irForm = document.getElementById('irForm');
const irType = document.getElementById('irFormType');
const irFormIP = document.getElementById('irFormIP');
const irFormURL = document.getElementById('irFormURL');
const irFormDetails = document.getElementById('irFormDetails');
const irFormRemoveFileButton = document.getElementById('irFormRemoveFileButton');
const irFormIPFeedback = document.getElementById('irFormIPFeedback');
const irFormURLFeedback = document.getElementById('irFormURLFeedback');
const fiIrForm = document.getElementById('irFormFile');

const irFormIsRequired = [irType, irFormDetails];
irFormRemoveFileButton.addEventListener('click', (e) => {
    e.preventDefault();
    fiIrForm.value = '';
})

irFilevalidation = () => {
    //No file is allowed
    if (fiIrForm.files.length === 0) {
        removeIsInvalid(fiIrForm);
        fiIrForm.classList.add('is-valid');
        return true;
    }

    //Check file type
    const filePath = fiIrForm.value;
    const allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(filePath)) {
        removeIsValid(fiIrForm);
        fiIrForm.classList.add('is-invalid');
        irFormFileFeedback.innerText = 'File is not .pdf'
        return false;
    }

    //Check file size
    const fsize = fiIrForm.files.item(0).size;
    const file = Math.round((fsize / 1024));
    if (file > 1024) {
        removeIsValid(fiIrForm);
        fiIrForm.classList.add('is-invalid');
        irFormFileFeedback.innerText = 'File size greater than 1MB';
        return false;
    } else {
        removeIsInvalid(fiIrForm);
        fiIrForm.classList.add('is-valid');
        return true;
    }
}

irForm.addEventListener('submit', (e) => {
    let isValidForm = true;
    Array.from(irFormIsRequired).forEach((input) => {
        if (!input.value) {
            removeIsValid(input);
            input.classList.add('is-invalid');
            isValidForm = false;
        } else {
            removeIsInvalid(input);
            input.classList.add('is-valid');
        }
    })

    if (!irFormIP.value && !irFormURL.value) {
        removeIsValid(irFormIP);
        removeIsValid(irFormURL);
        irFormIP.classList.add('is-invalid');
        irFormURL.classList.add('is-invalid');
        irFormIPFeedback.classList.innerText = 'Missing field';
        irFormURLFeedback.classList.innerText = 'Missing field';
        isValidForm = false;
    } else {
        removeIsInvalid(irFormIP);
        removeIsInvalid(irFormURL);
        if (irFormIP.value) {
            const invalidIP = IPValidator(irFormIP.value);
            if (invalidIP.length !== 0) {
                removeIsValid(irFormIP);
                irFormIP.classList.add('is-invalid');
                irFormIPFeedback.innerText = `IP number ${invalidIP} is/are invalid`;
                isValidForm = false;
            } else {
                removeIsInvalid(irFormIP);
                irFormIP.classList.add('is-valid');
            }
        }
        if (irFormURL.value) {
            const invalidURL = URLValidator(irFormURL.value);
            if (invalidURL.length !== 0) {
                removeIsInvalid(irFormURL);
                irFormURL.classList.add('is-invalid');
                irFormURLFeedback.innerText = `URL number ${invalidURL} is/are invalid`;
                isValidForm = false;
            } else {
                removeIsInvalid(irFormURL);
                irFormURL.classList.add('is-valid');
            }
        }
    }

    if (!irFilevalidation()) {
        isValidForm = false;
    }
    if (!isValidForm) {
        window.scrollTo(0, 0);
        e.preventDefault();
    }
});
