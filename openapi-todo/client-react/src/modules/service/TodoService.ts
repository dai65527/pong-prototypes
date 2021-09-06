import { Item, TodoRepository } from "../domain/todo";

export class TodoService {
  constructor(readonly repo: TodoRepository) {}

  async getAllItems(): Promise<Item[]> {
    return this.repo.getAllItems();
  }

  async getItemById(id: number | undefined): Promise<Item> {
    if (!id || id <= 0) {
      throw new Error("invalid id");
    }
    return this.repo.getItemById(id);
  }

  async createNewItem(name: string, comment?: string) {
    if (name.length <= 0) {
      throw new Error("name should not be empty");
    }
    if (!comment) {
      comment = "";
    }
    return this.repo.addItem(new Item(name, comment, false));
  }

  async updateItem(item: Item): Promise<Item> {
    if (!item.id || item.id <= 0) {
      throw new Error("invalid id");
    }
    return this.repo.updateItem(item);
  }

  async deleteItemById(id: number | undefined): Promise<void> {
    if (!id || id <= 0) {
      throw new Error("invalid id");
    }
    return this.repo.deleteItemById(id)
  }

  async deleteDoneItems(): Promise<void> {
    return this.repo.deleteDoneItems()
  }
}
