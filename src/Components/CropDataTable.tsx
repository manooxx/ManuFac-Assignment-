import React from 'react';
import { Table, Title } from '@mantine/core';

interface CropAggregateData {
  crop: string;
  avgYield: string;
  avgArea: string;
}

interface CropDataTableProps {
  cropData: CropAggregateData[];
}

const CropDataTable: React.FC<CropDataTableProps> = ({ cropData }) => {
  return (
    <>
      <Title order={2}>Crop Data</Title>
      <Table>
        <thead>
          <tr>
            <th>Crop</th>
            <th>Average Yield (1950-2020)</th>
            <th>Average Cultivation Area (1950-2020)</th>
          </tr>
        </thead>
        <tbody>
          {cropData.map(({ crop, avgYield, avgArea }) => (
            <tr key={crop}>
              <td>{crop}</td>
              <td>{avgYield}</td>
              <td>{avgArea}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default CropDataTable;