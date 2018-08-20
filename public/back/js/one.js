(function(){
    $("#add_fl").click(function(){
        $("#one_modal").modal("show");
    });
    //一级分类校验
     //使用表单校验插件  
  $("#form").bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 对字段进行校验
    fields: {
        categoryName: {
        // 校验的规则
        validators: {
          // 非空校验
          notEmpty: {
            // 为空时显示的提示信息
            message: "请输入一级分类"
          },
          // 长度要求 2-6 位
          stringLength: {
            min: 2,
            max: 6,
            message: "分类长度必须是 2-6 位"
          },
        }
     }
    }
  });
  //点击页面所有样式消失
  $("html").click(function(){       
    $("#form").data("bootstrapValidator").resetForm();
 });
 //页面渲染
   var one_page = 1;
   var one_pageSize = 5;
     pange();
   function pange(){
    $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
        page:one_page,
        pageSize:one_pageSize  
    },
      success:function(info){           
            var str = template("one_tpl",info); 
            $(".one_tab tbody").html(str); 
         //    分页
          $("#pagintor").bootstrapPaginator({
             bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
             currentPage:info.page,//当前页
             totalPages:Math.ceil(info.total/info.size),//总页数
             size:"small",//设置控件的大小，mini, small, normal,large
             onPageClicked:function(event, originalEvent, type,page){
               //为按钮绑定点击事件 page:当前点击的按钮值
                one_page = page;
                  pange();      //重新渲染页面      
              }
           });
      }
  });
}


  //添加分类
     $("#form").on("success.form.bv",function(e){  
    //发送ajax请求添加分类
    $.ajax({
        type:"post",
        url:"/category/addTopCategory",
        data:{
            //  serialize()
            categoryName:$("#one_text").val()
        },
        success:function(info){
              if(info.success){  
           $("#one_modal").modal("hide");
                  pange();      //重新渲染页面      
                            
              }      
        }
    });
  });

})();