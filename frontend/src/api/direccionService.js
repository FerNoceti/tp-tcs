import apiClient from "./apiClient";

const direccionService = {
  getByProperty: (idPropiedad) =>
    apiClient.get(`/propiedades/${idPropiedad}/direccion`),

  update: (idPropiedad, data) =>
    apiClient.put(`/propiedades/${idPropiedad}/direccion`, data),

  getAll: () => apiClient.get("/direcciones"),

  getById: (id) => apiClient.get(`/direcciones/${id}`),

  create: (data) => apiClient.post("/direcciones", data),

  delete: (id) => apiClient.delete(`/direcciones/${id}`),
};

export default direccionService;
