require('dotenv').config();

const express = require('express');
const router = require('./app/router');
const session = require('express-session');

const app = express();

app.locals.appName = 'Oquiz';

const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

// mise en place et configuration de la session
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'zziuqo',
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 1000 // une heure
    }
}));

// rendre disponible dans toutes les vues, l'éventuel utilisateur connecté
app.use((req, res, next) => {
    // si un utilisateur est connecté
    if (req.session.user) {
        // on le rend disponible dans les views
        res.locals.user = req.session.user;
    }

    next();
})

app.use(express.static(__dirname + '/static'));

// rend disponible req.body dans les requêtes POST
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () =>  {
    console.log('Running on http://localhost:' + port);
});