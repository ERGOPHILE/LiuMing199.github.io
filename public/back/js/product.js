(function(){


    //点击添加商品按钮显示模态框
      $("#add_pr").click(function(){
          $("#product_modal").modal("show");
      });
    //   //下架上架
    //   var id ;//获取用户需要修改的id
    //   var start //存入用户要修改的状态
    //   $("#product_tab tbody").on("click",".btn",function(){
    //       $("#product_modal").modal("hide");
    //      id  = $(this).parent().data("id");
    //     start = $(this).hasClass("btn-danger")?0:1;          
    //   });
    //   //点击确认下架上架
    //   $("#product_y").click(function(){

    //     $.ajax({

    //     });
    //   });
      //渲染页面 
      //页数
     var pag = 1;
    //  显示的条数
     var pagesize = 2;

     pange();

    function pange(){    

        $.ajax({
            type:"get",
            url:"/product/queryProductDetailList",
            data:{
                page:pag,
                pageSize:pagesize
            },
            dataType:"json",
            success:function(info){             
              var str = template("produt_tpl",info);
               $("#product_tab tbody").html(str);
               //分页按钮
               $("#pagintor").bootstrapPaginator({
                bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                currentPage:info.page,//当前页
                totalPages:Math.ceil(info.total/info.size),//总页数Math.ceil()向上取整
                size:"small",//设置控件的大小，mini, small, normal,large
                onPageClicked:function(event, originalEvent, type,page){
                  //为按钮绑定点击事件 page:当前点击的按钮值
                   pag = page;
                  //重新渲染页面
                   pange();
                },
                 //修改分页样式
                 itemTexts:function(type, page, current){
                    switch (type) {
                        case "first":   
                            return "首页";
                        case "last":   
                        return "尾页";
                        case "page":   
                        return page;
                        case "next":   
                        return "下页";
                        case "prev":   
                        return "上一页";
                        default:
                            break;
                    }
                 },
                 //修改title样式
                 tooltipTitles:function(type, page, current){
                    switch (type) {
                        case "frist":   
                            return "首页";
                        case "last":   
                        return "首页";
                        case "page":   
                        return "前往第" + page + "页";
                        case "next":   
                        return "下页";
                        case "prev":   
                        return "上一页";
                        default:
                            break;
                    }
                  },
                   // 使用 bootstrap 样式的提示框组件
                 useBootstrapTooltip: true
              });     
            }
        })
    }
   

})();