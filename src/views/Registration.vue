<template>
  <v-card class="mx-auto mt-16" color="#566573" theme="dark" max-width="700">
      <v-card-title>Registration Form</v-card-title>
      <v-card-text>
        <v-form ref="myForm" @submit.prevent="submitForm">
              <v-text-field v-model="formVals.name" label="Name" :rules="nameRules" required></v-text-field>
              <v-text-field v-model="formVals.email" label="E-mail" :rules="emailRules" required></v-text-field>
              <v-text-field v-model="formVals.password" label="Password" :rules="passwordRules" required></v-text-field>
              <div class="d-flex mx-2 mt-4">
                <v-btn type="submit" class="btn btn-primary me-2">Registration</v-btn>
                <router-link to="/login" class="btn btn-primary me-2" align="end">Login</router-link>
              </div>
              <v-snackbar v-model="showSnackbar" :color="snackbarColor">
                {{ snackbarMessage }}
              </v-snackbar>
            </v-form>
      </v-card-text>
  </v-card>
</template>

<script>
import store from "@/store";

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      showSnackbar: false,
      snackbarMessage: '',
      nameRules: [
        value => !!value || 'Name is required.',
      ],
      emailRules: [
        value => !!value ? true : 'E-mail is required.',
        value => /.+@.+\..+/.test(value) ? true : 'E-mail must be valid.',
      ],
      passwordRules: [
        value => !!value || 'Password is required.',
        value => value && value.length >= 8 ? true : 'Password must be at least 8 characters.',
      ],
      getData: "abinash",
      formData: JSON.parse(localStorage.getItem("formData")) || [],
      formVals: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.myForm.validate()) {
        const { name, email, password } = this.formVals;
        if (name && email && password) {
          store.commit("updateData", this.formVals);
          this.resetForm();
          this.showSnackbar = true;
          this.snackbarMessage = 'Registration successful!';
          this.snackbarColor = 'success';
          this.$router.push('login');
        } else {
          this.showSnackbar = true;
          this.snackbarMessage = 'Please fill out all form fields.';
          this.snackbarColor = 'error';
        }
      }
    },
    resetForm() {
      this.formVals = {
        name: "",
        phone: "",
        email: "",
        password: "",
      }
    }
  },
  computed: {
    storedData() {
      return store.state.formData;
    },
  },
  watch: {
    storedData(newVal) {
      this.formData = newVal;
    },
  },
};
</script>
<style>
input[type="text"] {
  padding: 6px 24px 14px 104px;
  border-radius: 7px;
}
</style>