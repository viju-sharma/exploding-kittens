import { initializeGame } from "../features/game.slice";
import { useAppDispatch } from "../features/hooks";
import classes from "./YouWonCard.module.css";

const YouWonCard = () => {
  const dispatch = useAppDispatch();
  const handleRestart = () => {
    dispatch(initializeGame());
  };
  return (
    <div className={classes.container}>
      <div className="w-fit h-fit">
        <img src="/winner.png" />
        <button onClick={handleRestart}>Restart Game</button>
      </div>
    </div>
  );
};

export default YouWonCard;
