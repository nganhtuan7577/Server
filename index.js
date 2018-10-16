var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');

var port = 9000;

var app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var data = [{id: 1, name: 'React', status: true},
            {id:2, name: 'Redux', status: true},
            {id:3, name: 'Angular 6', status: false}]

app.get('/', (req, res) => {
    jwt.verify(req.get('X-access-token'), 'refreshSecret', (err, decoded) => {
        if (err) {
            console.log(err);
            res.send('');
        }
        else {
            res.send(data);
        }
    })
});

//User login request, create and save cookie
app.post('/', (req, res) => {
    jwt.verify(req.get('X-access-token'), 'refreshSecret', (err, decoded) => {
        if (err) {
            console.log(err);
            res.send(data);
        }
        else {
            data = req.body.data;
            res.send(data);
        }
    })
})

app.post('/login', (req, res) => {
    var Token = jwt.sign({userName: 'username'}, 'refreshSecret', {expiresIn: 60})
    res.send(Token);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))