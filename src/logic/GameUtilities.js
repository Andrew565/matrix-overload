/// <reference path="../types/jsdoc-types.js" />
import { isSpecialCard, suitsAndColors } from "./CardUtilities";

/**
 * @description Populates the game field for the first time
 * @param {DeckOfCards} deck
 * @returns {[CardArray, DeckOfCards]}
 */
export function populateGameField(deck) {
  let royals = [];
  const emptyRow = [null, "", "", "", null];
  const royalRow = [null, null, null, null];
  let cardArray = [
    Array.from(royalRow),
    Array.from(emptyRow),
    Array.from(emptyRow),
    Array.from(emptyRow),
    Array.from(royalRow),
  ];

  cardArray.forEach((row, i) => {
    row.forEach((cell, j) => {
      // skip the first and last rows, used only for royals
      // skip the first and last columns, used only for royals;
      // and skip the middle space, which starts out empty
      if (cell !== null && !(i === 2 && j === 2)) {
        cardArray[i][j] = getCard(deck, royals);
      }
    });
  });

  if (royals) assignRoyals(cardArray, royals);

  return [cardArray, deck];
}

/**
 * @param {DeckOfCards} deck
 * @param {Standard52Card} royals
 * @return {Standard52Card}
 */
export function getCard(deck, royals) {
  const card = deck.drawFromDrawPile(1)[0];

  if (isSpecialCard(card)) {
    royals.push(card);
    return getCard(deck, royals);
  }

  return card;
}

/**
 * @param {CardArrayLocation} location
 * @param {CardArray} cardArray
 * @returns {CardArrayLocation[]}
 */
export function getLocationSlots([row, col], cardArray) {
  /** @type {CardArrayLocation[]} */
  const openSlots = [];

  /** @type {SlotArray} */
  const slots = {
    left: { location: cardArray[row] && cardArray[row][col - 1] === undefined, slot: [row, col - 1] },
    right: { location: cardArray[row] && cardArray[row][col + 1] === undefined, slot: [row, col + 1] },
    up: { location: cardArray[row - 1] && cardArray[row - 1][col] === undefined, slot: [row - 1, col] },
    down: { location: cardArray[row + 1] && cardArray[row + 1][col] === undefined, slot: [row + 1, col] },
  };
  Object.entries(slots).forEach(
    /**
     * @param {object} param0
     * @param {boolean} param0.location
     * @param {CardArrayLocation} param0.slot
     */
    ({ location, slot }) => !location && openSlots.push(slot)
  );
  return openSlots;
}

/**
 * @param {CardArray} cardArray
 * @param {Standard52Card[]} royals
 * @returns {CardArray}
 */
export function assignRoyals(cardArray, royals) {
  // LOOP over the royals, in order
  royals.forEach((royal) => {
    const targetSuit = royal.suit;
    const colors = suitsAndColors[royal.suit];

    // Check if there are any foundation cards with free royal slots that have the same suit
    const bestMatch = cardArray.reduce(
      (currentBest, matchRow, i) => {
        matchRow.forEach((cell, j) => {
          const args = { targetSuit, colors, cell, rowIndex: i, colIndex: j, currentBest };
          currentBest = getBestMatch(args);
        });
        return currentBest;
      },
      { location: null, card: null }
    );

    // get open slot(s)
    const [row, col] = getLocationSlots(bestMatch.location, cardArray)[0];
    cardArray[row][col] = royal;
  });

  return cardArray;
}

/**
 * @param {object} variables
 * @param {keyof CardSuits} variables.targetSuit
 * @param {string[]} variables.colors
 * @param {Standard52Card} variables.cell
 * @param {number} variables.rowIndex
 * @param {number} variables.colIndex
 * @param {{location: CardArrayLocation, card: Standard52Card}} variables.currentBest
 */
function getBestMatch(variables) {
  const matcher = new RoyalMatcher(variables);
  // return matcher().isCurrentBetter().isSuitMatch().isColorMatch().isHigherRank();
  return matcher();
}

export class RoyalMatcher {
  /**
   * @param {object} variables
   * @param {keyof CardSuits} variables.targetSuit
   * @param {string[]} variables.colors
   * @param {Standard52Card} variables.cell
   * @param {number} variables.rowIndex
   * @param {number} variables.colIndex
   * @param {{location: CardArrayLocation, card: Standard52Card}} variables.currentBest
   */
  constructor({ targetSuit, colors, cell, rowIndex, colIndex, currentBest }) {
    this.currentBest = currentBest;
    this.currentBestCard = currentBest.card;
    this.currentCell = { location: [rowIndex, colIndex], card: cell };
    this.currentCellCard = this.currentCell.card;
    this.targetSuit = targetSuit;
    this.colors = colors;
    this.done = false;
  }

  findMatch() {
    return this.isCurrentBetter();
  }

  isCurrentBetter() {
    if (!this.currentBestCard) return this.currentCell;
    return this.isSuitMatch();
  }

  isSuitMatch() {
    if (!suitMatches(this.currentCellCard, this.targetSuit) || bestIsHigher(this.currentBestCard, this.currentCellCard))
      return this.currentBest;
    return this.isColorMatch();
  }
  isColorMatch() {
    // TODO: this
  }

  isHigherRank() {
    // TODO: this
  }
}

/**
 * @param {Standard52Card} card
 * @param {keyof suitsAndColors} suit
 */
export function suitMatches(card, suit) {
  return card?.suit === suit;
}

export function colorMatches(card, colors) {
  return colors.includes(card.suit);
}

/**
 * @param {Standard52Card} bestCard
 * @param {Standard52Card} potentialCard
 */
export function bestIsHigher(bestCard, potentialCard) {
  return bestCard.numberRank > potentialCard.numberRank;
}
