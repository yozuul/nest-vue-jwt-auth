<template>
   <form class="loginForm" @submit.prevent>
      <div class="itemForm row">
         <div class="itemForm__label">
            <label html-for="login_email" class="itemForm__label required" title="Email">Email:</label>
         </div>
         <div class="itemForm__input">
            <input v-model="email" type="text" id="login_email" class="input">
         </div>
      </div>
      <div class="itemForm row">
         <div class="itemForm__label">
            <label html-for="login_password" class="itemForm__label required" title="Пароль">Пароль:</label>
         </div>
         <div class="itemForm__input">
            <input v-model="password" type="password" id="login_password" class="input">
         </div>
      </div>
      <div class="itemForm row jcs">
         <div class="itemForm__button">
            <button @click="login" class="btn btn-primary">Авторизация</button>
         </div>
         <div class="itemForm__button">
            <button @click="register" class="btn btn-primary">Регистрация</button>
         </div>
      </div>
      <div class="alert">{{ alert }}</div>
   </form>
</template>
<script>
import axios from 'axios'
export default {
   methods: {
      async login() {
         this.alert = ''
         try {
            const response = await axios.post(`${this.baseURL}auth/login`, {
               email: this.email, password: this.password
            })
            console.log(response)
            if(response.status === 201) {
               await this.$router.push('dashboard')
            }
         } catch (error) {
            console.error(error);
            console.log('Ошибка авторизации')
            this.alert = 'Неправильный email или пароль'
         }
      },
      async register() {
         this.alert = ''
         try {
            const response = await axios.post(`${this.baseURL}auth/registration`, {
               email: this.email, password: this.password
            });
            if(response.status === 201) {
               await this.$router.push('dashboard')
            }
         } catch (error) {
            console.error(error);
            console.log('Ошибка регистрации')
            this.alert = `Пользователь с таким email \nуже зарегистрирован`
         }
      },
   },
   data() {
      return {
         email: '',
         password: '',
         alert: '',
         baseURL: 'http://localhost:5000/'
      }
   }
}
</script>

<style>
.loginForm {
   display: flex;
   justify-content: flex-end;
   flex-flow: column;
}
.alert {
   color: #ff4d4f;
   text-align: right;
   height: 15px;
}
.itemForm.jcs {
   margin-bottom: 15px;
}
.jcs .itemForm__button {
   margin-left: 15px;
}
body {
   font-size: 14px;
}
.btn {
   border: none;
   background: none;
   height: 32px;
   padding: 4px 15px;
   border-radius: 2px;
   line-height: 1.7;
   transition: all .3s;
}
.btn-primary {
   color: #fff;
   background: #1890ff;
   border-color: #1890ff;
   text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
   box-shadow: 0 2px #0000000b;
}
.btn-primary:hover {
   background: #40a9ff;
   border-color: #40a9ff;
   cursor: pointer;
}
.itemForm__label {
   width: 60px;
   justify-content: flex-end;
   display: flex;
   align-items: center;
}
.row {
   display: flex;
   justify-content: flex-end;
}
.itemForm {
   margin: 0 0 20px 0;
}
.itemForm__label {
   margin-right: 5px;
}
input {
   outline: none;
   border: none;
}
.itemForm__input input {
   width: 100%;
   padding: 4px 11px;
   color: #000000d9;
   line-height: 1.5715;
   border: 1px solid #d9d9d9;
   border-radius: 2px;
   transition: all .3s;
}
.itemForm__input input:hover {
   border-color: #40a9ff;
}
.itemForm__input input:focus {
   border-color: #40a9ff;
   box-shadow: 0 0 0 2px #1890ff33;
}
</style>
