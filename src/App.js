import { useEffect, useState } from "react";
import { StandardCards, DeckOfCards } from "@andrewcreated/deck-of-cards.js";
import { Deck, GameField } from "./components";
import "./App.css";
import { populateGameField } from "./logic/GameUtilities";

const standardCards = StandardCards.standard52DeckOfCards;

function App() {
  const startingDeck = () => {
    const deck = new DeckOfCards(standardCards);
    deck.addToDrawPile([StandardCards.FancyJoker]);
    return deck;
  };
  const [cards, setCards] = useState(startingDeck());
  const _ = "_";

  /** @type {CardArray} */
  const initialState = [
    [_, null, null, null, _],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [_, null, null, null, _],
  ];
  const [cardArray, setCardArray] = useState(initialState);

  // Create a new deck
  useEffect(() => {
    const [newCardArray, restOfDeck] = populateGameField(startingDeck());
    setCards(restOfDeck);
    setCardArray(newCardArray);
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Matrix Overload</h1>
      </header>
      <main className="grid grid-cols-3">
        <aside>
          {/* This is where the deck will go, as well as temporary holding for royals during first deal */}
          <Deck cards={cards} />
        </aside>
        <section className="col-span-2">
          {/* This is where the main field will be. It will be a 5x5 grid with no slots on the four corners. */}
          <GameField cardArray={cardArray} />
        </section>
      </main>
    </div>
  );
}

export default App;
