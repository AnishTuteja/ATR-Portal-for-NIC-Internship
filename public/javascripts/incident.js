const iocRadioButtons = document.getElementsByClassName('iocButtons');
const irRadioButtons = document.getElementsByClassName('irButtons');
const advisoryRadioButtons = document.getElementsByClassName('advisoryButtons');

iocRadioButtons[0].checked = true;
irForm.style.display = 'none';
advisoryForm.style.display = 'none';

Array.from(iocRadioButtons).forEach((button) => {
    button.addEventListener('click', (e) => {
        iocForm.style.display = 'block';
        irForm.style.display = 'none';
        advisoryForm.style.display = 'none';
        iocRadioButtons[0].checked = true;
    })
})

Array.from(irRadioButtons).forEach((button) => {
    button.addEventListener('click', (e) => {
        irForm.style.display = 'block';
        iocForm.style.display = 'none';
        advisoryForm.style.display = 'none';
        irRadioButtons[1].checked = true;
    })
})

Array.from(advisoryRadioButtons).forEach((button) => {
    button.addEventListener('click', (e) => {
        iocForm.style.display = 'none';
        irForm.style.display = 'none';
        advisoryForm.style.display = 'block';
        advisoryRadioButtons[2].checked = true;
    })
})
