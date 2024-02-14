<template>
    <div class="w-full bg bg-white h-screen flex">        
        <img :src="currentStep  >= 2 ? '/img/face.png' : '/img/sign-up.png'" class="w-[600px]  " >
        
        <div class="py-16  h-full flex-1  ">
            <div class="w-[80%] mx-auto">
                <h1 class="text-3xl font-bold " v-if="currentStep === 1">Sign up to <br/> Madesoft Academy <br/>of Technology</h1>

                <div class="stepper w-[300px]">
                  <div v-for="(step, index) in steps" :key="index" :class="{ active: currentStep === index + 1 }">
                    <div class="flex justify-between items-center mt-4 relative">
                      <span class="line"></span>
                      <button @click="prevStep" 
                      class="btn flex justify-center items-center"
                      >
                      <span class="w-[20px] h-[20px] rounded-full bg-[#041768]"></span>
                    </button>
                      <button @click="nextStep " class="btn flex justify-center items-center"> 
                        <span v-if="currentStep >= 2" class="w-[20px] h-[20px] rounded-full bg-[#041768]"></span>
                      </button>
                      <button @click="nextStep" class="btn flex justify-center items-center">
                        <span v-if="currentStep >= 3"  class="w-[20px] h-[20px] rounded-full bg-[#041768]"></span>
                      </button>
                    </div>
                  </div>
                </div>

                <form class="mt-4 flex flex-col gap-y-2 w-full"  v-if="currentStep === 1">
                    <div class="flex gap-x-2">
                        <InputTextField type="text" class="flex-1" v-model="fullName" :required="true" label="Full Name" placeholder="Input your fullname" />
                        <InputTextField type="text" class="flex-1" v-model="username" :required="true" label="Username" placeholder="Input your username in here" />
                    </div>
                    <InputTextField type="email" v-model="email" label="Email" :required="true" placeholder="Input your email in here" />
                    <InputTextField :type="isPassword ? 'password' : 'text'" v-model="password" :password="true" @changeType="change" :required="true" label="Password" placeholder="Input your password in here" />
                    <span>
                        <input type="checkbox" v-model="agreed"> &nbsp;
                        <span class="text-[#92929D] text-sm">I have read and agree to the term of service</span>
                    </span>
                    <div class="mt-6 flex justify-between items-center">
                        <button type="submit" class="button" @click="nextStep">
                            Create account
                        </button>
                        <span class="text-[#92929D] text-sm">
                            Already have an account?
                            <router-link to="/sign-in" class="text-[#041768] font-bold text-sm">Sign in Now</router-link>
                        </span>
                    </div>                    
                </form>

                <form class="mt-4 flex flex-col gap-y-2 w-full" v-if="currentStep === 2" @submit.prevent>
                    <h1 class="text-3xl font-bold ">Welcome to Madesoft Academy</h1>
                    <span class="text-[#92929D] text-sm">We'd love to know more about you</span>

                    <div class="flex gap-x-2 items-end">
                      <div>
                        <img  v-if="imgURL" :src="imgURL" class="object-cover h-[100px] w-[100px] rounded-lg" alt="">
                        <div v-else class="w-[100px] h-[100px] rounded-lg bg-[#E2E2EA]"></div>
                      </div>
                      <div class="flex flex-col items-start gap-y-6">
                        <span class="block font-bold text-sm">select your personal profile picture</span>
                        <div class="">
                          <input type="file" id="profileImg" class="hidden" 
                            :multiple="false"                        
                            @change="handleFileChange"
                            accept=".jpeg, .jpg, .png, .svg"
                          >
                          <label for="profileImg" class="button">Browse</label>
                        </div>
                      </div>
                    </div>

                    <InputTextField type="text" v-model="about" label="About" placeholder="Tell us About yourself" />
                    <InputTextField type="text" v-model="specialties" label="Your Specialties" placeholder="What are your specialties" />

                    <button @click="register" type="submit" class=" mt-3 button self-start" >
                        Next
                    </button>
                </form>

                <div v-if="currentStep === 3" class="mt-6">
                  <h1 class="text-3xl font-bold ">Welcome to Madesoft Academy</h1>
                  <span class="text-[#92929D] text-sm">We'd love to know more about you</span>
              </div>
            </div>
        </div>
    </div>
  </template>

<script setup lang="ts">
// import HorizontalStepper from 'vue-stepper';
// import { Toast } from 'primevue/toast';
const auth = useAuthStore()
const fullName = ref("")
const username = ref("")
const password = ref("")
const email = ref("")
const agreed = ref(false)
const about = ref("")
const specialties = ref("")
const imgURL = ref<string | null>(null)
const isPassword = ref(true)

const change = () => {
  isPassword.value = !isPassword.value
  // return isPassword.value
  // console.log(isPassword.value)
}

const currentStep = ref(1);

const steps = [
  { title: 'Step 1', description: 'Description for Step 1' },
  { title: 'Step 2', description: 'Description for Step 2' },
  { title: 'Step 3', description: 'Description for Step 3' },
];

const nextStep = () => {
  if (currentStep.value < steps.length ){
    currentStep.value++;
  } 
  return currentStep.value
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
  return currentStep.value
};

const register =  async () => {
  let payload = {
    first_name: fullName.value,
    last_name: username.value,
    email: email.value,
    password: password.value,
  }
  await auth.registerUser(payload)
  nextStep()
}

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && validateFileType(file)) {
        imgURL.value  = window.URL.createObjectURL(file);
    } else {
        imgURL.value = null
    }
}

const validateFileType = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
    return allowedTypes.includes(file.type);
};

</script>

<style scoped>
/* Add any additional styling for your stepper here */
.stepper {
  /* max-width: 600px; */
  /* margin: auto; */
}

.stepper > div {
  display: none;
}

.stepper > div.active {
  display: block;
}

.btn {
  /* padding: 8px 16px; */
  border: 2px solid #041768;
  background: #fff;
  cursor: pointer;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  z-index: 10;
}

.line{
    width: 100%;
    height: 3px;
    background-color: #92929D;
    margin: 10px 0;
    position: absolute;
    /* transform: translateY(-50%); */
    top: 5px;
    z-index: 1;
}
</style>