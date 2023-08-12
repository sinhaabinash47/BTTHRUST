<template>
    <nav class="navbar navbar-light" style="background-color: #4863A0;">
        <div class="container-fluid">
            <a class="navbar-brand text-white bold">{{ login_user.name }}</a>

            <div class="d-flex mx-4">
                <v-row justify="center" class="">
                    <p @click="dialog = true">
                        <img width="30" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                    </p>
                    <v-dialog v-model="dialog" width="auto">
                        <v-card style="width: 200px;" class="p-2">
                            <p class="dropdown-item" href="#">Name: {{ login_user.name }}</p>
                            <a class="dropdown-item" href="#">Email: {{ login_user.email }}</a>
                            <v-card-actions>
                                <v-btn @click="logout" class="text-dark">Logout</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </div>
        </div>
    </nav>
</template>

<script>
import store from '@/store';

export default {
    data() {
        return {
            dialog: false,
            login_user: {
                name: "",
                email: ""
            }
        };
    },
    methods: {
        logout() {
            store.commit("logout");
        },
    },
    created() {
        this.login_user = store.state.formData
    },
    computed: {
        _login_user() {
            return store.state.formData
        }
    },
    watch: {
        _login_user: {
            handler: function (val) {
                this.login_user = val
            },
            deep: true
        }
    }
};
</script>