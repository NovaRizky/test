const { getDb } = require("../config/mongoDb");
const { ObjectId } = require("mongodb");
const collectionName = 'Article';

class Article {
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
    const { title, imgUrl, description } = data;
    return getDb().collection(collectionName).insertOne({
        title, 
        imgUrl, 
        description
    });
  }
}

module.exports = Article