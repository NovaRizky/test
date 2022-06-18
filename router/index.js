const router = require('express').Router()
const ControllerArticle = require('../controllers/controllerArticle')
const ControllerComments = require('../controllers/controllerComment')


router.get('/article', ControllerArticle.showArticles)
router.get('/articles', ControllerArticle.getArticlePub)
router.get('/article/:id', ControllerArticle.getArticleById)
router.post('/article', ControllerArticle.addArticle)
router.put('/article/:id', ControllerArticle.putDataArticlesById)
router.delete('/article/:id', ControllerArticle.deleteArticleById)

router.get('/comment', ControllerComments.showCommentss)
router.get('/comment/:id', ControllerComments.getCommentsById)
router.post('/comment', ControllerComments.addComments)
router.put('/comment/:id', ControllerComments.putDataCommentsById)
router.delete('/comment/:id', ControllerComments.deleteCommentsById)

module.exports = router