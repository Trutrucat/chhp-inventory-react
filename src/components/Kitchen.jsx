import React, { useState, useEffect } from 'react';

const Kitchen = ({ user }) => {
  const [pantryItems, setPantryItems] = useState([
    { name: 'Ketchup', quantity: 5 },
    { name: 'Apricot Jam', quantity: 3 },
    { name: 'Strawberry Preserves', quantity: 2 },
  ]);

  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    console.log('Pantry items updated:', pantryItems);
  }, [pantryItems]);

  const handleAddItem = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log('Adding new item:', newItem);
    if (newItem.name === '' || newItem.quantity <= 0) {
      console.log('Invalid item input, not adding.');
      return;
    }
    setPantryItems([...pantryItems, newItem]);
    setNewItem({ name: '', quantity: 0 });
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem(item); // Pre-populate form with selected item details for editing
  };

  const handleSaveEdit = (e) => {
    e.preventDefault(); // Prevent page reload
    const updatedItems = pantryItems.map((item) =>
      item === editingItem ? { ...editingItem, name: newItem.name, quantity: newItem.quantity } : item
    );
    setPantryItems(updatedItems);
    setEditingItem(null);
    setNewItem({ name: '', quantity: 0 });
  };

  const handleDeleteItem = (item) => {
    const updatedItems = pantryItems.filter((i) => i !== item);
    setPantryItems(updatedItems);
  };

  return (
    <div>
      <h1>Kitchen</h1>
      <h2>Pantry Items:</h2>
      <ul>
        {pantryItems.map((item, index) => (
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
  );
};

export default Kitchen;
