import http from "../http-common";

class TutorialDataService {
  getAll(token) {
    return http.get("/ban",token);
  }

  get(id) {
    return http.get(`/ban/${id}`);
  }

  create(data) {
    return http.post("/ban", data);
  }

  update(id, data) {
    return http.put(`/ban/${id}`, data);
  }

  delete(id) {
    return http.delete(`/ban/${id}`);
  }

  deleteAll() {
    return http.delete(`/ban`);
  }

  findByTitle(title) {
    return http.get(`/ban?title=${title}`);
  }
}

export default new TutorialDataService();