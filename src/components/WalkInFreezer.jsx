import React, { useState, useEffect } from 'react';

const WalkInFreezer = () => {
  const [items, setItems] = useState([
    { name: 'Frozen Chicken', quantity: 20 },
    { name: 'Frozen Fish', quantity: 15 },
    { name: 'Frozen Vegetables', quantity: 30 },
  ]);

  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    console.log('Walk-In Freezer items updated:', items);
  }, [items]);

  const handleAddItem = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log('Adding new item:', newItem);
    if (newItem.name === '' || newItem.quantity <= 0) {
      console.log('Invalid item input, not adding.');
      return;
    }
    setItems([...items, newItem]);
    setNewItem({ name: '', quantity: 0 });
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem(item); // Pre-populate form with selected item details for editing
  };

  const handleSaveEdit = (e) => {
    e.preventDefault(); // Prevent page reload
    const updatedItems = items.map((item) =>
      item === editingItem ? { ...editingItem, name: newItem.name, quantity: newItem.quantity } : item
    );
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
      <h1>Walk-In Freezer</h1>
      <h2>Items:</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - Quantity: {item.quantity}
            <button className="btn btn-secondary" onClick={() => handleEditItem(item)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => handleDeleteItem(item)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h2>Add New Item:</h2>
      <form onSubmit={editingItem ? handleSaveEdit : handleAddItem}>
        <label htmlFor="name-input">
          Name:
          <input
            id="name-input"
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
        </label>
        <label htmlFor="quantity-input">
          Quantity:
          <input
            id="quantity-input"
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
          />
        </label>
        <button className="btn btn-primary" type="submit">
          {editingItem ? 'Save Edit' : 'Add Item'}
        </button>
        {editingItem && (
          <button
            className="btn btn-secondary"
            onClick={() => {
              setEditingItem(null);
              setNewItem({ name: '', quantity: 0 });
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default WalkInFreezer;
