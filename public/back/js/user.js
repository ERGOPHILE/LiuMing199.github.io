
(function(){
      
          var user_pange = 1;//页数
          var user_pagesize = 5;//每页显示的条数
         pange();
    function pange(){
            //发送ajax请求页面渲染
         $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:user_pange,
                pageSize:user_pagesize
            },
            dataType:"json",
            success:function(info){;                    
                  var str =  template("user_tpl",info);                    
                  $("#user_tab tbody").html(str);
           
           //分页
           $("#pagintor").bootstrapPaginator({
               bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
               currentPage:info.page ,//当前页
               totalPages:Math.ceil(info.total/info.size),//总页数
               size:"small",//设置控件的大小，mini, small, normal,large
               onPageClicked:function(event, originalEvent, type,page){
                 //为按钮绑定点击事件 page:当前点击的按钮值
                 user_pange = page;
                  pange();       //重新渲染页面      
                }
             });
             
            }

         });
    }
       
       
    //点击按钮切换禁用启用
    //注册事件委托
    var id ;//获取用户选择修改的id
    var isDelete ;
    $("#user_tab tbody").on("click",".btn",function(){
        $("#user_modal").modal("show");   
         id = $(this).parent().data("id");  
         isDelete =  $(this).hasClass("btn-danger") ? 0 : 1; 
                
    });
   //当点击确认的时候修改数据库中对应id的状态
    $("#user_y").click(function(){
        //发送ajax请求调用接口修改用户状态
         $.ajax({
              type:"post",
              url:"/user/updateUser",
              data:{
                  id:id,
                  isDelete: isDelete  
              },
              dataType:"json",
              success:function(info){
                   if(info.success){
                       $("#user_modal").modal("hide");  
                        pange();                                           
                   }
              }
         });
    });
})();