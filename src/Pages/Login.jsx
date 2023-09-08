import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    if (!email || !password) {
      setError("All fields are required.");
      return;
    } else if (password.length < 8) {
      setError("Password must be 8 characters.");
      return;
    } else {
      signIn(email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          navigate("/home");
        })
        .catch(() => {
          setError("Enter correct Email and Password");
        });
    }
  };

  return (
    <div className="min-h-screen bg-[#102C57]">
      <div className="max-w-screen-xl mx-auto px-3 md:px-0 pt-28">
        <div>
          <h3 className="uppercase text-center text-white text-2xl font-bold">
            Login your account
          </h3>
        </div>
        <div className="flex justify-center items-center">
          <form onSubmit={handleLogin} className="md:w-2/5">
            <div className="mb-4">
              <label className="block text-sm text-white font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full p-2 border rounded-md outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-white font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  className="mt-1 block w-full p-2 border rounded-md outline-none"
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <div className="text-red-800 text-center text-sm pb-2">{error}</div>
            <div>
              <button
                type="submit"
                className="bg-black text-white w-full py-2 rounded-md font-bold hover:bg-slate-900"
              >
                Login
              </button>
            </div>

            <div className="text-center py-3 text-white">
              <p>
                {"Dont't"} have an account ?{" "}
                <span className="text-[#72AEC8]">
                  <Link to="/register">Register Now</Link>
                </span>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
