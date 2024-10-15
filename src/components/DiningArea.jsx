import React, { useState, useEffect } from 'react';


const DiningArea = ({ user }) => {
  const [supplies, setSupplies] = useState(() => {
    const storedSupplies = localStorage.getItem('dining-area-supplies');
    return storedSupplies ? JSON.parse(storedSupplies) : [
      { name: 'Hot Cups (12 oz)', quantity: 50 },
      { name: 'Cold Cups (22 oz)', quantity: 30 },
      { name: 'Cup Lids', quantity: 100 },
    ];
  });

  const [editingSupply, setEditingSupply] = useState(null);
  const [newSupply, setNewSupply] = useState({ name: '', quantity: 0 });


  useEffect(() => {
    localStorage.setItem('dining-area-supplies', JSON.stringify(supplies));
  }, [supplies]);


  const handleEditItem = (supply) => {
    setEditingSupply(supply);
    setNewSupply(supply);
  };


  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedSupplies = supplies.map((supply) =>
      supply === editingSupply ? newSupply : supply
    );
    setSupplies(updatedSupplies);
    setEditingSupply(null);
    setNewSupply({ name: '', quantity: 0 });
  };


  const handleDeleteItem = (supply) => {
    const updatedSupplies = supplies.filter((s) => s !== supply);
    setSupplies(updatedSupplies);
  };


  const handleAddItem = (e) => {
    e.preventDefault();
    const updatedSupplies = [...supplies, newSupply];
    setSupplies(updatedSupplies);
    setNewSupply({ name: '', quantity: 0 });
  };


  return (
    <div>
      <h1>Dining Area</h1>
      <p>Welcome to the dining area, {user.name}!</p>
      <h2>Supplies:</h2>
      <ul>
        {supplies.map((supply, index) => (
          <li key={index}>
            {supply.name} - Quantity: {supply.quantity}
            <button className="btn btn-secondary" onClick={() => handleEditItem(supply)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDeleteItem(supply)}>Delete</button>
            {editingSupply === supply && (
              <form onSubmit={handleSaveEdit}>
                <label>
                  Name:
                  <input
                    type="text"
                    id={`edit-supply-name-${index}`}
                    value={newSupply.name}
                    onChange={(e) => setNewSupply({ ...newSupply, name: e.target.value })}
                  />
                </label>
                <label>
                  Quantity:
                  <input
                    type="number"
                    id={`edit-supply-quantity-${index}`}
                    value={newSupply.quantity}
                    onChange={(e) => setNewSupply({ ...newSupply, quantity: parseInt(e.target.value) })}
                  />
                </label>
                <button className="btn btn-success" type="submit">Save Edit</button>
              </form>
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddItem}>
        <label>
          Name:
          <input
            type="text"
            id="new-item-name"
            value={newSupply.name}
            onChange={(e) => setNewSupply({ ...newSupply, name: e.target.value })}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            id="new-item-quantity"
            value={newSupply.quantity}
            onChange={(e) => setNewSupply({ ...newSupply, quantity: parseInt(e.target.value) })}
          />
        </label>
        <button className="btn btn-primary" type="submit">Add Item</button>
      </form>
    </div>
  );
};


export default DiningArea;
