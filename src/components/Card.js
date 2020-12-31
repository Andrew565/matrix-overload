const Card = ({ card }) => {
  if (!card) return null;

  return (
    <div>
      {card.initial}
      {card.suit[0]}
    </div>
  );
};

export default Card;
