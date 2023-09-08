import { useContext, useState } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import ProfileModal from "../Components/ProfileModal";
import { AuthContext } from "../Providers/AuthProvider";
import AddTaskModal from "../Components/AddTaskModal";
import OverView from "../Components/OverView";
import AllTask from "../Components/AllTask";
import TeamTask from "../Components/TeamTask";
import AddTeamTaskModal from "../Components/AddTeamTaskModal";

const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [isAddTeamTaskModalOpen, setAddTeamTaskModalOpen] = useState(false);

  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const openProfileModal = () => {
    setProfileModalOpen(true);
  };

  const toggleProfile = () => {
    setProfileOpen(!isProfileOpen);
  };

  const closeProfileModal = () => {
    setProfileModalOpen(false);
  };

  const openAddTaskModal = () => {
    setAddTaskModalOpen(true);
  };

  const closeAddTaskModal = () => {
    setAddTaskModalOpen(false);
  };

  const handleAddTask = (newTask) => {
    console.log("Adding task:", newTask);
  };

  const openAddTeamTaskModal = () => {
    setAddTeamTaskModalOpen(true);
  };

  const closeAddTeamTaskModal = () => {
    setAddTeamTaskModalOpen(false);
  };

  const handleAddTeamTask = (newTeamTask) => {
    console.log("Adding team task:", newTeamTask);
    closeAddTeamTaskModal();
  };

  return (
    <div className="bg-gray-100 min-h-screen relative">
      {/* Toggle Bar */}
      <div className="bg-white p-4 sm:hidden flex justify-between items-center">
        <button className="text-gray-600" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <div>
          <div className="bg-white rounded-md flex justify-end">
            <button onClick={toggleProfile}>
              {user.photoURL ? (
                <div className="flex items-center space-x-2">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user?.photoURL}
                    alt=""
                  />
                </div>
              ) : (
                <FaUser className="h-10 w-10 rounded-full" />
              )}
            </button>
            {isProfileOpen && (
              <div className="absolute mt-14 bg-[#040F39] text-white p-5 rounded-md">
                <ul className="flex flex-col gap-2">
                  <li>
                    <button onClick={openProfileModal}>Update Profile</button>
                  </li>
                  <li>
                    <button onClick={logOut}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <nav
        className={`bg-[#040F39] text-white w-64 py-8 px-4 fixed h-full transition-all ${
          isSidebarOpen ? "left-0" : "-left-64"
        }`}
      >
        <div>
          <div className="pb-5">
            <h1 className="font-bold text-4xl text-center border py-3">
              Task Ninja
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                className="w-44 h-44 rounded-full border-2"
                alt=""
              />
            ) : (
              <FaUser className="w-44 h-44 rounded-full border-2" />
            )}
            <p className="font-bold text-3xl">{user.displayName}</p>
            <p>{user.email}</p>
          </div>
          <hr className="my-5" />

          <ul className="flex flex-col gap-2">
            <li
              className="bg-slate-200 text-black rounded px-2 py-1 cursor-pointer hover:bg-white"
              onClick={openAddTaskModal}
            >
              Add Task
            </li>
            <li
              className="bg-slate-200 text-black rounded px-2 py-1 cursor-pointer hover:bg-white"
              onClick={openAddTeamTaskModal}
            >
              Add Team Task
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className={`ml-0 sm:ml-64 p-4 transition-all ${
          isSidebarOpen ? "sm:ml-64" : "sm:ml-0"
        }`}
      >
        <div className="bg-white py-3 hidden md:flex rounded-md  justify-end">
          <button onClick={toggleProfile}>
            {user.photoURL ? (
              <div className="flex items-center space-x-2">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user?.photoURL}
                  alt=""
                />
              </div>
            ) : (
              <FaUser className="h-10 w-10 rounded-full" />
            )}
          </button>
          {isProfileOpen && (
            <div className="absolute mt-14 bg-[#040F39] text-white p-5 rounded-md">
              <ul className="flex flex-col gap-2">
                <li>
                  <button onClick={openProfileModal}>Update Profile</button>
                </li>
                <li>
                  <button onClick={logOut}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Dashboard Content */}
        <div>
          <OverView />
          <AllTask />
          <TeamTask />
        </div>
      </div>

      {isProfileModalOpen && (
        <ProfileModal onClose={closeProfileModal} user={user} />
      )}
      {isAddTaskModalOpen && (
        <AddTaskModal onClose={closeAddTaskModal} onAddTask={handleAddTask} />
      )}
      {isAddTeamTaskModalOpen && (
        <AddTeamTaskModal
          onClose={closeAddTeamTaskModal}
          onAddTeamTask={handleAddTeamTask}
        />
      )}
    </div>
  );
};

export default Home;
