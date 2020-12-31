import { useEffect, useState } from "react";
import Card from "./Card";

const GameField = ({ cardArray }) => {
  const _ = "_";
  const [cards, setCards] = useState([[]]);

  useEffect(() => {
    setCards(cardArray);
  }, [cardArray]);

  return (
    <div>
      {cards.map((row, i) =>
        row.map((card, j) => {
          if (card === _) return <div className="empty-space">&nbsp;</div>;
          // if (card === null) return <div className="card-slot">&nbsp;</div>;
          return <Card key={`row${i}col${j}`} card={card} />;
        })
      )}
    </div>
  );
};

export default GameField;
