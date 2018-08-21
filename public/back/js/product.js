(function(){


    //点击添加商品按钮显示模态框
      $("#add_pr").click(function(){
          $("#product_modal").modal("show");
          //渲染二级分类
          $.ajax({
               type:"get",
               url:"/category/querySecondCategoryPaging",
               data:{
                   page:1,
                   pageSize:1000
               },
               dataType:"json",
               success:function(info){
                 var str = template("er_tpl",info);
                   $("#er_ul").html(str);
               }
          });
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
   
    //给二级分类的 ul绑定事件委托
    $("#er_ul").on("click","li",function(){
          //或去选择分了的id
        var id = $(this).data("id");
         //把获取的id存入隐藏域中
         $('#categoryId').val(id);
         //获取点击按钮的内容设置给按钮
         var text = $(this).children().html();
         $("#btn_text").html(text);   
          //因为触发不了所以需要我们手动提示
    // 需要将校验状态置成 VALID
    // 参数1: 字段
    // 参数2: 校验状态
    // 参数3: 配置规则, 来配置我们的提示文本
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });

    //上传多张图片会发送多次请求响应
    var picAdd = [];//用于存储上传图片的地址为后面的添加做准备
    $("#fileupload").fileupload({
        dataType:"json",
        //图片上传成功回调的函数
        done:function(e,data){           
             //实时渲染图片
           $("#file_img").prepend("<img src="+data.result.picAddr+" alt=''width='100'>");
                   
            //往数组前面添加
            //向数组的开头添加一个或更多元素，并返回新的长度。unshift()
            picAdd.unshift(data.result);
             //往标签前面追加内容
             //判断数组长度是否大于3
             if(picAdd.length > 3){
                picAdd.pop();//删除数组最后一项
                //删除后面图片
                $("#file_img img").eq(-1).remove();
             }   
             //判断上传图片是不是三张  
             if(picAdd.length === 3){
                  //自定义图片校验规则
          $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
             }                 
        }
    });
    //表单校验
    $("form").bootstrapValidator({
         // excluded: [],
         excluded:[],//重置指定的不校验的类型
          //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //指定校验的字段
        fields:{
             //指定的表单name属性的表单标签
            categoryId:{
            validators: {
                //不能为空
                notEmpty: {
                    message: '二级不能为空'
                    }
                }
              },
              proName:{
                       validators: {
                       //不能为空
                       notEmpty: {
                       message: '商品名称不能为空'
                       }
                  }
               },
               proDesc:{
                   validators: {
                   //不能为空
                           notEmpty: {
                           message: '商品描述不能为空'
                           }
               }
            },
                num:{
                    validators: {
                //不能为空
                notEmpty: {
                message: '商品库存不能为空'
                },
                 // 商品库存
                // 要求: 必须是非零开头的数字, 非零开头, 也就是只能以 1-9 开头
                // 数字: \d
                // + 表示一个或多个
                // * 表示零个或多个
                // ? 表示零个或1个
                // {n} 表示出现 n 次
                 //正则校验
              regexp: {
                regexp: /^[1-9]\d*$/,
                message: '商品库存格式, 必须是非零开头的数字'
                   },
                }
             },
             size:{
                   validators: {
                       //不能为空
                       notEmpty: {
              message: '商品尺码不能为空'
              },
              regexp: {
                  regexp: /^\d{2}-\d{2}$/,
                  message: '尺码格式30-40'
                },
                   },
              },
              price:{
                  validators: {
                      //不能为空
                      notEmpty: {
                      message: '商品原价不能为空'
                      }
                               }
                  }, 
                  oldPrice:{
                      validators: {
                          //不能为空
                          notEmpty: {
                          message: '商品现价不能为空'
                          }
                     }
                 },
                 brandLogo:{
                     validators: {
                         //不能为空
                         notEmpty: {
                         message: '请上传三张图片'
                         }
                     }
                  },
                   }
    });
    //变大验证成功后添加商品
    $("#form").on("success.form.bv",function(e){
        //阻止表单默认提交事件
        e.preventDefault();
        
       //serialize()获取设置了nama表单属性的值             
        var data = $("#form").serialize();
        //把图片地址追加到data中
      
    picAdd.forEach(function(v,i){
        i++;
        data += "&picName"+i+"=" + v.picName + "&picAddr"+i+"=" + v.picAddr;         
    });  
        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:data,
            success:function(info){
                //隐藏模态框
          $("#product_modal").modal("hide");
                  pag = 1;
                pange();//重新渲染页面  
                 // 重置校验状态和文本内容
          $('#form').data("bootstrapValidator").resetForm(true);  
          //手动删除
          //删除图片
          $("#file_img img").remove();
          //删除数组
          picAdd = [];
           //重置文字
         $('#categoryId').val(" ");
         $("#btn_text").html("请选择二级分类");   
                   
            }
        });
    });
})();