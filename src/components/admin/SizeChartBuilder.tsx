"use client";

import React, { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

export interface SizeChartData {
  columns: string[];
  rows: string[][];
}

interface SizeChartBuilderProps {
  initialData?: SizeChartData | null;
}

export default function SizeChartBuilder({ initialData }: SizeChartBuilderProps) {
  const [columns, setColumns] = useState<string[]>(
    initialData?.columns || ["Size", "Bust (in)", "Waist (in)", "Hip (in)"]
  );
  const [rows, setRows] = useState<string[][]>(
    initialData?.rows || [
      ["XS", "32-33", "25-26", "35-36"],
      ["S", "34-35", "27-28", "37-38"],
      ["M", "36-37", "29-30", "39-40"],
      ["L", "38-39", "31-32", "41-42"],
      ["XL", "40-42", "33-35", "43-45"],
    ]
  );

  const addColumn = () => {
    setColumns([...columns, `Col ${columns.length + 1}`]);
    setRows(rows.map((row) => [...row, ""]));
  };

  const removeColumn = (colIndex: number) => {
    setColumns(columns.filter((_, i) => i !== colIndex));
    setRows(rows.map((row) => row.filter((_, i) => i !== colIndex)));
  };

  const addRow = () => {
    setRows([...rows, new Array(columns.length).fill("")]);
  };

  const removeRow = (rowIndex: number) => {
    setRows(rows.filter((_, i) => i !== rowIndex));
  };

  const updateHeader = (colIndex: number, value: string) => {
    const newCols = [...columns];
    newCols[colIndex] = value;
    setColumns(newCols);
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex] = value;
    setRows(newRows);
  };

  // Serialize state into a hidden input so standard form submission works
  const serializedData = JSON.stringify({ columns, rows });

  return (
    <div className="flex flex-col gap-4">
      <input type="hidden" name="size_chart_data" value={serializedData} />

      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-[#121212]/60">
          Build your bespoke size chart below. Enter measurement ranges for couture pieces.
        </p>
      </div>

      <div className="overflow-x-auto border border-[#E4E0D7] bg-white">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#F7F5F0] border-b border-[#E4E0D7]">
            <tr>
              {columns.map((col, colIndex) => (
                <th
                  key={colIndex}
                  className="p-2 border-r border-[#E4E0D7] last:border-r-0 min-w-[100px] relative group"
                >
                  <input
                    type="text"
                    value={col}
                    onChange={(e) => updateHeader(colIndex, e.target.value)}
                    className="w-full bg-transparent font-medium text-xs uppercase tracking-wider text-[#121212] focus:outline-none focus:border-b focus:border-[#7A1C30] transition-colors"
                  />
                  {columns.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeColumn(colIndex)}
                      className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  )}
                </th>
              ))}
              <th className="p-2 w-[40px]"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-[#E4E0D7] last:border-b-0 group/row"
              >
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-2 border-r border-[#E4E0D7] last:border-r-0"
                  >
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) =>
                        updateCell(rowIndex, colIndex, e.target.value)
                      }
                      className="w-full bg-transparent text-[#121212] text-xs focus:outline-none focus:border-b focus:border-[#7A1C30] transition-colors"
                      placeholder="--"
                    />
                  </td>
                ))}
                <td className="p-2 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeRow(rowIndex)}
                    className="text-red-500 opacity-0 group-hover/row:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 mt-2">
        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#121212] hover:text-[#7A1C30] font-medium transition-colors cursor-pointer"
        >
          <Plus size={14} /> Add Size Row
        </button>
        <button
          type="button"
          onClick={addColumn}
          className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#121212] hover:text-[#7A1C30] font-medium transition-colors cursor-pointer"
        >
          <Plus size={14} /> Add Column
        </button>
      </div>
    </div>
  );
}
