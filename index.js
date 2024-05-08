// const { name } = require('ejs');
const express = require('express');

const port = 8090;

const app = express();

app.use(express.urlencoded());

app.set("view engine", "ejs");

let userData = [
    {
        taskId: 1,
        name: "Task 1",
    },
    {
        taskId: 2,
        name: "Taxk 2",
    },
]
app.get('/', (req, res) => {
    // console.log(userData);
    return res.render('form', {
        user: userData
    });
})
app.post('/insertData', (req, res) => {
    let editId = req.body.editId;

    const { taskId, name } = req.body;
    // console.log(editId);
    if (editId) {
        let data = userData.filter((curData) => {
            if (curData.taskId == editId) {
                curData.name = name;
            }
            return curData;
        })

        console.log("Data Updated Successfully..");
        // res.send(data);
         return res.redirect('/');

    }

    let obj = {
        taskId: req.body.taskId,
        name: req.body.name
    }
    userData.push(obj);
    return res.redirect('back')
})
app.get('/deleteData', (req, res) => {
    let taskId = req.query.taskId;
    let data = userData.filter((val) => {
        return val.taskId != taskId;
    })
    console.log(data);
    userData = data
    return res.redirect('back');
})

app.get('/editData', (req, res) => {
    let taskId = req.query.taskId;
    let data = userData.filter((val) => {
        return val.taskId == taskId;
    })
    return res.render('editedData', { use: data[0] });
})



app.listen(port, (err) => {
    if (err) {
        console.log("server is not start in port");
        return false;
    }
    console.log("server http://localhost:" + port);
});