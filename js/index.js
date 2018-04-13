(function () {
 var goods_list = $("#goods_list");
  $.ajax({
    type: "POST",
    url: getAPIURL() + 'mainPageInfo',
    dataType: "json",
	data:{},
    success: function (data) {
		
      //成功之后的操作
				var reg = new RegExp('"',"g");
				var arr={};
				var shopStr="<ul class='cap-goods-list__container cap-goods-list__container--small cap-goods-list__container--540 cap-goods-list__container--card'>";
				var newsStr="<span>";
				var bannerStr="";
				$.each(data, function(i) {
					var key=i;
					var value=data[i];
					arr[key]=value;
				   
				});
				arr["Message"]=JSON.stringify(data.Message).replace(reg, "");
				arr["Perjmcode"]=JSON.stringify(data.perjmcode).replace(reg, "");
				var BannerList=JSON.stringify(data.banerList);
				var NewsList=JSON.stringify(data.newsList);
				var ShopList=JSON.stringify(data.shopList);
				//循环获取banner图渲染到页面中
				var items=document.getElementsByClassName("items_li");//获取li集合
				var bannerObj=JSON.parse(BannerList);
				
				for(var i=0;i<bannerObj.length;i++){
					for(var j=0;j<items.length;j++){
						if(i==j){
							var curr=items[i];
							curr.innerHTML="<a href='#'><img src='"+bannerObj[i].banerUrl+"'></a>";
						}
					}
					
				};
				
				//循环获取商品列表并渲染到页面中
				var jsonObj = JSON.parse(ShopList);//转换为json对象
				var length=jsonObj.length;
				for(var i=0;i<length;i++){
				   shopStr+="<li class='cap-goods-list__wrapper'>";
				   shopStr+="<a href='./list_detail.html?goodsid="+jsonObj[i].ID+"' class='cap-goods-list__item cap-goods-list__item--small card cap-goods-list__item--btn1 cap-goods-list__item--whitespace'>";
				   shopStr+="<div class='cap-goods-list__photo'>";
				   shopStr+="<img class='cap-goods-list__img' src='"+jsonObj[i].spImgUrl+"'></div>";
				   shopStr+="<div class='cap-goods-list__info has-title has-price has-btn'>";
				   shopStr+="<h3 class='title'>"+jsonObj[i].spName+"</h3>";
				   shopStr+="<p class='price'><em>¥ "+jsonObj[i].spScj+"</em></p></div>";
				   shopStr+="<div class='cap-goods-list__buy-btn-wrapper cap-goods-list__buy-btn-wrapper--1'><div class='cap-goods-list__buy-btn-1'><i class='van-icon van-icon-shopping-cart'></i></div></div></a></li>";
				};
				shopStr+="</ul>";
				//goods_list[0].=shopStr;
				var hhh=$("#goods_list").html();
				
				
				$("#goods_list").innerHTML()=="hgugiuhoi";
				var ccc=$("#goods_list").html();
				alert(ccc);
				
    }
  });

  

 
})();

				
		
		