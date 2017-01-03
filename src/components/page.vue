<template>
    <div class="page" v-if="totalRecords>1">
        <a href='#' @click.prevent="getcp(1)">首页</a>
        <a v-for="n in totalRecords"
           @click.prevent="getcp(n)"
           :id="[n == curPage?'page_active':'']"
           href="#"
        >
            {{n}}
        </a>
        <a href="#" @click.prevent="getcp(totalRecords)">尾页</a>
    </div>
</template>
<style>
</style>
<script>
import {mapState,mapActions} from 'vuex'
export default{
  data() {
    return{
      }
  },
  computed: {
    ...mapState(['totalRecords','curPage'])
  },
  methods: {
    ...mapActions(['getcp','getpl'])
  },
  components: {
  },
  watch: {
    curPage: 'getpl'
  }
}
</script>
