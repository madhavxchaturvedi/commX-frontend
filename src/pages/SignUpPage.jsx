import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg-image.png";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const bodyData = isLogin
        ? { emailId: formData.emailId, password: formData.password }
        : formData;

      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed");
      }

      if (isLogin) {
        const data = await res.json();
        console.log(data);
        // localStorage.setItem("user", JSON.stringify(data));
        // navigate("/home");
      } else {
        // setIsLogin(true);
        const data = await res.json();
        console.log(data);
      }
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
    //  finally {
    //   setLoading(false);
    // }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="relative w-[950px] h-[650px] rounded-3xl overflow-hidden shadow-lg bg-white/10">
          {/* Blur Side */}
          <div
            className={`absolute top-0 h-full w-1/2 flex items-center justify-center backdrop-blur-md bg-white/10 transition-all duration-700 ${
              isLogin ? "left-0 translate-x-0" : "left-0 translate-x-full"
            }`}
          >
            <h2 className="text-5xl font-bold text-white">CommX</h2>
          </div>

          {/* Form Side */}
          <div
            className={`absolute top-0 h-full w-1/2 bg-white flex flex-col justify-center px-16 transition-all duration-700 ${
              isLogin ? "right-0 translate-x-0" : "right-0 -translate-x-full"
            }`}
          >
            <div className="w-full max-w-sm mx-auto space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-800">
                  {isLogin ? "Sign In" : "Sign Up"}
                </h2>
                <p className="text-gray-500 mt-2">
                  {isLogin ? "Welcome back to CommX" : "Join CommX today"}
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {!isLogin && (
                  <>
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        required
                        className="w-1/2 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        required
                        className="w-1/2 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
                      />
                    </div>

                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                    <input
                      type="email"
                      name="emailId"
                      placeholder="Email address"
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                  </>
                )}

                {isLogin && (
                  <input
                    type="email"
                    name="emailId"
                    placeholder="Email address"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                )}

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition"
                >
                  {loading
                    ? isLogin
                      ? "Signing In..."
                      : "Signing Up..."
                    : isLogin
                    ? "Sign In"
                    : "Sign Up"}
                </button>

                {error && <p className="text-red-500 text-center">{error}</p>}
              </form>

              <p className="text-center text-sm text-gray-600">
                {isLogin ? (
                  <>
                    Don’t have an account?{" "}
                    <span
                      onClick={() => setIsLogin(false)}
                      className="text-blue-600 cursor-pointer hover:underline"
                    >
                      Sign Up
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span
                      onClick={() => setIsLogin(true)}
                      className="text-blue-600 cursor-pointer hover:underline"
                    >
                      Sign In
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
