$=jQuery.noConflict();$(function(){var home_url=$("#siteurl").val();$(".promo_select").click(function(){$(".promo-show-message").show(1000);$(this).prop('disabled',true);var coupon=$(".coupon").val();var type=$(".coupon").attr('ctype');if(coupon==""||type==""){$(".promo-show-message").html("<span style='color:red; font-size:16px;'>Please Enter Promo Code</span>");setTimeout(function(){$(".promo-show-message").hide(1000);},5000);$(".promo_select").prop("disabled",false);}else{$("#addbodyblur").show();$.ajax({url:home_url+'coupon',dataType:"json",data:{coupon:coupon,type:type},success:function(data){$(".promo_select").prop("disabled",false);if(data['type']=="error"){$(".promo-show-message").html(data['message']);$("#addbodyblur").hide();setTimeout(function(){$(".promo-show-message").hide(1000);},2000);}else{if(type=="hotel")
{location.reload();}
$("#parentload").load(location.href+" #div_reload");$(".promo-show-message").html(data['message']);setTimeout(function(){$(".promo-show-message").hide(500);},500);$("#addbodyblur").hide();promo_add();}}});}});});function resetcoupon(){var home_url=$("#siteurl").val();$.ajax({url:home_url+'coupon/coupon_reset',dataType:"json",data:{},success:function(data){$("#parentload").load(location.href+" #div_reload");$(".promo-show-message").html(data['message']);setTimeout(function(){$(".promo-show-message").hide(500);},500);promo_add();}});}
function resetcoupon_hotel(){var home_url=$("#siteurl").val();$.ajax({url:home_url+'coupon/coupon_reset',dataType:"json",data:{},success:function(data){$("#parentload").load(location.href+" #div_reload");$(".promo-show-message").html(data['message']);setTimeout(function(){$(".promo-show-message").hide(500);},500);promo_add();location.reload();}});}