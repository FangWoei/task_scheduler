import { Link, useParams } from "react-router-dom";
import { useState } from "react";

export default function Task() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  let task = null;
  if (tasks) {
    task = tasks.find((t) => parseInt(t.id) === parseInt(id));
  }

  if (!task) return "task no found";

  const { title = "", content = "", status } = task;

  const checkPassword = () => {
    if (password === task.password) {
      setVisible(true);
      setShowForm(false);
    } else {
      setVisible(false);
      setShowForm(true);
    }
  };

  return (
    <div className="container mx-auto my-5">
      <h1 className="h1 mb-4 text-center">{title}</h1>
      <p>Task ID: {id}</p>

      {status === "private" ? (
        <div>
          {showForm ? (
            <div>
              <div className="mb-3">
                <label for="task-title" className="form-label">
                  Enter the Password to read the task
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="task-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={(event) => {
                  event.preventDefault();
                  checkPassword();
                }}
              >
                Submit
              </button>
            </div>
          ) : null}
          {visible ? (
            <div className="card rounded shadow-sm m-5">
              <div className="card-body">
                <ul className="list-group">
                  {list.map((item, index) => (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      key={index}
                    >
                      <div>
                        <button
                          onClick={() => {
                            const newEditList = list.map((icon) => {
                              if (icon.id === item.id) {
                                const newIcon = { ...icon };
                                if (icon.isCompleted === true) {
                                  newIcon.isCompleted = false;
                                } else if (icon.isCompleted === false) {
                                  newIcon.isCompleted = true;
                                }
                                return newIcon;
                              } else {
                                return icon;
                              }
                            });
                            setList(newEditList);
                          }}
                          className={`btn btn-sm ${
                            item.isCompleted ? "btn-success" : "btn-light"
                          }`}
                        >
                          <i
                            className={`bi ${
                              item.isCompleted ? "bi-check-square" : "bi-square"
                            }`}
                          ></i>
                        </button>
                        {item.isCompleted ? (
                          <span className="ms-2 text-decoration-line-through">
                            {item.text}
                          </span>
                        ) : (
                          <span className="ms-2">{item.text}</span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          const OtherList = list.filter(
                            (list) => list.id !== item.id
                          );
                          setList(OtherList);
                        }}
                        className="btn btn-sm btn-danger"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </li>
                  ))}
                  <div className="mt-4">
                    <form
                      className="d-flex justify-content-between align-items-center"
                      onSubmit={(event) => {
                        event.preventDefault();
                        const newList = [...list];
                        newList.push({
                          id: Math.random(),
                          text: input,
                          isCompleted: false,
                        });
                        setList(newList);
                        setInput("");
                      }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add new item..."
                        value={input}
                        onChange={(event) => {
                          setInput(event.target.value);
                        }}
                      />
                      <button
                        className="btn btn-primary btn-sm rounded ms-2"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="card rounded shadow-sm m-5">
          <div className="card-body">
            <ul className="list-group">
              {list.map((item, index) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={index}
                >
                  <div>
                    <button
                      onClick={() => {
                        const newEditList = list.map((icon) => {
                          if (icon.id === item.id) {
                            const newIcon = { ...icon };
                            if (icon.isCompleted === true) {
                              newIcon.isCompleted = false;
                            } else if (icon.isCompleted === false) {
                              newIcon.isCompleted = true;
                            }
                            return newIcon;
                          } else {
                            return icon;
                          }
                        });
                        setList(newEditList);
                      }}
                      className={`btn btn-sm ${
                        item.isCompleted ? "btn-success" : "btn-light"
                      }`}
                    >
                      <i
                        className={`bi ${
                          item.isCompleted ? "bi-check-square" : "bi-square"
                        }`}
                      ></i>
                    </button>
                    {item.isCompleted ? (
                      <span className="ms-2 text-decoration-line-through">
                        {item.text}
                      </span>
                    ) : (
                      <span className="ms-2">{item.text}</span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      const OtherList = list.filter(
                        (list) => list.id !== item.id
                      );
                      setList(OtherList);
                    }}
                    className="btn btn-sm btn-danger"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </li>
              ))}
              <div className="mt-4">
                <form
                  className="d-flex justify-content-between align-items-center"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const newList = [...list];
                    newList.push({
                      id: Math.random(),
                      text: input,
                      isCompleted: false,
                    });
                    setList(newList);
                    setInput("");
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add new item..."
                    value={input}
                    onChange={(event) => {
                      setInput(event.target.value);
                    }}
                  />
                  <button
                    className="btn btn-primary btn-sm rounded ms-2"
                  >
                    Add
                  </button>
                </form>
              </div>
            </ul>
          </div>
        </div>
      )}

      <div className="text-center mt-3">
        <Link to="/" className="btn btn-link btn-sm">
          <i className="bi bi-arrow-left"></i> Back
        </Link>
      </div>
    </div>
  );
}
