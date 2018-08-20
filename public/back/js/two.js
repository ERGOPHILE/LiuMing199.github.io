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
    
    // 给一级分类绑定事件委托
    $(".dropdown-menu").on("click","li",function(){
        var text = $(this).children().html(); 
         //存入一级分类id
        var id = $(this).attr("categoryid");
       $(".dropdown .text").html(text);
        $("#one_fl").val(id);
    //因为触发不了所以需要我们手动提示
    // 需要将校验状态置成 VALID
    // 参数1: 字段
    // 参数2: 校验状态
    // 参数3: 配置规则, 来配置我们的提示文本
    $('#form').data("bootstrapValidator").updateStatus("addtext", "VALID");
    });
    
   
    $("#fileupload").fileupload({
        // 指定数据类型为json
        dataType:"json",
        // done，当图片上传成功回来时调用
        done:function(e,data){
        //获取上传成功图片的地址
        var picurl = data.result.picAddr;
         //设置图地址
        $(".file_img img ").attr("src",picurl);
        //把图片地址存入域中
        $("#file_url").val(picurl);
    $('#form').data("bootstrapValidator").updateStatus("fileurl", "VALID");        
        }
    });
    
    //表单校验
    $("#form").bootstrapValidator({
        //指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
           // 对字段进行校验
       fields: {
          //表单中有name属性的标签
          addtext:{
              //校验
           validators:{
               //判断是否为空
               notEmpty:{
                   message:"一级分类不能为空"
               }
           }
          },
          brandName:{
              validators:{
                  notEmpty:{
                   message:"二级分类不能为空"                      
                  }
              }
          },
          fileurl:{
            validators:{
                notEmpty:{
                 message:"二级分类不能为空"                      
                }
            }
          }
        }
    });

})();