import { useAppSelector } from "../../../features/hooks";
import classes from "./Cards.module.css";
import Card from "./components/Card";

const Cards = () => {
  const deck = useAppSelector((state) => state.game.deck);
  return (
    <div className={classes.container}>
      {deck.map((card, index) => {
        return <Card key={index} type={card} index={index} styleType="deck" />;
      })}
    </div>
  );
};

export default Cards;
