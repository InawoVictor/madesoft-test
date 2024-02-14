import { defineStore } from "pinia";
import { ref, Ref } from 'vue';
// import { useToast } from "primevue/usetoast";
// const toast = useToast();

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

        // Check if the registration was successful (status code 2xx)
        if (response.ok) {
            // Parse the response JSON
            const data = await response.json();

            console.log('Registration successful:', data);

            
        } else {
            // Handle non-2xx status codes
            console.log('Registration failed');

            
        }
    } catch (error) {
        // Handle unexpected errors
        console.log('An error occured:', error);

        
        // toast.add({ severity: 'error', summary: 'Something went wrong', detail: 'Message Content', life: 3000 });
    }
}

  async function loginUser(payload: LoginPayload): Promise<void> {
    try {
        // Make the login request
        const response = await useFetch('https://live.api.madesoftacademy.com/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        // Check if the request was successful (status code 2xx)
        if (response.ok) {
            // Parse the response JSON
            const data = await response.json();

            // Update the user value
            user.value = data;

            // Save user data to local storage
            localStorage.setItem('userAuth', JSON.stringify(data));

            // Log the user value
            console.log('User:', user.value);

            // toast.add({ severity: 'success', summary: 'Signed in User', detail: 'Message Content', life: 3000 });
        } else {
            console.log('Something went wrong ');


            // toast.add({ severity: 'error', summary: 'Error occurred', detail: 'Message Content', life: 3000 });
        }
    } catch (error) {
        console.log('An error occured', error);

    }
}
  

  return {
    user,
    registerUser,
    loginUser,
  };
});
