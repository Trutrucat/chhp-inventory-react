import React, { useState } from 'react';
import './styles/styles.css';

const StoreRoom = () => {
  const [items, setItems] = useState([
    { name: 'Bottled Water', quantity: 100 },
    { name: 'Canned Goods', quantity: 50 },
    { name: 'Snacks', quantity: 75 },
  ]);

  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });
  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = (e) => {
    e.preventDefault(); // Prevent page reload
    if (newItem.name === '' || newItem.quantity <= 0) {
      console.log('Invalid input, cannot add item.');
      return;
    }
    setItems([...items, newItem]);
    setNewItem({ name: '', quantity: 0 });
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem(item); // Pre-fill the form with the selected item details for editing
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
    <div className="store-room">
      <h1>Store Room</h1>
      <div className="item-list">
        <h2>Items:</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.name}
              <button className="btn btn-secondary" onClick={() => handleEditItem(item)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => handleDeleteItem(item)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="quantity-list">
        <h2>Quantities:</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.quantity}
              <button className="btn btn-secondary" onClick={() => handleEditItem(item)}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-item-form">
        <h2>{editingItem ? 'Edit Item' : 'Add New Item'}:</h2>
        <form onSubmit={editingItem ? handleSaveEdit : handleAddItem}>
          <label>
            Name:
            <input
              id="item-name"
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </label>
          <label>
            Quantity:
            <input
              id="item-quantity"
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
    </div>
  );
};

export default StoreRoom;
