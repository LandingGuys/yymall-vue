<template>
  <div class="footer">
    <div class="tag">
    <p>
        友情链接
        <a href="http://www.wast.club" target="_blank" style="margin-left: 10px">天空之城社区平台</a>
        <a href="http://admall.wast.club/" target="_blank" style="margin-left: 10px">智慧药房后台管理系统</a>
        <a href="https://m.kuaidi100.com/" target="_blank" style="margin-left: 10px">快递查询</a>
    </p>
    </div>
    <div class="cop">
      <!-- <p>Copyright © 2019-2020  wast.club 版权所有</p> -->
      <p>Copyright © 2019 · 智慧药房商城 · 服务器赞助: <a href="https://www.aliyun.com/?utm_content=se_1000301881" target="_blank">阿里云</a> ·
        <a href="http://www.beian.miit.gov.cn" target="_blank">豫ICP备19035962号</a> </p>
    </div>

  </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  .footer {
    padding: 50px 0 20px;
    background: #fff;
    margin-top: 20px;
  }

  .tag {
    display: flex;
    justify-content: center;
    a {
      height: 14px;
      padding: 0 10px;
      line-height: 14px;
    }
    a + a {
      border-left: 1px solid #666;
    }
  }

  .cop {
    text-align: center;
    margin: 10px 0;
  }
</style>
