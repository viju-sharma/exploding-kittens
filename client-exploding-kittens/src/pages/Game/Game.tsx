import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import ExposedCards from "./ExposedCards/ExposedCards";
import Cards from "./Cards/Cards";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { initializeGame, postWin } from "../../features/game.slice";
import YouWonCard from "../../components/YouWonCard";
import YouLostCard from "../../components/YouLostCard";

const Game = () => {
  const dispatch = useAppDispatch();
  const { winGame, lostGame } = useAppSelector((state) => state.game);
  useEffect(() => {
    const localDeck = JSON.parse(localStorage.getItem("deck") || "[]");
    if (localStorage.getItem("deck") && localDeck.length > 0) {
      return;
    }
    dispatch(initializeGame());
  }, []);
  useEffect(() => {
    if (winGame) {
      dispatch(postWin());
    }
  }, [winGame]);
  return (
    <div>
      <Navbar activeTab="game" />
      <div>
        <Cards />
        <div className="border-b-2 m-5"></div>
        <h1 className="text-center text-2xl p-0">Exposed Cards</h1>
        <ExposedCards />
      </div>
      {winGame && <YouWonCard />}
      {lostGame && <YouLostCard />}
    </div>
  );
};

export default Game;
