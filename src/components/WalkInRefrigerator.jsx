import React, { useState } from 'react';
import TableComponent from './TableComponent';

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

  const date = new Date();

  const columns = [
    {
      Header: date.toISOString().split('T')[0],
      accessor: 'date',
      Cell: () => (
        <div style={{ width: '100%', textAlign: 'center' }}>
          {date.toISOString().split('T')[0]}
        </div>
      ),
    },
    {
      Header: 'Item',
      accessor: 'name',
      Cell: ({ value }) => <div>{value}</div>,
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
      Cell: ({ value }) => <div>{value}</div>,
    },
  ];

  return (
    <div>
      <h1>Walk-In Refrigerator</h1>
      <p>Welcome to the walk-in refrigerator, {user.name}!</p>
      <TableComponent columns={columns} data={items} />
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

export default WalkInRefrigerator;