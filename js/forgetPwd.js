function FindPwd() {
    var self = this,
        _txtMsgCode, _sendCode;
    var reg1 = /^(\+?86)?(1[34578]\d{9})$/;
    var reg2 = /^[\x00-\xff]{6,20}$/;
    //发短信
    var timenum = 120;
    var lock = true;

    function TimeTicker(timenum) {
        if (parseInt(timenum) == 0) {
            $("#sendCode").val("点击获取");
            $("#sendCode").removeAttr("disabled");
            lock = true;
            clearTimeout(re);
        } else {
            timenum--;
            lock = false;
            $("#sendCode").val(timenum + "秒后重新发送");
            $("#sendCode").attr("disabled", true);
            re = setTimeout(function() {
                TimeTicker(timenum)
            }, 1000);
        }
    }

    /*点击修改密码响应处理函数*/
    function findpwd(mobile, code, newpwd) {
        console.log(mobile+'---'+code+'---'+newpwd);
        $.ajax({
            type: "POST",
            url: getAPIURL() + "forgetPas",
            dataType: "json",
            data: {
                "perjmcode": "",
                "username": mobile,
                "newPas": newpwd,
                "Yzm": code
            },
            success: function(data) {
                console.log(data);
                if (data.ResultData == 0) {
                    layer.open({
                        content: '注册成功！',
                        btn: '点击登录',
                        end: function() {
                            window.location.href = "./login.html";
                        }
                    });
                } else {
                    layer.open({
                        content: data.Data,
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
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
            data: {
                "perjmcode": "",
                "phone": mobile,
                "ty": 2
            },
            success: function(data) {
                console.log(data);
                if (data.ResultData == 0) {
                    layer.open({
                        content: '发送成功！',
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    });
                    timenum = 120;
                    if (lock == true) {
                        TimeTicker(timenum);
                    } else {
                        return false;
                    }
                } else if (data.ResultData == 1) {
                    layer.open({
                        content: data.Data,
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    });
                }
            }
        });
    }
    (function() {
        _txtMsgCode = $("#txtMsgCode");
        /*验证码输入框*/
        _sendCode = $("#sendCode");
        /*获取验证码按钮*/
        _phone = $("#phone");
        /*手机号*/
        _next = $("#nextstep");
        /*下一步*/
        _newPwd = $("#newPwd");

        /*发送验证码*/
        _sendCode.on("click", function() {
            /*判断用户是否输入手机号*/
            var mobile = $.trim(_phone.val());
            console.log(mobile);
            if (mobile == "" || mobile.length != 11) {
                layer.open({
                    content: '请输入正确用户名',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                });
                return false;
            } else {
                getCode(mobile);
            }


        });

        _next.on("click", function() {
            var mobile = $.trim(_phone.val());
            var code = $.trim(_txtMsgCode.val());
            var newpwd = $.trim(_newPwd.val());

            if (mobile == "") {
                layer.open({
                    content: '用户名不能为空',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                });
                return false;
            } else if (!reg1.test(mobile)) {
                layer.open({
                    content: "手机号码格式输入有误！",
                    btn: '确定'
                });
                return false;

            } else if (code == "") {
                layer.open({
                    content: '请输入验证码',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                });
                _txtMsgCode.focus();
                return false;
            } else if (newpwd == "") {
                layer.open({
                    content: '请输入新密码',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                });
                _newPwd.val("").focus();
                return false;
            } else if (!reg2.test(newpwd)) {
                layer.open({
                    content: "请输入6-20个字母或符号组合的密码！",
                    btn: '确定'
                });
                return false;
            } else {
                findpwd(mobile, code, newpwd);
            }
        });
    })();
}

var findpwd;
$(function() {
    findpwd = new FindPwd();
});