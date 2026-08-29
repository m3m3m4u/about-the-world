'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface MapFeatureItem {
  id: string;
  name: string;
  center?: [number, number];
  bbox?: [number, number, number, number];
}

interface InteractiveMapProps {
  geojsonUrl?: string | null;
  targetFeatureId?: string | null;
  targetName?: string;
  answeredFeatureId?: string | null;
  answeredName?: string;
  isAnswered?: boolean;
  isCorrect?: boolean;
  highlightCorrectId?: string | null;
  spotlightMode?: boolean;
  targetCoordinates?: [number, number] | null;
  userPlacedCoordinates?: [number, number] | null;
  distanceKm?: number | null;
  center?: [number, number];
  zoom?: number;
  onFeatureClick?: (featureId: string, featureName: string) => void;
  onMapClick?: (lat: number, lng: number) => void;
  disabled?: boolean;
  height?: string | number;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  children?: React.ReactNode;
}

const SATELLITE_TILE_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

export function InteractiveMap({
  geojsonUrl,
  targetFeatureId,
  targetName,
  answeredFeatureId,
  answeredName,
  isAnswered = false,
  isCorrect = false,
  highlightCorrectId,
  spotlightMode = false,
  targetCoordinates,
  userPlacedCoordinates,
  distanceKm,
  center = [20, 0],
  zoom = 2,
  onFeatureClick,
  onMapClick,
  disabled = false,
  height = '520px',
  isFullscreen = false,
  onToggleFullscreen,
  children
}: InteractiveMapProps) {
  const { language } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const geojsonLayerRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const linesLayerRef = useRef<any>(null);
  const isMountedRef = useRef<boolean>(false);

  const [geojsonData, setGeojsonData] = useState<any>(null);
  const [leafletReady, setLeafletReady] = useState<boolean>(false);

  // Load Leaflet & CSS client-side
  useEffect(() => {
    isMountedRef.current = true;
    if (typeof window === 'undefined') return;

    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    import('leaflet').then((L) => {
      if (!isMountedRef.current) return;
      (window as any).L = L.default || L;
      setLeafletReady(true);
    });

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Fetch GeoJSON when geojsonUrl changes
  useEffect(() => {
    if (!geojsonUrl) {
      setGeojsonData(null);
      return;
    }

    let isSubscribed = true;
    fetch(geojsonUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (isSubscribed) {
          setGeojsonData(data);
        }
      })
      .catch((err) => {
        console.warn('Could not load GeoJSON:', err);
        if (isSubscribed) setGeojsonData(null);
      });

    return () => {
      isSubscribed = false;
    };
  }, [geojsonUrl]);

  // Initialize Map
  useEffect(() => {
    if (!leafletReady || !mapContainerRef.current || mapInstanceRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    const map = L.map(mapContainerRef.current, {
      center: center,
      zoom: zoom,
      zoomControl: false,
      attributionControl: false,
      worldCopyJump: true,
      minZoom: 2,
      maxZoom: 18,
    });

    // Create High-Res Satellite Tile Layer (Esri World Imagery)
    const tileLayer = L.tileLayer(SATELLITE_TILE_URL, {
      maxZoom: 18,
      subdomains: 'abcd',
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Feature group for markers & lines
    markersLayerRef.current = L.featureGroup().addTo(map);
    linesLayerRef.current = L.featureGroup().addTo(map);

    // Map click handler
    map.on('click', (e: any) => {
      if (onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [leafletReady]);

  // Invalidate size on fullscreen change
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 150);
    }
  }, [isFullscreen]);

  // Update center & zoom when prop changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setView(center, zoom, { animate: true, duration: 0.6 });
  }, [center, zoom]);

  // Style function for GeoJSON polygons over satellite imagery
  const getFeatureStyle = useCallback(
    (feature: any) => {
      const featId = String(feature.id || feature.properties?.id || '').toLowerCase();
      const targetId = String(targetFeatureId || '').toLowerCase();
      const ansId = String(answeredFeatureId || '').toLowerCase();
      const correctId = String(highlightCorrectId || targetFeatureId || '').toLowerCase();

      // Spotlight mode: highlight target feature in gold
      if (spotlightMode && featId === targetId) {
        return {
          fillColor: '#f59e0b',
          fillOpacity: 0.65,
          color: '#fbbf24',
          weight: 3,
        };
      }

      // Answer feedback
      if (isAnswered) {
        if (featId === correctId) {
          return {
            fillColor: '#16a34a',
            fillOpacity: 0.75,
            color: '#22c55e',
            weight: 3,
          };
        }
        if (featId === ansId && !isCorrect) {
          return {
            fillColor: '#dc2626',
            fillOpacity: 0.75,
            color: '#ef4444',
            weight: 3,
          };
        }
      }

      // Default polygon style over satellite
      return {
        fillColor: '#22c55e',
        fillOpacity: 0.14,
        color: '#ffffff',
        weight: 1.5,
      };
    },
    [targetFeatureId, answeredFeatureId, isAnswered, isCorrect, highlightCorrectId, spotlightMode]
  );

  // Render GeoJSON Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !leafletReady) return;
    const L = (window as any).L;
    if (!L) return;

    const map = mapInstanceRef.current;

    if (geojsonLayerRef.current) {
      map.removeLayer(geojsonLayerRef.current);
      geojsonLayerRef.current = null;
    }

    if (!geojsonData) return;

    const layer = L.geoJSON(geojsonData, {
      style: getFeatureStyle,
      onEachFeature: (feature: any, featLayer: any) => {
        const featName = feature.properties?.name || feature.properties?.NAME || '';
        const featId = String(feature.id || feature.properties?.id || '');
        const normFeatId = featId.toLowerCase();
        const normCorrectId = String(highlightCorrectId || targetFeatureId || '').toLowerCase();
        const normAnsId = String(answeredFeatureId || '').toLowerCase();

        // Tooltip feedback when answered
        if (isAnswered) {
          if (normFeatId === normCorrectId) {
            const displayName = targetName || featName || 'Richtig';
            featLayer.bindTooltip(`✓ ${displayName}`, {
              permanent: true,
              direction: 'center',
              className: 'map-correct-tooltip',
            }).openTooltip();
            setTimeout(() => {
              try { featLayer.bringToFront(); } catch (e) {}
            }, 60);
          } else if (normFeatId === normAnsId && !isCorrect) {
            const displayName = answeredName || featName || 'Falsch';
            featLayer.bindTooltip(`✗ ${displayName}`, {
              permanent: true,
              direction: 'center',
              className: 'map-wrong-tooltip',
            }).openTooltip();
            setTimeout(() => {
              try { featLayer.bringToFront(); } catch (e) {}
            }, 60);
          }
        }

        featLayer.on({
          mouseover: (e: any) => {
            if (disabled) return;
            const l = e.target;
            if (!isAnswered && !spotlightMode) {
              l.setStyle({
                fillOpacity: 0.45,
                weight: 2.5,
                color: '#fbbf24',
              });
              if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                l.bringToFront();
              }
            }
          },
          mouseout: (e: any) => {
            if (disabled) return;
            layer.resetStyle(e.target);
          },
          click: () => {
            if (disabled) return;
            if (onFeatureClick) {
              onFeatureClick(featId, featName);
            }
          },
        });
      },
    }).addTo(map);

    geojsonLayerRef.current = layer;
  }, [geojsonData, leafletReady, getFeatureStyle, disabled, isAnswered, isCorrect, targetFeatureId, answeredFeatureId, highlightCorrectId, targetName, answeredName, spotlightMode, onFeatureClick]);

  // Auto-fit bounds or pan to show correct answer on wrong guess
  useEffect(() => {
    if (!mapInstanceRef.current || !leafletReady || !isAnswered) return;
    const L = (window as any).L;
    if (!L) return;

    const map = mapInstanceRef.current;
    const correctId = String(highlightCorrectId || targetFeatureId || '').toLowerCase();
    const ansId = String(answeredFeatureId || '').toLowerCase();

    if (!isCorrect) {
      let bounds: any = null;

      if (userPlacedCoordinates && targetCoordinates) {
        bounds = L.latLngBounds([userPlacedCoordinates, targetCoordinates]);
      } else if (geojsonLayerRef.current) {
        const layers = geojsonLayerRef.current.getLayers();
        const targets: any[] = [];
        layers.forEach((l: any) => {
          const fid = String(l.feature?.id || l.feature?.properties?.id || '').toLowerCase();
          if (fid === correctId || (ansId && fid === ansId)) {
            targets.push(l);
          }
        });
        if (targets.length > 0) {
          const group = L.featureGroup(targets);
          bounds = group.getBounds();
        }
      }

      if (bounds && bounds.isValid()) {
        map.flyToBounds(bounds, {
          padding: [50, 50],
          maxZoom: 6,
          duration: 0.9,
        });
      }
    }
  }, [isAnswered, isCorrect, targetFeatureId, answeredFeatureId, highlightCorrectId, userPlacedCoordinates, targetCoordinates, leafletReady]);

  // Update Markers & Lines
  useEffect(() => {
    if (!mapInstanceRef.current || !leafletReady) return;
    const L = (window as any).L;
    if (!L) return;

    const markersGroup = markersLayerRef.current;
    const linesGroup = linesLayerRef.current;
    if (!markersGroup || !linesGroup) return;

    markersGroup.clearLayers();
    linesGroup.clearLayers();

    if (userPlacedCoordinates) {
      const [lat, lng] = userPlacedCoordinates;
      const guessIcon = L.divIcon({
        className: 'custom-map-pin guess-pin',
        html: `<div style="background:#ef4444; width:18px; height:18px; border-radius:50%; border:2px solid #ffffff; box-shadow:0 0 8px rgba(0,0,0,0.6);"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });
      const m = L.marker([lat, lng], { icon: guessIcon }).addTo(markersGroup);
      if (isAnswered && !isCorrect) {
        const yourClickText =
          language === 'en' ? 'Your click' :
          language === 'fr' ? 'Votre clic' :
          language === 'es' ? 'Tu clic' :
          language === 'it' ? 'Il tuo clic' :
          'Dein Klick';
        m.bindTooltip(`✗ ${yourClickText}`, { permanent: true, direction: 'top', className: 'map-wrong-tooltip' }).openTooltip();
      }
    }

    if (targetCoordinates && (isAnswered || spotlightMode)) {
      const [tLat, tLng] = targetCoordinates;
      const targetIcon = L.divIcon({
        className: 'custom-map-pin target-pin',
        html: `<div style="background:#22c55e; width:22px; height:22px; border-radius:50%; border:3px solid #ffffff; box-shadow:0 0 12px rgba(34,197,94,0.9); animation:pulse 1.5s infinite;"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });
      const m = L.marker([tLat, tLng], { icon: targetIcon }).addTo(markersGroup);
      if (isAnswered) {
        const distText = distanceKm !== null && distanceKm !== undefined ? ` (${Math.round(distanceKm)} km)` : '';
        const defaultTargetLabel =
          language === 'en' ? 'Target location' :
          language === 'fr' ? 'Lieu cible' :
          language === 'es' ? 'Lugar objetivo' :
          language === 'it' ? 'Posizione target' :
          'Zielort';
        m.bindTooltip(`✓ ${targetName || defaultTargetLabel}${distText}`, { permanent: true, direction: 'top', className: 'map-correct-tooltip' }).openTooltip();
      }

      if (userPlacedCoordinates && isAnswered) {
        const [gLat, gLng] = userPlacedCoordinates;
        L.polyline([[gLat, gLng], [tLat, tLng]], {
          color: '#f59e0b',
          weight: 3,
          dashArray: '6, 6',
          opacity: 0.9,
        }).addTo(linesGroup);
      }
    }
  }, [userPlacedCoordinates, targetCoordinates, isAnswered, isCorrect, targetName, distanceKm, spotlightMode, language, leafletReady]);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const zoomInTitle =
    language === 'en' ? 'Zoom in' :
    language === 'fr' ? 'Agrandir' :
    language === 'es' ? 'Acercar' :
    language === 'it' ? 'Ingrandisci' :
    'Vergrößern';

  const zoomOutTitle =
    language === 'en' ? 'Zoom out' :
    language === 'fr' ? 'Dézoomer' :
    language === 'es' ? 'Alejar' :
    language === 'it' ? 'Rimpicciolisci' :
    'Verkleinern';

  const fullscreenTitle = isFullscreen
    ? (language === 'en' ? 'Exit fullscreen' : language === 'fr' ? 'Quitter le plein écran' : language === 'es' ? 'Salir de pantalla completa' : language === 'it' ? 'Esci da schermo intero' : 'Vollbild beenden')
    : (language === 'en' ? 'Fullscreen' : language === 'fr' ? 'Plein écran' : language === 'es' ? 'Pantalla completa' : language === 'it' ? 'Schermo intero' : 'Vollbildmodus aktivieren');

  const watermarkText =
    language === 'en' ? 'Satellite Imagery (Esri World Imagery)' :
    language === 'fr' ? 'Images satellite (Esri World Imagery)' :
    language === 'es' ? 'Imágenes satelitales (Esri World Imagery)' :
    language === 'it' ? 'Immagini satellitari (Esri World Imagery)' :
    'Satellitenbild (Esri World Imagery)';

  return (
    <div
      className={`interactive-map-wrapper ${isFullscreen ? 'map-fullscreen-active' : ''}`}
      style={{
        position: 'relative',
        width: '100%',
        height: isFullscreen ? '100%' : height,
        borderRadius: isFullscreen ? 0 : 8,
        overflow: 'hidden',
        border: isFullscreen ? 'none' : '1px solid var(--green-border)',
        boxShadow: isFullscreen ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.08)',
        background: '#0f172a',
      }}
    >
      {/* Map Canvas */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

      {/* Control Bar: Zoom Controls & Fullscreen */}
      <div
        className="map-control-bar"
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          display: 'flex',
          gap: 6,
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(6px)',
          padding: '4px 6px',
          borderRadius: 6,
          border: '1px solid var(--green-border)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
        }}
      >
        <button type="button" onClick={handleZoomIn} className="map-tool-btn icon-only" title={zoomInTitle}>
          <ZoomIn style={{ width: 15, height: 15 }} />
        </button>
        <button type="button" onClick={handleZoomOut} className="map-tool-btn icon-only" title={zoomOutTitle}>
          <ZoomOut style={{ width: 15, height: 15 }} />
        </button>

        {onToggleFullscreen && (
          <button
            type="button"
            onClick={onToggleFullscreen}
            className={`map-tool-btn icon-only ${isFullscreen ? 'active' : ''}`}
            title={fullscreenTitle}
          >
            {isFullscreen ? <Minimize2 style={{ width: 15, height: 15 }} /> : <Maximize2 style={{ width: 15, height: 15 }} />}
          </button>
        )}
      </div>

      {/* Children overlay for Fullscreen HUD */}
      {children}

      {/* Bottom status hint bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: 12,
          zIndex: 990,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(4px)',
          padding: '3px 10px',
          borderRadius: 4,
          fontSize: '11.5px',
          color: '#e2e8f0',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          pointerEvents: 'none',
        }}
      >
        {watermarkText}
      </div>
    </div>
  );
}
