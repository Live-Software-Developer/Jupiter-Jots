// db.ts
import Dexie, { type EntityTable } from 'dexie';

interface Bookmark {
  id?: number
  title: string
  url: string
  icon: string | null
  image: string | null
  notes: string
  created_on: Date | null
  tags: number[]
  _tags?: Tag[]
  collection: number | null
}

export interface Tag {
  id: number
  name: string
  color: string
}

export interface Collection {
  id: number
  parent?: number
  name: string
  color: string
  children?: Collection[]
}

export interface Settings {
  id?: number
  key: string
  new_shared_notifications: boolean
  maintenance_notifications: boolean
  read_reminder_alerts: boolean
}

export interface FilterFormEntity {
  id?: number
  key: string
  search: string
  collections: number[]
  tags: number[],
}


const db = new Dexie('JupiterJots') as Dexie & {
  bookmarks: EntityTable<
    Bookmark,
    'id' // primary key "id" (for the typings only)
  >;
  tags: EntityTable<
    Tag,
    'id' // primary key "id" (for the typings only)
  >;
  collections: EntityTable<
    Collection,
    'id' // primary key "id" (for the typings only)
  >;
  settings: EntityTable<
    Settings,
    'id' // primary key "id" (for the typings only)
  >;
  filters: EntityTable<
    FilterFormEntity,
    'id' // primary key "id" (for the typings only)
  >;
};

db.version(1).stores({
  bookmarks: '++id, title, notes, created_on, tags, collection', // primary key "id" (for the runtime!)
  tags: "++id, name",
  collections: "++id, name, parent",
  settings: "++id, key", // single entry to store app settings
  filters: "++id, key", // single entry to store app filters
});

// Default settings
export const defaultSettings: Settings = {
  key: "main",
  new_shared_notifications: false,
  maintenance_notifications: false,
  read_reminder_alerts: false,
};

// Initialize default settings and collections if not present
db.on('ready', async () => {
  const settingExists = await db.settings.where('key').equals('main').count();
  if (settingExists === 0) {
    await db.settings.add(defaultSettings);
  }

  const mainCollectionExists = await db.collections.where('name').equalsIgnoreCase('main').count();
  if (mainCollectionExists === 0) {
    await db.collections.add({
      name: 'Main',
      color: '#8700A8',
    });
  }
});


export type { Bookmark };
export { db };