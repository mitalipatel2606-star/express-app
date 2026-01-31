const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const fs = require("fs")

const port = 8000;
//Middleware-Plugin
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
    return res.json(users);
})
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
        //to add new user
        return res.json({ status: 'pending' });
    })
    .delete((req, res) => {
        //to delete user
        return res.json({ status: 'pending' });
    })
app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        console.log(body);
        return res.json({ status: 'Success', id: users.length });
    })
    // console.log("Body: ", body);

})



app.listen(port, () => {
    console.log("Server Started at PORT:", port);
})