import { isSpecialCard, suitsAndColors } from "./CardUtilities";

/**
 * @description Populates the game field for the first time
 * @param {DeckOfCards} deck
 * @returns {[CardArray, DeckOfCards]}
 */
export function populateGameField(deck) {
  const royals = [];
  let cardArray = [[], [], [], [], []];

  for (let i = 0; i < 5; i++) {
    // skip the first and last rows, used only for royals
    if (i === 0 || i === 4) continue;

    for (let j = 0; j < 5; j++) {
      // skip the first and last columns, used only for royals
      if (j === 0 || j === 4) continue;

      // Skip the middle space, which starts out empty
      if (i === 2 && j === 2) continue;

      const card = deck.drawFromDrawPile(1)[0];
      if (isSpecialCard(card)) {
        royals.push(card);
      } else {
        cardArray[i][j] = card;
      }
    }
  }

  cardArray = assignRoyals(cardArray, royals);

  return [cardArray, deck];
}

/**
 * @param {CardArrayLocation} location
 * @param {CardArray} cardArray
 * @returns {CardArrayLocation[]}
 */
export function getLocationSlots([row, col], cardArray) {
  /** @type {CardArrayLocation[]} */
  const openSlots = [];
  // check four slots
  if (cardArray[row][col - 1] === undefined) openSlots.push([row, col - 1]);
  if (cardArray[row][col + 1] === undefined) openSlots.push([row, col + 1]);
  if (cardArray[row - 1][col] === undefined) openSlots.push([row - 1, col]);
  if (cardArray[row + 1][col] === undefined) openSlots.push([row + 1, col]);
  return openSlots;
}

/**
 * @param {CardArray} cardArray
 * @param {Standard52Card[]} royals
 * @returns {CardArray}
 */
export function assignRoyals(cardArray, royals) {
  // Exit early if no royals to assign
  if (!royals.length) return cardArray;

  // LOOP over the royals, in order
  royals.forEach((royal) => {
    const targetSuit = royal.suit;
    let bestMatch = null;
    // Check if there are any foundation cards with free royal slots that have the same suit
    const highestSuitMatch = cardArray.reduce(
      (selection, suitRow, i) => {
        suitRow.forEach((suitCol, j) => {
          if (
            typeof suitCol !== "string" &&
            suitCol !== null &&
            suitCol.suit === targetSuit &&
            suitCol.numberRank > selection.rank &&
            getLocationSlots([i, j], cardArray).length > 0
          )
            selection = { location: [i, j], rank: suitCol.numberRank };
        });
        return selection;
      },
      { location: null, rank: null }
    );

    if (highestSuitMatch.rank !== null) bestMatch = highestSuitMatch;

    // If no suit match, look for color match
    const highestColorMatch = cardArray.reduce(
      (selection, colorRow, i) => {
        const colors = suitsAndColors[royal.suit];
        colorRow.forEach((colorCol, j) => {
          if (
            typeof colorCol !== "string" &&
            colorCol !== null &&
            colors.includes(colorCol.suit) &&
            colorCol.numberRank > selection.rank &&
            getLocationSlots([i, j], cardArray).length > 0
          )
            selection = { location: [i, j], rank: colorCol.numberRank };
        });
        return selection;
      },
      { location: null, rank: null }
    );

    if (!bestMatch && highestColorMatch.rank !== null) bestMatch = highestColorMatch;

    // If no color match, just assign to the highest available card
    const highestRankMatch = cardArray.reduce(
      (selection, rankRow, i) => {
        rankRow.forEach((rankCol, j) => {
          if (
            typeof rankCol !== "string" &&
            rankCol !== null &&
            rankCol.numberRank > selection.rank &&
            getLocationSlots([i, j], cardArray).length > 0
          )
            selection = { location: [i, j], rank: rankCol.numberRank };
        });
        return selection;
      },
      { location: null, rank: null }
    );

    if (!bestMatch && highestRankMatch.rank !== null) bestMatch = highestRankMatch;

    // get open slot(s)
    const [row, col] = getLocationSlots(bestMatch.location, cardArray)[0];
    cardArray[row][col] = royal;
  });

  return cardArray;
}
