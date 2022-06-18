const {MongoClient} = require("mongodb")

const uri = process.env.URI || "mongodb://localhost:27017"
const client = new MongoClient(uri)

let dbconnection

async function run() {
    try {
        await client.connect()
        const database = client.db("test")

        dbconnection = database
        console.log("Successfully connected to mengodb");
    }
    catch(error){
        console.log(error);
    }
}
function getDb() {
    return dbconnection
}

module.exports = {
    run, 
    getDb
}