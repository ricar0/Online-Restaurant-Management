<template>
<body>
    <Guide></Guide>
    <div class="block">
        <div v-for="item in items1" class="maxblock" :key="item.did" @click="dialogVisible = true">
            <div class="in1">
                <div class="top" style="height:100%;">
                    <img style="background-size:cover;height:100%;width:100%;" src="../assets/111.jpg">
                </div>
                <div style="position: absolute;bottom:0%;height:26%;opacity:0.7;width:100%;background-color:white;">
                    <h1 style="font-size:20px;">{{item.name}}</h1>
                </div>
            </div>
        </div>
        <div v-for="item in items2" class="box" :key="item.did">
            <div class="in" @click="dialogVisible = true">
                <div class="top">
                    <img style="height:100%;width:100%;" src="../assets/111.jpg">
                </div>
                <div class="bottom">
                    <h1 style="padding-top:10%;font-size:20px;">{{item.name}}</h1>
                </div>
            </div>
            <el-dialog
                title="购买提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <img src="../assets/111.jpg" style="height: 50%; width: 50%; text-align:center;background-size:cover;">
                <br><br>
                <span>剩余库存:{{item.num}}份</span>
                <br><br>
                <span>购买数量(每人上限10份):<br><br></span>
                <el-input-number size=small v-model="buynum" :min="1" :max="10"></el-input-number>
                <br><br>
                <span>总金额:{{buynum*item.price}}元</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="buy(item)">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</body>
</template>

<style scoped>

.in1 {
    cursor: pointer;
    height: 90%;
    width: 90%;
    /* background-color: red; */
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
    position: absolute;
    box-shadow: 10px 10px 5px #888888;
}
.top {
    height: 70%;
    width: 100%;
    /* background-color: red; */
}
.bottom {
    height: 26%;
    width: 100%;
    background-color: white;
    opacity: 0.7;
}
.in {
    position: absolute;
    cursor: pointer;
    height: 90%;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* background-color: red; */
    box-shadow: 10px 10px 5px #888888;
}
.box {
    position: relative; 
    float: left;
    height: 50%;
    width: 25%;
    /* background-color: green; */
}
.maxblock {
    position: relative; 
    float: left;
    height: 50%;
    width: 50%;
    /* background-color: blue; */
}
.block {
    top: 15%;
    position: relative;
    height: 100%;
    width: 70%;
    margin: 0 auto;
    /* background-color: gray; */
}

</style>
<script>
import Guide from '../components/Guide.vue'
import Global from '../components/Global.vue'
import qs from "qs";
export default {
    data() {
        return {
            total:'',
            buynum: '1',
            items1:[],
            items2:[],
            dialogVisible: false,
        }
    },
    components: {
        Guide
    },
    mounted() {
        var url = Global.url + ":9000/dish/queryAllDish"
        this.$http.post (
            url,
            {
                
            }
        ).then(res=>{
            var _this = this;
            console.log(res.data)
            let items = [];
            items=res.data.data.dishes;
            _this.items1.push(items[0])
            var len = items.length;
            for (var i = 1; i < len; i++) {
                _this.items2.push(items[i])
            }
            console.log(_this.items2)
        })
        // localStorage.setItem('count', 1)
    },
    methods: {
        buy(item) {
            // console.log(item)
            if (localStorage.getItem('uid') === '') {
                this.$confirm('你还没登录，是否先登录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$router.push('/Login')
                })
            }

            var url = Global.url + ":9000/order/add"
            this.$http.post(
                url,
                qs.stringify({
                    userid: localStorage.getItem("uid"),
                })
            ).then(res=>{
                console.log(res.data)
            })
    

            clearTimeout(this.timer);
            this.timer = setTimeout(()=>{ 
                url = Global.url + ":9000/order/getbycid/" + localStorage.getItem("uid")
                this.$http.get(
                    url,
                ).then(res=>{
                    console.log(res.data)
                    var pos = res.data.data.length
                    pos --
                    var oid=res.data.data[pos].id
                    url = Global.url + ":9000/order-include/add"
                    let fd = new FormData();
                    fd.append("oid", oid)
                    fd.append("did", item.did)
                    // console.log(fd.did)
                    this.$http.post (
                        url,
                        fd
                    ).then(res=>{
                        console.log(res.data);
                    })
                    clearTimeout(this.timer);
                    this.timer = setTimeout(()=>{   //设置延迟执行
                        url = Global.url + ":9000/order-include/update"
                        let fd2 = new FormData();
                        console.log(oid)
                        console.log(item.did)
                        fd2.append("oid", oid)
                        fd2.append("did", item.did)
                        fd2.append("number", this.buynum)
                        // console.log(fd.did)
                        this.$http.post (
                            url,
                            fd2
                        ).then(res=>{
                            console.log(res.data);
                            this.$notify({
                                title: '提示',
                                message: '下单成功',
                                offset: 100,
                                type: "success"
                            })
                            // clearTimeout(this.timer);
                            // this.timer = setTimeout(()=>{   //设置延迟执行
                                location.reload();
                            // },500);
                        })
                    
                    },500);
                })
            },500);
            this.dialogVisible = false;
        },

        handleClose() {
            this.dialogVisible = false;
        }
        
    }
}
</script>
