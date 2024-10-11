import React, { useState } from 'react';

const StoreRoom = () => {
  const [items, setItems] = useState([
    { name: 'Bottled Water', quantity: 100 },
    { name: 'Canned Goods', quantity: 50 },
    { name: 'Snacks', quantity: 75 },
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
      <h1>Store Room</h1>
      <h2>Items:</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - Quantity: {item.quantity}
            <button onClick={() => handleEditItem(item)}>Edit</button>
            <button onClick={() => handleDeleteItem(item)}>Delete</button>
          </li>
        ))}
      </ul>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          />
        </label>
        <button onClick={handleAddItem}>Add Item</button>
        {editingItem && (
          <button onClick={handleSaveEdit}>Save Edit</button>
        )}
      </form>
    </div>
  );
};

export default StoreRoom;