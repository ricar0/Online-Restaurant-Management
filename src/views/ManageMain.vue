<template>
<body>
    <MGuide></MGuide>
    <div class="block"> 
        <div class="top">
            <p style="font-size:20px; left: 40%; top:5%;position:absolute;">添加菜品参考图</p>
            
        </div>
        <div class="bottom">
            <p>输入菜品名称:</p>
            <el-input placeholder="在这里输入菜品名称" style="width:30%;" v-model="name"></el-input>
            <br>
            <p>设置单价:</p>
            <el-input-number v-model="price" :min="1" :max="10000" label="在这里输入单价"></el-input-number>
            <br>
            <p>添加库存:</p>
            <el-input-number v-model="num" :min="1" :max="10000" label="在这里输入库存"></el-input-number>
            <br><br>
            <el-button @click="add">确认添加</el-button>
        </div>
    
    </div>
</body>
</template>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed black;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.top {
    position: relative;
    height: 40%;
    width: 100%;
    /* background-color: blue; */
}
.bottom {
    position: relative;
    height: 60%;
    width: 100%;
    /* background-color: grey; */
}
.block {
    top: 15%;
    position: relative;
    height: 80%;
    width: 50%;
    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
    margin: 0 auto;
    box-shadow: 10px 10px 5px #888888;
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
            name:'',
            num:'',
            price:'',
        }
    },
    methods: {
        add() {
            var url=Global.url+":9000/dish/insertDish"
            console.log(url)
            this.$http.post (
                url,
                {
                    name: this.name,
                    price: this.price,
                    num: this.num,
                    pic: "12123",
                }
            ).then(res=>{
                console.log(res.data)
                if (res.data.code === 200) {
                    this.$notify ({
                        offset: 100,
                        title: '成功',
                        message: '添加菜品成功!',
                        type: 'success'
                    })
                    this.name='';
                    this.price=1;
                    this.num=1;
                }
            })
        }
    } 
}
</script>