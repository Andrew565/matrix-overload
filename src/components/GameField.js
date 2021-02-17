import { CardSlot } from ".";

const GameField = ({ cardArray }) => {
  return (
    <main>
      <div id="cardSlots" className="grid grid-cols-5 grid-rows-5 gap-4">
        {[
          [0, 1, 2, 3, 4],
          [0, 1, 2, 3, 4],
          [0, 1, 2, 3, 4],
          [0, 1, 2, 3, 4],
          [0, 1, 2, 3, 4],
        ].map((row, i) =>
          row.map((_, j) => {
            const disabled =
              (i === 0 && j === 0) || (i === 0 && j === 4) || (i === 4 && j === 0) || (i === 4 && j === 4);
            return (
              <CardSlot
                key={`row${i}col${j}`}
                id={`row${i}col${j}`}
                card={cardArray[i][j] || null}
                disabled={disabled}
              />
            );
          })
        )}
      </div>
    </main>
  );
};

export default GameField;
