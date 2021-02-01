const {Quiz} = require('../models');

const quizController = {
    showOneQuiz: (req, res) => {
        // je récup mon param et je le traite comme un entier
        const id = parseInt(req.params.id, 10);

        // ATTENTION : id peut contenir Na
        // isNaN vérifie si l'argument contient NaN ou pas
        if (!isNaN(id)) {
            Quiz.findByPk(id, {
                include: ['author', {
                    association: 'questions',
                    include: ['level', 'answers']
                }, 'tags']
            })
                // si ça marche
                .then(quiz => {
                    res.render('quiz', { quiz });
                })
                // si ça marche pas
                .catch(error => {
                    console.log(error);
                    res.status(404).send('erreur');
                });
        } else {
            // l'utilisateur a essayé de faire n'importe quoi
            // on ne demande meme pas à Sequelize, on renvoie tout de suite une 404
            res.status(404).send('erreur');
        }

        
    }
};

module.exports = quizController;