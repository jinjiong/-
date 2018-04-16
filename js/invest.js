(function(){
	
  $(function(){
    var flName="all";
	var pageIndex="1";
	var pxType="1";
	
	function getQueryVariable(variable)
		{
			   var query = decodeURI(window.location.search.substring(1));
			  
			   var vars = query.split("&");
			   for (var i=0;i<vars.length;i++) {
					   var pair = vars[i].split("=");
					   if(pair[0] == variable){return pair[1];}
			   }
			   return(false);
		}
		flName=getQueryVariable("fenlei");
		
		 pxType=getQueryVariable("pxType");
		 
    //选项卡


    $("#sp_header_navbar li").click(function() {
      _$pageno = 0;
      $('#sp_wrap').attr('nub','1');
      $('.cap-goods-list').empty();
      $('.no_data-box').hide();
      $(this).addClass("navbar_active").siblings().removeClass("navbar_active");
      _index = $(this).index();
	  if(_index==0){
		  pxType="1";
		  comptime(flName,pxType);
	  }else if(_index==1){
		  pxType="2";
		  comptime(flName,pxType);
	  }else if(_index==2){
		  pxType="3";
		  comptime(flName,pxType);
	  }
      
    }); 

    // 下来加载
    var list_loading = false;
    $(document).on('scroll', function(){
        if ( ! list_loading ){
            if ($(document).scrollTop() >= $(document).height() - $(window).height()-100) {
                $('.load-box').show();
                comptime(flName,pxType);
            }
            
        }
    })

    //初始加载comptime();
	comptime(flName,pxType);
    //调取接口
    function comptime(flName,pxType) {
        console.log(pxType);
        list_loading = true;
		var investStr="";
        var nub = $('#sp_wrap').attr('nub');
      $.ajax({
        type:"POST",
        url:getAPIURL()+"searchShopByKeyWord",
        dataType: "json",
        data:{
			"perjmcode":"",
            "username":"",
            "pageIndex":nub,
            "keyWord":"",
            "spType":"3",
            "spFl":flName,
            "pxType":pxType
		},
        beforeSend:function(){
            if (parseInt($('#sp_wrap').attr('nub'))==1) {
                layer.open({type: 2,content: '加载中...'});
            }
            
        },
        success: function (data) {
            if (data.shopList.length>0) {
                if (data.shopList.length==10) {
                    list_loading = false;
                }else{
                    list_loading=true;
                    $('.load-box').hide();
                    $('.no_data-box').show();
                }
                $('#sp_wrap').attr('nub',parseInt($('#sp_wrap').attr('nub'))+1)
                var shopList=JSON.stringify(data.shopList);
                var jsonObj = JSON.parse(shopList);
                for(var i=0;i<jsonObj.length;i++){
                      investStr+="<li class='cap-goods-list__wrapper'><a href='./list_detail.html?spID=";
                      investStr+=jsonObj[i].ID;
                      investStr+="' class='cap-goods-a'><div class='cap-goods-list__photo'><img  class='cap-goods-list__img'  src='";
                      investStr+=jsonObj[i].spImgUrl; 
                      investStr+="'></div><div class='has-title'><h3 class='title'>";
                      investStr+=jsonObj[i].spName;
                      investStr+="</h3><p class='price'><em>¥";
                      investStr+=jsonObj[i].spScj;
                      investStr+="</em></p><div class='goods_buy'><img src='./img/buy.png'/></div></div></a></li>";
                }
                $('.cap-goods-list').append(investStr);
            }else{
                $('.load-box').hide();
                $('.no_data-box').show();
            }
           layer.closeAll(2);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
        }
      });
    }
	
	var username=localStorage.getItem("username");
		
		//点击订单菜单
		$("#index_order").click(function () {
			
			if(username!=""){
				location.href="./order.html?uname="+username;
			}else{
				 layer.open({
                    content:"请您先登录！",
                    btn: '确定'
                  });
				location.href="./login.html";
			}
			
		  });
		//点击我的菜单
		$("#index_my").click(function () {
			if(username!=""){
				location.href="./my.html?uname="+username;
			}else{
				 layer.open({
                    content:"请您先登录！",
                    btn: '确定'
                  });
				location.href="./login.html";
			}
		  });
		  //点击商城
		 $("#index_shop").click(function () {
			var url="./list.html?fenlei=all&pxType=1";
				url=encodeURI(url); 
				url=encodeURI(url);
				location.href=url;
		  }); 

  });
})();