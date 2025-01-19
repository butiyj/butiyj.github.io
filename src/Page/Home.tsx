import React from 'react';
import { Link } from "react-router-dom"

export const Home: React.FC = () => {
    return(
     <div>
      <h1>Welcome to Bebe Club</h1>
      <button>
        <Link to="/game-on1">Go to Game</Link>
      </button>
     
    </div>);
}