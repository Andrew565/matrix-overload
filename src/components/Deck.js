import { Card } from ".";

/** @param {{cards: DeckOfCards}} cards */
const Deck = ({ cards }) => {
  const topCard = /** @type {Standard52Card} */ (/** @type {unknown} */ cards.drawFromDrawPile(1)[0]);
  return <Card card={topCard} />;
};

export default Deck;
