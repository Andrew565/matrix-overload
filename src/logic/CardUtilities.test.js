import * as CardUtilities from "./CardUtilities";
import { StandardCardsWithImages } from "@andrewcreated/deck-of-cards.js";

const cards = StandardCardsWithImages.standard52DeckOfCardsWithJokersAndImages();

/** @param {string} rank */
const findByRank = (rank) => CardUtilities.findCardByNameRank(rank, cards);

describe("isSpecialCard", () => {
  const { isSpecialCard } = CardUtilities;
  it("should return true if special (J, Q, K)", () => {
    const Jack = findByRank("Jack");
    expect(isSpecialCard(Jack)).toBe(true);

    const Queen = findByRank("Queen");
    expect(isSpecialCard(Queen)).toBe(true);

    const King = findByRank("King");
    expect(isSpecialCard(King)).toBe(true);
  });

  it("should return false if not a face card", () => {
    const Three = findByRank("Three");
    expect(isSpecialCard(Three)).toBe(false);

    const Ten = findByRank("Ten");
    expect(isSpecialCard(Ten)).toBe(false);

    const Ace = findByRank("Ace");
    expect(isSpecialCard(Ace)).toBe(false);

    const Joker = findByRank("Joker");
    expect(isSpecialCard(Joker)).toBe(false);
  });
});

describe("isResetCard", () => {
  const { isResetCard } = CardUtilities;
  it("should return true if an Ace or Joker", () => {
    const Ace = findByRank("Ace");
    expect(isResetCard(Ace)).toBe(true);

    const Joker = findByRank("Joker");
    expect(isResetCard(Joker)).toBe(true);
  });

  it("should return false if not an Ace or Joker", () => {
    const Three = findByRank("Three");
    expect(isResetCard(Three)).toBe(false);

    const Queen = findByRank("Queen");
    expect(isResetCard(Queen)).toBe(false);
  });
});

describe("findCard", () => {
  it("should return the right card when searching by nameRank", () => {
    const Three = CardUtilities.findCard("nameRank", "Three", cards);
    expect(Three.nameRank).toBe("Three");
  });

  it("should return undefined if nameRank doesn't exist", () => {
    const Fifteen = CardUtilities.findCard("nameRank", "Fifteen", cards);
    expect(Fifteen).toBeUndefined();
  });

  it("should return the right card when searching by numberRank", () => {
    const Three = CardUtilities.findCard("numberRank", 1, cards);
    expect(Three.nameRank).toBe("Three");
  });

  it("should return undefined if numberRank doesn't exist", () => {
    const FiveSixFive = CardUtilities.findCard("numberRank", 565, cards);
    expect(FiveSixFive).toBeUndefined();
  });
});

describe("findCardByNameRank", () => {
  it("should return the correct card if provided a valid name rank", () => {
    const Jack = CardUtilities.findCardByNameRank("Jack", cards);
    expect(Jack.nameRank).toBe("Jack");
  });

  it("should return undefined if name rank doesn't exist", () => {
    const General = CardUtilities.findCardByNameRank("General", cards);
    expect(General).toBeUndefined();
  });
});

describe("findCards", () => {
  it("should return an array of found cards", () => {
    const Aces = CardUtilities.findCards("nameRank", "Ace", cards);
    expect(Aces.length).toBe(4);
  });

  it("should return an empty array if no cards found", () => {
    const Nothings = CardUtilities.findCards("nameRank", "Nothing", cards);
    expect(Nothings).toMatchObject([]);
    expect(Nothings.length).toBe(0);
  });
});

describe("CardSuits", () => {
  it("should match suits correctly", () => {
    const suits = ["Clubs", "Hearts", "Spades", "Diamonds"];
    suits.forEach((suit) => expect(CardUtilities.CardSuits[suit]).toBe(suit));
  });

  it("should return undefined if the requested suit doesn't exist", () => {
    expect(CardUtilities.CardSuits["Cups"]).toBeUndefined();
  });
});

describe("suitsAndColors", () => {
  it("should return both black suits if a black suit is provided", () => {
    const Clubs = CardUtilities.CardSuits.Clubs;
    const Spades = CardUtilities.CardSuits.Spades;
    expect(CardUtilities.suitsAndColors[Clubs]).toMatchObject([Clubs, Spades]);
    expect(CardUtilities.suitsAndColors[Spades]).toMatchObject([Clubs, Spades]);
  });

  it("should return both red suits if a red suit is provided", () => {
    const Hearts = CardUtilities.CardSuits.Hearts;
    const Diamonds = CardUtilities.CardSuits.Diamonds;
    expect(CardUtilities.suitsAndColors[Hearts]).toMatchObject([Hearts, Diamonds]);
    expect(CardUtilities.suitsAndColors[Diamonds]).toMatchObject([Hearts, Diamonds]);
  });

  it("should return undefined if the requested suit doesn't exist", () => {
    const Swords = "Swords";
    expect(CardUtilities.suitsAndColors[Swords]).toBeUndefined();
  });
});
