<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const authStore = useAuthStore();
const { loading, error } = storeToRefs(authStore);
const { login } = authStore;

const form = ref({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  await login(form.value);
  // Redirect or perform any other action after successful login
  if (error.value == 'Unauthorized') {
    form.value.password = null
    alert("Email atau password salah");
    // Handle error, e.g., show a notification
  }
};
</script>

<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <div class="mt-1 relative">
        <!-- TODO: Add v-model binding for email -->
        <input v-model="form.email" type="email" id="email" name="email" required
          class="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus: outline-none focus: border-blue-5"
          placeholder="nama@perusahaan.com" />
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <i data-feather="mail" class="w-4 h-4 text-gray-400"></i>
        </div>
      </div>
    </div>
    <!-- Password -->
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <div class="mt-1 relative">
        <!-- TODO: Add v-model binding for password -->
        <input v-model="form.password" type="password" id="password" name="password" required
          class="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus: outline-none focus: border-blue-5"
          placeholder="........" />
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
          <!-- TODO: Add click handler for password toggle -->
          <button type="button" class="text-gray-400 hover: text-gray-600 focus: outline-none">
            <i data-feather="eye" class="w-4 h-4" id="password-toggle"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Remember Me & Forgot Password -->
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input type="checkbox" id="remember" name="remember"
          class="h-4 w-4 text-blue-600 focus: ring-blue-500 border-gray-300 rounded" />
        <label for="remember" class="ml-2 block text-sm text-gray-700">Ingat saya</label>
      </div>
      <a href="#" class="text-sm text-blue-600 hover: text-blue-800">Lupa password?</a>
    </div>
    <!-- Submit Button -->
    <div>
      <!-- TODO: Add loading state to button -->
      <button type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
        <span v-if="!loading">
        Masuk
      </span>
      <span v-else>
        Loading...
      </span>
      </button>
      
    </div>
  </form>

  <!-- Divider -->
  <div class="mt-6">
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-2 bg-white text-gray-500">Atau</span>
      </div>
    </div>
  </div>

  <div class="mt-6 text-center">
    <p class="text-sm text-gray-500">Belum punya akun? <a href="/register"
        class="text-blue-600 hover: text-blue-800 font-medium">Daftar sekarang</a></p>

  </div>
</template>
