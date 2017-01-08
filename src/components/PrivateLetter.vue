<template>
    <div>
        <article class='con-module' v-for="list in lists">
            <img class='post-user-pic' src='http://7xr3sq.com1.z0.glb.clouddn.com/photo.jpg' alt=''>
            <h3 class='post-user-name'>{{list.sendfrom}}</h3>
            <p class='post-user-mess'>{{list.content}}</p>
            <h5 class='post-user-time'>{{list.sendtime}}</h5>
            <button v-if="loginUser != '游客' && isModule " class='delete' href='#' @click.prevent="deleteSPL(list.id)"></button>
        </article>
    </div>
</template>
<style>
</style>
<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        data() {
            return {
                isModule: 0
            }
        },
        computed: {
            ...mapState(['totalRecords', 'curPage', 'lists', 'loginUser'])
        },
        created() {
            if (this.$route.name == 'privateletter') {
                this.getMyPrivateLetter()
                setTimeout(() => { this.isModule = 1 }, 100)
            } else if (this.$route.name == "sendprivateletter") {
                //alert(this.$route.params.othuser)
                this.getcp(1);
                this.getList({})
                this.getPrivateLetter(this.$route.params.othuser)
            }

        },
        methods: {
            ...mapActions(['getPrivateLetter', 'getcp', 'getMyPrivateLetter', 'getList', 'delSPL']),
            deleteSPL: function (id) {
                if (this.delSPL(id)) {
                    this.getMyPrivateLetter()
                }
            }
        },
        components: {
        }
    }
</script>