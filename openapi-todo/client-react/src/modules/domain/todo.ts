// export type Item = {
//   name: string;
//   comment: string;
//   done: boolean;
//   id?: number;
//   createdAt?: Date;
//   updatedAt?: Date;
// };

export class Item {
  constructor(
    public name: string,
    public comment: string,
    public done: boolean,
    readonly id?: number,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {}
}

export interface TodoRepository {
  getAllItems(): Promise<Item[]>;
  getItemById(id: number): Promise<Item>;
  addItem(item: Item): Promise<Item>;
  updateItem(item: Item): Promise<Item>;
  deleteItemById(id: number): Promise<void>;
  deleteDoneItems(): Promise<void>;
}
