import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemsList from "./components/itemsList";
import ItemDetail from "./components/itemsDetials";
import EditItem from "./components/editItem";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<ItemsList />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/item/:id/edit" element={<EditItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
