import { defineStore } from "pinia";
import { ref, Ref } from 'vue';

interface User {
  // Define the properties of your user object
  // Example: id: number;
}

interface RegisterPayload {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}
interface LoginPayload {
    password: string,
    email: string
}

export const useAuthStore = defineStore("auth", () => {
  const user: Ref<User | {}> = ref({});
  const isError = ref(false)
  const { $toast } = useNuxtApp()

  async function registerUser(payload: RegisterPayload): Promise<void> {
    try {
        // Make the registration request
        const response = await useFetch('https://live.api.madesoftacademy.com/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        
        // Parse the response JSON
        user.value = await response.json();
        isError.value = false
        
        $toast.success("Registration Successful!")
        
    } catch (error) {
        // Handle unexpected errors
        isError.value = true
        $toast.error("Something went wrong!")

        
    }
}

  async function loginUser(payload: LoginPayload): Promise<void> {
    try {
        // Make the login request
        const response = await useFetch('https://live.api.madesoftacademy.com/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        // Parse the response JSON
        const data = await response.json();

        // Update the user value
        user.value = data;

        // Save user data to local storage
        localStorage.setItem('userAuth', JSON.stringify(data));

        // Log the user value
        // console.log('User:', user.value);
        $toast.success("User has been signed in")

    } catch (error) {
        $toast.error("Something went wrong😔! try again")

    }
}
  

  return {
    user,
    isError,
    registerUser,
    loginUser,
  };
});
