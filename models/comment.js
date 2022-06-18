const { getDb } = require("../config/mongoDb");
const { ObjectId } = require("mongodb");
const collectionName = 'Comments';

class Comments {
  static findAll() {
    return getDb()
    .collection(collectionName)
    .find().toArray();
  }

  static findPk(id) {
    return getDb()
      .collection(collectionName)
      .find({ _id: ObjectId(id) })
      .toArray();
  }

  static create(data) {
    const { ArticleId, username, comment } = data;
    return getDb().collection(collectionName).insertOne({
        ArticleId,
        username, 
        comment
    });
  }
}

module.exports = Comments