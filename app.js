const express = require('express');
const app = express();
const port = 4040;
const path = require('path');
require('./server/db/dbconn');

// schema Modules
const ContactForm = require('./server/schema/contact-form');
const DonorForm = require('./server/schema/donor-form');
const BloodReq = require('./server/schema/request-from');
const UserData = require("./server/schema/login");
const BloodStock = require("./server/schema/stock");


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, './client'));

const setLogin = {
    login: 0,
    contact: [],
    donor: [],
    bloodreq: [],
    bloodstock: [],
};


app.get("/", (req, res) => {
    res.render("index");
})

app.get("/about", (req, res) => {
    res.render("about");
})


app.get("/contact", (req, res) => {
    res.render("contact");
})

app.post("/contact", async (req, res) => {
    try {
        const data = new ContactForm({
            name: req.body.fullname,
            email: req.body.useremail,
            phone: req.body.userphone,
            message: req.body.usermessage
        })

        await data.save();
        const param = {
            title: 'Response'
        }
        res.render('responsepage', param);
    } catch (err) {
        res.send(err.message)
        console.log(err.message)
    }
})



app.get("/donor", (req, res) => {
    res.render("donor");
})

app.post('/donor', async (req, res) => {
    try {
        const data = new DonorForm({
            name: req.body.name,
            contactNo: req.body.contactno,
            bloodGrp: req.body.bloodGrp
        })

        await data.save();
        const param = {
            title: 'Blood Donation Registration'
        }
        res.render('responsepage', param);

    } catch (error) {
        res.send(error.message);
    }
})

app.get("/bloodrequest", (req, res) => {
    res.render("request");
})

app.post("/bloodrequest", async (req, res) => {
    try {
        const data = new BloodReq({
            name: req.body.name,
            bloodGrp: req.body.bloodGrp,
            contactNo: req.body.contactNo,
            location: req.body.location
        })

        await data.save();
        const param = {
            title: 'Blood Request'
        }
        res.render('responsepage', param);

    } catch (error) {
        res.send(error.message)
    }
})
app.get("/bloodstock", async (req, res) => {

    try {

        const bloodData = await BloodStock.find({});
        const bloodstockinfo = await BloodStock.find({});

        const jsonData = JSON.stringify(bloodData)

        console.log(bloodData[0].value)

        let arr = [];

        let data = {
            name: "suraj",
            temp:
                [
                    ['Blood', 'ml'],
                    ['A+', bloodData[0].value],
                    ['A-', bloodData[1].value],
                    ['B+', bloodData[2].value],
                    ['B-', bloodData[3].value],
                    ['AB+', bloodData[4].value],
                    ['AB-', bloodData[5].value],
                    ['O+', bloodData[6].value],
                    ['O-', bloodData[7].value]
                ]

        }
        res.render("bloodstock", data);
    } catch (error) {
        res.send(error.message)
    }

})


app.get("/login", async (req, res) => {

    const contactData = await ContactForm.find({});
    const donorinfo = await DonorForm.find({});
    const bloodreqinfo = await BloodReq.find({});
    const bloodstockinfo = await BloodStock.find({});

    setLogin.contact = contactData;
    setLogin.donor = donorinfo;
    setLogin.bloodreq = bloodreqinfo;
    setLogin.bloodstock = bloodstockinfo;

    res.render("login", setLogin);
})

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const pass = req.body.password;

        const checkEmail = await UserData.findOne({ email });

        if (checkEmail === null) {
            res.send('Email invaild please check your email !!!')
        } else if (checkEmail != null) {
            if (pass === checkEmail.password) {
                setLogin.login = 1;
                res.render('alert');
            } else {
                res.send("Password Incorrect");
            }
        }

    } catch (error) {
        res.send(error.message)
    }
})

app.get("/check", (req, res) => {
    res.render("alert")
})

app.get("/bloodupdate", async (req, res) => {
    try {
        const data = await BloodStock.find({});
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})


app.post("/bloodupdate", async (req, res) => {
    try {
        const data = new BloodStock({
            bloodType: req.body.bloodType,
            value: req.body.value,
        })

        await data.save();

        res.send(data);

    } catch (error) {
        res.send(error.message)
    }
})



app.listen(port, () => {
    console.log("server : " + port);
})
