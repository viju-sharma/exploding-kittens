import { CardTypes } from "../../../../interfaces/Card.interface";
import deckStyle from "../Cards.module.css";
import exposedCardStyle from "../../ExposedCards/ExposedCards.module.css";
import { useAppDispatch } from "../../../../features/hooks";
import { exposeCard } from "../../../../features/game.slice";

type CardProps = {
  type: CardTypes;
  styleType: "deck" | "exposed";
  index: number;
};

const Card = ({ type, styleType, index }: CardProps) => {
  const classes = styleType === "deck" ? deckStyle : exposedCardStyle;
  const { title, image } = cardTypes[type];

  const dispatch = useAppDispatch();
  const handleExposeCard = () => {
    if (styleType === "exposed") return;
    dispatch(exposeCard(index));
  };

  return (
    <div className={classes.card} onClick={handleExposeCard}>
      <h3 className={classes.title}>{title}</h3>

      <div className={classes.circle}>
        <img src={image} className="w-full" />
      </div>
    </div>
  );
};

export default Card;

/********************************************************************************************************
 * CARD TYPES
 */

const cardTypes = {
  cat: {
    title: "Cat Card",
    image: "/cat.svg",
  },
  defuse: {
    title: "Defuse Card",
    image: "/cat.svg",
  },
  suffle: {
    title: "Suffle Card",
    image: "/cat.svg",
  },
  exploding: {
    title: "Exploding Card",
    image: "/cat.svg",
  },
};
