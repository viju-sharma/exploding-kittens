import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import "./App.css";
import Signup from "./pages/Signup/Signup";
import { useAppDispatch, useAppSelector } from "./features/hooks";
import { useEffect, useState } from "react";
import { privateRequest } from "./utils/requestMethods";
import { LoginSuccessRes } from "./interfaces/LoginSuccess.interface";
import { login } from "./features/auth.slice";
import Home from "./pages/Home/Home";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";
import Loading from "./components/Loading";
import Game from "./pages/Game/Game";
function App() {
  const dispatch = useAppDispatch();
  const { id: userId } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const getUserDetails = async () => {
    try {
      const response = await privateRequest.get("/api/user/verify");
      const data: LoginSuccessRes = response.data;
      dispatch(
        login({
          id: data.user._id,
          username: data.user.username,
          email: data.user.email,
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  // useEffect(() => {}, []);
  interface PrivateWrapperProps {
    auth: {
      userId: string;
    };
  }

  const PrivateWrapper = ({ auth: { userId } }: PrivateWrapperProps) => {
    return userId ? <Outlet /> : <Navigate to="/login" />;
  };

  const PublicWrapper = ({ auth: { userId } }: PrivateWrapperProps) => {
    return !userId ? <Outlet /> : <Navigate to={"/"} />;
  };

  if (loading) return <Loading />;

  return (
    <div className="App">
      <Routes>
        <Route element={<PublicWrapper auth={{ userId }} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateWrapper auth={{ userId }} />}>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
