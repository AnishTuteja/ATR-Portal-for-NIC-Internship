const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const getCurrentDate = require('./utils/getCurrentDate');
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAysnc');
const incidentRequestData = require('./models/incidentRequestData');
const User = require('./models/user');
const Dashboard = require('./models/dashboard')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { validateIOCForm, validateRegisterForm, validateIRForm, validateAdvisoryForm } = require('./serverSideValidation');
const { isLoggedIn, isAuthorAgency, initDashboard } = require('./middleware');
const { update } = require('./models/dashboard');


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);

app.use(express.static(path.join(__dirname, '/public/')))
app.use(express.urlencoded({ extended: true }))
const sessionConfig = {
    secret: 'thisShouldBeASecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        // maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/atrPortal')
    .then(() => {
        console.log('connected successfully to database')
    })
    .catch(() => {
        console.log('conncetion to database failed');
    })

const updateAgencyCount = async (agency) => {
    const dashboardData = await Dashboard.find({});
    if (agency === 'NIC')
        await Dashboard.findOneAndUpdate({}, { NICCount: dashboardData[0].NICCount + 1 });
    else if (agency === 'MHA')
        await Dashboard.findOneAndUpdate({}, { MHACount: dashboardData[0].MHACount + 1 });
    else if (agency === 'IB')
        await Dashboard.findOneAndUpdate({}, { IBCount: dashboardData[0].IBCount + 1 });
    else if (agency === 'NCIIPC')
        await Dashboard.findOneAndUpdate({}, { NCIIPCCount: dashboardData[0].NCIIPCCount + 1 });
    else if (agency === 'CERT-In')
        await Dashboard.findOneAndUpdate({}, { CERTInCount: dashboardData[0].CERTInCount + 1 });
}

const updateIRTypeCount = async (req) => {
    const dashboardData = await Dashboard.find({});
    const type = req.body.Type;
    if (type === 'Data Leak')
        await Dashboard.findOneAndUpdate({}, { DataLeakCount: dashboardData[0].DataLeakCount + 1 });
    else if (type === 'Malicious Activity')
        await Dashboard.findOneAndUpdate({}, { MaliciousActivityCount: dashboardData[0].MaliciousActivityCount + 1 });
    else if (type === 'Phishing Attacks')
        await Dashboard.findOneAndUpdate({}, { PhishingAttacksCount: dashboardData[0].PhishingAttacksCount + 1 });
    else if (type === 'Unauthorised access of IT systems/Data/Social Media Accounts')
        await Dashboard.findOneAndUpdate({}, { UnauthorizedCount: dashboardData[0].UnauthorizedCount + 1 })
    else
        await Dashboard.findOneAndUpdate({}, { OthersCount: dashboardData[0].OthersCount + 1 })

}

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})

app.get('/', (req, res) => {
    res.render('users/login');
})

app.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/' }), (req, res) => {
    req.flash('success', `Welcome back ${req.user.username}`)
    res.redirect('/incident');
})

app.get('/register', (req, res) => {
    res.render('users/register');
})

app.post('/register', validateRegisterForm, async (req, res) => {
    try {
        const { username, password, agency } = req.body;
        const user = new User({ username, agency });
        const registeredUser = await User.register(user, password);
        req.flash('success', `Successfully crated a new user for ${agency}`);
        res.redirect('/register');
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/register');
    }
})

app.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
    });
    req.flash('error', 'Successfully logged out!');
    res.redirect('/');
})

app.get('/incident', isLoggedIn, (req, res) => {
    res.render('app/incident');
})

app.post('/newIOC', isLoggedIn, validateIOCForm, initDashboard, catchAsync(async (req, res, next) => {
    const incidentRequestDataInstance = new incidentRequestData(req.body);
    incidentRequestDataInstance.date = getCurrentDate();
    incidentRequestDataInstance.currStatus = 'Pending';
    await incidentRequestDataInstance.save();
    const dashboardData = await Dashboard.find({});
    await Dashboard.findOneAndUpdate({}, { IOCCount: dashboardData[0].IOCCount + 1 });
    updateAgencyCount(req.body.agency);
    req.flash('success', 'New incident request has been made!');
    res.redirect('/incident');
}))

