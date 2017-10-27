<template>
  <div class="homepage">
    <el-row>
      <el-col :offset="4" :span="6">
        <h1> Love Your Work </h1>
        <h3> It's time to start loving your work. </h3>

        <el-button type="primary" @click="doClockIn">
          Clock in
        </el-button>

      </el-col>
    </el-row>
  </div>
</template>

<script>

import requests from '../requests';

export default {
  data(){
    return {
      
    }
  },
  methods: {
    doClockIn(){
      const context = this;

      const userId = '12345'

      requests.clockin(this, userId, function(result) {
          console.log(result)        
        if(result.action === 'success') {
          console.log(result)
        } else {
          context.$message({
            'type': 'error',
            'message': result.msg
          })
        }
      });
    }
  }
}
</script>

<style>

</style>
