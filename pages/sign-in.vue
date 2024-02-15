<template>
    <div class="w-full bg bg-white h-screen flex">        
        <img src="/img/face.png" class=" w-[550px] object-cover">
        
        <div class="py-20  h-full flex-1  ">
            <div class="w-[80%] mx-auto">
                <h1 class="text-3xl font-bold ">Sign in</h1>
                <form class="mt-4 flex flex-col gap-y-2" @submit.prevent="login">
                    <InputTextField type="email" v-model="email" label="Email" :error="error" :required="true" placeholder="Input your email in here" />
                    <InputTextField :type="isPassword ? 'password': 'text'" :error="error" v-model="password" :required="true" :password="true" @changeType="isPassword = !isPassword" label="Password" placeholder="Input your password in here" />
                    <div class="flex justify-between items-center mt-2">
                        <div>
                            <input type="checkbox" v-model="rememberMe"> &nbsp;
                            <span class="text-[#92929D] text-sm">remember me</span>
                        </div>
                        <span class="text-[#92929D] text-sm">
                            Forgot pasword?
                        </span>
                    </div>
                    <div class="mt-6 flex justify-between items-center">
                        <button type="submit" class="button">
                            Sign in
                        </button>
                        <span class="text-[#92929D] text-sm">
                            Don't have an account?
                            <router-link to="/" class="text-[#041768] font-bold text-sm">Sign up Now</router-link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  </template>

<script setup lang="ts">
const auth = useAuthStore()
const password = ref("")
const email = ref("")
const rememberMe = ref(false)
const isPassword = ref(false)
const error = ref(false);

const login = async () => {
   let payload = {
        password: password.value,
        email: email.value
   }

   if(password.value !== "" || email.value !== ""){
        try{
            await auth.loginUser(payload);
        } catch {

        }
    } else {
        error.value =true
    }
    
}
</script>