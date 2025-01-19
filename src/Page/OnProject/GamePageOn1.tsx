import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function GamePageOn1 () {
    
  useEffect(()=>{
     // 언마운트 시 클린업 작업 수행
     return () => {
      const canvas = document.getElementById('canvas');
      if (canvas) {
        canvas.remove(); // 캔버스를 DOM에서 제거
      }
    };
  }, []);

    const startGame = () => {
        import('./main.js').then((module) => {
          module.init(); // game.js의 init() 호출
        }).catch((error) => {
          console.error('Failed to start the game:', error);
        });
      };
    
      const goMain=()=>{ 
        window.location.href = '/';
      }
      return (<div className='button-container'>

        <button onClick={startGame}>Start Game</button>
        <button onClick={goMain}>Go to Home
        </button>
        </div>
      );
    };
