import "./App.css";

import React, { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import { randomColor } from "randomcolor";
import Draggable from "react-draggable";

function App() {
  const [item, setItem] = useState("");

  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const newItem = () => {
    if (item.trim() !== "") {
      const newItem = {
        id: uuidv4(),
        item: item,
        color: randomColor({
          luminosity: "light",
        }),
        defaultPos: {
          x: -250,
          y: -250,
        },
      };
      setItems((items) => [...items, newItem]);
      setItem("");
    } else {
      alert("Please, enter some task!");
      setItem("");
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updatePos = (data, index) => {
    let newArray = [...items];
    newArray[index].defaultPos = { x: data.x, y: data.y };
    setItems(newArray);
  };
  const keyPress = (e) => {
    const code = e.keyCode || e.whitch;
    if (code === 13) {
      newItem();
    }
  };
  const clear = () => {
    setItem("");
  };

  return (
    <header className="container">
      <div className="wrapper">
        <div className="title">
          <h1>customize your task board</h1>
          <p>note down, dragg and pin your note</p>
        </div>
        <div className="field">
          <div className="input">
            <input
              onChange={(e) => setItem(e.target.value)}
              value={item}
              type="text"
              placeholder="type your task"
              onKeyPress={(e) => keyPress(e)}
            ></input>
            <svg
              onClick={clear}
              className="delete__input"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g data-name="Layer 2">
                <g data-name="close">
                  <rect
                    width="24"
                    height="24"
                    transform="rotate(180 12 12)"
                    opacity="0"
                  />
                  <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
                </g>
              </g>
            </svg>
          </div>
          <button onClick={newItem} className="sub">
            Add
          </button>
        </div>
      </div>
      {items.map((item, index) => {
        return (
          <Draggable
            key={index}
            defaultPosition={item.defaultPos}
            onStop={(_, data) => updatePos(data, index)}
          >
            <div className="todo__item" style={{ backgroundColor: item.color }}>
              {`${item.item}`}
              <button onClick={() => deleteItem(item.id)} className="delete">
                <svg
                  className="delete__icon"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g data-name="Layer 2">
                    <g data-name="close">
                      <rect
                        width="24"
                        height="24"
                        transform="rotate(180 12 12)"
                        opacity="0"
                      />
                      <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </Draggable>
        );
      })}
    </header>
  );
}

export default App;
