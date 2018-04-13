(function(){
	
  $(function(){
    var flName=" ";
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
		flName=getQueryVariable("type");
		if(flName==false){
			flName="1";
		}
		
		 pxType=getQueryVariable("pxType");
		 
    //选项卡
    $("#sp_header_navbar li").click(function() {
      _$pageno = 0;
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
	
    //初始加载comptime();
	comptime(flName,pxType);
    //    调取接口
    function comptime(flName,pxType) {
		var investStr="<ul class='cap-goods-list'>";
      $.ajax({
        type:"POST",
        url:getAPIURL()+"searchShopByType",
        dataType: "json",
        data:{
			"perjmcode":"",
			"username":"",
			"pageIndex":pageIndex,
			"type":flName,
			"pxType":pxType
		},
        success: function (data) {
          var shopList=JSON.stringify(data.shopList);
		  var jsonObj = JSON.parse(shopList);
		  
		  for(var i=0;i<jsonObj.length;i++){
			  investStr+="<li class='cap-goods-list__wrapper'><a href='./list_detail.html?spID=";
			  investStr+=jsonObj[i].ID;
			  investStr+="' class='cap-goods-a'><div class='cap-goods-list__photo'><img  class='cap-goods-list__img'  src='";
			  investStr+=jsonObj[i].spImgUrl; 
			  investStr+="'></div><div class='has-title'><h3 class='title'>";
			  investStr+=jsonObj[i].spName;
			  investStr+="</h3><p class='price'><em>¥ ";
			  investStr+=jsonObj[i].spScj;
			  investStr+="</em></p></div></a><div class='goods_buy' spid='";
			  investStr+=jsonObj[i].ID;
			  investStr+="'><img src='./img/buy.png' onclick='spsc("+jsonObj[i].ID+")'/></div></li>";
		  }
		   
		  investStr+="</ul>";
		  document.getElementById("sp_wrap").innerHTML = investStr;
		  
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          //var txtsNULL ="<p class='nothing'>暂无记录</p>";
          //_$indexlist.append(txtsNULL);
          //alert('出错了！');
        }
      });
    }
	
	var username=localStorage.getItem("username");
	//商品收藏
	
	
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
		 

  });
  
  
})();