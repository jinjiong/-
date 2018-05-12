//调取数据加载页面
$(function(){
	var username=localStorage.getItem("username");
	var goodsID="";
	var sp_img="";
	var sp_title="";
	var sp_price="";
	var sp_jifen="";
	var UserPhone="";
	var u_phone_f ="";
	function getQueryVariable(variable){
		   var query = decodeURI(window.location.search.substring(1));
		   var vars = query.split("&");
		   for (var i=0;i<vars.length;i++) {
				   var pair = vars[i].split("=");
				   if(pair[0] == variable){return pair[1];}
		   }
		   return(false);
	}

	//加载商品信息
	setPro();
	function setPro(){
		local_cart = $.parseJSON(localStorage.getItem('local_cart'));
		var all_jifen=0;
		var all_monery=0;
		$.each(local_cart,function(index,el){
			$.ajax({
				type:'POST',
				url:getAPIURL() + 'readShopByID',
				// async:false, 
				data:{
					"perjmcode":"",
					"username":username,
					"spID":this.spID
				},
				dateType:'JSON',
				beforeSend:function(){
			    	layer.open({type: 2,content: '加载中...'});
			    },
				success:function(data){
					console.log(data);
	 				all_jifen=all_jifen+parseInt(data.shopList[0].spHyj)*parseInt(el.spCount);
                    all_monery = all_monery+parseFloat(data.shopList[0].spScj)*parseInt(el.spCount);
	 				var pro_htm='<a href="javascript:;" class="aui-list-product-fl-item" data-id="'+data.shopList[0].ID+'">'+
								'<div class="aui-list-product-fl-img">'+
									'<img src="'+data.shopList[0].spImgUrl+'" id="sp_img" alt="">'+
								'</div>'+
								'<div class="aui-list-product-fl-text">'+
									'<h3 class="aui-list-product-fl-title" id="sp_title">'+data.shopList[0].spName+'</h3>'+
									'<div class="aui-list-product-fl-mes">'+
										'<div>'+
				'							<span class="aui-list-product-item-price">'+
				'								<em>¥</em>'+
				'								<label id="sp_price" data-spHyj='+data.shopList[0].spHyj+'>'+data.shopList[0].spScj+'</label>'+
				'							</span>'+
				'							<span class="aui-list-product-item-del-price" >'+
				'								'+
				'							</span>'+
				'						</div>'+
				'						<div class="aui-btn-purchase">'+
				'							<button class="jian" id="jian">-</button><span id="sp_count" class="sp_count">'+el.spCount+'</span><button class="add" id="add">+</button>'+
				'						</div>'+
				'					</div>'+
				'					<div class="aui-list-product-fl-bag" >'+
				'						<span><img src="./img/icon/bag1.png" alt=""></span>'+
				'						<span><img src="./img/icon/bag2.png" alt=""></span>'+
				'					</div>'+
				'				</div>'+
				'			</a>';
					$('.aui-list-product-float-item').append(pro_htm);
					$("#sp_jifen").html(all_jifen);
					$("#z_price").html(all_monery);
					layer.closeAll(2);
				}
			});
		})
		
		
	}
	function getSite(username){
		var UserAddress = '';
		$.ajax({
			type:'POST',
			url:getAPIURL() + 'readMemInfoByCode',
			async:false,
			data:{
				"perjmcode":"",
				"username":username,
			},
			dateType:'JSON',
			success:function(data){
				console.log(data);
				UserAddress = data.memInfo.UserAddress;
			}
		});
		return UserAddress;
	}
	//加载数据
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
					if (localStorage.getItem('site')) {
						$("#u_address").html($.parseJSON(localStorage.getItem('site')));
						localStorage.removeItem('site');

					}else{
						$("#u_address").html(u_address);
					}
					$("#u_address").attr('address',u_address);
					$("#name_phone").html(u_name+"   "+u_phone);
					u_phone_f =u_phone;
					
				}
				});
		$(".aui-list-product-float-item").on('click','.jian',function(){
			var sp_count = parseInt($(this).siblings('.sp_count').html());
			if(sp_count-1!=0){
				sp_count-=1;
				$(this).siblings('.sp_count').html(sp_count);
				all_monery_sphyj();
			}
			
		});
		$(".aui-list-product-float-item").on('click','.add',function(){
			var sp_count = parseInt($(this).siblings('.sp_count').html());
			sp_count+=1;
			$(this).siblings('.sp_count').html(sp_count);
			all_monery_sphyj();
		});
     
		function all_monery_sphyj(){
		 var all_monery=0;
		 var all_sphyj=0;
          $.each($('.aui-list-product-fl-item'),function(){
          		all_monery=all_monery+parseFloat($(this).find('.sp_count').html())*parseFloat($(this).find('#sp_price').html());
          		all_sphyj=all_sphyj+parseFloat($(this).find('.sp_count').html())*parseFloat($(this).find('#sp_price').data('sphyj'));
          });
          $("#z_price").html(all_monery);
          $("#sp_jifen").html(all_sphyj);
		}
		$("#tjdd").click(function(){
			setOrder();
		});
		function setOrder(){
			var pro_list=[];
			
			var UserAddress =$('#u_address').html();
			var buyType =$('.aui-settle-choice input:checked').data('nub');
			$.each($('.aui-list-product-fl-item'), function() {
				var pro={};
				var spZJinE = parseFloat($(this).find('#sp_price').html())*parseInt($(this).find('.sp_count').html());
				var spid =$(this).data('id');
				var nub = $(this).find('.sp_count').html();
				var spHyj =$(this).find('#sp_price').data('sphyj');
				pro.spZJinE=spZJinE;
				pro.spid=spid;
				pro.nub =nub;
				pro.spHyj=spHyj;
				pro.UserAddress=UserAddress;
				pro_list.push(pro);
				console.log(spZJinE+'--'+spid+'--'+nub+'--'+spHyj+'--'+UserAddress);
				if (buyType==1) {
					$.ajax({
						type:'POST',
						url:getAPIURL() + 'GoodsOrderAdd',
						dateType:'JSON',
						data:{
							"perjmcode":"",
							"username":username,
							"spID":spid,
							"spCount":nub,
							"spZJinE":spZJinE,
							"spZJiFen":spHyj,
							"buyType":buyType,
							"postAddress":UserAddress
						},
						success:function(data){
							if(data.ResultData==0){
								// 购买成功购物车内删除
								dele_pro(spid);
								
					            
							}else if(data.ResultData==1){
								console.log(data);
								layer.open({
									title:"温馨提示",
									content:data.Data,
									btn: '确定'
								 });
							}
							
						}
					});
				}
			});
			if (buyType==2) {
				localStorage.setItem("pro_list",JSON.stringify(pro_list));
				var phone = u_phone_f;
				var monery = $('#z_price').html();
	            var url_black =$.base64.encode('http://47.52.99.82:9026/member_de.html');
	            location.href='http://zhangshangfu.test.lsxfpt.com/mobile/passport/login/is_other_web/1/account/'+phone+'/goto_shop_id/5682/other_web_price/'+monery+'/other_web_redirect_url_base64/'+url_black+'.html';
			}
		}
		function dele_pro(spid){
			$.ajax({
				type:'POST',
				url:getAPIURL() + 'cancelGwcShopByID',
				data:{
					"perjmcode":"",
					"username":username,
					"spID":spid
				},
				dateType:'JSON',
				success:function(data){
					// console.log(data);
				}
			});
		}
	// 点击默认
	$('#aui-default').click(function(e){
		$('#u_address').html($('#u_address').attr('address'));
		e.preventDefault(); 
	});
	
});


