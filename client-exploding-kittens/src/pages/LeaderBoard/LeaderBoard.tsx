import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Navbar from "../../components/Navbar";
import { LeaderBoardUser } from "../../interfaces/LeaderBoard.interface";
import { privateRequest } from "../../utils/requestMethods";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const LeaderBoard = () => {
  type LeaderBoardArr = LeaderBoardUser[];

  const [scores, setScores] = useState([] as LeaderBoardArr);
  const [loading, setLoading] = useState(true);

  const getLeaderBoard = async () => {
    try {
      const response = await privateRequest.get("/api/game/leaderboard");
      const scoresList: LeaderBoardArr = response.data;
      setScores(scoresList);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeaderBoard();
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <Navbar activeTab="leader-board" />
      <Table scores={scores} />
    </div>
  );
};

export default LeaderBoard;
