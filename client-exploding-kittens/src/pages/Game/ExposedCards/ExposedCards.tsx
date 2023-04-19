import { useAppSelector } from "../../../features/hooks";
import classes from "./ExposedCards.module.css";
import Card from "../Cards/components/Card";

const ExposedCards = () => {
  const exposedCards = useAppSelector((state) => state.game.exposedCards);
  return (
    <div className={classes.container}>
      {exposedCards.map((card, index) => {
        return (
          <Card index={index} key={index} type={card} styleType="exposed" />
        );
      })}
    </div>
  );
};

export default ExposedCards;
