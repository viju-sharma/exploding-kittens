import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { privateRequest } from "../../utils/requestMethods";
import { toast } from "react-toastify";
import { LeaderBoardUser } from "../../interfaces/LeaderBoard.interface";
import Loading from "../../components/Loading";
const Home = () => {
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const getScore = async () => {
    try {
      const reponse = await privateRequest.get("/api/game/score");
      const data: LeaderBoardUser = reponse.data;
      setScore(data.score);
      console.log(data);
    } catch (error) {
      toast.error("Failed to get Score");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getScore();
  }, []);
  if (loading) return <Loading />;
  return (
    <>
      <Navbar activeTab="home" />
      <div className="grid place-content-center h-[80vh]">
        <h1 className="text-5xl">Your Score is : </h1>
        <span className="text-7xl text-center">{score}</span>
      </div>
    </>
  );
};

export default Home;
