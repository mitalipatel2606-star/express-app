const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");

const port = 8000;

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
app.post((req, res) => {
    return res.json({ status: 'Pending' });
})



listen(port, () => {
    console.log("Server Started");
})