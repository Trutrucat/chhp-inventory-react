import React, { useState } from 'react';
import './styles/styles.css';
import Data from '../data/Data';

const Spreadsheet = () => {
  const [currentPage, setCurrentPage] = useState(Object.keys(Data)[0]);
  const inventoryItems = Data[currentPage];

  const dateFields = Array.from({ length: 4 }, (_, i) => (
    <div key={i} className="date-field">Date: <input type="date" /></div>
  ));

  const columns = Array.from({ length: 4 }, (_, i) => (
    <div key={i} className="column">
      {Array.from({ length: 5 }, (_, j) => (
        <div key={j} className="input-field">
          <input type="text" />
          {inventoryItems.map((item, index) => (
            <div key={index} className="inventory-item">
              {item.name} - {item.quantity}
            </div>
          ))}
        </div>
      ))}
    </div>
  ));

  const pageSelector = Object.keys(Data).map((page, index) => (
    <button key={index} onClick={() => setCurrentPage(page)}>{page}</button>
  ));

  return (
    <div className="spreadsheet">
      <div className="header">
        {dateFields}
        {pageSelector}
      </div>
      {columns}
    </div>
  );
};

export default Spreadsheet;