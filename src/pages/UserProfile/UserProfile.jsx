import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import API from "../../utils/api";
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";

const UserProfile = () => {
  const navigate = useNavigate();
  
  // Estados del perfil de usuario
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    // No ví que el usuario tiene bio XDDDD, se queda quemado xD
    bio: 'Amante de la lectura y la literatura clásica.' 
  });
  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});

  // Estado para el formulario de edición
  const [formData, setFormData] = useState({ ...userData });

  // Estado para cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await API.get("/api/users/me");
        const user = response.data;
        setUserData(user);
        setFormData(user);
      } 
      catch (err) {
          console.error("Error al obtener los datos del usuario:", err)
      }
    };

    fetchUserData();
  }, [])

  // Manejar cambios en los campos del formulario
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpiar error del campo al editar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validar formulario de perfil
  const validateProfile = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'El nombre de usuario es obligatorio';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Debe tener al menos 3 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Formato de correo inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Guardar cambios del perfil
  const handleSaveProfile = () => {
    if (validateProfile()) {
      console.log('Guardando perfil:', formData);
      setUserData({ ...formData });
      setEditMode(false);
      // Aquí iría la integración con backend
      alert('Perfil actualizado exitosamente');
    }
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setFormData({ ...userData });
    setErrors({});
    setEditMode(false);
  };

  // Manejar cambio de contraseña
  const handleChangePassword = () => {
    if (!passwordData.currentPassword) {
      alert('Ingresa tu contraseña actual');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    console.log('Cambiando contraseña...');
    // Aquí iría la integración con backend
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Contraseña cambiada exitosamente');
  };

  // Manejar eliminación de cuenta
  const handleDeleteAccount = () => {
    console.log('Eliminando cuenta...');
    // Aquí iría la integración con backend
    setShowDeleteModal(false);
    setShowSuccessModal(true);
    
    // Redirigir a la página principal después de 3 segundos
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (loading) {
    return <div className="user-profile-page"><p>Cargando perfil...</p></div>
  }

  return (
    <div className="user-profile-page">
      {/* <Header /> */}
      
      <div className="profile-container">
        {/* Sección de encabezado del perfil */}
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {userData.username.charAt(0).toUpperCase()}
            </div>
            <button className="avatar-edit-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </button>
          </div>
          <div className="profile-header-info">
            <h1 className="profile-username">{userData.username}</h1>
            <p className="profile-email">{userData.email}</p>
          </div>
        </div>

        {/* Tarjetas de información */}
        <div className="profile-content">
          {/* Información Personal */}
          <div className="profile-card">
            <div className="card-header">
              <h2 className="card-title">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Información Personal
              </h2>
              {!editMode && (
                <Button 
                  variant="outline" 
                  size="small"
                  onClick={() => setEditMode(true)}
                >
                  Editar
                </Button>
              )}
            </div>

            <div className="card-body">
              {editMode ? (
                <div className="edit-form">
                  <InputField
                    label="Nombre de usuario"
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    error={errors.username}
                    placeholder="Ingresa tu nombre de usuario"
                  />
                  <InputField
                    label="Correo electrónico"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    placeholder="correo@example.com"
                  />
                  <div className="input-group">
                    <label className="input-label">Biografía</label>
                    <textarea
                      className="bio-textarea"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Cuéntanos sobre tus gustos literarios..."
                      rows="4"
                    />
                  </div>

                  <div className="form-actions">
                    <Button 
                      variant="primary"
                      onClick={handleSaveProfile}
                    >
                      Guardar Cambios
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={handleCancelEdit}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="info-display">
                  <div className="info-item">
                    <span className="info-label">Nombre de usuario:</span>
                    <span className="info-value">{userData.username}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Correo electrónico:</span>
                    <span className="info-value">{userData.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Biografía:</span>
                    <span className="info-value">{userData.bio}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Seguridad y Privacidad */}
          <div className="profile-card">
            <div className="card-header">
              <h2 className="card-title">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                Seguridad y Privacidad
              </h2>
            </div>

            <div className="card-body">
              <div className="security-section">
                <div className="security-item">
                  <div className="security-info">
                    <h3>Cambiar Contraseña</h3>
                    <p>Actualiza tu contraseña regularmente para mantener tu cuenta segura</p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => setShowPasswordModal(true)}
                  >
                    Cambiar
                  </Button>
                </div>

                <div className="security-item">
                  <div className="security-info">
                    <h3>Autenticación de Dos Factores</h3>
                    <p>Añade una capa extra de seguridad a tu cuenta (próximamente)</p>
                  </div>
                  <Button variant="outline" disabled>
                    Configurar
                  </Button>
                </div>

                <div className="security-item">
                  <div className="security-info">
                    <h3>Privacidad del Perfil</h3>
                    <p>Controla quién puede ver tu información y actividad (próximamente)</p>
                  </div>
                  <Button variant="outline" disabled>
                    Gestionar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Preferencias */}
          <div className="profile-card">
            <div className="card-header">
              <h2 className="card-title">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                </svg>
                Preferencias
              </h2>
            </div>

            <div className="card-body">
              <div className="preferences-section">
                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Notificaciones por Email</h3>
                    <p>Recibe actualizaciones sobre tus libros y actividades</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Mostrar Perfil Público</h3>
                    <p>Permite que otros usuarios vean tu perfil</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Tema Oscuro</h3>
                    <p>Cambia la apariencia de la aplicación (próximamente)</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" disabled />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Zona de Peligro */}
          <div className="profile-card danger-card">
            <div className="card-header">
              <h2 className="card-title">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
                Zona de Peligro
              </h2>
            </div>

            <div className="card-body">
              <div className="danger-section">
                <div className="danger-item">
                  <div className="danger-info">
                    <h3>Eliminar Cuenta</h3>
                    <p>Esta acción es permanente y no se puede deshacer. Todos tus datos serán eliminados.</p>
                  </div>
                  <Button 
                    variant="danger"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Eliminar Cuenta
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Cambio de Contraseña */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Cambiar Contraseña</h2>
              <button 
                className="modal-close"
                onClick={() => setShowPasswordModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <InputField
                label="Contraseña Actual"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({
                  ...prev,
                  currentPassword: e.target.value
                }))}
                placeholder="Ingresa tu contraseña actual"
              />
              <InputField
                label="Nueva Contraseña"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({
                  ...prev,
                  newPassword: e.target.value
                }))}
                placeholder="Ingresa tu nueva contraseña"
              />
              <InputField
                label="Confirmar Nueva Contraseña"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({
                  ...prev,
                  confirmPassword: e.target.value
                }))}
                placeholder="Confirma tu nueva contraseña"
              />
            </div>
            <div className="modal-footer">
              <Button 
                variant="primary"
                onClick={handleChangePassword}
              >
                Cambiar Contraseña
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content modal-danger" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>¿Eliminar tu cuenta?</h2>
              <button 
                className="modal-close"
                onClick={() => setShowDeleteModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="warning-message">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
                <p>
                  Esta acción es <strong>permanente e irreversible</strong>. 
                  Se eliminarán todos tus datos, incluyendo:
                </p>
              </div>
              <ul className="deletion-list">
                <li>Tu perfil de usuario</li>
                <li>Todos tus libros guardados</li>
                <li>Tus calificaciones y reseñas</li>
                <li>Tu historial de lectura</li>
                <li>Todas tus preferencias y configuraciones</li>
              </ul>
              <p className="confirm-text">
                ¿Estás seguro de que deseas continuar?
              </p>
            </div>
            <div className="modal-footer">
              <Button 
                variant="danger"
                onClick={handleDeleteAccount}
              >
                Sí, Eliminar Mi Cuenta
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Éxito - Cuenta Eliminada */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content modal-success" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✓ Cuenta Eliminada</h2>
            </div>
            <div className="modal-body">
              <div className="success-message">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <p>Tu cuenta ha sido eliminada exitosamente.</p>
              </div>
              <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginTop: '1rem' }}>
                Serás redirigido a la página principal en unos momentos...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* <Footer /> */}
    </div>
  );
};

export default UserProfile;
