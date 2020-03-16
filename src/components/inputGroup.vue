<template>
    <div class="text_group">
        <div class="input" :class="{'is-invalid': error}">
            <input 
                :type="type"
                :placeholder="placeholder"
                :value="value"
                :name="name"
                @input="$emit('input',$event.target.value)"
            >
            <!-- 输入框后面的内容 -->
            <el-button class="btn" type="text" v-if="btnTitle" @click="$emit('btnClick')" :disabled="disabled">{{btnTitle}}</el-button>
        </div>
        <!-- 验证提示 -->
        <div v-if="error" class="invalid-feedback" >{{error}}</div>
    </div>
</template>
<script>
    export default {
        name:"inputGroup",
        props:{
            type: {
                type: String,
                default: "text"
            },
            placeholder:String,
            value:String,
            name:String,
            disabled:Boolean,
            btnTitle:String,  //input框中的文字
            error:String  //验证不正确提示
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    // .input {
    // height: 50px;
    // display: flex;
    // align-items: center;
    input {
      font-size: 16px;
      padding-top: 13px;
    }
    .btn {
        font-size: 16px;
        float: right;
        padding: 13px 10px;
    }
    .invalid-feedback{
        color:red;
        font-size: 8px;
    }
//   }
</style>