<template>
    <v-card class="mx-auto mt-16" color="#566573" theme="dark" max-width="700">
        <v-card-title>Login Details</v-card-title>
        <v-card-text>
            <v-form ref="myForm" @submit.prevent="login">
                <v-text-field v-model="loginform.email" label="email" :rules="emailRules" required></v-text-field>
                <v-text-field v-model="loginform.password" label="password" :rules="passwordRules" required></v-text-field>
                <div class="d-flex mx-2 mt-4">
                    <v-btn type="submit" class="btn btn-primary me-2">Login</v-btn>
                    <router-link to="/registration" class="btn btn-primary me-2" align="end">Registration</router-link>
                </div>
                <v-snackbar v-model="showSnackbar" :color="snackbarColor">
                    {{ snackbarMessage }}
                </v-snackbar>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import store from '@/store';

export default {
    data() {
        return {
            dialog: false,
            emailRules: [
                value => !!value ? true : 'E-mail is required.',
                value => /.+@.+\..+/.test(value) ? true : 'E-mail must be valid.',
            ],
            passwordRules: [
                value => !!value || 'Password is required.',
                value => value && value.length >= 8 ? true : 'Password must be at least 8 characters.',
            ],
            loginform: {
                email: '',
                password: ''
            },
            showSnackbar: false,
            snackbarMessage: '',
            snackbarColor: '',
        };
    },
    methods: {
        login() {
            if (!this.loginform.email || !this.loginform.password) {
                this.showSnackbar = true;
                this.snackbarMessage = 'Please enter both email and password.';
                this.snackbarColor = 'error';
                return;
            }
            const loginData = JSON.parse(localStorage.getItem("formData")) || [];
            const loginUser = loginData.find(data => data.email === this.loginform.email && data.password === this.loginform.password);
            store.commit('updatestoreonlogin', loginUser)

            if (loginUser) {
                this.showSnackbar = true;
                this.snackbarMessage = 'Login successful!';
                this.snackbarColor = 'success';
                this.$router.push('/blog');
            } else {
                this.showSnackbar = true;
                this.snackbarMessage = 'Invalid login';
                this.snackbarColor = 'error';
            }
        },

    }
};
</script>