app.post('/newIR', isLoggedIn, validateIRForm, initDashboard, catchAsync(async (req, res) => {
    const incidentRequestDataInstance = new incidentRequestData(req.body);
    incidentRequestDataInstance.date = getCurrentDate();
    incidentRequestDataInstance.currStatus = 'Pending';
    await incidentRequestDataInstance.save();
    const dashboardData = await Dashboard.find({});
    await Dashboard.findOneAndUpdate({}, { IRCount: dashboardData[0].IRCount + 1 });
    updateIRTypeCount(req);
    req.flash('success', 'New incident request has been made!');
    res.redirect('/incident');
}))

app.post('/newAdvisory', isLoggedIn, validateAdvisoryForm, initDashboard, catchAsync(async (req, res) => {
    const incidentRequestDataInstance = new incidentRequestData(req.body);
    incidentRequestDataInstance.date = getCurrentDate();
    incidentRequestDataInstance.currStatus = 'Pending';
    await incidentRequestDataInstance.save();
    const dashboardData = await Dashboard.find({});
    await Dashboard.findOneAndUpdate({}, { AdvisoryCount: dashboardData[0].AdvisoryCount + 1 });
    updateAgencyCount(req.body.agency);
    req.flash('success', 'New incident request has been made!');
    res.redirect('/incident');
}))



app.get('/trackstatus/:pageNumber', isLoggedIn, async (req, res, next) => {
    try {
        const { pageNumber } = req.params;
        if (pageNumber < 1)
            throw new ExpressError('Invalid Page Number', 400);
        const agency = req.user.agency;
        let incidentRequestDataInstance;
        if (agency === 'NIC')
            incidentRequestDataInstance = await incidentRequestData.find({}).sort({ _id: -1 }).limit(10).skip((pageNumber - 1) * 10);
        else
            incidentRequestDataInstance = await incidentRequestData.find({ agency }).sort({ _id: -1 }).limit(10).skip((pageNumber - 1) * 10);;
        if (incidentRequestDataInstance.length === 0) {
            req.flash('error', 'No more incidents to load');
            res.redirect('back');
        } else {
            res.render('app/trackstatus', { incidentRequestDataInstance, pageNumber });
        }
    } catch (err) {
        next(err);
    }
})

app.get('/view/:id', isLoggedIn, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const incidentRequestQuery = await incidentRequestData.findById(id);
    res.render('app/view', { incidentRequestQuery });
}))

app.get('/changeStatus/:id/:status', isLoggedIn, isAuthorAgency, async (req, res, next) => {
    try {
        const { id, status } = req.params;
        await incidentRequestData.findByIdAndUpdate(id, { currStatus: status });
        req.flash('success', `Status for this incident has been changed to ${status}`)
        res.redirect('back');
    } catch (err) {
        next(err);
    }
})

app.post('/reply/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const reply = {
            sender: req.user.agency,
            replyText: req.body.replyText,
            dateOfReply: getCurrentDate()
        };
        await incidentRequestData.findByIdAndUpdate(id, { $push: { reply } });
        req.flash('success', 'New reply has been added');
        res.redirect('back');
    } catch (err) {
        console.log(err);
        req.flash('error', err.message);
        res.redirect('back');
    }
})

app.get('/dashboard', isLoggedIn, async (req, res) => {
    res.render('app/dashboard')
})

app.get('/getDashboardData', isLoggedIn, async (req, res) => {
    const dashboardData = await Dashboard.find();
    res.send(dashboardData);
})

app.all('*', (req, res, next) => {
    throw new ExpressError('Page Not Found ):', 404);
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = 'Someting went wrong!'
    }
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log(`Server Ready..`);
});