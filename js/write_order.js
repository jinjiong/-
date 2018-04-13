//调取数据加载页面
$(function(){
	var username=localStorage.getItem("username");
	var goodsID="";
	var sp_img="";
	var sp_title="";
	var sp_price="";
	var sp_jifen="";
	var sp_count=1;
	 
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
	goodsID=getQueryVariable("goodsID");
	//alert(goodsID);
	//加载商品信息
	$.ajax({
				type:'POST',
				url:getAPIURL() + 'readShopByID',
				data:{
					"perjmcode":"",
					"username":username,
					"spID":goodsID
					
				},
				dateType:'JSON',
				
				success:function(data){
					//alert(data.Message);
					var shopList=JSON.stringify(data.shopList);
					var jesonObj=JSON.parse(shopList);
					
					$.each(jesonObj, function(i) {
						sp_title=jesonObj[i]["spName"];
					    sp_price=jesonObj[i]["spScj"];
					    sp_jifen=jesonObj[i]["spHyj"];
					    sp_img=jesonObj[i]["spImgUrl2"];
						
					});
					 var z_price=sp_count*Number(sp_price);
					$("#sp_title").html(sp_title);
					$("#sp_price").html(sp_price);
					$("#sp_jifen").html(sp_jifen);
					$("#sp_count").html(sp_count);
					$("#sp_img").attr( "src",sp_img);
					$("#z_price").html(z_price);
				}
				});
	
	
	//加载收货地址
	$.ajax({
				type:'POST',
				url:getAPIURL() + 'readMemInfoByCode',
				data:{
					"perjmcode":"",
					"username":username
					
				},
				dateType:'JSON',
				
				success:function(data){
					
					var memInfo=JSON.stringify(data.memInfo);
					var jesonObj=JSON.parse(memInfo);
					var u_id="";
					var u_name="";
					var u_phone="";
					var u_address="";
					$.each(jesonObj, function(i) {
						u_name=jesonObj["UserName"];
					    u_id=jesonObj["ID"];
					    u_phone=jesonObj["UserPhone"];
					    u_address=jesonObj["UserAddress"];
					});
					$("#u_address").html(u_address);
					$("#name_phone").html(u_name+"   "+u_phone);
					
				}
				});
				
				
				
		
		$("#jian").click(function(){
			if(sp_count-1!=0){
				sp_count-=1;
				$("#sp_count").html(sp_count);
				var z_price=sp_count*Number(sp_price);
			$("#z_price").html(z_price);
			}
			
		});
		
		$("#add").click(function(){
			sp_count+=1;
			$("#sp_count").html(sp_count);
			var z_price=sp_count*Number(sp_price);
			$("#z_price").html(z_price);
		});
		
		$("#tjdd").click(function(){
			var z_price=sp_count*Number(sp_price);
			
			$.ajax({
				type:'POST',
				url:getAPIURL() + 'GoodsOrderAdd',
				data:{
					"perjmcode":"",
					"username":username,
					"spID":goodsID,
					"spCount":sp_count,
					"spZJinE":z_price,
					"spZJiFen":sp_jifen
					
				},
				dateType:'JSON',
				
				success:function(data){
					if(data.ResultData==0){
						layer.open({
							content:data.Data,
							btn: '确定'
						  });
						  location.href="./Settlement.html";
					}else{
						layer.open({
							content:data.Data,
							btn: '确定'
						  });
					}
				}
				});
	
		});
});


