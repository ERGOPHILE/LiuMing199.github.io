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
    var pag = 1;
    var pagesize = 5;
    range();
     function range(){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:pag,
                pageSize:pagesize
            },
            dataType:"json",
            success:function(info ){
                     var str = template("two_tpl",info);  
                     $("#two_tb tbody").html(str);  
                      //分页按钮渲染
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:info.page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,page){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                      pag = page;
                      range();//点击按钮重新渲染页面
                    }
                  });            
            }
        });
     }
    
    // 给一级分类绑定事件委托
    $(".dropdown-menu").on("click","li",function(){
        var text = $(this).children().html(); 
         //存入一级分类id
        var id = $(this).attr("categoryid");
       $("#dropdownText").html(text);
        $("#categoryId").val(id);
    //因为触发不了所以需要我们手动提示
    // 需要将校验状态置成 VALID
    // 参数1: 字段
    // 参数2: 校验状态
    // 参数3: 配置规则, 来配置我们的提示文本
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });
    
   
    $("#fileupload").fileupload({
        // 指定数据类型为json
        dataType:"json",
        // done，当图片上传成功回来时调用
        done:function(e,data){
        //获取上传成功图片的地址
        var picurl = data.result.picAddr;
         //设置图地址
        $("#imgBox ").attr("src",picurl);
        //把图片地址存入域中   
        $("#file_url").val(picurl);
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");        
        }
    });
    
    //表单校验
    $("#form").bootstrapValidator({
        //指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
           // 对字段进行校验
       fields: {
          //表单中有name属性的标签
          categoryId:{
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
          brandLogo:{
            validators:{
                notEmpty:{
                 message:"请选择图片"                      
                }
            }
          }
        }
    });
    
    //添加商品
   //表单校验成功后发送ajax请求
   $("#form").on("success.form.bv",function(e){
           //阻止表单 默认提交    e.preventDefault();
           e.preventDefault();
           console.log($("#form").serialize());
           
          $.ajax({
              type:"post",
              url:"/category/addSecondCategory",
            //  serialize()获取设置了nama表单属性的值              
              data:$("#form").serialize(),
              dataType:"json",
              success:function(info){
                $("#two_modal").modal("hide");
                  //添加完重新渲染页面
                  range();
                     // 重置表单里面的内容和校验状态
        $('#form').data("bootstrapValidator").resetForm( true );
                  //重置 一级分类 和图片 
          $("#imgBox ").attr("src","images/none.png");
          $("#dropdownText").html("请选择一级分类");
          
                  
              }
          });
        });  
})();