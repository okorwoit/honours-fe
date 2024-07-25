import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import { retrieveFromLocalStorage } from '../../utils/utils';
import { sampleHistoricalData } from '../../utils/testData';

mapboxgl.accessToken = 'pk.eyJ1IjoicGFjaWZpcXVlcnViYXNoYSIsImEiOiJjbGpyNW92YnIwMDVnM3RwbzB4d25namF5In0.7tu1hbi6-WgIxwiTP5QVeQ';

function Map({
  id, 
  latitude, longitude, polygonCoordinates, 
  currentYear, location, projectId}) {

  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [historicalDataLayer, setHistoricalDataLayer] = useState(null);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem('tty-projects-all'));
    const center = [projects[0]?.longitude || longitude, projects[0]?.latitude || latitude];

    const mapInstance = new mapboxgl.Map({
      container: id,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: center,
      zoom: 15,
    });

    const mapMarker = new mapboxgl.Marker().setLngLat(center).addTo(mapInstance);

    mapInstance.on('load', () => {
      setMap(mapInstance);
      setMarker(mapMarker);
      setIsStyleLoaded(true);
    });
  

    return () => {
      mapInstance.remove();
    };
  }, [id, latitude, longitude]);

  useEffect(() => {
    if (map && marker && latitude && longitude) {
      const newCenter = [longitude, latitude];
      marker.setLngLat(newCenter);
      map.flyTo({ center: newCenter });
    }
  }, [map, marker, latitude, longitude]);


  useEffect(() => {
    if (map && isStyleLoaded && polygonCoordinates?.length > 0) {

      const geojson = {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [polygonCoordinates],
        },
      };


      if (map.loaded()) {
        if (!map.getSource('polygon')) {
          map.addSource('polygon', {
            type: 'geojson',
            data: geojson,
          });
    
          map.addLayer({
            id: 'polygon',
            type: 'fill',
            source: 'polygon',
            layout: {},
            paint: {
              'fill-color': '#088',
              'fill-opacity': 0.4,
            },
          });
        } else {

          map.getSource('polygon').setData(geojson);
        }
    
        loadHistoricalData(map, currentYear);

      }
  
    }
  }, [id, map, isStyleLoaded, polygonCoordinates, currentYear]);
  
  const loadHistoricalData = (mapInstance, year) => {
    const data = sampleHistoricalData[projectId].find(data => data.year === year)
    const historicalData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [longitude, latitude], 
          },
          properties: {
            year: year,
            locationName: location,
            totalTrees: data?.totalTrees,
            growthRate: data?.growthPercentage,
            treeTypes: data?.treeTypes
          },
        },
      ],
    };


    if (mapInstance.getLayer('historical-data-layer') && mapInstance.getSource('historical-data-source')) {
      mapInstance.removeLayer('historical-data-layer');
      mapInstance.removeSource('historical-data-source');
    }
  
    mapInstance.addSource('historical-data-source', {
      type: 'geojson',
      data: historicalData,
    });
  
    setHistoricalDataLayer('historical-data-layer');
  
    mapInstance.addLayer({
      id: 'historical-data-layer',
      type: 'symbol',
      source: 'historical-data-source',
      layout: {
        'icon-image': 'custom-marker', 
        'icon-size': 1.5,
      },
    });

    // Add custom container to the map
    const container = document.createElement('div');
    container.className = 'custom-popup';
    const content = `
      <div style="background-color: #283618; color:white; padding: 15px 20px; border-radius: 5px;">
        <h3 style="text-align: left; margin: 0; font-size:2rem;">${historicalData.features[0].properties.year}</h3>
        <h5 style="text-align: left; margin-top: 1rem; border-bottom:1px solid white; margin-bottom:5px; opacity:0.5">General info</h5>
        <p style="text-align: left; margin: 0;">
          Location Name: ${historicalData.features[0].properties.locationName}<br>
          Total Trees: ${historicalData.features[0].properties.totalTrees}<br>
          Growth Rate: ${historicalData.features[0].properties.growthRate}
        </p>
        <h5 style="text-align: left; margin-top: 1rem; border-bottom:1px solid white; margin-bottom:5px; opacity:0.5">Tree species</h5>
        <p style="text-align: left; margin: 0;">  
          ${historicalData?.features[0]?.properties?.treeTypes && Object.entries(historicalData.features[0].properties.treeTypes).map(([key, value]) => {
            return `<span style="display: block;">${key}: ${value}</span>`;
          }).join('')}
          
        </p>
      </div>
    `;
    container.innerHTML = content;

    // Create a popup, but don't add it to the map yet
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: true
    })
      .setDOMContent(container)
      .addTo(mapInstance);

    // Set popup coordinates based on the feature's coordinates
    const coordinates = historicalData.features[0].geometry.coordinates;
    popup.setLngLat(coordinates);


  };

  
    return (
        <div id={id} style={{ width: '100%', height: '80%' }} className="rounded-md overflow-hidden">            
        </div>
    );
}

export default Map;
