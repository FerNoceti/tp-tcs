import apiClient from "./apiClient";

const propiedadService = {
  getAll: () => apiClient.get("/propiedades"),

  getById: (id) => apiClient.get(`/propiedades/${id}`),

  create: (data) => apiClient.post("/propiedades", data),

  update: (id, data) => apiClient.put(`/propiedades/${id}`, data),

  delete: (id) => apiClient.delete(`/propiedades/${id}`),
};

export default propiedadService;
