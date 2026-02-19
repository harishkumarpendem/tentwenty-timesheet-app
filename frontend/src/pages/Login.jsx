import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/login", data);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-card">
          <h2>Welcome back</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <input
              {...register("email")}
              placeholder="name@example.com"
            />

            <label>Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="********"
            />

            <div className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>

            <button type="submit">Sign in</button>
          </form>
        </div>
      </div>

      <div className="login-right">
        <div className="brand-content">
          <h1>ticktock</h1>
          <p>
            Introducing ticktock, our cutting-edge timesheet web application
            designed to revolutionize how you manage employee work hours.
            With ticktock, you can effortlessly track and monitor employee
            attendance and productivity from anywhere, anytime, using any
            internet-connected device.
          </p>
        </div>
      </div>
    </div>
  );
}
