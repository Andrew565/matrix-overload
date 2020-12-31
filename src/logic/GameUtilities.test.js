import { DeckOfCards, StandardCardsWithImages } from "@andrewcreated/deck-of-cards.js";
import { populateGameField } from "./GameUtilities";

const deck = new DeckOfCards(StandardCardsWithImages.standard52DeckOfCardsWithJokersAndImages());

describe("populateGameField", () => {
  it("should not error", () => {
    const [cardArray, deck2] = populateGameField(deck);
    expect(cardArray.length).toBe(5);
    expect(deck.drawPile.length < 52).toBe(true);
  });
});
