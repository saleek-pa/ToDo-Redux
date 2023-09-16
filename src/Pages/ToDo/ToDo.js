import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, editItem, deleteItem, handleStatus } from "../../Redux/Store";
import { SvgIcon } from "../../Components/SvgIcon";
import "./ToDo.css";

export default function ToDo() {
  const editInputRef = useRef(null);
  const [editItemId, setEditItemId] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  //Slide-Down animation when adding new items

  const items = useSelector((state) => state.todo.items);
  const activeItems = items.filter((item) => item.completed === false);
  const completedItems = items.filter((item) => item.completed === true);
  const dispatch = useDispatch();

  //Add New Items
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

  const handleTaskClick = (e, task) => {
    const targetClass = e.target.className;

    //Checks whether the variable targetClass is a string
    //if it's undefined or of another data type, the code block will be skipped.
    if (typeof targetClass === "string") {
      if (targetClass.includes("fa-pen")) { //Edit
        setEditItemId(task.id);
      } else if (targetClass.includes("fa-check")) { //Save
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
      } else if (targetClass.includes("fa-trash")) { //Delete
        dispatch(deleteItem(task.id));
      } else if (e.target.type === "checkbox") { //Checkbox
        setTimeout(() => dispatch(handleStatus(task.id)), 500);
      }
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
            {[...activeItems].reverse().map((task) => ( //Add task on top
              <li
                key={task.id}
                className={`task ${showAnimation ? "slide-down" : ""}`}
                onClick={(e) => handleTaskClick(e, task)}
              >
                {/* It checks the id passed from edit icon and current task are equal or not */}
                {editItemId !== task.id ? (
                  <>
                    <label className="container">
                      <input type="checkbox" />
                      <SvgIcon />
                      <span className="todo-text">{task.title}</span>
                    </label>

                    <span className="span-button">
                      <i className="fa-solid fa-pen"></i>
                    </span>
                    <span className="span-button">
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </>
                ) : (
                  <>
                    <label className="container">
                      <input type="checkbox" />
                      <SvgIcon />
                      <input
                        type="text"
                        defaultValue={task.title}
                        className="edit-input"
                        ref={editInputRef}
                      />
                    </label>

                    <span className="span-button">
                      <i className="fa-solid fa-check"></i>
                    </span>
                    <span className="span-button">
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
                    onClick={(e) => handleTaskClick(e, task)}
                  >
                    {/* It checks the id passed from edit icon and current task are equal or not */}
                    {editItemId !== task.id ? (
                      <>
                        <label className="container">
                          <input type="checkbox" defaultChecked />
                          <SvgIcon />
                          <span className="todo-text">{task.title}</span>
                        </label>
                        <span className="span-button">
                          <i className="fa-solid fa-pen"></i>
                        </span>
                        <span className="span-button">
                          <i className="fa-solid fa-trash"></i>
                        </span>
                      </>
                    ) : (
                      <>
                        <label className="container">
                          <input type="checkbox" />
                          <SvgIcon />

                          <input
                            type="text"
                            defaultValue={task.title}
                            className="edit-input"
                            ref={editInputRef}
                          />
                        </label>
                        <span className="span-button">
                          <i className="fa-solid fa-check"></i>
                        </span>
                        <span className="span-button">
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
