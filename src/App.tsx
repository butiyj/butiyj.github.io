
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import { Home } from './Page/Home';
import { GamePageOn1 } from './Page/OnProject/GamePageOn1';

function App() {


  return (
    <Router>
      <Routes>
        {/* 홈 페이지 */}
        <Route path="/" element={<Home />} />
        {/* 게임 페이지 */}
        <Route path="/game-on1" element={<GamePageOn1 />} />
       </Routes>
  </Router>
  )
}

export default App
