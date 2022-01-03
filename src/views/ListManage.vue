<template>
<body>
    <MGuide></MGuide>
    <div class="block">
        <div v-for="(item,index) in items" class="box" :key="index">
            <class="in">
                <img src="../assets/111.jpg">
                <div class="details">
                    <p class="p1">{{item.name}}</p>
                    <p class="p2">￥{{item.price}}</p>
                    <p class="p3">(共{{item.num}}件)</p>
                    <p class="p4">下单时间:{{item.time}}</p>
                    <p class="p5">客户号:{{item.cid}}</p>
                    <el-button v-if="item.state === 0"  @click="check(item)" class="bt1" style="position: absolute; right: 0%; bottom:30%; width:100px; color:blue;">确认送达</el-button>
                    <el-button v-if="item.state === 1"  disabled style="position: absolute; right: 0%; bottom:30%;" type="success" icon="el-icon-check" circle>已送达</el-button>
                </div>
            </div> 
        </div>
        
    </div>
</body>
</template>
<style scoped>
.p1 {
    font-size: 30px;
    left: 25%;
    top: 10%;
    position: absolute;
}
.p2 {
    font-size: 30px;
    right: 17%;
    top: 10%;
    position: absolute;
}
.p3 {
    font-size: 15px;
    right: 17%;
    top: 50%;
    position: absolute;
}
.p4 {
    font-size: 15px;
    right: 17%;
    top: 70%;
    position: absolute;
}
.p5 {
    font-size: 15px;
    left: 25%;
    top: 70%;
    position: absolute;
}
.details {
    float: left;
    height: 100%;
    width: 80%;
    /* background-color: palegoldenrod; */
}
img {
    float: left;
    height: 100%;
    width: 20%;
}
.in {
    height: 90%;
    width: 90%;
    /* background-color: white; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
}
.box {
    position: relative;
    height: 200px;
    width: 100%;
    /* background-color: white;  */
    border-bottom-style: solid;
}
.block {
    position: relative;
    top: 15%;
    height: 100%;
    width: 70%;
    /* background-color: red; */
    margin: 0 auto;
    /* background-color: grey; */
}
</style>
<script>
import MGuide from '../components/MGuide.vue'
import Global from '../components/Global.vue'
export default {
    components: {
        MGuide
    },
    
    data() {
        return {
            items:[],
        }
    },
    mounted() {
        let order=[]
        var url = Global.url+":9000/order/getall"
        this.$http.get(
            url,
        ).then(res1=>{
            console.log(res1.data.data)
            order=res1.data.data;
            for (var i = 0; i < order.length; i++) {
                this.items.push({
                    time: '',
                    name: '',
                    price: '',
                    num: '',
                    state: '',
                    cid:'',
                    oid:''
                })
            }
            for (var l = 0; l < order.length; l++) {
                var j = l;
                var url = Global.url+':9000/order-include/getbyid/'+order[l].id;//查询菜品did
                this.items[l].time=order[l].submitTime
                this.items[l].state=order[l].state
                this.items[l].cid=order[l].cid
                this.items[l].oid=order[l].id
                this.$http.get(
                    url,
                ).then(res2=>{
                    console.log(res2.data)
                    this.items[j].num=res2.data.data[0].number
                    url = Global.url + ':9000/dish/queryDishByDid/' + res2.data.data[0].did
                    this.$http.get(
                        url,
                    ).then(res3=>{
                        this.items[j].name=res3.data.data.dish.name
                        this.items[j].price=res3.data.data.dish.price*this.items[j].num
                    })
                })
            }
        })

    },
    methods: {
        check(item) {
            var url = Global.url + ':9000/order/surearrive/' + item.oid

            this.$http.get(
                url
            ).then(res=>{
                console.log(res.data)
                if (res.data.code === 2000) {
                    this.$notify({
                        title: '提示',
                        message: '已确认送达',
                        offset: 100,
                        type: "success"
                    })
                    clearTimeout(this.timer);
                    this.timer = setTimeout(()=>{   //设置延迟执行
                        location.reload();
                    },500);
                }
            })
        }
    }
}
</script>