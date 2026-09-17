import { withAuthHeader } from '../services/authToken';

const API_URL_CERT = process.env.VUE_APP_API_CERT || '/api/v1/certificaciones';
const DEFAULT_TIMEOUT_MS = 90000; // 90 segundos para procesos forenses pesados

async function fetchWithTimeout(url, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('authToken');
      if (typeof window !== 'undefined') {
        window.location.hash = '#/login?expired=true';
      }
      throw new Error('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión nuevamente.');
    }

    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('La operación superó el tiempo límite de espera (90s). Si el archivo PSD es grande, el procesamiento puede demorar un momento adicional.');
    }
    throw err;
  }
}

export const CertificationClient = {
  async initCertificacion(psdFile, imgFile) {
    const formData = new FormData();
    formData.append('psd', psdFile);
    formData.append('imagen', imgFile);

    try {
      const response = await fetchWithTimeout(`${API_URL_CERT}/init`, {
        method: 'POST',
        headers: withAuthHeader(),
        body: formData
      });
      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || 'Error al iniciar certificación');
      }
      return await response.json();
    } catch (error) {
      console.error("CertificationClient Init Error:", error);
      throw error;
    }
  },

  async recuperarCertificado(imgFile, hashDuplicado, cedula) {
    const formData = new FormData();
    formData.append('imagen', imgFile);
    formData.append('hash_duplicado', hashDuplicado);
    formData.append('cedula', cedula);

    try {
      const response = await fetchWithTimeout(`${API_URL_CERT}/recuperar`, {
        method: 'POST',
        headers: withAuthHeader(),
        body: formData
      });
      if (!response.ok) {
        if (response.status === 409) {
          const errText = await response.text();
          throw new Error(errText);
        }
        throw new Error('Error al recuperar certificado');
      }
      return await response.blob();
    } catch (error) {
      console.error("CertificationClient Recuperar Error:", error);
      throw error;
    }
  },

  async enviarDatosObra(idExpediente, datosObra) {
    try {
      const response = await fetchWithTimeout(`${API_URL_CERT}/${idExpediente}/datos`, {
        method: 'PUT',
        headers: withAuthHeader({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(datosObra)
      });
      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || 'Error al enviar datos de obra');
      }
      return await response.json();
    } catch (error) {
      console.error("CertificationClient Datos Error:", error);
      throw error;
    }
  },

  async firmarExpediente(idExpediente, password) {
    const params = new URLSearchParams();
    params.append('password', password);

    try {
      const response = await fetchWithTimeout(`${API_URL_CERT}/${idExpediente}/firmar`, {
        method: 'POST',
        headers: withAuthHeader({ 'Content-Type': 'application/x-www-form-urlencoded' }),
        body: params
      });
      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || 'Contraseña incorrecta o problema de red, intente nuevamente.');
      }
      return await response.json();
    } catch (error) {
      console.error("CertificationClient Firmar Error:", error);
      throw error;
    }
  }
};
