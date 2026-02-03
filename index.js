const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const fs = require("fs")

const port = 8000;
//Middleware-Plugin
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    console.log("Hello from the second Middleware");
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
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        console.log(body);
        return res.status(201).json({ status: 'Success', id: users.length });
    })
    // console.log("Body: ", body);

})



app.listen(port, () => {
    console.log("Server Started at PORT:", port);
})
