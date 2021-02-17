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
  const stateClass = disabled ? "bg-white" : isOver ? "bg-red-400" : "bg-red-50";

  return (
    <div className={`${stateClass} h-32 w-24`} ref={setNodeRef} style={{ maxWidth: "6rem" }}>
      {card && <Card card={card} />}
    </div>
  );
};

export default CardSlot;
