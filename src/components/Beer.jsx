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
    setNewBeer(beer);
  };

  const handleSaveEdit = () => {
    const updatedBeers = beers.map((beer) => {
      if (beer === editingBeer) {
        return newBeer;
      }
      return beer;
    });
    setBeers(updatedBeers);
    setEditingBeer(null);
  };

  const handleDeleteItem = (beer) => {
    const updatedBeers = beers.filter((b) => b !== beer);
    setBeers(updatedBeers);
  };

  const handleAddItem = () => {
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
            <button className="btn btn-secondary" onClick={() => handleEditItem(item)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDeleteItem(item)}>Delete</button>
            {editingBeer === beer && (
              <form>
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
                    onChange={(e) => setNewBeer({ ...newBeer, quantity: e.target.value })}
                  />
                </label>
                <button className="btn btn-success" onClick={handleSaveEdit}>Save Edit</button>
              </form>
            )}
          </li>
        ))}
      </ul>
      <h2>Add New Item:</h2>
      <form>
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
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          />
        </label>
        <button className="btn btn-primary" onClick={handleAddItem}>Add Item</button>
      </form>
    </div>
  );
};

export default Beer;