import React, { useEffect, useState } from 'react';
import './App.css';
import Card, { PlayerCount } from './models/Card';
import CardComponent from './components/CardComponent';
import { PlayerHand } from './models/Player';

function App() {

  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHands, setPlayerHands] = useState<PlayerHand[]>([]);
  const [playerCount, setPlayerCount] = useState<PlayerCount>(2);

  useEffect(() => {
    prepareDeck();
  },[]);

  useEffect(() => {
    prepareDeck();
  }, [playerCount]);

  const prepareDeck = () => {
    let deck = Card.generateTraditionalDeck();
    deck = Card.shuffleDeck(deck);
    const playerHands: PlayerHand[] = Card.divideDeck(deck, playerCount);
    setPlayerHands(playerHands);
    setDeck(deck);
  }

  const shuffleDeck = (): void => {
    const newDeck = Card.shuffleDeck(deck);
    const playerHands: PlayerHand[] = Card.divideDeck(newDeck, 4);
    setDeck(newDeck);
    setPlayerHands(playerHands);
  }

  const deckDisplay = deck?.length < 1 ? <h1>One Moment...</h1> : <div className='card-containers'>
    {playerHands.map((playerHand, i) => {
      return <div className='player-hand'>
        <h1>Player {i+1}, {playerHand.cards.length} cards</h1>
        { playerHand.cards.map(card => {
          return <CardComponent key={`card-${card.suit}${card.pips}`} card={card} />
        })
      }
      </div>
      
    })}
    </div>

  return (
    <div className="App">
      <button onClick={() => shuffleDeck()}>Shuffle</button>
      <input type="number" min={1} max={7} value={playerCount} onChange={e => setPlayerCount(e.target.value as unknown as PlayerCount)} />
      {deckDisplay}
    </div>
  );
}

export default App;
