<template>
<body>
    <Guide></Guide>
    <div class="block">
        <div v-for="item in items" class="box" :key="item.did">
            <div class="in">
                <img src="../assets/111.jpg">
                <div class="details">
                    <p class="p1">{{item.name}}</p>
                    <p class="p2">￥{{item.price}}</p>
                    <p class="p3">(共{{item.num}}件)</p>
                    <p class="p4">下单时间:{{item.time}}</p>                 
                    <el-button style="position: absolute; right:0%;top:50%;" v-if="item.state===1" type="success" icon="el-icon-check" circle>已送达</el-button>
                    <el-button style="position: absolute; right:0%;top:50%;" v-if="item.state===0" type="warning" icon="el-icon-watch" circle>未送达</el-button>
                </div>
            </div> 
        </div>
    </div>
</body>
</template>

<style scoped>
.p1 {
    font-size: 30px;
    left: 10%;
    top: 10%;
    position: absolute;
}
.p2 {
    font-size: 30px;
    right: 25%;
    top: 10%;
    position: absolute;
}
.p3 {
    font-size: 15px;
    right: 25%;
    top: 50%;
    position: absolute;
}
.p4 {
    font-size: 15px;
    right: 25%;
    top: 70%;
    position: absolute;
}
.details {
    position: relative;
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
import Guide from '../components/Guide.vue'
import Global from '../components/Global.vue'

export default {
    data() {
        return {
            items: [],
        }
    },
    components: {
        Guide,
    },
    mounted() {
        let order=[]
        var url = Global.url+':9000/order/getbycid/'+localStorage.getItem('uid');//查询所订单oid
        this.$http.get(
            url,
        ).then(res1=>{
            // console.log(res1.data.data)
            order=res1.data.data;
            for (var i = 0; i < order.length; i++) {
                this.items.push({
                    time: '',
                    name: '',
                    price: '',
                    num: '',
                    state: ''
                })
            }
            for (var l = 0; l < order.length; l++) {
                var j = l;
                var url = Global.url+':9000/order-include/getbyid/'+order[l].id;//查询菜品did
                this.items[l].time=order[l].submitTime
                this.items[l].state=order[l].state
                this.$http.get(
                    url,
                ).then(res2=>{
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
        
    }
}
</script>