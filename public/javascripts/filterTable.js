const table = document.getElementById('dataTable');
const tableRows = table.getElementsByTagName('tr');

const filterTableAgency = function (agency) {
    if (agency === 'all')
        return showAll();
    for (let i = 1; i < tableRows.length; ++i) {
        const currRowCols = tableRows[i].getElementsByTagName('td');
        if (currRowCols[2].innerText === agency) {
            tableRows[i].style.display = '';
        } else {
            tableRows[i].style.display = 'none';
        }
    }
}

const filterTableType = function (type) {
    if (type === 'all')
        return showAll();
    for (let i = 1; i < tableRows.length; ++i) {
        const currRowCols = tableRows[i].getElementsByTagName('td');
        if (currRowCols[3].innerText === type) {
            tableRows[i].style.display = '';
        } else {
            tableRows[i].style.display = 'none';
        }
    }
}

const filterTableStatus = function (status) {
    if (status === 'all')
        return showAll();
    for (let i = 1; i < tableRows.length; ++i) {
        const currRowCols = tableRows[i].getElementsByTagName('td');
        if (currRowCols[7].innerText === status) {
            tableRows[i].style.display = '';
        } else {
            tableRows[i].style.display = 'none';
        }
    }
}

const showAll = function () {
    for (let i = 1; i < tableRows.length; ++i) {
        tableRows[i].style.display = '';
    }
}