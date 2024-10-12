import React, { useState } from 'react';

const WalkInRefrigerator = ({ user }) => {
  const [items, setItems] = useState([
    { name: 'Milk', quantity: 5 },
    { name: 'Eggs', quantity: 12 },
    { name: 'Butter', quantity: 3 },
  ]);

  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });
  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({ name: '', quantity: 0 });
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleSaveEdit = () => {
    const updatedItems = items.map((item) => {
      if (item === editingItem) {
        return { ...editingItem, name: newItem.name, quantity: newItem.quantity };
      }
      return item;
    });
    setItems(updatedItems);
    setEditingItem(null);
    setNewItem({ name: '', quantity: 0 });
  };

  const handleDeleteItem = (item) => {
    const updatedItems = items.filter((i) => i !== item);
    setItems(updatedItems);
  };

  return (
    <div>
      <h1>Walk-In Refrigerator</h1>
      <p>Welcome to the walk-in refrigerator, {user.name}!</p>
      <h2>Add New Item:</h2>
      <form>
        <label for="name-input">
          Name:
          <input
            id="name-input"
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
        </label>
        <label for="quantity-input">
          Quantity:
          <input
            id="quantity-input"
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          />
        </label>
        <button className="btn btn-primary" onClick={handleAddItem}>Add Item</button>
        {editingItem && (
          <button className="btn btn-success" onClick={handleSaveEdit}>Save Edit</button>
        )}
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} x {item.quantity}
            <button className="btn btn-secondary" onClick={() => handleEditItem(item)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDeleteItem(item)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalkInRefrigerator;