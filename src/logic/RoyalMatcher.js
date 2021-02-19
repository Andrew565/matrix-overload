import { suitMatches, colorMatches, bestIsHigher } from "./GameUtilities";


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
    if (!this.currentBestCard)
      return this.currentCell;
    return this.isSuitMatch();
  }

  isSuitMatch() {
    if (!suitMatches(this.currentCellCard, this.targetSuit))
      return this.currentBest;
    return this.isColorMatch();
  }
  isColorMatch() {
    if (!colorMatches(this.currentCellCard, this.colors))
      return this.currentBest;
    return this.isHigherRank();
  }

  isHigherRank() {
    return bestIsHigher(this.currentBestCard, this.currentCellCard) ? this.currentBest : this.currentCell;
  }
}
