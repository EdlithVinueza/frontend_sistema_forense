const API_URL_AUTH = 'http://localhost:8080/usuarios';

export const AuthClient = {
  async register(userData) {
    try {
      const response = await fetch(`${API_URL_AUTH}/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cedula: userData.identificacion,
          nombres: userData.nombres,
          apellidos: userData.apellidos,
          correo: userData.correo,
          passwordHash: userData.contrasena
        })
      });
      if (!response.ok) throw new Error('Error en el registro');
      return true;
    } catch (error) {
      console.error("AuthClient Register Error:", error);
      throw error;
    }
  },

  async login(credentials) {
    try {
      const response = await fetch(`${API_URL_AUTH}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo: credentials.email,
          password: credentials.password
        })
      });
      
      if (!response.ok) throw new Error('Credenciales incorrectas');
      return await response.json();
    } catch (error) {
      console.error("AuthClient Login Error:", error);
      throw error;
    }
  }
};
