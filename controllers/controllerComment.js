const Article = require("../models/article.js")
const Comments = require("../models/comment.js")
 
class ControllerComments {
  static async showCommentss (req, res, next) {
    try {
        const data = await Comments.findAll({include : [{model : Article}], 
            order: [
                ['createdAt', 'DESC']
            ]})
        res.status(200).json(data)
      } catch (error) {
          res.status(500).json(error)
      }
    }
  static async getCommentsById(req, res, next) {
    try {
      const data = await Comments.findPk(req.params.id, {include: [{model : Article}]});
      console.log(data, "by idd");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async addComments (req, res, next) {
    try {
      let newComments = {
        ArticleId: req.body.ArticleId,
        username: req.body.username,
        comment: req.body.comment
      }
      const newData = await Comments.create(newComments);
      console.log(newData);
      res.status(201).json(newData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }
  static async putDataCommentsById(req, res, next) {
    const {ArticleId, username, comment} = req.body;
    try {
      const commentsById = await Comments.findByPk(req.params.id, {include: [{model : Article}]});
      if (!commentsById) throw { name: "notFound" };
      const editCommentsById = await Comments.update(
        {
          ArticleId,
          username,
          comment
          },
          {
            where: {
              id: req.params.id,
            },
            returning: true,
          }
        );
        res.status(200).json({ comments: editCommentsById});
      } catch (error) {
        console.log(error);
        res.status(500).json(error)
      }
    }
    
    static async deleteCommentsById(req, res, next) {
      try {
        const data = await Comments.findByPk(req.params.id, {include: [{model : Article}]});
        if (!data) throw { name: "notFound" };
          const result = await Comments.destroy({ where: { id: req.params.id } });
          res.status(200).json({ comments: result });
      } catch (error) {
        console.log(error);
        res.status(500).json(error)
      }
    }
}

module.exports = ControllerComments