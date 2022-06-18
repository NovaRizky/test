const Article = require("../models/article.js")

class ControllerArticle {
  static async showArticles (req, res, next) {
    try {
        const articles = await Article.findAll()
        res.status(200).json(articles)
      } catch (error) {
          res.status(500).json(error)
      }
    }
  static async getArticleById(req, res, next) {
    try {
      const article = await Article.findPk(req.params.id);
      console.log(Article, "by idd");
      res.status(200).json(article);
    } catch (error) {
      console.log(error);
    }
  }

  static async addArticle (req, res, next) {
    try {
      let newArticle = {
        title: req.body.title,
        imgUrl: req.body.imgUrl,
        description: req.body.description
      }
      const article= await Article.create(newArticle);
      console.log(article);
      res.status(201).json(article);
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }
  static async putDataArticlesById(req, res, next) {
    const { title, imgUrl, description} = req.body;
    try {
      const articleById = await Article.findByPk(req.params.id);
      if (!articleById) throw { name: "notFound" };
      const editArticleById = await Article.update(
        {
          title,
          imgUrl,
          description
          },
          {
            where: {
              id: req.params.id,
            },
            returning: true,
          }
        );
        res.status(200).json({ article: editArticleById});
      } catch (error) {
        console.log(error);
        res.status(500).json(error)
      }
    }
    
    static async deleteArticleById(req, res, next) {
      try {
        const data = await Article.findByPk(req.params.id);
        if (!data) throw { name: "notFound" };
          const result = await Article.destroy({ where: { id: req.params.id } });
          res.status(200).json({ article: result });
      } catch (error) {
        console.log(error);
        res.status(500).json(error)
      }
    }

    static getArticlePub(req, res, next){
      let { page, size } = req.query
      let title = req.query.title

      const getPagination = (page, size) => {
          const limit = size ? +size : 8;
          const offset = page ? page * limit : 0;
          return { limit, offset };
      };

      const { limit, offset } = getPagination(page, size);
      let opt = {
        limit, 
        offset,
        order: [['id', 'asc']]
      }
      if(title){
        opt.where.title = {[Op.iLike] : `%${title}%`}
      }

     Article.findAndCountAll(opt)
      .then(data => {
        res.status(200).json({
          articles: data.rows,
          page: page
        })
      })
      .catch(error => {
        console.log(error);
        res.status(500).json(error)
    })
  }
}

module.exports = ControllerArticle