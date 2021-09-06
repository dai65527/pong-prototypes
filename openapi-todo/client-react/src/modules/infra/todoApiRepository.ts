import { Configuration, DefaultApi } from "../../openapi";
import { Item, TodoRepository } from "../domain/todo";

export default class TodoAPIRepository implements TodoRepository {
  private cli: DefaultApi;

  constructor(host: string, port?: number) {
    const basePath = port ? `${host}:${port}` : host;
    this.cli = new DefaultApi(
      new Configuration({
        basePath,
      })
    );
  }

  async getAllItems(): Promise<Item[]> {
    const respItems = await this.cli.getItem();
    return respItems.map((respItem): Item => {
      return new Item(
        respItem.name,
        respItem.comment,
        respItem.done,
        respItem.id,
        new Date(respItem.createdAt * 1000),
        new Date(respItem.updatedAt * 1000)
      );
    });
  }

  async getItemById(id: number): Promise<Item> {
    const respItem = await this.cli.getItemItemId({
      itemId: String(id),
    });
    return new Item(
      respItem.name,
      respItem.comment,
      respItem.done,
      respItem.id,
      new Date(respItem.createdAt * 1000),
      new Date(respItem.updatedAt * 1000)
    );
  }

  async addItem(item: Item): Promise<Item> {
    const respItem = await this.cli.postItem({
      body: {
        name: item.name,
        comment: item.comment,
      },
    });
    return new Item(
      respItem.name,
      respItem.comment,
      respItem.done,
      respItem.id,
      new Date(respItem.createdAt * 1000),
      new Date(respItem.updatedAt * 1000)
    );
  }

  async updateItem(item: Item): Promise<Item> {
    if (!item.id || item.id < 1) {
      throw new Error("id should not be empty");
    }
    const respItem = await this.cli.putItem({
      body: {
        id: item.id,
        name: item.name,
        comment: item.comment,
        done: item.done,
      },
    });
    return new Item(
      respItem.name,
      respItem.comment,
      respItem.done,
      respItem.id,
      new Date(respItem.createdAt * 1000),
      new Date(respItem.updatedAt * 1000)
    );
  }

  async deleteItemById(id: number): Promise<void> {
    try {
      await this.cli.deleteItemItemId({
        itemId: String(id),
      });
    } catch (e) {
      if (e instanceof SyntaxError) {
        return;
      }
      throw e;
    }
  }

  async deleteDoneItems(): Promise<void> {
    await this.cli.deleteItem();
  }
}
