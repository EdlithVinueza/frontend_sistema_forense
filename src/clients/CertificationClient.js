import { withAuthHeader } from '../services/authToken';

const API_URL_CERT = process.env.VUE_APP_API_CERT || '/api/v1/certificaciones';
const DEFAULT_TIMEOUT_MS = 600000; // 10 minutos (600s) para transferir y procesar archivos PSD de hasta 500MB

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
      throw new Error('La operación superó el tiempo límite de espera (10 minutos). Si el archivo PSD supera los 200 MB, verifique que su velocidad de subida a internet sea suficiente e intente nuevamente.');
    }
    throw err;
  }
}

function uploadWithProgress(url, formData, onProgress, timeoutMs = DEFAULT_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const startTime = Date.now();

    xhr.open('POST', url, true);

    const headers = withAuthHeader();
    for (const [key, value] of Object.entries(headers)) {
      xhr.setRequestHeader(key, value);
    }

    xhr.timeout = timeoutMs;

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.min(99, Math.round((e.loaded / e.total) * 100));
          const elapsedSec = (Date.now() - startTime) / 1000;
          const speedMbps = elapsedSec > 0 ? ((e.loaded * 8) / (1024 * 1024 * elapsedSec)).toFixed(1) : '0.0';
          onProgress({
            percent,
            loadedMb: (e.loaded / (1024 * 1024)).toFixed(1),
            totalMb: (e.total / (1024 * 1024)).toFixed(1),
            speedMbps,
            phase: 'uploading'
          });
        }
      };
      xhr.upload.onload = () => {
        onProgress({
          percent: 100,
          loadedMb: '',
          totalMb: '',
          speedMbps: '',
          phase: 'processing'
        });
      };
    }

    xhr.onload = () => {
      if (xhr.status === 401 || xhr.status === 403) {
        localStorage.removeItem('authToken');
        if (typeof window !== 'undefined') {
          window.location.hash = '#/login?expired=true';
        }
        reject(new Error('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión nuevamente.'));
        return;
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } catch (e) {
          resolve(xhr.responseText);
        }
      } else {
        let errMessage = 'Error al iniciar certificación';
        try {
          const errJson = JSON.parse(xhr.responseText);
          errMessage = errJson.error || errJson.message || errMessage;
        } catch (_) {
          if (xhr.responseText) errMessage = xhr.responseText;
        }
        reject(new Error(errMessage));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Error de red al conectar con el servidor forense. Verifique su conexión e intente nuevamente.'));
    };

    xhr.ontimeout = () => {
      reject(new Error('La operación superó el tiempo límite de espera (10 minutos). Si el archivo PSD es grande, verifique su velocidad de internet e intente de nuevo.'));
    };

    xhr.send(formData);
  });
}

export const CertificationClient = {
  async initCertificacion(psdFile, imgFile, onProgress = null) {
    const formData = new FormData();
    formData.append('psd', psdFile);
    formData.append('imagen', imgFile);

    if (onProgress) {
      return uploadWithProgress(`${API_URL_CERT}/init`, formData, onProgress);
    }

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
