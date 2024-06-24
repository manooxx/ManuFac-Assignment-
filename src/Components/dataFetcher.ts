

// Define an interface for the crop data
export interface CropData {
    year: number;
    crop: string;
    production: number;
    yield: number;
    cultivationArea: number;
  }
  
  // Function to fetch and parse data
  export const fetchData = async (): Promise<CropData[]> => {
    try {
      const response = await fetch('/agriculture-data.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const rawData = await response.json();
  
      // Map raw data to CropData objects
      const data: CropData[] = rawData.map((item: any) => ({
        year: parseInt(item.Year.match(/\d{4}/)[0], 10),
        crop: item['Crop Name'],
        production: parseFloat(item['Crop Production (UOM:t(Tonnes))']) || 0,
        yield: parseFloat(item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']) || 0,
        cultivationArea: parseFloat(item['Area Under Cultivation (UOM:Ha(Hectares))']) || 0,
      }));
  
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };