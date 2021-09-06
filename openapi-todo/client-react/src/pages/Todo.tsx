import { useContext, useEffect, useState } from "react";
import { todoServiceContext } from "../App";
import { Item } from "../modules/domain/todo";

export default function Todo() {
  const todoService = useContext(todoServiceContext);
  const [itemNameInput, updateItemNameInput] = useState<string>("");
  const [items, updateItems] = useState<Item[]>([]);
  const [errMsg, updateErrMsg] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        updateItems(await todoService.getAllItems());
      } catch (e) {
        updateErrMsg(`${e}`);
      }
    })();
  }, [todoService]);

  const createNewItem = async () => {
    try {
      await todoService.createNewItem(itemNameInput);
      updateItems(await todoService.getAllItems());
      updateItemNameInput("");
      updateErrMsg("");
    } catch (e) {
      updateErrMsg(`${e}`);
    }
  };

  const changeItemDone = async (idx: number) => {
    const item = items[idx];
    item.done = !item.done;
    try {
      await todoService.updateItem(item);
      updateItems(await todoService.getAllItems());
      updateErrMsg("");
    } catch (e) {
      updateErrMsg(`${e}`);
    }
  };

  const deleteItem = async (idx: number) => {
    try {
      await todoService.deleteItemById(items[idx].id);
      updateItems(await todoService.getAllItems());
      updateErrMsg("");
    } catch (e) {
      updateErrMsg(`${e}`);
    }
  };

  const deleteDone = async () => {
    try {
      await todoService.deleteDoneItems();
      updateItems(await todoService.getAllItems());
      updateErrMsg("");
    } catch (e) {
      updateErrMsg(`${e}`);
    }
  };

  return (
    <div>
      <h2>Todo list</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          value={itemNameInput}
          onChange={(e) => {
            updateItemNameInput(e.target.value);
          }}
        />
        <button
          onClick={async () => {
            await createNewItem();
          }}
        >
          Add
        </button>
      </form>
      <button
        onClick={async () => {
          await deleteDone();
        }}
      >
        Delete Done
      </button>
      <ul>
        {[...items].map((item, idx) => (
          <li key={idx}>
            <span>{`${item.name}`}</span>
            <input
              type="checkbox"
              checked={item.done}
              onChange={async () => await changeItemDone(idx)}
            />
            <button onClick={async () => await deleteItem(idx)}>Delete</button>
          </li>
        ))}
      </ul>
      {errMsg && <div>{errMsg}</div>}
    </div>
  );
}
