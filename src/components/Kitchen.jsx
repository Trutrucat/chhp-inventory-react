import React, { useState } from 'react';

const Kitchen = ({ user }) => {
  const [pantryItems, setPantryItems] = useState([
    { name: 'Ketchup', quantity: 5 },
    { name: 'Apricot Jam', quantity: 3 },
    { name: 'Strawberry Preserves', quantity: 2 },
  ]);

  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });
  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = () => {
    setPantryItems([...pantryItems, newItem]);
    setNewItem({ name: '', quantity: 0 });
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleSaveEdit = () => {
    const updatedItems = pantryItems.map((item) => {
      if (item === editingItem) {
        return { ...editingItem, name: newItem.name, quantity: newItem.quantity };
      }
      return item;
    });
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
            <button onClick={() => handleEditItem(item)}>Edit</button>
            <button onClick={() => handleDeleteItem(item)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add New Item:</h2>
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

export default Kitchen;