// for mocking
import { Item, TodoRepository } from "../domain/todo";

export default class TodoMemoryRepository implements TodoRepository {
  private _items: Item[];
  private _id: number;

  constructor() {
    this._items = [];
    this._id = 1;
  }

  getAllItems(): Promise<Item[]> {
    return Promise.resolve([...this._items].sort((a, b) => {
      if (!b.id) {
        return -1;
      }
      if (!a.id) {
        return 1;
      }
      return a.id - b.id;
    }));
  }

  getItemById(id: number): Promise<Item> {
    const item = this._items.find((item) => (item.id === id ? item : null));
    if (item) {
      return Promise.resolve(item);
    }
    throw new Error(`id ${id}: no item found`);
  }

  addItem(item: Item): Promise<Item> {
    const newItem = new Item(
      item.name,
      item.comment,
      item.done,
      this._id,
      new Date(),
      new Date()
    );
    this._items.push(newItem);
    this._id++;
    return Promise.resolve(newItem);
  }

  updateItem(item: Item): Promise<Item> {
    const idx = this._items.findIndex((_item) => _item.id === item.id);
    if (idx < 0) {
      throw new Error(`invalid item`);
    }
    const updatedItem = new Item(
      item.name,
      item.comment,
      item.done,
      item.id,
      item.createdAt,
      new Date()
    );
    this._items[idx] = updatedItem;
    return Promise.resolve(updatedItem);
  }

  deleteItemById(id: number): Promise<void> {
    this._items = this._items.filter((item) => item.id !== id);
    return Promise.resolve()
  }

  deleteDoneItems() {
    this._items = this._items.filter((item) => !item.done);
    return Promise.resolve()
  }
}
