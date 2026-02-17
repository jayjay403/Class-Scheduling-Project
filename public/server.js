const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

app.use(session({ secret: 'secret123', resave: false, saveUninitialized: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.post('/login', (req, res) => {
    const { username, email } = req.body;

    if (username && email) {
        req.session.loggedIn = true;
        res.redirect('/dash');
    } else {
        res.send('Invalid login');
    }
});

app.get('/dash', (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(path.join(__dirname, 'dash.html'));
    } else {
        res.redirect('/');
    }
});
app.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'));
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
