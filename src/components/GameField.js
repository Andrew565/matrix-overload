import { CardSlot } from ".";

const GameField = ({ cardArray }) => {
  return (
    <main>
      <div id="cardSlots">
        {[
          [0, 1, 2, 3, 4],
          [0, 1, 2, 3, 4],
          [0, 1, 2, 3, 4],
        ].map((row, i) =>
          row.map((_, j) => <CardSlot key={`row${i}col${j}`} id={`row${i}col${j}`} card={cardArray[i][j] || null} />)
        )}
      </div>
    </main>
  );
};

export default GameField;
