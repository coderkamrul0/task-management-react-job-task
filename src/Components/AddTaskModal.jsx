/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTask } from "../Context/TaskContext";

const AddTaskModal = ({ onClose }) => {
  const { addTask } = useTask();

  const [task, setTask] = useState({
    id: Math.floor(Math.random() * 10 ** 10) + 1,
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    assignedTo: "",
    status: "pending",
  });

  const [selectedUser, setSelectedUser] = useState("");

  const users = [
    { id: "user1", name: "Kamrul" },
    { id: "user2", name: "Rafi" },
    { id: "user3", name: "Abdul" },
    { id: "user4", name: "Rohim" },
    { id: "user5", name: "Rofik" },
    { id: "user6", name: "Hasan" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleAssignToChange = (e) => {
    setSelectedUser(e.target.value);
    setTask({
      ...task,
      assignedTo: e.target.value,
    });
  };

  const handleAddTask = () => {
    addTask(task);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[80%] md:w-1/3 mx-auto">
        <div className="bg-white p-4 rounded-md flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Add Task</h2>
          <div className="mb-4 w-full">
            <label className="text-sm font-medium">Title</label>
            <br />
            <input
              type="text"
              className="w-full outline-none p-2 border rounded-md"
              name="title"
              value={task.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 w-full">
            <label className="text-sm font-medium">Description</label>
            <br />
            <textarea
              className="w-full outline-none p-2 border rounded-md"
              name="description"
              value={task.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 w-full">
            <label className="text-sm font-medium">Due Date</label>
            <br />
            <input
              type="date"
              className="w-full outline-none p-2 border rounded-md"
              name="dueDate"
              value={task.dueDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 w-full">
            <label className="text-sm font-medium">Priority</label>
            <br />
            <select
              className="w-full outline-none p-2 border rounded-md"
              name="priority"
              value={task.priority}
              onChange={handleInputChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mb-4 w-full">
            <label className="text-sm font-medium">Assigned To</label>
            <br />
            <select
              className="w-full outline-none p-2 border rounded-md"
              name="assignedTo"
              value={selectedUser}
              onChange={handleAssignToChange}
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-blue-500 w-full text-white py-2 px-4 rounded-md"
            onClick={handleAddTask}
          >
            Add Task
          </button>
          <button
            className="bg-red-500 w-full text-white py-2 px-4 rounded-md mt-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
