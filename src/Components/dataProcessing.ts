import { CropData } from './dataFetcher';

// Define interfaces for the processed data
export interface YearlyData {
  year: number;
  maxCrop: string;
  minCrop: string;
}

export interface CropAggregateData {
  crop: string;
  avgYield: string;
  avgArea: string;
}

// Function to process yearly data and find crops with maximum and minimum production for each year
export const processYearlyData = (data: CropData[]): YearlyData[] => {
  const yearlyData = data.reduce<{ [key: number]: { max: CropData; min: CropData } }>((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = { max: item, min: item };
    } else {
      if (item.production > acc[item.year].max.production) {
        acc[item.year].max = item;
      }
      if (item.production < acc[item.year].min.production) {
        acc[item.year].min = item;
      }
    }
    return acc;
  }, {});

  // Convert the processed data to an array of YearlyData objects
  return Object.entries(yearlyData).map(([year, { max, min }]) => ({
    year: parseInt(year, 10),
    maxCrop: max.crop,
    minCrop: min.crop,
  }));
};

// Function to process crop data and calculate average yield and cultivation area for each crop
export const processCropData = (data: CropData[]): CropAggregateData[] => {
  const cropData = data.reduce<{ [key: string]: { yieldSum: number; areaSum: number; count: number } }>((acc, item) => {
    if (!acc[item.crop]) {
      acc[item.crop] = { yieldSum: 0, areaSum: 0, count: 0 };
    }
    acc[item.crop].yieldSum += item.yield;
    acc[item.crop].areaSum += item.cultivationArea;
    acc[item.crop].count += 1;
    return acc;
  }, {});

  // Convert the processed data to an array of CropAggregateData objects
  return Object.entries(cropData).map(([crop, { yieldSum, areaSum, count }]) => ({
    crop,
    avgYield: (yieldSum / count).toFixed(3),  // Round off to 3 decimal places
    avgArea: (areaSum / count).toFixed(3),    // Round off to 3 decimal places
  }));
};
