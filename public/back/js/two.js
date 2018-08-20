(function(){

    //点击添加按钮显示模态框
    $("#btn_add").click(function(){
       $("#two_modal").modal("show");
     //    一级分类渲染
       $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
            page:1,
            pageSize:1000
        },
        dataType:"json",
        success:function(info){
            console.log(info);   
            var str = template("two_tbladd",info);  
            $(".dropdown-menu").html(str);              
        }
      });      
    });

    //页面动态渲染
    $.ajax({
        type:"get",
        url:"/category/querySecondCategoryPaging",
        data:{
            page:1,
            pageSize:5
        },
        dataType:"json",
        success:function(info ){
                 var str = template("two_tpl",info);  
                 $("#two_tb tbody").html(str);              
        }
    });
 

})();