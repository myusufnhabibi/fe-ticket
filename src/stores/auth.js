import { defineStore } from "pinia";
import { axiosInstance } from "@/plugins/axios";
import { handleError } from "@/helpers/errorHelper";
import router from "@/router";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    success: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    token: () => Cookies.get("token"),
  },

  actions: {
    async login(credentials) {
      this.loading = true;

      try {
        const response = await axiosInstance.post("/login", credentials);
        Cookies.set("token", response.data.data.token);
        this.success = response.data.message || "Login successful!";
        if (response.data.data.user.role === 'admin') {
          router.push({ name: "admin.dashboard" });
        } else {
          router.push({ name: "user.dashboard" });
        }
      } catch (error) {
        this.error = handleError(error);
      } finally {
        this.loading = false;
      }
    },

    // async register(userData) {
    //   this.loading = true;
    //   this.error = null;
    //   this.success = null;

    //   try {
    //     const response = await axiosInstance.post("/auth/register", userData);
    //     Cookies.set("token", response.data.token);
    //     this.user = response.data.user;
    //     this.success = "Registration successful!";
    //     router.push({ name: "dashboard" });
    //   } catch (error) {
    //     this.error = handleError(error);
    //   } finally {
    //     this.loading = false;
    //   }
    // },

    // async logout() {
    //   Cookies.remove("token");
    //   this.user = null;
    //   router.push({ name: "login" });
    // },

    // async checkAuth() {
    //   if (!this.token) return;

    //   try {
    //     const response = await axiosInstance.get("/auth/me");
    //     this.user = response.data.user;
    //   } catch (error) {
    //     console.error("Failed to check authentication:", error);
    //     this.logout();
    //   }
    // },
  },

});
