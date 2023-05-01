import { openDB } from 'idb';

const initdb = async () => {
  // Creating a new database named jate which will be using version 1 of the database. 
  openDB('jate', 1, {
    // Add our database schema if it has not already been initialized. 
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create a new object store for the data and give it a key name of 'id' which will be autoincremented.
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  return jateDb;

};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the DB');

  const jateDb = await initdb();

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({ content });

  const result = await request;
  console.log('🚀 - data saved to the database', result);
  return result;
}


// Export a function to GET to the database
export const getDb = async () => {
  console.log('GET from the DB');

  // Create a connection to the database and version 1 of the database

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
};

