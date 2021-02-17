import { useDraggable } from "@dnd-kit/core";

/**
 * @param {object} props
 * @param {Standard52Card} props.card
 */
const Card = ({ card }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: card.name,
  });

  console.log("card image:", card.image);

  return (
    <figure ref={setNodeRef} {...listeners} {...attributes}>
      <img src={card.image} alt={card.name} />
    </figure>
  );
};

export default Card;
