(function () {
  
  var nc = $("#nc");
  var password = $("#password");
  var TranPas = $("#TranPas");
  var phonenum = $("#phonenum");
  var valicode = $("#valicode");
  var recommend_p = $("#recommend_p");
  var nc = $("#nc");
  var cutdownFlag = true;
    function getQueryVariable(variable){
        var query = decodeURI(window.location.search.substring(1));
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }
        recommend_user=getQueryVariable("recommend_user");
        console.log(recommend_user);
        if ($.trim(recommend_user) !=''&&recommend_user) {
            $('#recommend_p').val(recommend_user).attr("readonly","readonly");
        }
  /*0612 推荐人*/
  $("#referenceTitle").on("click", function () {
    $(this).hide().next().slideDown();
  });
    //点击获取验证码按钮
    var activate= true;
    $("#get_valicode").click(function () {
        reg(2);
    });
    //注册按钮
    $("#register_btn").click(function () {
        reg(3);
    });
  function reg(step) {
    //第二步
    var phone_arr = phonenum.val().split(" ");
    var password_arr = password.val().split(" ");
    var reg1 = /^(\+?86)?(1[34578]\d{9})$/;
    var reg2 = /^[\x00-\xff]{6,20}$/;
    if (step == 2 && activate) {
      //手机号做验证
      if (phonenum.val() == "") {
        layer.open({
          content: "请输入手机号码",
          btn: '确定'
        });
        return false;
      }
      if (phone_arr.length != 1) {
        layer.open({
          content: "请输入手机号，不能含有空格！",
          btn: '确定'
        });
        return false;
      }
      if (!reg1.test(phonenum.val())) {
        layer.open({
          content: "手机号码格式输入有误！",
          btn: '确定'
        });
        return false;
      }
      if (nc.val().trim()=="") {
        layer.open({
          content: "昵称不能为空",
          btn: '确定'
        });
        return false;
      }
      //密码验证
      if (password.val() == "") {
        layer.open({
          content: "密码不能为空！",
          btn: '确定'
        });
        return false;
      }
      if (password_arr.length != 1) {
        layer.open({
          content: "密码不能含有空格！",
          btn: '确定'
        });
        return false;
      }
      //0630修改注册手机号正则
       if (!reg2.test(password.val())) {
            layer.open({
                content: "请输入6-20个字母或符号组合的密码！",
                btn: '确定'
            });
            return false;
       }else {
          $("#captcha_div").html("").css("margin"," 0.6rem auto 0");
                $.ajax({
                  type:"POST",
                  url:getAPIURL() +"phoneGetYzm",
                  dataType:"json",
                  //contentType: "application/json",
                  data:{
					   "perjmcode":"",
						"phone":phonenum.val(),
						"ty":"1"
				  },
				  
                  success: function (data) {
					activate = false; 
                    if (data.ResultData == "1") {
                      layer.open({
                        content: data.Data,
                        btn: '确定'
                      });
                      return false;
                    }
                    else if (data.ResultData == "0") {
                      layer.open({
                        content: '验证码发送成功',
                        skin: 'msg',
                        time: 2, //2秒后自动关闭
                        end: function(){
                          $("#captcha_div").html("").css("margin"," 0 auto");
                          $("#register_btn").removeAttr("disabled").removeClass("disabled"); // 用户完成拖动之后再启用提交按钮
                        }
                      });
                      var time = 60;
                      cutdownFlag = false;
                      var timer = setInterval(function () {
                        $(".get_code");
                        $("#get_valicode").html(time + "s后重新获取");
                        time--;
                        if (time < 0) {
                          clearInterval(timer);
                          cutdownFlag = true;
                          activate = true;
                          $("#get_valicode").html("重新获取");
                        }
                      }, 1000);
                    }
                  }
                });
      }
    }
    //第三步
    if (step == 3) {
      //手机号做验证
      if (phonenum.val() == "") {
        layer.open({
          content: "请输入手机号码",
          btn: '确定'
        });
        return false;
      }
      if (phone_arr.length != 1) {
        layer.open({
          content: "请输入手机号，不能含有空格！",
          btn: '确定'
        });
        return false;
      }
      if (!reg1.test(phonenum.val())) {
        layer.open({
          content: "手机号码格式输入有误！",
          btn: '确定'
        });
        return false;
      }
      //密码验证
      if (password.val() == "") {
        layer.open({
          content: "密码不能为空！",
          btn: '确定'
        });
        return false;
      }
      if (password_arr.length != 1) {
        layer.open({
          content: "密码不能含有空格！",
          btn: '确定'
        });
        return false;
      }
      //0630修改注册手机号正则
      if (!reg2.test(password.val())) {
        layer.open({
          content: "请输入6-20个字母或符号组合的密码！",
          btn: '确定'
        });
        return false;
      }
      if(valicode.val().trim()==""){
        layer.open({
          content: "请输入验证码！",
          btn: '确定'
        });
        return false;
      }
	   if(recommend_p.val().trim()==""){
        layer.open({
          content: "请输入邀请人账号！",
          btn: '确定'
        });
        return false;
      }
	  if(nc.val().trim()==""){
        layer.open({
          content: "请输入昵称！",
          btn: '确定'
        });
        return false;
      }
    $.ajax({
      type: "post",
      url: getAPIURL() + "memReg",
      dataType:'json',
      data:{
		  "perjmcode":"",
		  "username":phonenum.val(),
		  "phone":phonenum.val(),
		  "LoginPas":password.val(),
		  "TranPas":TranPas.val(),
		  "nc":nc.val(),
		  "tjr":recommend_p.val(),
		  "Yzm":valicode.val()
	  },
      success: function (data) {
        layer.open({
            content: '注册成功！'
            ,btn: '点击登录',
            end:function(){
               location.href="http://47.52.99.82:9026/login.html";
            }
        });
        if (data.ResultData == 1) {
          $("#modal").hide();
          layer.open({
            content: data.Data,
            btn: '确定'
          });
        }
      },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      $("#modal").hide();
      if(XMLHttpRequest.status == 400) {
        var obj = JSON.parse(XMLHttpRequest.responseText);
        layer.open({
          content:obj.Message,
          btn:'确定'
        });
      }
    }
    });
         
     
    }
  }

  //切换密码的可见状态
  $(".icon_eye").click(function () {
    var arr = this.src.split("/");
    if (arr[arr.length - 1] == "bkj.png") {
      this.src = "./img/kj.png";
      $(this).prev().attr("type", "text");
    } else {
      this.src = "./img/bkj.png";
      $(this).prev().attr("type", "password");
    }

  });
})();