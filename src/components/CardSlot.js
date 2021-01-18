import { useDroppable } from "@dnd-kit/core";
import { Card } from ".";

/**
 * @param {object} props
 * @param {Standard52Card} [props.card]
 * @param {boolean} [props.disabled]
 * @param {string} props.id
 */
const CardSlot = ({ card, disabled, id }) => {
  const { isOver, setNodeRef } = useDroppable({ id, disabled });
  const style = {
    backgroundColor: isOver ? "red" : "green",
  };
  return (
    <div className="card" ref={setNodeRef} style={style}>
      {card && <Card card={card} />}
    </div>
  );
};

export default CardSlot;
