const mongoose = require('mongoose');
const { Schema } = mongoose;

const dashboardSchema = new Schema({
    IOCCount: Number,
    IRCount: Number,
    AdvisoryCount: Number,
    NICCount: Number,
    MHACount: Number,
    IBCount: Number,
    NCIIPCCount: Number,
    CERTInCount: Number,
    DataLeakCount: Number,
    MaliciousActivityCount: Number,
    PhishingAttacksCount: Number,
    UnauthorizedCount: Number,
    OthersCount: Number
})

module.exports = mongoose.model('Dashboard', dashboardSchema);