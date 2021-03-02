import { useDraggable } from "@dnd-kit/core";

/**
 * @param {object} props
 * @param {Standard52Card} props.card
 */
const Card = ({ card }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: card.name,
  });

  return <figure ref={setNodeRef} {...listeners} {...attributes}>
    <img src="" alt="" />
  </figure>;
};

export default Card;
