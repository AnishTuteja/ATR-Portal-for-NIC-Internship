const mongoose = require('mongoose');
const { Schema } = mongoose;

const incidentRequestDataSchema = new Schema({
    type: String,
    agency: String,
    referenceId: String,
    TLP: String,
    confidence: String,
    risk: String,
    IP: String,
    URL: String,
    HASH: String,
    date: String,
    details: String,
    currStatus: String,
    ticketId: String,
    Type: String,
    title: String,
    reply: [{
        sender: String,
        replyText: String,
        dateOfReply: String
    }]
})

module.exports = mongoose.model('incidentRequestData', incidentRequestDataSchema);
