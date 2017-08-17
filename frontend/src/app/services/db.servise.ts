export const PLACES_STORE_NAME = "places";

export class DBService {
  static open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("places", 2);

      request.onsuccess = (event) => resolve(request.result);
      request.onerror = (event) => reject(request.error);
      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains(PLACES_STORE_NAME)) {
          const placesStore = db.createObjectStore(PLACES_STORE_NAME, {
            keyPath: "id"
          });
          placesStore.createIndex("name", "name", {
            unique: false
          });
        }
      };
    });
  }
}

export enum TransactionType {
  ReadOnly = "readonly",
  ReadWrite = "readwrite"
}