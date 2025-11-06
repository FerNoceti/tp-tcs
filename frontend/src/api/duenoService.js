import apiClient from "./apiClient";

const duenoService = {
  getAll: () => apiClient.get("/duenos"),

  getById: (id) => apiClient.get(`/duenos/${id}`),

  create: (data) => apiClient.post("/duenos", data),

  update: (id, data) => apiClient.put(`/duenos/${id}`, data),

  delete: (id) => apiClient.delete(`/duenos/${id}`),
};

export default duenoService;
