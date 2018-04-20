(function() {
    var username = localStorage.getItem("username");
    var dzb = 0;
    //获取可用余额
    geDzb();
    function geDzb(){
        $.ajax({
            type: "POST",
            url: getAPIURL() + "readZjByCode",
            dataType: "json",
            data: {
                "perjmcode": "",
                "phone": username
            },
            success: function(data) {
                var memzjInfo = JSON.stringify(data.memzjInfo);
                var jsonObj = JSON.parse(memzjInfo);
                var zhye = "";
                for (var i = 0; i < jsonObj.length; i++) {
                    zhye += jsonObj[i].jjb;
                }
                dzb = Number(zhye.replace(',',''));
                document.getElementById("zhye").innerHTML = zhye;
            }
        });
    } 

    //提交步骤
    function submit() {
        console.log(username+'----'+$("#txje").val()+'----'+$("#jymm").val()+$("#dzpt").val());
        $.ajax({
            type: "POST",
            url: getAPIURL() + "jjbTxAdd",
            data: {
                "perjmcode": "",
                "username": username,
                "jine": $("#txje").val(),
                "jyPas": $("#jymm").val(),
                "txToZh": $("#dzpt").val()
            },
            dataType: 'json',
            success: function(data) {
                if (data.ResultData == "0") {
                    layer.open({
                        content: data.Data,
                        skin: 'msg',
                        time: 2,//2秒后自动关闭
                        end:function(){
                            $('#jymm').val("");
                            geDzb();
                            
                        }

                    });
                } else {
                    layer.open({
                        content: data.Data,
                        btn: '确定'
                    });

                }
            }


        });
    }

    //点击提现按钮时
    $(".withdraw_btn").click(function() {
        if ($("#txje").val() == "") {
            layer.open({
                content: "请输入提现金额！",
                skin: 'msg',
                time: 2 //2秒后自动关闭
            });
            return false;
        } else if (parseInt($("#txje").val()) > dzb) {
            layer.open({
                content: "您的余额不足！",
                skin: 'msg',
                time: 2 //2秒后自动关闭
            });
            return false;
        }else if ($("#jymm").val() == "") {
            layer.open({
                content: "请输入交易密码！",
                skin: 'msg',
                time: 2 //2秒后自动关闭
            });
            return false;
        }else {
            submit();
        }

    });
})();