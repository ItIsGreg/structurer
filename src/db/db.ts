import Dexie, { Table, Transaction } from "dexie";

export interface APIKey {
  id?: number;
  key: string;
}

export class MySubClassedDexie extends Dexie {
  apikeys!: Table<APIKey, number>;

  constructor() {
    super("MySubClassedDexie");
    this.version(1).stores({
      apikeys: "++id,key",
    });
    this.on("populate", (transaction: Transaction) => {
      transaction.table("apikeys").add({ key: "default" });
    });
  }
}

export const db = new MySubClassedDexie();
