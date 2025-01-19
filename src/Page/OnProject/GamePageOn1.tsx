export function GamePageOn1 () {
    
    const startGame = () => {
        import('./main.js').then((module) => {
          module.init(); // game.js의 init() 호출
        }).catch((error) => {
          console.error('Failed to start the game:', error);
        });
      };
    
      return (
        <button onClick={startGame}>Start Game</button>
      );
    };
