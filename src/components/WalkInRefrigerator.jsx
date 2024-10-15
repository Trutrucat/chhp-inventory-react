import React, { useState, useEffect } from 'react';

console.log('WalkInRefrigerator component loaded');

const WalkInRefrigerator = ({ user }) => {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem('walk-in-refrigerator-items');
    return storedItems ? JSON.parse(storedItems) : [
      { name: 'Milk', quantity: 5 },
      { name: 'Eggs', quantity: 12 },
      { name: 'Butter', quantity: 3 },
    ];
  });

  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    console.log('Component re-rendered!');
  });


  useEffect(() => {
    console.log('Updated items:', items);
    localStorage.setItem('walk-in-refrigerator-items', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (e) => {
    e.preventDefault(); 
    console.log('handleAddItem function called!');
    console.log('newItem:', newItem);
    if (newItem.name === '' || newItem.quantity === 0) {
      console.log('newItem is empty, not adding to list');
      return;
    }
    setItems((prevItems) => {
      const updatedItems = [...prevItems, newItem];
      console.log('updatedItems:', updatedItems);
      return updatedItems;
    });
    setNewItem({ name: '', quantity: 0 });
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleDeleteItem = (item) => {
    const updatedItems = items.filter((i) => i !== item);
    setItems(updatedItems);
  };

  return (
    <div>
      <h1>Walk-In Refrigerator</h1>
      <p>Welcome to the walk-in refrigerator, {user.username}!</p>
      <h2>Add New Item:</h2>
      <form onSubmit={handleAddItem}>
        <label htmlFor="name-input">
          Name:
          <input
            type="text"
            id="name-input"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
        </label>
        <label htmlFor="quantity-input">
          Quantity:
          <input
            type="number"
            id="quantity-input"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
          />
        </label>
        <button className="btn btn-primary" type="submit">
          Add Item
        </button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            {item.name} x {item.quantity}
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
  );
};

export default WalkInRefrigerator;
