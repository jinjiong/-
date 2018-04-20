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
                    zhye += jsonObj[i].dzb;
                }
                dzb = Number(zhye.replace(',',''));
                document.getElementById("zhye").innerHTML = zhye;
            }
        });
    } 

    //提交步骤
    function submit() {
        $.ajax({
            type: "POST",
            url: getAPIURL() + "dzbZhuangZ",
            data: {
                "perjmcode": "",
                "username": username,
                "zzdusername": $("#zrzh").val(),
                "jine": $("#txje").val(),
                "jyPas": $("#jymm").val()
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
                content: "请输入转换金额！",
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
        } else if ($("#zrzh").val() == "") {
            layer.open({
                content: "请输入转出账号！",
                skin: 'msg',
                time: 2 //2秒后自动关闭
            });
            return false;
        } else if ($("#jymm").val() == "") {
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





    // 待激活
    // $.ajax({
    //     type: "POST",
    //     url: getAPIURL() + "readDjhListAll",
    //     data: {
    //         "perjmcode": "",
    //         "username": username,
    //         "pageIndex": '1'
    //     },
    //     dataType: 'json',
    //     success: function(data) {
    //         getAc(data.djhMemList);
    //         console.log(data);
    //         console.log(data.djhMemList);

    //     }

    // });

    // function getAc(list) {
    //     var A_html = '';
    //     $.each(list, function(index, el) {
    //         A_html = A_html + '<div class="activate-center">' +
    //             '<div class="btn">激活</div>' +
    //             '<div class="txt">' +
    //             '<i></i>' +
    //             '<p class="name" data-code="' + el.UserCode + '">' + el.UserName + '</p>' +
    //             '<p class="time">' + el.UserZCTim + '</p>' +
    //             '</div>' +
    //             '</div>';
    //     });
    //     $('.list-activate').append(A_html);

    // }
    // // 激活
    // $('.list-activate').on('click', '.btn', function() {
    //     if (!$(this).hasClass('active')) {
    //         var _this = $(this);
    //         var UserCode = $(this).parent('.activate-center').find('.name').data('code');
    //         $.ajax({
    //             type: "POST",
    //             url: getAPIURL() + "jihuoMem",
    //             data: {
    //                 "perjmcode": "",
    //                 "username": username,
    //                 "jhusername": UserCode
    //             },
    //             dataType: 'json',
    //             success: function(data) {
    //                 _this.addClass('active').html('成功');
    //             }


    //         });
    //     }

    // });





})();