import { Card } from ".";

/** @param {{cards: import("@andrewcreated/deck-of-cards.js/dist/DeckOfCards").DeckOfCards}} cards */
const Deck = ({ cards }) => {
  const topCard = /** @type {import("@andrewcreated/deck-of-cards.js/dist/standard52CardsAndJokers").Standard52Card} */ (
    /** @type {unknown} */ cards.drawFromDrawPile(1)[0]
  );
  return <Card card={topCard} />;
};

export default Deck;
