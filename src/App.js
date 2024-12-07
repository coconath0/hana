import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import FlowerList from "./components/FlowerList";
import AddFlower from "./components/AddFlower";
import RestockFlower from "./components/RestockFlower";
import SellFlower from "./components/SellFlower";
import "./styles.css";

function App() {
    return (
        <Router>
            <div className="app">
                <NavBar /> {/* NavBar will now be available on every page */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/flowers" element={<FlowerList />} />
                    <Route path="/add-flower" element={<AddFlower />} />
                    <Route path="/restock-flower" element={<RestockFlower />} />
                    <Route path="/sell-flower" element={<SellFlower />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
