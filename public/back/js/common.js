

//侧边栏
(function(){
      //ajax开始调用
      $(document).ajaxStart(function(){
        NProgress.start();
    });
    //ajax结束调用
    $(document).ajaxStop(function(){
    setTimeout(function(){
    NProgress.done();
    },100);

    });
   //登录拦截首先判断是不是登录页
   if(location.href.indexOf("login.html") === -1){
          
    //发送ajax请求获得响应数据判断用户是否是登录状态
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        typeData:"json" ,
        success:function(info){
             if(info.success){
                    //什么都不做
             }else if(info.error === 400){
                    location.href = "login.html";
             }
        }
    });

  }


   
    //点击切换分类显示隐藏
     $(".category").click(function(){    
      $(".nav .child").stop().slideToggle();
    });
    // //点击高亮
    //  $(".child_a").click(function(){ 
    //     $(".child_a").toggleClass("count"); 
    //  }); 
    //  $(".user").click(function(){ 
    //     $(".user").toggleClass("count"); 
    //  });
    //  $(".goods").click(function(){ 
    //     $(".goods").toggleClass("count"); 
    //  });
     //点击菜单栏显示隐藏
    $(".menu").click(function(){
      $(".header").toggleClass("count"); 
      $(".left_aslide").toggleClass("count");  
      $(".right").toggleClass("count");         
    });
    //点击显示模态框
    $(".icon_lout").click(function(){

      $("#modal").modal("show");  
    });
    //点击退出清空用户数据
    $("#loginOut").click(function(){
          //发送ajax请求
          $.ajax({
              type:"get",
              url:"/employee/employeeLogout",
               success:function(info){
                  if(info.success){
                    location.href = "login.html"
                  }
               }
          });
    });
})();