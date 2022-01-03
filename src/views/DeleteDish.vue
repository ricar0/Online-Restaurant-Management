<template>
<body>
    <MGuide></MGuide>
    <div class="block">
        <div v-for="item in items" class="box" :key="item.id">
            <div class="in">
                <img src="../assets/111.jpg">
                <div class="details">
                    <p class="p1">{{item.name}}</p>
                    <p class="p2">￥{{item.price}}</p>
                    <p class="p3">(剩余库存{{item.num}}件)</p>
                    <el-button title="删除菜品" type="danger" icon="el-icon-delete" @click="del(item.did)" style="position: absolute; right: 0%; bottom:30%;" circle></el-button>
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
    right: 25%;
    top: 10%;
    position: absolute;
}
.p3 {
    font-size: 15px;
    right: 23%;
    top: 50%;
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
            items: []
        }
    },
    mounted() {
        var url = Global.url+":9000/dish/queryAllDish"
        this.$http.post (
            url,
            {

            }
        ).then(res=>{
            console.log(res.data)
            this.items=res.data.data.dishes
            console.log(this.items)
        })
    },
    methods: {
        del(id) {
            var url = Global.url + ":9000/dish/deleteDish/"+ id
            console.log(url)
            this.$http.get(
                url,
            ).then(res=>{
                console.log(res.data)
                this.$notify({
                    title: '提示',
                    message: '成功删除',
                    offset: 100,
                    type: "success"
                })
                clearTimeout(this.timer);
                this.timer = setTimeout(()=>{   //设置延迟执行
                    location.reload();
                },500);
            }).catch(err=>{
                console.log(url)
                console.log(err)
            })
        }
    } 
}
</script>