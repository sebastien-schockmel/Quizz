const {Quiz} = require('../models');

const mainController = {
    homePage: (req, res) => {
        Quiz.findAll({
            include: ['author']
        }).then(quizzes => {
            res.render('index', { quizzes });
        });
    }
};

module.exports = mainController;