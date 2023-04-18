import classes from "./Login.module.css";
import SleepingCat from "../../components/SleepingCat";
import { Link } from "react-router-dom";
import { useState } from "react";
import { publicRequest } from "../../utils/requestMethods";
import { toast } from "react-toastify";
import { login } from "../../features/auth.slice";
import { useAppDispatch } from "../../features/hooks";
import { LoginSuccessRes } from "../../interfaces/LoginSuccess.interface";
const Login = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await publicRequest.post("/api/user/login", form);
      const data: LoginSuccessRes = response.data;
      dispatch(
        login({
          id: data.user._id,
          username: data.user.username,
          email: data.user.email,
        })
      );
      localStorage.setItem("token", "Bearer " + data.token);
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className={classes.container}>
      <SleepingCat />
      <div className={classes.wrapper}>
        <div className={classes.form}>
          <h1>Exploding Kitten</h1>
          <form onSubmit={handleSubmit}>
            <label className="">Username</label>
            <input
              value={form.username}
              onChange={handleChange}
              type="text"
              id="username"
              name="username"
              className=""
              placeholder="username"
              required
            />
            <label className="">Password</label>
            <input
              value={form.password}
              onChange={handleChange}
              type="password"
              name="password"
              className=""
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
          </form>
          <Link to={"/signup"}>
            <p className={classes.noAcchref}>Don't have account ?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
