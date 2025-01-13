import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StartPage, GamePage } from '@/pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/game" element={<StartPage />} />
        <Route path="/" element={<GamePage />} />
      </Routes>
    </Router>
  )
}

export default App
