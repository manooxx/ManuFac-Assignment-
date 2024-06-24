
import React, { useEffect, useState } from 'react';
import { Container, Title } from '@mantine/core';
import { fetchData, CropData } from './Components/dataFetcher';
import { processYearlyData, processCropData, YearlyData, CropAggregateData } from './Components/dataProcessing';
import YearlyDataTable from './Components/YearlyDataTable';
import CropDataTable from './Components/CropDataTable';
import './App.css';

const App: React.FC = () => {
  // State to store the fetched data
  const [data, setData] = useState<CropData[]>([]);

  // Fetch the data when the component mounts
  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };
    loadData();
  }, []);

  // Get the processed data
  const yearlyData: YearlyData[] = processYearlyData(data);
  const cropData: CropAggregateData[] = processCropData(data);

  return (
    <Container className="App">
      <Title order={1}>Agriculture Analytics</Title>
      <YearlyDataTable yearlyData={yearlyData} />
      <CropDataTable cropData={cropData} />
    </Container>
  );
};

export default App;

