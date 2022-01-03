<template>
  <div class="nav">
    <div class="nav_inner">
      <div class="block">
        <div class="item1">
          <div class="in" @click="kk1">
            <i class="el-icon-eleme" style="font-size: 40px;"></i>
            <br>
            俺来也
          </div>
        </div>
        <div class="item2">
          <div class="in" @click="kk2">
            <i class="el-icon-dish" style="font-size: 40px;"></i>
            <br>
            用户下单
          </div>
        </div>
        <div class="item3">
          <div class="in" @click="kk3">
            <i class="el-icon-time" style="font-size: 40px;"></i>
            <br>
            历史订单
          </div>
        </div>
        <div class="item4">
          <div class="in" @click="kk4">
            <i class="el-icon-info" style="font-size: 40px;"></i>
            <br>
            用户信息
          </div>
        </div>
        <div v-if="key === 0" class="item5">
          <div class="in" @click="kk5">
            <i class="el-icon-user-solid" style="font-size: 40px;"></i>
            <br>
            用户登录
          </div>
        </div>
        <div v-if="key === 1" class="item5">
          <div class="in" @click="kk5">
            <i class="el-icon-switch-button" style="font-size: 40px;"></i>
            <br>
            退出登录
          </div>
        </div>
      </div>  

    </div>
  </div>
</template>

<style scoped>
  .in {
    cursor: pointer;
    position: absolute;
    width: 60%;
    height: 70%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .item1 {
    position: relative;
    float: left;
    height: 100%;
    width: 20%;
    /* background-color: grey; */
  }
  .item2 {
    position: relative;
    float: left;
    height: 100%;
    width: 20%;
    /* background-color: white; */
  }
  .item3 {
    position: relative;
    float: left;
    height: 100%;
    width: 20%;
    /* background-color: purple; */
  }
  .item4 {
    position: relative;
    float: left;
    height: 100%;
    width: 20%;
    /* background-color: burlywood; */
  }
  .item5 {
    position: relative;
    float: left;
    height: 100%;
    width: 20%;
    /* background-color: royalblue; */
  }
  .block {
    margin: 0;
    position: relative;
    width: 100%;
    height: 100%;
    /* background-color: green; */
  }
  
  .nav_inner {
    position: absolute;
    height: 80%;
    width: 85%;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
    /* background: yellow; */
  }
  .nav {
    top: 0;
    position: fixed;
    height: 15%;
    width: 100%;
    background-color: white;
    /* opacity: 0.8; */
    border-bottom-style: solid;
    z-index: 5000;
  }
</style>

<script>
export default {
  data() {
    return {
      key:0
    }
  },
  mounted() {
    if (localStorage.getItem('uid')) this.key = 1;
  },
  methods: {
    kk1() {
      this.$router.push('/')
      window.scrollTo(0,0);
    },
    kk2() {
      this.$router.push('/')
    },
    kk3() {
      this.$router.push('/HistoryList');
    },
    kk4() {
      this.$notify({
          title: '提示',
          message: '暂未开放',
          offset: 100
        });
    },
    kk5() {
      if (this.key === 1) {
        this.key = 0;
        this.$notify({
            title: '提示',
            message: '退出登录成功',
            offset: 100,
            type: "success"
        })
        localStorage.removeItem('uid')
      } else {
        this.$router.push('Login')
      }
    }
  } 
}
</script>