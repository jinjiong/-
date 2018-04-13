function FindPwd() {
  var self = this, _txtMsgCode, _sendCode;

  //发短信
  var timenum = 120;
  var lock = true;

  function TimeTicker(timenum) {
    if (parseInt(timenum) == 0) {
      $("#sendCode").val("点击获取");
      $("#sendCode").removeAttr("disabled");
      lock = true;
      clearTimeout(re);
    }
    else {
      timenum--;
      lock = false;
      $("#sendCode").val(timenum + "秒后重新发送");
      $("#sendCode").attr("disabled",true);
      re = setTimeout(function () {
        TimeTicker(timenum)
      }, 1000);
    }
  }

  /*点击修改密码响应处理函数*/
  function findpwd(mobile,code,newpwd) {
	 // alert(mobile);
	  //alert(code);
	 // alert(newpwd);
    $.ajax({
      type: "POST",
      url: getAPIURL() + "forgetPas",
      dataType: "json",
      data:{
		  "perjmcode":"",
		  "phone":mobile,
		  "newPas":newpwd,
		  "Yzm":code
	  },
      success: function (data) {
        if (data.ResultData == 0) {
          timenum = 0;
          TimeTicker(timenum);
          window.location.href = './login.html';
        } else {
          layer.open({
            content:data.Data
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
          });
        }
      }
    });
  }

  /*点击发送验证码响应处理函数*/
  function getCode(mobile) {
	  
    $.ajax({
      type: "POST",
      url: getAPIURL() + "phoneGetYzm",
      dataType: "json",
      data:{"perjmcode":"",
			"phone":mobile,
			"ty":2
			},
      success: function (data) {
		  
        if (data.ResultData == 0) {
          layer.open({
            content: '发送成功！'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
          });
          timenum = 120;
          if (lock == true) {
            TimeTicker(timenum);
          }
          else {
            return false;
          }
        }
        else if (data.ResultData == 1) {
          layer.open({
            content: data.Data,
            skin: 'msg',
            time: 2 //2秒后自动关闭
          });
        }
      }
    });
  }

  (function () {
    _txtMsgCode = $("#txtMsgCode");
    /*验证码输入框*/
    _sendCode = $("#sendCode");
    /*获取验证码按钮*/
    _phone = $("#phone");
    /*手机号*/
    _next = $("#nextstep");
    /*下一步*/
	_newPwd=$("#newPwd");

    /*发送验证码*/
    _sendCode.on("click", function () {
      /*判断用户是否输入手机号*/
      var mobile = $.trim(_phone.val());
      if (mobile == "" || mobile.length == 11) {
        layer.open({
          content: '请输入正确用户名'
          , skin: 'msg'
          , time: 2 //2秒后自动关闭
        });
        _phone.val("").focus();
        return false;
      }
        getCode(mobile);
      
    });

    _next.on("click", function () {
      var mobile = $.trim(_phone.val()).replace(/[^\d]/g, '');
      var code = $.trim(_txtMsgCode.val()).replace(/[^\d]/g, '');
      var newpwd = $.trim(_newPwd.val()).replace(/[^\d]/g, '');
      if (mobile == "" || mobile.length == 11) {
        layer.open({
          content: '请输入正确用户名'
          , skin: 'msg'
          , time: 2 //2秒后自动关闭
        });
        _phone.val("").focus();
        return false;
      }
      else if (code == "") {
        layer.open({
          content: '请输入验证码'
          , skin: 'msg'
          , time: 2 //2秒后自动关闭
        });
        _txtMsgCode.focus();
        return false;
      }else if(newpwd==""){
		  layer.open({
          content: '请输入新密码'
          , skin: 'msg'
          , time: 2 //2秒后自动关闭
        });
        _newPwd.val("").focus();
        return false;
	  }
      else {
        findpwd(mobile,code,newpwd);
      }
    });
  })();
}

var findpwd;
$(function () {
  findpwd = new FindPwd();
});