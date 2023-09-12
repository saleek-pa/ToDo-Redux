import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, editItem, deleteItem } from "../Redux/Store";
import "./ToDo.css";

export default function ToDo() {
  const editInputRef = useRef(null);
  const [editItemId, setEditItemId] = useState(null);
  const items = useSelector((state) => state.todo.items);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = e.target.item.value.trim();
    if (newItem !== "") {
      console.log(newItem);
      console.log("hello");
      dispatch(addItem(newItem));
      e.target.reset();
    } else {
      e.target.reset();
    }
  };

  useEffect(() => {
    if (editItemId !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editItemId]);

  return (
    <section>
      <div className="todo-app">
        <form className="input-section" onSubmit={handleSubmit}>
          <input type="text" placeholder="Add item..." name="item" />
          <button type="submit" className="add">
            Add
          </button>
        </form>

        <div className="todos">
          <ul className="todo-list">
            {items.map((task) => (
              <li key={task.id}>
                {editItemId === task.id ? (
                  <>
                    <label className="container">
                      <input type="checkbox" />
                      <svg viewBox="0 0 64 64" height="2em" width="2em">
                        <path
                          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                          pathLength="575.0541381835938"
                          className="path"
                        ></path>
                      </svg>

                      <input
                        type="text"
                        defaultValue={task.title}
                        className="edit-input"
                        ref={editInputRef}
                      />
                    </label>
                    <span
                      className="span-button"
                      onClick={() => {
                        dispatch(
                          editItem({
                            id: task.id,
                            title: editInputRef.current.value.trim(),
                          })
                        );
                        setEditItemId(null);
                      }}
                    >
                      <i className="fa-solid fa-check"></i>
                    </span>
                    <span
                      className="span-button"
                      onClick={() => dispatch(deleteItem(task.id))}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </>
                ) : (
                  <>
                    <label className="container">
                      <input type="checkbox" />
                      <svg viewBox="0 0 64 64" height="2em" width="2em">
                        <path
                          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                          pathLength="575.0541381835938"
                          className="path"
                        ></path>
                      </svg>
                      <span className="todo-text">{task.title}</span>
                    </label>
                    <span
                      className="span-button"
                      onClick={() => setEditItemId(task.id)}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </span>
                    <span
                      className="span-button"
                      onClick={() => dispatch(deleteItem(task.id))}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>

          {items.length === 0 && <h1 className="not-found">NO ITEMS</h1>}
        </div>
      </div>
    </section>
  );
}
