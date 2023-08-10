let incidentRequestCount = [];
let agencyCount = [];
let IRTypeCount = [];
const makeChart = async () => {
    const response = await axios.get('/getDashboardData');
    incidentRequestCount.push(response.data[0].IOCCount, response.data[0].IRCount, response.data[0].AdvisoryCount);
    agencyCount.push(response.data[0].NICCount, response.data[0].MHACount, response.data[0].IBCount, response.data[0].NCIIPCCount, response.data[0].CERTInCount);
    IRTypeCount.push(response.data[0].DataLeakCount, response.data[0].MaliciousActivityCount, response.data[0].PhishingAttacksCount, response.data[0].UnauthorizedCount, response.data[0].OthersCount);
    const incidentTypeChart = new Chart(
        document.getElementById('incidentType'), {
        type: 'doughnut',
        data: {
            labels: [
                'IOC',
                'IR',
                'Advisory'
            ],
            datasets: [{
                label: 'Incident Type',
                data: Array.from(incidentRequestCount),
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        }
    }
    );
    const agencyCountChart = new Chart(
        document.getElementById('agencyCount'), {
        type: 'doughnut',
        data: {
            labels: [
                'NIC',
                'MHA',
                'IB',
                'NCIIPC',
                'CERT-In'
            ],
            datasets: [{
                label: 'Alert Shared by Agency',
                data: Array.from(agencyCount),
                backgroundColor: [
                    'rgb(60, 157, 78)',
                    'rgb(112, 49, 172)',
                    'rgb(201, 77, 109)',
                    'rgb(28, 191, 88)',
                    'rgb(65, 116, 201)'
                ],
                hoverOffset: 4
            }]
        }
    }
    );
    const IRTypeChart = new Chart(
        document.getElementById('IRTypeChart'), {
        type: 'line',
        data: {
            labels: [
                'Data Leak',
                'Malicious Activity',
                'Phishing Attacks',
                'Unauthorised access of IT systems/Data/Social Media Accounts',
                'Others'
            ],
            datasets: [{
                label: 'IR Type Count',
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                data: Array.from(IRTypeCount),
                tension: 0.1
            }]
        }
    }
    );
}
makeChart();