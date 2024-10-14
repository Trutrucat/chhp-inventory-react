import React, { useState } from 'react';

const Beer = ({ user }) => {
  const [beers, setBeers] = useState([
    { name: 'Coors (24pk)', quantity: 10 },
    { name: 'Corona (24pk)', quantity: 8 },
    { name: 'Modelo (24pk)', quantity: 12 },
  ]);

  const [editingBeer, setEditingBeer] = useState(null);
  const [newBeer, setNewBeer] = useState({ name: '', quantity: 0 });
  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });

  const handleEditItem = (beer) => {
    setEditingBeer(beer);
    setNewBeer(beer); // Pre-fills the form with the beer's data for editing
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedBeers = beers.map((beer) =>
      beer === editingBeer ? newBeer : beer
    );
    setBeers(updatedBeers);
    setEditingBeer(null);
    setNewBeer({ name: '', quantity: 0 });
  };

  const handleDeleteItem = (beer) => {
    const updatedBeers = beers.filter((b) => b !== beer);
    setBeers(updatedBeers);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const updatedBeers = [...beers, newItem];
    setBeers(updatedBeers);
    setNewItem({ name: '', quantity: 0 });
  };

  return (
    <div>
      <h1>Beer Selection</h1>
      <p>Welcome to the beer selection, {user.name}!</p>
      <h2>Beers:</h2>
      <ul>
        {beers.map((beer, index) => (
          <li key={index}>
            {beer.name} - Quantity: {beer.quantity}
            <button className="btn btn-secondary" onClick={() => handleEditItem(beer)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDeleteItem(beer)}>Delete</button>
            {editingBeer === beer && (
              <form onSubmit={handleSaveEdit}>
                <label>
                  Name:
                  <input
                    id="beer-name-edit"
                    type="text"
                    value={newBeer.name}
                    onChange={(e) => setNewBeer({ ...newBeer, name: e.target.value })}
                  />
                </label>
                <label>
                  Quantity:
                  <input
                    id="beer-quantity-edit"
                    type="number"
                    value={newBeer.quantity}
                    onChange={(e) => setNewBeer({ ...newBeer, quantity: parseInt(e.target.value) })}
                  />
                </label>
                <button className="btn btn-success" type="submit">Save Edit</button>
              </form>
            )}
          </li>
        ))}
      </ul>
      <h2>Add New Item:</h2>
      <form onSubmit={handleAddItem}>
        <label>
          Name:
          <input
            id="beer-name-add"
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
        </label>
        <label>
          Quantity:
          <input
            id="beer-quantity-add"
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
          />
        </label>
        <button className="btn btn-primary" type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default Beer;
