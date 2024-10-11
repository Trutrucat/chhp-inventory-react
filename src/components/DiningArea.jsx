import React, { useState } from 'react';

const DiningArea = ({ user }) => {
  const [supplies, setSupplies] = useState([
    { name: 'Hot Cups (12 oz)', quantity: 50 },
    { name: 'Cold Cups (22 oz)', quantity: 30 },
    { name: 'Cup Lids', quantity: 100 },
  ]);

  const [editingSupply, setEditingSupply] = useState(null);
  const [newSupply, setNewSupply] = useState({ name: '', quantity: 0 });

  const handleEditSupply = (supply) => {
    setEditingSupply(supply);
    setNewSupply(supply);
  };

  const handleSaveEdit = () => {
    const updatedSupplies = supplies.map((supply) => {
      if (supply === editingSupply) {
        return newSupply;
      }
      return supply;
    });
    setSupplies(updatedSupplies);
    setEditingSupply(null);
  };

  const handleDeleteSupply = (supply) => {
    const updatedSupplies = supplies.filter((s) => s !== supply);
    setSupplies(updatedSupplies);
  };

  const handleAddItem = () => {
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
            <button onClick={() => handleEditSupply(supply)}>Edit</button>
            <button onClick={() => handleDeleteSupply(supply)}>Delete</button>
            {editingSupply === supply && (
              <form>
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
                    onChange={(e) => setNewSupply({ ...newSupply, quantity: e.target.value })}
                  />
                </label>
                <button onClick={handleSaveEdit}>Save Edit</button>
              </form>
            )}
          </li>
        ))}
      </ul>
      <form>
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
            onChange={(e) => setNewSupply({ ...newSupply, quantity: e.target.value })}
          />
        </label>
        <button onClick={handleAddItem}>Add Item</button>
      </form>
    </div>
  );
};

export default DiningArea;