import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';

const TableComponent = ({ columns = [], data = [], date = new Date() }) => {
    console.log('TableComponent called with props:', columns, data, date);
  
    const tableInstance = useTable({
      columns: Array.isArray(columns) && columns.find((column) => column.accessor === 'date')
        ? columns
        : [
            {
              Header: date.toISOString().split('T')[0],
              accessor: 'date',
              Cell: () => (
                <div style={{ width: '100%', textAlign: 'center' }}>
                  {date.toISOString().split('T')[0]}
                </div>
              ),
            },
            ...columns,
          ],
      data: Array.isArray(data) ? data : [],
    });
  
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  
    return (
      <table {...getTableProps()} style={{ border: 'solid 1px gray' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

export default TableComponent;