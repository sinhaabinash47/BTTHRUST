<template>
    <Navbar />
    <v-card class="mx-auto mt-16" color="#26c6da" theme="dark" max-width="700">
        <v-btn to="/blog" class="btn btn-primary" align="end">Back</v-btn>
        <v-card-title>Blog Details</v-card-title>
        <v-card-text>
            <div v-if="post">
                <p><strong>Title:</strong> {{ post.id }}</p>
                <p><strong>Title:</strong> {{ post.title }}</p>
                <p><strong>Content:</strong> {{ post.content }}</p>
            </div>
        </v-card-text>
    </v-card>
</template>
  
<script>
import Navbar from "@/views/Navbar.vue";
import store from "@/store";
import router from "@/router";
export default {
    components: {
        Navbar,
    },
    props: ['id'],
    data() {
        return {
            post: null,
        };
    },
    created() {
        this.fetchBlogPost(this.id);

        if (Object.keys(store.state.formData).length > 0) {
            this._login_user = { ...store.state.formData };
        } else {
            router.push("/login");
        }
    },

    computed: {
        login_user() {
            return store.state.formData;
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
    },
    methods: {
        async fetchBlogPost(id) {
            try {
                const response = await fetch(`http://localhost:3001/getBlogs/${id}`);
                const postData = await response.json();
                this.post = postData.data;
                console.log(postData.data)
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
  