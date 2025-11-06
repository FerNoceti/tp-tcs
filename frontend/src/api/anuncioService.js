import apiClient from "./apiClient";

const anuncioService = {
  getAll: () => apiClient.get("/anuncios"),

  getById: (id) => apiClient.get(`/anuncios/${id}`),

  create: (data) => apiClient.post("/anuncios", data),

  update: (id, data) => apiClient.put(`/anuncios/${id}`, data),

  delete: (id) => apiClient.delete(`/anuncios/${id}`),

  publish: (id) => apiClient.post(`/anuncios/${id}/publicar`),

  pause: (id) => apiClient.post(`/anuncios/${id}/pausar`),

  finalize: (id) => apiClient.post(`/anuncios/${id}/finalizar`),
};

export default anuncioService;
