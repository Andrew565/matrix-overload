/** @param {Standard52Card} card */
export function isSpecialCard(card) {
  return card.numberRank > 8 && card.numberRank < 12;
}

/** @param {Standard52Card} card */
export function isResetCard(card) {
  return card.nameRank === "Ace" || card.nameRank === "Joker";
}

/**
 * @param {string} searchType
 * @param {string | number} value
 * @param {Standard52Card[]} deck
 * @returns {Standard52Card}
 */
export function findCard(searchType, value, deck) {
  return deck.find((card) => card[searchType] === value);
}

/**
 * @param {string} rank
 * @param {Standard52Card[]} deck
 */
export function findCardByNameRank(rank, deck) {
  return findCard("nameRank", rank, deck);
}

/**
 * @param {string} searchType
 * @param {string} value
 * @param {Standard52Card[]} deck
 * @returns {Standard52Card[]}
 */
export function findCards(searchType, value, deck) {
  return deck.filter((card) => card[searchType] === value);
}

export const CardSuits = {
  Clubs: "Clubs",
  Hearts: "Hearts",
  Spades: "Spades",
  Diamonds: "Diamonds",
};

export const suitsAndColors = {
  [CardSuits.Clubs]: [CardSuits.Clubs, CardSuits.Spades],
  [CardSuits.Hearts]: [CardSuits.Hearts, CardSuits.Diamonds],
  [CardSuits.Spades]: [CardSuits.Clubs, CardSuits.Spades],
  [CardSuits.Diamonds]: [CardSuits.Hearts, CardSuits.Diamonds],
};
