import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Navbar from "../../components/Navbar";
import { LeaderBoardUser } from "../../interfaces/LeaderBoard.interface";
import { privateRequest } from "../../utils/requestMethods";
import { toast } from "react-toastify";

const LeaderBoard = () => {
  type LeaderBoardArr = LeaderBoardUser[];

  const [scores, setScores] = useState([] as LeaderBoardArr);
  const getLeaderBoard = async () => {
    try {
      const response = await privateRequest.get("/api/game/leaderboard");
      const scoresList: LeaderBoardArr = response.data;
      setScores(scoresList);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getLeaderBoard();
  }, []);

  return (
    <div>
      <Navbar />
      <Table scores={scores} />
    </div>
  );
};

export default LeaderBoard;
