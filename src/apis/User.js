import Api from "./Api";

export default {
    resume(form) {
        return Api().post("/resume", form);
    },

    resumeGet(id) {
        return Api().get(`/resume/${id}` );
    },

    register(form) {
        return Api().post("/register", form);
    },

    login(form) {
        return Api().post("/login", form);
    },

    logout() {
        return Api().post("/logout");
    },

    auth() {
        return Api().get("/user");
    }
};
