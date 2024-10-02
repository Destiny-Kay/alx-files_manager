import MongoClient from 'mongodb/lib/mongo_client';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbUrl = `mongodb://${host}:${port}/${database}`;
    this.client = new MongoClient(dbUrl);
    this.client.connect();
  }

  /**
   * @function isAlive checks whether the client is connected to db
   * @returns true if connected and false otherwise
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * @function nbUsers returns number of documents in the {users} collection
   * @returns total number of records
   */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * @function nbFiles returns the number of files in the {files} collection
   * @returns total number of files
   */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }
}

export const dbClient = new DBClient();
export default dbClient;
