<template>
  <div class="flex flex-col min-h-screen">
    <NavbarSession />
    
    <main class="flex-grow flex p-6">
      <div class="max-w-7xl w-full m-auto">
        <div class="flex flex-col md:flex-row justify-between items-end mb-6 gap-6">
          <div>
            <span class="font-mono text-[10px] text-secondary font-bold tracking-[0.3em] uppercase">Status: Agente Conectado</span>
            <h1 class="text-4xl font-heading font-bold text-gray-900 mt-2 tracking-tight">Bóveda de Certificados</h1>
          </div>
          <div class="flex gap-3">
            <button class="btn-black !bg-white !text-black border border-black !text-[10px] uppercase tracking-widest">
              Historial Completo
            </button>
            <router-link to="/certification" class="btn-black !text-[10px] uppercase tracking-widest px-4 py-2 flex items-center">
              Nueva Certificación
            </router-link>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <div class="flex-grow relative">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input v-model="searchQuery" type="text" class="input-standard w-full pl-12" placeholder="Buscar por ID, Hash (SHA-256) o Fecha de Sello...">
          </div>
          <button @click="loadData" class="btn-black !py-3 !px-6">Refrescar</button>
        </div>

        <DataTable 
          :data="filteredCertificates" 
          @start-certification="$router.push('/certification')"
          @preview="previewCert"
          @download="downloadCert"
        />
      </div>
    </main>
    
    <Footer />

    <!-- Modal JSON Preview -->
    <div v-if="selectedCert" class="modal-overlay" style="display: flex; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 9999; justify-content: center; align-items: center;">
      <div class="bg-white p-6 rounded-2xl max-w-2xl w-full m-4 shadow-2xl border border-gray-100 relative">
        <button type="button" @click="selectedCert = null" class="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors">
          <span class="material-symbols-outlined">close</span>
        </button>
        <h3 class="font-heading font-bold text-xl mb-2 flex items-center gap-2">
          <span class="material-symbols-outlined text-secondary">data_object</span> Expediente Forense JSON
        </h3>
        <div class="bg-[#131b2e] rounded-lg p-4 mt-4 overflow-auto max-h-96">
          <pre class="text-[#6cf8bb] font-mono text-xs leading-relaxed whitespace-pre-wrap">{{ JSON.stringify(selectedCert, null, 2) }}</pre>
        </div>
        <button @click="downloadCert(selectedCert)" class="btn-black w-full mt-4 py-3 uppercase font-bold tracking-widest text-[10px] flex justify-center items-center gap-2">
          <span class="material-symbols-outlined text-sm">download</span> Descargar Expediente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavbarSession from '../../components/NavbarSession.vue';
import Footer from '../../components/Footer.vue';
import DataTable from '../../components/DataTable.vue';

const router = useRouter();
const certificates = ref([]);
const searchQuery = ref('');
const selectedCert = ref(null);

const filteredCertificates = computed(() => {
  if (!searchQuery.value) return certificates.value;
  const term = searchQuery.value.toLowerCase();
  return certificates.value.filter(cert => 
    cert.id_certificado.toLowerCase().includes(term) ||
    cert.hash_criptografico.toLowerCase().includes(term) ||
    cert.titulo_obra.toLowerCase().includes(term)
  );
});

const loadData = async () => {
  // Simulando llamada
  certificates.value = [
    {
      id_certificado: "CERT-2026-0001",
      titulo_obra: "Paisaje Cibernético 2077",
      phash_visual: "001100110011100111111001",
      hash_criptografico: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      fecha_sello: "2026-06-10 14:30:00",
      estado: "VALIDO",
      autor: "Edlith Vinueza"
    }
  ];
};

onMounted(() => {
  loadData();
});

const previewCert = (cert) => {
  selectedCert.value = cert;
};

const downloadCert = (cert) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cert, null, 2));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", `expediente_${cert.id_certificado}.json`);
  dlAnchorElem.click();
};
</script>
