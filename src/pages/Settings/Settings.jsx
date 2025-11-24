import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import './Settings.css';


const Settings = () => {
  // Estado inicial por defecto
  const defaultSettings = {
    fontSize: 'medium',
    autoSave: true,
    compactView: false,
    animations: true
  };
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar settings desde backend o localStorage
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/users/me', { credentials: 'include' });
        if (res.ok) {
          const user = await res.json();
          if (user.settings) {
            setSettings({ ...defaultSettings, ...user.settings });
          } else {
            setSettings(defaultSettings);
          }
        } else if (res.status === 401) {
          // No autenticado, usar localStorage
          const savedSettings = localStorage.getItem('userSettings');
          setSettings(savedSettings ? JSON.parse(savedSettings) : defaultSettings);
        } else {
          setError('Error al cargar configuración');
        }
      } catch (e) {
        // Fallback localStorage
        const savedSettings = localStorage.getItem('userSettings');
        setSettings(savedSettings ? JSON.parse(savedSettings) : defaultSettings);
      }
      setLoading(false);
    };
    fetchSettings();
    // eslint-disable-next-line
  }, []);

  // Aplicar tamaño de fuente cuando cambie
  useEffect(() => {
    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px'
    };
    document.documentElement.style.fontSize = fontSizes[settings.fontSize];
  }, [settings.fontSize]);

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setError(null);
    try {
      const res = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ settings })
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else if (res.status === 401) {
        // No autenticado, guardar en localStorage
        localStorage.setItem('userSettings', JSON.stringify(settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError('Error al guardar configuración');
      }
    } catch (e) {
      // Fallback localStorage
      localStorage.setItem('userSettings', JSON.stringify(settings));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <>
      <div className="settings-background-outer"></div>
      <Header />
      <div className="settings-container">
        <div className="settings-header">
          <h1>Configuración</h1>
          <p>Personaliza tu experiencia en la aplicación</p>
        </div>

        {loading ? (
          <div className="settings-content"><p>Cargando configuración...</p></div>
        ) : error ? (
          <div className="settings-content"><p style={{color: 'red'}}>{error}</p></div>
        ) : (
        <div className="settings-content">
          {/* Sección de Preferencias de Visualización */}
          <div className="settings-section">
            <h2>Preferencias de Visualización</h2>
            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-label">Tamaño de fuente</div>
                <div className="settings-item-description">
                  Ajusta el tamaño del texto en toda la aplicación
                </div>
              </div>
              <div className="settings-item-control">
                <select 
                  className="settings-select"
                  value={settings.fontSize}
                  onChange={(e) => handleChange('fontSize', e.target.value)}
                >
                  <option value="small">Pequeño</option>
                  <option value="medium">Mediano</option>
                  <option value="large">Grande</option>
                </select>
              </div>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-label">Vista compacta</div>
                <div className="settings-item-description">
                  Muestra más contenido en pantalla reduciendo espacios
                </div>
              </div>
              <div className="settings-item-control">
                <div 
                  className={`settings-toggle ${settings.compactView ? 'active' : ''}`}
                  onClick={() => handleToggle('compactView')}
                >
                  <div className="settings-toggle-slider"></div>
                </div>
              </div>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-label">Animaciones</div>
                <div className="settings-item-description">
                  Activa o desactiva las animaciones de la interfaz
                </div>
              </div>
              <div className="settings-item-control">
                <div 
                  className={`settings-toggle ${settings.animations ? 'active' : ''}`}
                  onClick={() => handleToggle('animations')}
                >
                  <div className="settings-toggle-slider"></div>
                </div>
              </div>
            </div>
          </div>
          {/* Sección de Preferencias de Uso */}
          <div className="settings-section">
            <h2>Preferencias de Uso</h2>
            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-label">Guardado automático</div>
                <div className="settings-item-description">
                  Guarda automáticamente tu progreso de lectura
                </div>
              </div>
              <div className="settings-item-control">
                <div 
                  className={`settings-toggle ${settings.autoSave ? 'active' : ''}`}
                  onClick={() => handleToggle('autoSave')}
                >
                  <div className="settings-toggle-slider"></div>
                </div>
              </div>
            </div>
          </div>
          {/* Botón de guardar */}
          <button className="settings-save-button" onClick={handleSave}>
            Guardar cambios
          </button>
          {saved && <div className="settings-saved-message">Configuración guardada correctamente</div>}
        </div>
        )}
      </div>
    </>
  );
};

export default Settings