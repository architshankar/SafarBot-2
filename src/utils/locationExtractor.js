
// This is a simplified mock implementation
// In a real app, you would use NLP or a dedicated entity extraction service

const LOCATION_TYPES = {
  CITY: 'city',
  LANDMARK: 'landmark',
  RESTAURANT: 'restaurant',
  BEACH: 'beach',
  HOTEL: 'hotel'
};

// Mock location database with coordinates
const locationDatabase = {
  'goa': { latitude: 15.2993, longitude: 74.1240, category: LOCATION_TYPES.CITY },
  'baga': { latitude: 15.5553, longitude: 73.7539, category: LOCATION_TYPES.BEACH },
  'calangute': { latitude: 15.5440, longitude: 73.7527, category: LOCATION_TYPES.BEACH },
  'anjuna': { latitude: 15.5687, longitude: 73.7407, category: LOCATION_TYPES.BEACH },
  'thalassa': { latitude: 15.5929, longitude: 73.7396, category: LOCATION_TYPES.RESTAURANT },
  'gunpowder': { latitude: 15.5955, longitude: 73.7449, category: LOCATION_TYPES.RESTAURANT },
  'kerala': { latitude: 10.8505, longitude: 76.2711, category: LOCATION_TYPES.CITY },
  'alleppey': { latitude: 9.4981, longitude: 76.3388, category: LOCATION_TYPES.CITY },
  'munnar': { latitude: 10.0889, longitude: 77.0595, category: LOCATION_TYPES.CITY },
  'kochi': { latitude: 9.9312, longitude: 76.2673, category: LOCATION_TYPES.CITY },
  'rajasthan': { latitude: 27.0238, longitude: 74.2179, category: LOCATION_TYPES.CITY },
  'jaipur': { latitude: 26.9124, longitude: 75.7873, category: LOCATION_TYPES.CITY },
  'amber fort': { latitude: 26.9855, longitude: 75.8513, category: LOCATION_TYPES.LANDMARK },
  'jodhpur': { latitude: 26.2389, longitude: 73.0243, category: LOCATION_TYPES.CITY },
  'suvarna mahal': { latitude: 26.9124, longitude: 75.7873, category: LOCATION_TYPES.RESTAURANT },
  'himachal pradesh': { latitude: 31.1048, longitude: 77.1734, category: LOCATION_TYPES.CITY },
  'shimla': { latitude: 31.1048, longitude: 77.1734, category: LOCATION_TYPES.CITY },
  'manali': { latitude: 32.2432, longitude: 77.1892, category: LOCATION_TYPES.CITY },
  'kasol': { latitude: 32.0100, longitude: 77.3152, category: LOCATION_TYPES.CITY },
  'café 1947': { latitude: 32.2417, longitude: 77.1889, category: LOCATION_TYPES.RESTAURANT },
  'agra': { latitude: 27.1767, longitude: 78.0081, category: LOCATION_TYPES.CITY },
  'taj mahal': { latitude: 27.1751, longitude: 78.0421, category: LOCATION_TYPES.LANDMARK },
  'agra fort': { latitude: 27.1797, longitude: 78.0216, category: LOCATION_TYPES.LANDMARK },
  'peshawri': { latitude: 27.1663, longitude: 78.0298, category: LOCATION_TYPES.RESTAURANT }
};

export const extractLocations = (text) => {
  if (!text) return [];
  
  // Convert text to lowercase for matching
  const lowercaseText = text.toLowerCase();
  
  // Find all potential locations mentioned in the text
  return Object.entries(locationDatabase)
    .filter(([locationName]) => lowercaseText.includes(locationName))
    .map(([locationName, locationData]) => {
      return {
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        name: locationName.charAt(0).toUpperCase() + locationName.slice(1),
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        category: locationData.category
      };
    });
};
