const advisoryForm = document.getElementById('advisoryForm');
const advisoryFormAgency = document.getElementById('advisoryFormAgency');
const advisoryFormReferenceId = document.getElementById('advisoryFormReferenceId');
const advisoryFormTitle = document.getElementById('advisoryFormTitle');
const advisoryFormDetails = document.getElementById('advisoryFormDetails');
const advisoryFormRemoveFileButton = document.getElementById('advisoryFormRemoveFileButton');
const advisoryFormFileFeedback = document.getElementById('advisoryFormFileFeedback');
const fiAdvisoryForm = document.getElementById('advisoryFormFile');

advisoryFormRemoveFileButton.addEventListener('click', (e) => {
    e.preventDefault();
    fiAdvisoryForm.value = '';
})

advisoryFilevalidation = () => {
    //No file is allowed
    if (fiAdvisoryForm.files.length === 0) {
        removeIsInvalid(fiAdvisoryForm);
        fiAdvisoryForm.classList.add('is-valid');
        return true;
    }

    //Check file type
    const filePath = fiAdvisoryForm.value;
    const allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(filePath)) {
        removeIsInvalid(fiAdvisoryForm);
        fiAdvisoryForm.classList.add('is-invalid');
        advisoryFormFileFeedback.innerText = 'File is not .pdf'
        return false;
    }

    const fsize = fiAdvisoryForm.files.item(0).size;
    const file = Math.round((fsize / 1024));
    if (file > 1024) {
        removeIsValid(fiAdvisoryForm);
        fiAdvisoryForm.classList.add('is-invalid');
        advisoryFormFileFeedback.innerText = 'File size greater than 1MB';
        return false;
    } else {
        removeIsInvalid(fiAdvisoryForm);
        fiAdvisoryForm.classList.add('is-valid');
        return true;
    }
}

const advisoryFormIsRequired = [advisoryFormAgency, advisoryFormReferenceId, advisoryFormTitle, advisoryFormDetails];
advisoryForm.addEventListener('submit', (e) => {
    let isValidForm = true;
    Array.from(advisoryFormIsRequired).forEach((input) => {
        if (!input.value) {
            removeIsInvalid(input);
            input.classList.add('is-invalid');
            isValidForm = false;
        } else {
            removeIsInvalid(input);
            input.classList.add('is-valid');
        }
    })
    if (!advisoryFilevalidation()) {
        isValidForm = false;
    }
    if (!isValidForm) {
        window.scrollTo(0, 0);
        e.preventDefault();
    }
})