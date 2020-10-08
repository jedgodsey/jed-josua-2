const express = require('express');
const router = express.Router();

const cars = require('../models/Car')

// GET index
router.get('/', (req, res) => {
  // Get data for all articles
  res.render('index', {cars: cars});
});

// GET new
router.get('/new', (req, res) => {
    console.log('hitting the route')
  res.render('new');
});

// GET show
router.get('/:articleId', (req, res) => {
  db.Article.findById(req.params.articleId)
    .populate('author')
    .exec((err, articleById) => {
      if (err) return console.log(err);

      console.log('articleById:', articleById);
      
      res.render('articles/show', articleById);
    });
});

// POST create
router.post('/', (req, res) => {
  cars.push(req.body);
  res.redirect('/')
});

// GET edit
router.get('/:articleId/edit', (req, res) => {
  db.Article.findById(req.params.articleId, (err, foundArticle) => {
    if (err) return console.log(err);

    const context = {
      article: foundArticle,
    }

    res.render('articles/edit', context);
  });
})

// DELETE destroy
router.delete('/:articleId', (req, res) => {
  db.Article.findByIdAndDelete(req.params.articleId, (err) => {
    const articleId = req.params.articleId
    if (err) return console.log(err);

    db.Author.findOne({'articles': articleId}, (err, foundAuthor) => {
      if (err) console.log(err);

      foundAuthor.articles.remove(articleId);
      foundAuthor.save((err, updatedAuthor) => {
        console.log('updatedAuthor', updatedAuthor);
      })
    })

    res.redirect('/articles');
  });
});

// PUT update
router.put('/:articleId', (req, res) => {
  // make query to update database
  db.Article.findByIdAndUpdate(
    req.params.articleId,
    req.body,
    { new: true },
    (err, updatedArticle) => {
      if (err) return console.log(err);
      
      // redirect to show route for that article
      res.redirect(`/articles/${updatedArticle.id}`);
    }
  );
});

module.exports = router;
