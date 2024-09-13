// Load era data from JSON file
const fs = require('fs');
const path = require('path');
const nengoDataPath = path.join(__dirname, '../nengo_eras.json');
let nengoMapping;

try {
  const data = fs.readFileSync(nengoDataPath, 'utf8');
  nengoMapping = JSON.parse(data).map(era => ({
    ...era,
    startDate: new Date(era.startDate),
    endDate: era.endDate ? new Date(era.endDate) : null
  }));
} catch (error) {
  console.error("Error loading or parsing nengo_eras.json", error);
  process.exit(1);
}

// Function to convert Western year to Nengo year and handle transition years
const convertYear = (year) => {
  // First, filter the eras to find those that include the requested year
  const filteredEras = nengoMapping.filter(({ startDate, endDate }) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    return year >= start.getFullYear() && (end === null || year <= end.getFullYear());
  });

  // Check if there are any eras that match the requested year
  if (filteredEras.length === 0) {
    return { error: "Year out of range" };
  }

  // Map the filtered eras to the desired output format
  const results = filteredEras.map(({ era, eraJapanese, startDate, endDate }) => {
    const eraStartYear = new Date(startDate).getFullYear();
    const nengoYear = year - eraStartYear + 1;

    return {
      nengoYear: `${nengoYear}th year of ${era}`,
      eraName: era,
      eraJapanese: eraJapanese,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate ? endDate.toISOString().split('T')[0] : null
    };
  });

  return results;
};

module.exports = { convertYear };