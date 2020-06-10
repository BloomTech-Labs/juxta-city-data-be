const express = require('express');

const questions = require('../models/questions-model.js');

const router = express.Router();

// Returns an array of question objects
router.get('/', (req, res) => {
  questions
    .find()
    .then(question => {
      res.json(question);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get the questions', err });
    });
});

// Returns a big object containing all th equestions and their options
router.get('/surveyobj', (req, res) => {
  questions
    .getSurveyData()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get questions object', err });
    });
});

// Returns an individual question and its options
router.get('/:id', (req, res) => {
  const { id } = req.params;
  questions
    .getQuestionWithOptions(id)
    .then(question => {
      //   console.log('question', question);
      if (!question) {
        res.status(500).json({ message: 'Failed to get item' });
      } else {
        res.status(200).json(question);
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: 'Could not find question with given id.' });
    });
});

module.exports = router;
