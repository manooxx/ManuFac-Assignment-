import React from 'react';
import { Table, Title } from '@mantine/core';

interface YearlyData {
  year: number;
  maxCrop: string;
  minCrop: string;
}

interface YearlyDataTableProps {
  yearlyData: YearlyData[];
}

const YearlyDataTable: React.FC<YearlyDataTableProps> = ({ yearlyData }) => {
  return (
    <>
      <Title order={2}>Yearly Data</Title>
      <Table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Crop with Maximum Production</th>
            <th>Crop with Minimum Production</th>
          </tr>
        </thead>
        <tbody>
          {yearlyData.map(({ year, maxCrop, minCrop }) => (
            <tr key={year}>
              <td>{year}</td>
              <td>{maxCrop}</td>
              <td>{minCrop}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default YearlyDataTable;

