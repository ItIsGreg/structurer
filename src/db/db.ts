import Dexie, { Table } from "dexie";

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
  }
}

export const db = new MySubClassedDexie();
