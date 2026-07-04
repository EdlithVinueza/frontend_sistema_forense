const API_URL_CERT = 'http://localhost:8090/api/v1/certificaciones';

export const CertificationClient = {
  async initCertificacion(psdFile, imgFile) {
    const formData = new FormData();
    formData.append('psd', psdFile);
    formData.append('imagen', imgFile);

    try {
      const response = await fetch(`${API_URL_CERT}/init`, {
        method: 'POST',
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



  async enviarDatosObra(idExpediente, datosObra) {
    try {
      const response = await fetch(`${API_URL_CERT}/${idExpediente}/datos`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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

  async firmarExpediente(idExpediente, p12File, password) {
    const formData = new FormData();
    formData.append('certificado', p12File);
    formData.append('password', password);

    try {
      const response = await fetch(`${API_URL_CERT}/${idExpediente}/firmar`, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || 'Contraseña incorrecta o certificado inválido.');
      }
      return await response.json();
    } catch (error) {
      console.error("CertificationClient Firmar Error:", error);
      throw error;
    }
  }
};


