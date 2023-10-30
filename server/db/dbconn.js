const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/blood-bank", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
}).then(() => console.log("DB Connetced")).catch((err) => console.log(err));
