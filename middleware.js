const Dashboard = require("./models/dashboard");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You need to be signed in first!');
        return res.redirect('/');
    }
    next();
}

module.exports.isAuthorAgency = (req, res, next) => {
    if (req.user.agency !== 'NIC') {
        req.flash('error', 'Only NIC has the permisssion for this action');
        return res.redirect('/');
    }
    next();
}

module.exports.initDashboard = async (req, res, next) => {
    const dashboardData = await Dashboard.find({});
    if (dashboardData.length === 0) {
        const initDashboardData = new Dashboard({
            IOCCount: 0,
            IRCount: 0,
            AdvisoryCount: 0,
            NICCount: 0,
            MHACount: 0,
            IBCount: 0,
            NCIIPCCount: 0,
            CERTInCount: 0,
            DataLeakCount: 0,
            MaliciousActivityCount: 0,
            PhishingAttacksCount: 0,
            UnauthorizedCount: 0,
            OthersCount: 0,
        })
        await initDashboardData.save();
    }
    next();
}