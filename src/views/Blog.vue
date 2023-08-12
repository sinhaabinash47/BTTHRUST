<template>
    <Navbar />
    <div class="row mx-4 mt-4">
        <div class="col-sm-4 mt-2">
            <div class="card">
                <div class="card-body">
                    <v-sheet width="400" class="mx-auto">
                        <v-form ref="myForm" @submit.prevent="submitForm">
                            <v-text-field v-model="titleName" label="Title" :rules="titleRules"></v-text-field>
                            <v-textarea counter label="Content" :rules="contentRules" v-model="contentName"></v-textarea>
                            <v-file-input v-model="selectedImage" @change="handleImageChange"
                                label="Upload Image"></v-file-input>
                            <v-avatar v-if="imagePreview" size="150">
                                <img :src="imagePreview" alt="Image Preview" />
                            </v-avatar>
                            <v-btn type="submit" block class="mt-2">Blog Submit</v-btn>
                        </v-form>
                        <v-snackbar v-model="showSnackbar" :color="snackbarColor">
                            {{ snackbarMessage }}
                        </v-snackbar>
                    </v-sheet>
                </div>
            </div>
        </div>
        <div class="col-sm-8">
            <div class="card">
                <div class="card-body">
                    <v-card class="mx-auto" max-width="900">
                        <v-text-field v-model="searchTitle" label="Search by" @input="applyFilter" />
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="text-left" @click="sortBy = 'id'">
                                        Sr. No
                                        <v-icon v-if="sortBy === 'id'"
                                            :class="sortDesc ? 'rotate180' : ''">mdi-chevron-up</v-icon>
                                    </th>
                                    <th class="text-left" @click="sortBy = 'title'">
                                        Name
                                        <v-icon v-if="sortBy === 'title'"
                                            :class="sortDesc ? 'rotate180' : ''">mdi-chevron-up</v-icon>
                                    </th>
                                    <th class="text-left" @click="sortBy = 'content'">
                                        Content
                                        <v-icon v-if="sortBy === 'content'"
                                            :class="sortDesc ? 'rotate180' : ''">mdi-chevron-up</v-icon>
                                    </th>
                                    <th class="text-left">Image</th>
                                    <th class="text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in displayedItems" :key="index">
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.title }}</td>
                                    <td>{{ item.content }}</td>
                                    <td>
                                        <img :src="item.image" />
                                    </td>
                                    <td>
                                        <router-link :to="'/showdata/' + item.id" type="submit" class="btn btn-primary">Blog
                                            Show</router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                        <div class="text-center">
                            <v-pagination v-model="page" :length="totalPages" :total-visible="3"
                                rounded="circle"></v-pagination>
                        </div>
                    </v-card>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import router from "@/router";
import store from "@/store";
import Navbar from "@/views/Navbar.vue";

export default {
    components: {
        Navbar,
    },
    data() {
        return {
            sortBy: 'title',
            sortDesc: false,
            searchTitle: "",
            searchContent: "",
            dialog: false,
            page: 1,
            itemsPerPage: 3,
            titleName: "",
            contentName: "",
            selectedImage: null,
            imagePreview: null,
            items: [],
            showSnackbar: false,
            snackbarMessage: "",
            titleRules: [(value) => !!value || "Title is required."],
            contentRules: [(value) => !!value || "Content is required."],
            _login_user: {
                name: "",
                email: "",
            },
        };
    },
    created() {
        const id = this.$route.params.id;
        this.getBlogsData(id);
        if (Object.keys(store.state.formData).length > 0) {
            this._login_user = { ...store.state.formData };
        } else {
            router.push("/login");
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.items.length / this.itemsPerPage);
        },
        displayedItems() {
            const startIndex = (this.page - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;

            const sortedItems = this.items
                .filter(item => {
                    const titleMatches = item.title.toLowerCase().includes(this.searchTitle.toLowerCase());
                    const contentMatches = item.content.toLowerCase().includes(this.searchContent.toLowerCase());
                    return titleMatches && contentMatches;
                })
                .sort((a, b) => {
                    const modifier = this.sortDesc ? -1 : 1;
                    if (a[this.sortBy] < b[this.sortBy]) return -1 * modifier;
                    if (a[this.sortBy] > b[this.sortBy]) return 1 * modifier;
                    return 0;
                });

            return sortedItems.slice(startIndex, endIndex);
        },
        login_user() {
            return store.state.formData;
        },
    },
    methods: {
        handleImageChange() {
            if (this.selectedImage instanceof Blob) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result;
                };
                reader.readAsDataURL(this.selectedImage);
            } else {
                this.imagePreview = null;
            }
        },
        applyFilter() {
            this.page = 1;
        },
        logout() {
            store.commit("logout");
        },
        async submitForm() {
            if (this.$refs.myForm.validate()) {
                const formdata = new FormData();
                formdata.append("title", this.titleName);
                formdata.append("content", this.contentName);
                console.log("selectedImage => ", this.selectedImage);
                formdata.append("photo", this.selectedImage[0]);
                const requestOptions = {
                    method: "POST",
                    body: formdata,
                };
                try {
                    const response = await fetch(
                        "http://localhost:3001/blogs",
                        requestOptions
                    );
                    if (response.ok) {
                        this.showSnackbar = true;
                        this.snackbarMessage = "Blog successfully post";
                        this.snackbarColor = "success";
                        this.resetForm();
                    } else {
                        this.showSnackbar = true;
                        this.snackbarMessage = "Please fill out all form fields.";
                        this.snackbarColor = "error";
                    }
                    this.getBlogsData();
                } catch (error) {
                    console.error("An error occurred:", error);
                }
            } else {
                console.error("Form validation failed");
            }
        },
        resetForm() {
            this.titleName = "";
            this.contentName = "";
            this.selectedImage = null;
            this.imagePreview = null;
        },

        async getBlogsData(id) {
            try {
                const response = await fetch(`http://localhost:3001/getBlogs`);
                const items = await response.json();
                this.items = items.data;
            } catch (error) {
                console.error(error);
            }
        },
    },
    watch: {
        login_user(val) {
            if (Object.keys(val).length > 0) {
                this._login_user = { ...store.state.formData };
            } else {
                router.push("/login");
            }
        },
        page(vv) {
            console.log('page => ', vv);
        }
    },
};
</script>

<style>
.rotate180 {
    transform: rotate(180deg);
}
</style>