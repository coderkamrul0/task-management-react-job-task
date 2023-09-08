import { useTask } from "../Context/TaskContext";

const OverView = () => {
  const { tasks, teamTask } = useTask();
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const completeTask = tasks.filter((task) => task.status === "complete");
  const inProgress = tasks.filter((task) => task.status === "in progress");
  const pendingTeamTasks = teamTask.filter((task) => task.status === "pending");
  const completeTeamTask = teamTask.filter(
    (task) => task.status === "complete"
  );
  const teamInProgress = teamTask.filter(
    (task) => task.status === "in progress"
  );
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-5 pt-5">
      <div className="p-2 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <h5 className="text-xl font-semibold">Total Task</h5>
        <p className="font-bold">{tasks.length + teamTask.length}</p>
      </div>
      <div className="p-2 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <h5 className="text-xl font-semibold">Pending Task</h5>
        <p className="font-bold">
          {pendingTasks.length + pendingTeamTasks.length}
        </p>
      </div>
      <div className="p-2 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <h5 className="text-xl font-semibold">In Progress Task</h5>
        <p className="font-bold">{inProgress.length + teamInProgress.length}</p>
      </div>
      <div className="p-2 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <h5 className="text-xl font-semibold">Complete Task</h5>
        <p className="font-bold">
          {completeTask.length + completeTeamTask.length}
        </p>
      </div>
      <div className="p-2 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <h5 className="text-xl font-semibold">Total Users</h5>
        <p className="font-bold">{0}</p>
      </div>
    </div>
  );
};

export default OverView;
