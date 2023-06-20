const bcryptjs = require('bcryptjs');
const models = require('../models/Index');
const jwt = require('jsonwebtoken');
const passwordValidator = require('../middleware/passwordValidator');

// Create Account
exports.signup = async (req, res) => {
    // Empty Inputs
    if (req.body.login === "" || req.body.password === "" || req.body.password2 === "" || req.body.role === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    // Bad Schema Password
    if (!passwordValidator.validate(req.body.password)) {
        return res.status(400).json({ message: "Mot de Passe invalide : Veuillez utiliser entre 8 et 30 caractères avec au minimum 1 Majuscule, 1 Minuscule et 1 Chiffre" });
    }
    // Different Password
    if (req.body.password !== req.body.password2) {
        return res.status(400).json({ message: "Les mots de passe ne sont pas identiques" });
    }
    models.Users.findOne({
        where: { login: req.body.login }
    })
        .then((user) => {
            if (!user) {
                bcryptjs.hash(req.body.password, 10)
                    .then(hash => {
                        models.Users.create({
                            login: req.body.login,
                            password: hash,
                            role: req.body.role
                        })
                            .then((user) => res.status(201).json({ user }))
                            .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
            } else {
                return res.status(400).json({ message: "Cet identifiant existe déjà, merci d'en choisir un autre" });
            }
        })
};

// Login
exports.login = (req, res) => {
    // Empty Inputs
    if (req.body.password === "" || req.body.login === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    models.Users.findOne({ where: { login: req.body.login } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé' });
            }
            bcryptjs.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24H' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};