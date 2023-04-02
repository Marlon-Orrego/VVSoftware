const { MongoClient, ObjectId } = require("mongodb");
const esquemaModelo = require("../models/Estudiante");

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbname = process.env.DB_NAME;
const uri = `mongodb+srv://${user}:${password}@cluster0.rwhcdqs.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const mongoClient = new MongoClient(uri);

/**
 * Insert document with mongoDB
 * @param {*} dbName Database Name
 * @param {*} collectionName Collection Name
 * @param {*} data Data to insert
 * @returns Promise
 */
