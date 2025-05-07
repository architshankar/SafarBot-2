
import React, { useEffect, useRef, useState } from 'react';

const MapInterface = ({ locations = [] }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [apiKey, setApiKey] = useState('');
  
  // Function to initialize TomTom map
  const initializeMap = () => {
    if (!window.tt || !apiKey || !mapRef.current) return;
    
    const newMap = window.tt.map({
      key: apiKey,
      container: mapRef.current,
      center: [78.9629, 20.5937], // India center
      zoom: 4,
      style: 'tomtom://vector/1/basic-main'
    });
    
    newMap.addControl(new window.tt.FullscreenControl());
    newMap.addControl(new window.tt.NavigationControl());
    
    setMap(newMap);
    setMapLoaded(true);
    
    return () => {
      newMap.remove();
    };
  };
  
  // Load TomTom SDK
  useEffect(() => {
    if (!window.tt && apiKey) {
      const script = document.createElement('script');
      script.src = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.23.0/maps/maps-web.min.js';
      script.async = true;
      script.onload = () => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.23.0/maps/maps.css';
        document.head.appendChild(link);
        
        initializeMap();
      };
      document.body.appendChild(script);
    } else if (window.tt && apiKey) {
      initializeMap();
    }
    
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [apiKey]);
  
  // Handle adding markers when locations change
  useEffect(() => {
    if (!map || !mapLoaded || locations.length === 0) return;
    
    // Remove existing markers
    markers.forEach(marker => marker.remove());
    
    // Create new markers
    const newMarkers = locations.map(location => {
      const element = document.createElement('div');
      element.className = 'custom-marker';
      element.innerHTML = `
        <div class="w-8 h-8 bg-safarOrange text-white rounded-full flex items-center justify-center">
          <span class="text-xs font-bold">${location.category.charAt(0)}</span>
        </div>
      `;
      
      // Create marker
      const marker = new window.tt.Marker({ element })
        .setLngLat([location.longitude, location.latitude])
        .setPopup(
          new window.tt.Popup({ offset: 30 }).setHTML(
            `<div>
              <h3 class="font-bold">${location.name}</h3>
              <p class="text-xs">${location.category}</p>
            </div>`
          )
        )
        .addTo(map);
      
      return marker;
    });
    
    setMarkers(newMarkers);
    
    // If we have locations, fit the map to include all markers
    if (locations.length > 0) {
      const bounds = new window.tt.LngLatBounds();
      locations.forEach(location => {
        bounds.extend([location.longitude, location.latitude]);
      });
      
      map.fitBounds(bounds, { padding: 50, maxZoom: 15 });
    }
  }, [locations, map, mapLoaded]);
  
  const handleSetApiKey = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const key = formData.get('apiKey');
    setApiKey(key);
    localStorage.setItem('tomtom_api_key', key);
  };
  
  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('tomtom_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);
  
  return (
    <div className="relative w-full h-full">
      {!apiKey ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">TomTom API Key Required</h3>
            <p className="text-gray-600 mb-4">
              Please enter your TomTom API key to enable the map functionality.
              You can get a free API key from <a href="https://developer.tomtom.com/" target="_blank" rel="noreferrer" className="text-safarOrange hover:underline">TomTom Developer Portal</a>.
            </p>
            <form onSubmit={handleSetApiKey}>
              <input 
                type="text" 
                name="apiKey"
                placeholder="Enter your TomTom API key" 
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <button 
                type="submit"
                className="w-full bg-safarOrange text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors"
              >
                Set API Key
              </button>
            </form>
          </div>
        </div>
      ) : null}
      
      <div 
        ref={mapRef} 
        className="w-full h-full bg-gray-200"
      />
      
      {/* Map loading indicator */}
      {apiKey && !mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
          <div className="text-safarOrange">
            <svg className="animate-spin h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapInterface;
