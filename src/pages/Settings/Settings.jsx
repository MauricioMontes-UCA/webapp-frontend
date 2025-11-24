import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import './Settings.css';

const Settings = () => {
  // Estado inicial cargado desde localStorage
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('userSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      fontSize: 'medium',
      autoSave: true,
      compactView: false,
      animations: true
    };
  });

  const [saved, setSaved] = useState(false);

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

  const handleSave = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
    </div>
    </>
  );
};

export default Settings