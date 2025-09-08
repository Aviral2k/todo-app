import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShortenerPage from './pages/ShortenerPage';
// Other pages like StatisticsPage and RedirectPage would be imported here.

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ShortenerPage />} />
                {/* <Route path="/stats" element={<StatisticsPage />} /> */}
                {/* <Route path="/:shortCode" element={<RedirectPage />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
