import classes from "../Login/Login.module.css";
import SleepingCat from "../../components/SleepingCat";
import { Link } from "react-router-dom";
import { useState } from "react";
import { publicRequest } from "../../utils/requestMethods";

const Signup = () => {
  type SignupForm = {
    email: string;
    username: string;
    password: string;
  };

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  } as SignupForm);

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
      const response = await publicRequest.post("/api/user/create", form);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <SleepingCat />
      <div className={classes.wrapper}>
        <div className={classes.form}>
          <h1>Exploding Kitten</h1>
          <form onSubmit={handleSubmit}>
            <label className="">Email</label>
            <input
              value={form.email}
              onChange={handleChange}
              type="email"
              name="email"
              className=""
              placeholder="email"
              required
            />
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
            <button type="submit">Signup</button>
          </form>
          <Link to={"/login"}>
            <p className={classes.noAcchref}>Already have account ?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
