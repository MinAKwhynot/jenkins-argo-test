const express = require('express');
const bodyParser = require('body-parser');
const Message = require('./messages')

const router = express.Router();
router.use(bodyParser.json());

// Handles GET requests to /messages
router.get('/messages', (req, res) => {
    console.log(`received request: ${req.method} ${req.url}`)

    // Query for messages in descending order
    try {
        Message.messageModel.find({}, null, { sort: { '_id': -1 } }, (err, messages) => {
            let list = []
            if (messages.length > 0) {
                messages.forEach((message) => {
                    if (message.name && message.body && message.date && message.menu && message.home) {
                        list.push({ 'name': message.name, 'body': message.body, 'date': message.date, 'menu': message.menu, 'home': message.home })
                    }
                });
            }
            res.status(200).json(list)
        });
    } catch (error) {
        res.status(500).json(error)
    }
});

// Handles POST requests to /messages
router.post('/messages', (req, res) => {
    try {
        Message.create(({name: req.body.name, body: req.body.body, date: req.body.date, menu:req.body.menu, home:req.body.home}))
        res.status(200).send()
    } catch (err) {
        if (err.name == "ValidationError") {
            console.error('validation error: ' + err)
            res.status(400).json(err)
        } else {
            console.error('could not save: ' + err)
            res.status(500).json(err)
        }
    }
});

module.exports = router;
