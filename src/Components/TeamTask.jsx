import { useState } from "react";
import { useTask } from "../Context/TaskContext";
import { FaRegCalendarAlt, FaUser } from "react-icons/fa";

const TeamTask = () => {
  const { teamTask, deleteTeamTask, changeTeamTaskStatus } = useTask();

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDueDate, setFilterDueDate] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");

  const handleStatusChange = (taskId, currentStatus) => {
    let newStatus;
    if (currentStatus === "pending") {
      newStatus = "in progress";
    } else if (currentStatus === "in progress") {
      newStatus = "complete";
    } else {
      newStatus = currentStatus;
    }

    changeTeamTaskStatus(taskId, newStatus);
  };

  // Filter tasks based on status, due date, and priority
  const filteredTasks = teamTask.filter((task) => {
    if (filterStatus === "all" || task.status === filterStatus) {
      if (filterDueDate === "") {
        return true;
      } else {
        const taskDueDate = new Date(task.dueDate);
        const filterDueDateObj = new Date(filterDueDate);

        if (
          taskDueDate.getFullYear() === filterDueDateObj.getFullYear() &&
          taskDueDate.getMonth() === filterDueDateObj.getMonth() &&
          taskDueDate.getDate() === filterDueDateObj.getDate()
        ) {
          return true;
        }
      }
    }
    return false;
  });

  // Filter by priority
  const priorityFilteredTasks = filteredTasks.filter((task) => {
    if (filterPriority === "all" || task.priority === filterPriority) {
      return true;
    }
    return false;
  });

  return (
    <div className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-5 rounded-md">
      <h2 className="text-xl font-bold pb-3">Team Task List</h2>

      {/* Filter options */}
      <div className="md:flex justify-between">
        <div className="mb-4">
          <label className="text-sm font-medium">Filter by Status:</label>
          <select
            className="ml-2 p-2 border rounded-md"
            onChange={(e) => setFilterStatus(e.target.value)}
            value={filterStatus}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium">Filter by Due Date:</label>
          <input
            type="date"
            className="ml-2 p-2 border rounded-md"
            onChange={(e) => setFilterDueDate(e.target.value)}
            value={filterDueDate}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium">Filter by Priority:</label>
          <select
            className="ml-2 p-2 border rounded-md"
            onChange={(e) => setFilterPriority(e.target.value)}
            value={filterPriority}
          >
            <option value="all">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
        {priorityFilteredTasks.map((task, index) => (
          <div
            key={index}
            className="relative p-2 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          >
            <h3 className="font-bold">{task.title}</h3>
            <hr />
            <p className="py-2">Description: {task.description}</p>
            <p className="flex items-center gap-1">
              <FaRegCalendarAlt />
              {task.dueDate}
            </p>
            <div className="flex items-center gap-3 py-2 flex-wrap">
              <FaUser />
              {task.teamMembers.map((member, index) => (
                <p key={index}>{member}</p>
              ))}
            </div>
            <div className="flex justify-between">
              <p>Priority: {task.priority}</p>
              <button
                className={
                  task.status === "pending"
                    ? "bg-black text-white"
                    : task.status === "in progress"
                    ? "bg-yellow-500"
                    : "bg-green-500 text-white"
                }
                style={{ padding: "2px 10px", borderRadius: "5px" }}
                onClick={() => handleStatusChange(task.id, task.status)}
                disabled={task.status === "complete"}
                title={
                  task.status !== "complete"
                    ? `Change Status to ${
                        task.status === "pending"
                          ? "In Progress"
                          : task.status === "in progress"
                          ? "Complete"
                          : "Pending"
                      }`
                    : null
                }
              >
                {task.status}
              </button>
            </div>
            <div
              onClick={() => deleteTeamTask(task.id)}
              className="border-2 border-black text-black  rounded-full h-6 w-6 flex justify-center items-center hover:bg-red-600 hover:text-white hover:border-red-600 absolute top-1 right-2"
            >
              <button>X</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamTask;
