const express = require("express");
const mongoose = require("mongoose   ");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const users = require("./MOCK_DATA.json");
const fs = require("fs")

const port = 8000;
//Middleware-Plugin

app.use((req, res, next) => {
    // console.log("Hello from the second Middleware");
    // return res.json({ msg: "Hello from the second middleware" });
    next();
});
app.use((req, res, next) => {
    fs.appendFile("log.txt", `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}`,
        (err, data) => { next(); })
});

app.get("/api/users", (req, res) => {
    res.setHeader("X-My-Name", "Rujal");
    console.log(req.headers);
    return res.json(users);
});
app.get("/users", (req, res) => {
    const html = `
    <ul> ${users.map((user) => `<li>${user.first_name} </li>`).join("")}
    </ul>`
    res.send(html);
})
app
    .route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) =>
            user.id === id);
        if (!user) return res.status(404).json({ error: "User Not Found" });
        res.json(user)
    })
    .patch((req, res) => {
        //to change parts of the user data
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);

        const updates = req.body;
        return res.json({ status: 'pending' });
    })
    .delete((req, res) => {
        //to delete user
        return res.json({ status: 'pending' });
    })
app.post("/api/users", (req, res) => {
    //to add new user
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.gender || !body.email || !body.job_title) {
        return res.status(400).json({ msg: "Incomplete fields" });
    }
    console.log("Body: ", body);
    if (!body || !body.first_name) {
        return res.status(400).json({ status: 'error', message: 'Invalid body' });
    }
    const newuser = { ...body, id: users.length + 1 }
    users.push(newuser);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).json({ status: 'error' });
        }
        return res.status(201).json({ status: "success", id: newuser.id });
    });
    // console.log("Body: ", body);

});



app.listen(port, () => {
    console.log("Server Started at PORT:", port);
})
