import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.isConnected = false;
    this.client.on('connect', () => {
      this.isConnected = true;
    });
    this.client.on('error', () => { this.isConnected = false; });
  }

  /**
   * @function isAlive Checks whether the redis connection is alive
   * @returns true if connection is alive and false otherwise
   */
  isAlive() {
    return this.isConnected;
  }

  /**
   * @function get returns the redis value stored for the key param
   * @param key - the key of the value you want to get
   * @returns value of the key provided
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * @function set sets a value in a redis store for the key provided
   * @param key the key of the value to be set in the store
   * @param value the value of to be stored in the redis store
   * @param duration the expiration for the value in redis store
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  /**
   * @function del Deletes a value from a redis store
   * @param key key of the value to be deleted
   * @returns true on success and false otherwise
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
