import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, editItem, deleteItem, handleStatus } from "../Redux/Store";
import { SVG } from "./Elements";
import "./ToDo.css";

export default function ToDo() {
  const editInputRef = useRef(null);
  const [editItemId, setEditItemId] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const items = useSelector((state) => state.todo.items);
  const activeItems = items.filter((item) => item.completed === false);
  const completedItems = items.filter((item) => item.completed === true);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = e.target.item.value.trim();
    if (newItem !== "") {
      dispatch(addItem(newItem));
      setShowAnimation(true);
      e.target.reset();
    } else {
      e.target.reset();
    }
  };

  // To focus the input when edit icon is clicked
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

            {[...activeItems].reverse().map((task) => ( // Add task on top
              <li
                key={task.id}
                className={`task ${showAnimation ? "slide-down" : ""}`}
              >

                {/* It checks the id passed from edit icon and current task are equal or not */}
                {editItemId !== task.id ? (
                  <>
                    <label className="container">
                      <input
                        type="checkbox"
                        onChange={() => {
                          setTimeout(
                            () => dispatch(handleStatus(task.id)),
                            500
                          );
                        }}
                      />
                      <SVG />
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
                ) : (
                  <>
                    <label className="container">
                      <input type="checkbox" />
                      <SVG />
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
                        if (editInputRef.current.value.trim() !== "") {
                          dispatch(
                            editItem({
                              id: task.id,
                              title: editInputRef.current.value.trim(),
                            })
                          );
                          setEditItemId(null);
                        } else {
                          dispatch(deleteItem(task.id));
                        }
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
                )}
              </li>
            ))}
          </ul>

          {completedItems.length > 0 && (
            <>
              <label className="ps-4 my-2">Completed</label>
              <ul className="todo-list">
                {completedItems.map((task) => (
                  <li
                    key={task.id}
                    className={`task ${showAnimation ? "slide-down" : ""}`}
                  >
                    {/* It checks the id passed from edit icon and current task are equal or not */}
                    {editItemId !== task.id ? (
                      <>
                        <label className="container">
                          <input
                            type="checkbox"
                            defaultChecked
                            onChange={() => {
                              setTimeout(
                                () => dispatch(handleStatus(task.id)),
                                500
                              );
                            }}
                          />
                          <SVG />
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
                    ) : (
                      <>
                        <label className="container">
                          <input type="checkbox" />
                          <SVG />

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
                            if (editInputRef.current.value.trim() !== "") {
                              dispatch(
                                editItem({
                                  id: task.id,
                                  title: editInputRef.current.value.trim(),
                                })
                              );
                              setEditItemId(null);
                            } else {
                              dispatch(deleteItem(task.id));
                            }
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
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          {items.length === 0 && <h1 className="not-found">NO ITEMS</h1>}
        </div>
      </div>
    </section>
  );
}
