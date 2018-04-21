(function() {

    // 手机验证
    jQuery.validator.addMethod("isMobile", function(value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写您的手机号码");

    //点击获取验证码按钮
    var code_state= true;
    $("#get_valicode").click(function() {
        if ($(".valicode").valid()) {
            if (code_state) {
                code_state= false;
                valicode();
            }
            
        }
    });

    //注册按钮
     var reg_state= true;
    $("#register_btn").click(function() {
        if ($(".valicode").valid()) {
            if ($('input[name="valicode"]').val().length =='') {
                layer_info('验证码不能为空');
               
            }else if ($('input[name="valicode"]').val().length !=6){
                layer_info('请正确输入验证码');

            }else if($('input[name="recommend_name"]').val().length == ''){
                layer_info('请输入邀请人');
            }else{
                if (reg_state) {
                    reg_state = false;
                    reg();
                }
                
            }
        }
        
    });

    // 弹框提示
    function layer_info(info){
        layer.open({
            content: info,
            skin: 'msg',
            time: 2
        });
    }
    // 发送短信接口
    function valicode(){
        console.log($('input[name="phone"]').val());
        $.ajax({
            type: "POST",
            url: getAPIURL() + "phoneGetYzm",
            dataType: "json",
            data: {
                "perjmcode": "",
                "phone": $('input[name="phone"]').val(),
                "ty": "1"
            },
            success: function(data) {
                console.log(data);
                if (data.ResultData == "1") {
                    layer.open({
                        content: data.Data,
                        btn: '确定'
                    });
                    code_state = true;
                    return false;
                }else if (data.ResultData == "0") {
                    layer.open({
                        content: '验证码发送成功',
                        skin: 'msg',
                        time: 2, //2秒后自动关闭
                    });
                    var time = 60;
                    var timer = setInterval(function() {
                        $(".get_code");
                        $("#get_valicode").html(time + "s后重新获取");
                        time--;
                        if (time < 0) {
                            code_state = true;
                            clearInterval(timer);
                            $("#get_valicode").html("重新获取");
                        }
                    }, 1000);
                }
            }
        });
    }

    // 发送注册信息
    function reg(){
        console.log($('input[name="valicode"]').val());
        $.ajax({
            type: "post",
            url: getAPIURL() + "memReg",
            dataType: 'json',
            data: {
                "perjmcode": "",
                "username": $('input[name="phone"]').val(),
                "phone": $('input[name="phone"]').val(),
                "nc": $('input[name="nc"]').val(),
                "LoginPas": $('input[name="pass"]').val(),
                "TranPas": $('input[name="tranPas"]').val(),
                "Yzm": $('input[name="valicode"]').val(),
                "tjr": $('input[name="recommend_name"]').val()
            },
            success: function(data) {
                console.log(data);
                reg_state=true;
                if (data.ResultData == 0) {
                    layer.open({
                        content: '注册成功！',
                        btn: '点击登录',
                        end: function() {
                            location.href = "./login.html";
                        }
                    });
                }else {
                    layer.open({
                        content: data.Data,
                        btn: '确定'
                    });
                };
                console.log(data);
                console.log(reg_state);
               
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                reg_state=true;
                if (XMLHttpRequest.status == 400) {
                    var obj = JSON.parse(XMLHttpRequest.responseText);
                    layer.open({
                        content: obj.Message,
                        btn: '确定'
                    });
                }
            }
        });
    }

    // 验证
    $('.valicode').validate({
        onkeyup: null,
        rules: {
            phone: {
                required: true,
                isMobile:true
            },
            nc: {
                required: true,
            },
            pass:{
                required:true,
                minlength:6
            },
            tranPas:{
                required:true,
                minlength:6
            }
        },
        messages: {
            phone: {
                required: '手机号不能为空',
                isMobile: '请正确填写您的手机号码'
            },
            nc: {
                required: '昵称不能为空',
            },
            pass: {
                required: '密码不能为空',
                minlength: '最少六位数数或字母'
            },
            tranPas: {
                required: '交易密码不能为空',
                minlength: '最少六位数数或字母'
            }
        },
        showErrors: function(errorMap, errorList) {
            var msg = "";
            $.each(errorList, function(i, v) {
                layer.open({
                    content: v.message,
                    skin: 'msg',
                    time: 2 
                });
                return false;
            });
        },
        onfocusout: false
    });

    //切换密码的可见状态
    $(".icon_eye").click(function() {
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