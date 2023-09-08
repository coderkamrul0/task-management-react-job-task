/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTask } from "../Context/TaskContext";

const AddTeamTaskModal = ({ onClose, onAddTeamTask }) => {
  const { addTeamTask } = useTask();

  const users = [
    { id: "user1", name: "Kamrul" },
    { id: "user2", name: "Rafi" },
    { id: "user3", name: "Abdul" },
    { id: "user4", name: "Rohim" },
    { id: "user5", name: "Rofik" },
    { id: "user6", name: "Hasan" },
  ];

  const [taskData, setTaskData] = useState({
    id: Math.floor(Math.random() * 10 ** 10) + 1,
    title: "",
    description: "",
    status: "pending",
    priority: "Low",
    dueDate: "",
    teamMembers: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTeamMember = () => {
    const { teamMembers } = taskData;
    if (teamMembers.length < 5) {
      setTaskData((prevData) => ({
        ...prevData,
        teamMembers: [...prevData.teamMembers, ""],
      }));
    }
  };

  const handleTeamMemberChange = (index, value) => {
    const { teamMembers } = taskData;
    teamMembers[index] = value;
    setTaskData((prevData) => ({
      ...prevData,
      teamMembers: [...teamMembers],
    }));
  };

  const handleRemoveTeamMember = (index) => {
    const { teamMembers } = taskData;
    teamMembers.splice(index, 1);
    setTaskData((prevData) => ({
      ...prevData,
      teamMembers: [...teamMembers],
    }));
  };

  const handleSubmit = () => {
    addTeamTask(taskData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[80%] md:w-1/3 mx-auto bg-white p-5 rounded-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add Team Task
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description:</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Priority:</label>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Team Members:
          </label>
          {taskData.teamMembers.map((member, index) => (
            <div key={index} className="flex items-center mb-2">
              <select
                value={member}
                onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                className="w-full p-2 border rounded-md mr-2"
              >
                <option value="" disabled>
                  Select User
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleRemoveTeamMember(index)}
                className="bg-red-500 text-white px-2 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleAddTeamMember}
            className="bg-blue-500 text-white px-2 rounded-md"
          >
            Add Team Member
          </button>
        </div>
        <div>
          <button
            className="bg-blue-500 w-full text-white py-2 px-4 rounded-md"
            onClick={handleSubmit}
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

export default AddTeamTaskModal;
