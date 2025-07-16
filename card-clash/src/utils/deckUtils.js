/**
 * Creates a full deck of number, alphabet, and symbol cards
 */
export const generateDeck = () => {
    const numberCards = Array.from({ length: 30 }, (_, i) => ({
      id: `N${i + 1}`,
      type: 'number',
      value: i + 1,
    }));
  
    const alphabetCards = ['A', 'B', 'C', 'D', 'E', 'F'].map((char, i) => ({
      id: `A${char}`,
      type: 'alphabet',
      value: i + 1, // A = 1, ..., F = 6
    }));
  
    const symbolCards = [
      { id: 'S*', type: 'symbol', symbol: '*' },
      { id: 'S$', type: 'symbol', symbol: '$' },
      { id: 'S@1', type: 'symbol', symbol: '@' },
      { id: 'S@2', type: 'symbol', symbol: '@' },
    ];
  
    return [...numberCards, ...alphabetCards, ...symbolCards];
  };
  
  /**
   * Shuffles the given deck randomly
   */
  export const shuffleDeck = (deck) => {
    return [...deck].sort(() => Math.random() - 0.5);
  };
  