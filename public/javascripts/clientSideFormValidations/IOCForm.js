const iocForm = document.getElementById('iocForm');
const iocFormAgency = document.getElementById('iocFormAgency');
const iocFormReferenceId = document.getElementById('iocFormReferenceId');
const iocFormTLP = document.getElementById('iocFormTLP');
const iocFormConfidence = document.getElementById('iocFormConfidence');
const iocFormRisk = document.getElementById('iocFormRisk');
const iocFormIP = document.getElementById('iocFormIP');
const iocFormURL = document.getElementById('iocFormURL');
const iocFormHASH = document.getElementById('iocFormHASH');
const iocFormDetails = document.getElementById('iocFormDetails');
const iocFormSubmitButton = document.getElementById('iocFormSubmitButton');
const iocFormFileFeedback = document.getElementById('iocFormFileFeedback');
const iocFormIPFeedback = document.getElementById('iocFormIPFeedback');
const iocFormURLFeedback = document.getElementById('iocFormURLFeedback');
const iocFormRemoveFileButton = document.getElementById('iocFormRemoveFileButton');
const fiIocForm = document.getElementById('iocFormFile');

const iocFormIsRequired = [iocFormAgency, iocFormReferenceId, iocFormTLP, iocFormConfidence, iocFormRisk, iocFormDetails];

iocFormRemoveFileButton.addEventListener('click', (e) => {
    e.preventDefault();
    fiIocForm.value = '';
})

iocFilevalidation = () => {

    //No file is allowed
    if (fiIocForm.files.length === 0) {
        removeIsInvalid(fiIocForm);
        fiIocForm.classList.add('is-valid');
        return true;
    }

    //Check file type
    const filePath = fiIocForm.value;
    const allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(filePath)) {
        removeIsValid(fiIocForm);
        fiIocForm.classList.add('is-invalid');
        iocFormFileFeedback.innerText = 'File is not .pdf'
        return false;
    }

    //Check file size
    const fsize = fiIocForm.files.item(0).size;
    const file = Math.round((fsize / 1024));
    if (file > 1024) {
        removeIsValid(fiIocForm);
        fiIocForm.classList.add('is-invalid');
        iocFormFileFeedback.innerText = 'File size greater than 1MB';
        return false;
    } else {
        removeIsInvalid(fiIocForm);
        fiIocForm.classList.add('is-valid');
        return true;
    }
}

iocForm.addEventListener('submit', (e) => {
    let isValidForm = true;
    Array.from(iocFormIsRequired).forEach((input) => {
        if (!input.value) {
            removeIsValid(input);
            input.classList.add('is-invalid');
            isValidForm = false;
        } else {
            removeIsInvalid(input)
            input.classList.add('is-valid');
        }
    })

    if (!iocFormIP.value && !iocFormURL.value && !iocFormHASH.value) {
        removeIsValid(iocFormIP);
        removeIsValid(iocFormURL);
        removeIsValid(iocFormHASH);
        iocFormIP.classList.add('is-invalid');
        iocFormURL.classList.add('is-invalid');
        iocFormHASH.classList.add('is-invalid');
        iocFormIPFeedback.innerText = 'Missing field';
        iocFormURLFeedback.innerText = 'Missing field';
        isValidForm = false;
    } else {
        removeIsInvalid(iocFormIP);
        removeIsInvalid(iocFormURL);
        removeIsInvalid(iocFormHASH);
        if (iocFormIP.value) {
            const invalidIP = IPValidator(iocFormIP.value);
            if (invalidIP.length !== 0) {
                removeIsValid(iocFormIP);
                iocFormIP.classList.add('is-invalid');
                iocFormIPFeedback.innerText = `IP number ${invalidIP} is/are invalid`;
                isValidForm = false;
            } else {
                removeIsInvalid(iocFormIP);
                iocFormIP.classList.add('is-valid');
            }
        }
        if (iocFormURL.value) {
            const invalidURL = URLValidator(iocFormURL.value);
            if (invalidURL.length !== 0) {
                removeIsValid(iocFormURL);
                iocFormURL.classList.add('is-invalid');
                iocFormURLFeedback.innerText = `URL number ${invalidURL} is/are invalid`;
                isValidForm = false;
            } else {
                removeIsInvalid(iocFormURL);
                iocFormURL.classList.add('is-valid');
            }
        }
        if (iocFormHASH.value) {
            iocFormHASH.classList.add('is-valid');
        }
    }

    if (!iocFilevalidation()) {
        isValidForm = false;
    }

    if (!isValidForm) {
        window.scrollTo(0, 0);
        e.preventDefault();
    }
});