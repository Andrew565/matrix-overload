import { useEffect, useState } from "react";
import { StandardCards, DeckOfCards } from "@andrewcreated/deck-of-cards.js";
import { Deck, GameField } from "./components";
import "./App.css";
import { populateGameField } from "./logic/GameUtilities";

function App() {
  const [cards, setCards] = useState(new DeckOfCards(StandardCards.standard52DeckOfCards));
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
    const deckOfCards = StandardCards.standard52DeckOfCards;
    const deck = new DeckOfCards([...deckOfCards, StandardCards.FancyJoker]);
    const [newCardArray, restOfDeck] = populateGameField(deck);
    setCards(restOfDeck);
    setCardArray(newCardArray);
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Matrix Overload</h1>
        <aside>
          {/* This is where the deck will go, as well as temporary holding for royals during first deal */}
          <Deck cards={cards} />
        </aside>
        <section>
          {/* This is where the main field will be. It will be a 5x5 grid with no slots on the four corners. */}
          <GameField cardArray={cardArray} />
        </section>
      </header>
    </div>
  );
}

export default App;
