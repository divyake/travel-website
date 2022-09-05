$=jQuery.noConflict();$(function(){$(".autofildata").click(function(){var fieldArray={'search_type':'search_type','from_location':'from_location','to_location':'to_location','depart_date':'depart_date','return_date':'return_date','adltvalue':'adltvalue','childvalue':'childvalue','infantdvalue':'infantdvalue','class':'class'};var searchdata=$(this).attr('atr-serachdata');var obj=jQuery.parseJSON(searchdata);if(obj.search_type=="round"){$(".sct_round").click();}else{$(".sct_one").click();}
$.each(obj,function(key,value){$.each(fieldArray,function(key1,value1){if(key==key1){$('form#flight-form :input[name='+value1+']').val(value);$("#searchauto").click();}});});});$(".recent_div>ul>li>a, .farediv>a").click(function(){$("#searchauto").click();});});$(document).ready(function(){$(".onewy").click(function(){$("[raj-multicity-div]").hide();$("[raj-oneround-div]").show();});$(".mulcity").click(function(){$("[raj-oneround-div]").hide();$("[raj-multicity-div]").show();});$(".hoverlii").hover(function(){$(this).find(".listdownsw").stop(true,true).slideDown();},function(){$(this).find(".listdownsw").stop(true,true).slideUp();});$("[data-click-btn]").click(function(){$("[data-show-dv]").slideToggle();});$(".hotel_done").click(function(){$("[data-click-btn]").click();});var option=1;$(".more_option").click(function(){if(option==1){$(".preferred_airline").slideDown();$(this).text("- Less Option").addClass("less_option");}else{$(".preferred_airline").slideUp();$(this).text("+ More Option").removeClass("less_option");option=0;}
option++;});});$(document).ready(function(){$(".close_image").click(function(){$(".pax_downdv").hide();});$(".deals-click").click(function(){$(".flight_cdeal").hide();$(this).siblings(".flight_cdeal").show();});$(".clos_btn").click(function(){$(".flight_cdeal").hide();});$(".farediv").click(function(){$(this).submit();});$(".page-title+div .fa").click(function(){$(".fly_filter").show();});$(".filter_close span, .transfilterdv").click(function(){$(".fly_filter").hide();$(".transfilterdv").hide();});});$(document).ready(function(){$(".farediv").click(function(){$(".submit_form").click();});$(document).on("click",".filter-btn",function(){$(".fly_filter").show();$(".transfilterdv").show();});$(".navbar-toggle").click(function(){$(".transmenuu").show();});$(".transmenuu").click(function(){$(".navbar-toggle").click();});$(".trnshidee").click(function(){$(this).fadeOut(500);});});$(document).ready(function(){var count=1;var paxcount=1;$("#gi_adult_next").click(function(){var child_val=$(".child_input").val();var adt_val=$(".adt_input").val();var adt_child_to=Number(adt_val)+Number(child_val);if(adt_child_to<9){adt_val++;document.getElementById("gi_adult_text").innerHTML=adt_val;$(".adt_input").val(adt_val);}
travellercountt()});$("#gi_adult_prev").click(function(){var adt_val=$(".adt_input").val();var infent_val=$(".infent_input").val();if(adt_val>1){adt_val--;document.getElementById("gi_adult_text").innerHTML=adt_val;$(".adt_input").val(adt_val);if(infent_val>adt_val){document.getElementById("gi_adult_texti").innerHTML=adt_val;$(".infent_input").val(adt_val);}}
travellercountt()});$("#gi_adult_nextc").click(function(){var adt_val=$(".adt_input").val();var child_val=$(".child_input").val();var adt_child_to=Number(adt_val)+Number(child_val);if(adt_child_to<9){child_val++;document.getElementById("gi_adult_textc").innerHTML=child_val;$(".child_input").val(child_val);}
travellercountt()});$("#gi_adult_prevc").click(function(){var child_val=$(".child_input").val();if(child_val>0){child_val--;document.getElementById("gi_adult_textc").innerHTML=child_val;$(".child_input").val(child_val);}
travellercountt()});$("#gi_adult_nexti").click(function(){var adt_val=$(".adt_input").val();var infent_val=$(".infent_input").val();if(infent_val<adt_val){infent_val++;document.getElementById("gi_adult_texti").innerHTML=infent_val;$(".infent_input").val(infent_val);}
travellercountt()});$("#gi_adult_previ").click(function(){var adt_val=$(".adt_input").val();var infent_val=$(".infent_input").val();if(infent_val>0){infent_val--;document.getElementById("gi_adult_texti").innerHTML=infent_val;$(".infent_input").val(infent_val);}
travellercountt()});$(".raj_radio").click(function(){var farecls=$(this).text();$(this).parents(".passengerdv").find(".flight_class").text(farecls);});});function travellercountt(){var adtval=0;var chdval=0;var infval=0;adtval=parseInt(document.forms["flight-form"]["adltvalue"].value);chdval=parseInt(document.forms["flight-form"]["childvalue"].value);infval=parseInt(document.forms["flight-form"]["infantdvalue"].value);$(".totl_paxcount").text(adtval+chdval+infval);}
$(document).ready(function(){var count=1;var paxcount=1;$("#gi_adult_nextm").click(function(){var child_val=$(".child_inputm").val();var adt_val=$(".adt_inputm").val();var adt_child_to=Number(adt_val)+Number(child_val);if(adt_child_to<9){adt_val++;document.getElementById("gi_adult_textm").innerHTML=adt_val;$(".adt_inputm").val(adt_val);}
travellercounttm()});$("#gi_adult_prevm").click(function(){var adt_val=$(".adt_inputm").val();var infent_val=$(".infent_inputm").val();if(adt_val>1){adt_val--;document.getElementById("gi_adult_textm").innerHTML=adt_val;$(".adt_inputm").val(adt_val);if(infent_val>adt_val){document.getElementById("gi_adult_textim").innerHTML=adt_val;$(".infent_inputm").val(adt_val);}}
travellercounttm()});$("#gi_adult_nextcm").click(function(){var adt_val=$(".adt_inputm").val();var child_val=$(".child_inputm").val();var adt_child_to=Number(adt_val)+Number(child_val);if(adt_child_to<9){child_val++;document.getElementById("gi_adult_textcm").innerHTML=child_val;$(".child_inputm").val(child_val);}
travellercounttm()});$("#gi_adult_prevcm").click(function(){var child_val=$(".child_inputm").val();if(child_val>0){child_val--;document.getElementById("gi_adult_textcm").innerHTML=child_val;$(".child_inputm").val(child_val);}
travellercounttm()});$("#gi_adult_nextim").click(function(){var adt_val=$(".adt_inputm").val();var infent_val=$(".infent_inputm").val();if(infent_val<adt_val){infent_val++;document.getElementById("gi_adult_textim").innerHTML=infent_val;$(".infent_inputm").val(infent_val);}
travellercounttm()});$("#gi_adult_previm").click(function(){var adt_val=$(".adt_inputm").val();var infent_val=$(".infent_inputm").val();if(infent_val>0){infent_val--;document.getElementById("gi_adult_textim").innerHTML=infent_val;$(".infent_inputm").val(infent_val);}
travellercounttm()});$(".raj_radio").click(function(){var farecls=$(this).text();$(this).parents(".passengerdv").find(".flight_class").text(farecls);});});function travellercounttm(){var adtval=0;var chdval=0;var infval=0;adtval=parseInt(document.forms["search_form_flight"]["adltvalue"].value);chdval=parseInt(document.forms["search_form_flight"]["childvalue"].value);infval=parseInt(document.forms["search_form_flight"]["infantdvalue"].value);$(".totl_paxcountm").text(adtval+chdval+infval);}
$(function(){$(".modifybtn").click(function(){$(".ModifyserDV").slideToggle();$(".fly_filter").hide();});$(document).ready(function(){$('[data-toggle="tooltip"]').tooltip();});});$(function(){$(".FdetLoginbtn").click(function(){$("[data-loginwarp]").stop(true,false).addClass('Loginfixside',1);$(".FloginTrans").show();});$(".LoGinhidebtn").click(function(){$("[data-loginwarp]").stop(true,false).removeClass('Loginfixside',1);$(".FloginTrans").hide();});$(".FloginTrans").click(function(){$(".LoGinhidebtn").click();});$("[data-loginbtn]").click(function(){$("[data-loginwarp]").stop(true,false).addClass('addheight',150);$(".raj_transinup").show();});$(".signclose,.raj_transinup").click(function(){$("[data-loginwarp]").stop(true,false).removeClass('addheight',150);$(".raj_transinup").hide();$(".trnshidee").click();});$("[data-signupbtn]").click(function(){$("#travelo-login, #travelo-forgot-password").stop(true,false).hide();$("#travelo-signup").stop(true,false).show();});$("[data-signInbtn]").click(function(){$("#travelo-signup, #travelo-forgot-password").stop(true,false).hide();$("#travelo-login").stop(true,false).show();});$("[data-Forgottbtn]").click(function(){$("#travelo-signup").stop(true,false).hide();$("#travelo-login").stop(true,false).hide();$("#travelo-forgot-password").stop(true,false).show();});$("[data-travelbtn]").click(function(){$(this).parents(".passengerdv").find("[data-travelbtnshow]").slideDown();$(".paxtrans").show();});$(".travelclose").click(function(){$(this).parents(".passengerdv").find("[data-travelbtnshow]").slideUp();$(".paxtrans").hide();});$(".paxtrans").click(function(){$("[data-travelbtnshow]").slideUp();$(this).hide();});$(".ToggLe").click(function(){$(".Descnc").slideToggle();});$(".Mbtn_continue").click(function(){$(".atr-clickbtn").click();});});$(function(){var i=2;var s;var licount=$("#hotelslider ul.slidul li").length;$("#next").click(function(e){e.preventDefault();$("#hotelslider ul.slidul li:visible").fadeOut(1000);$("#hotelslider ul.slidul li:nth-child("+i+")").fadeIn(1000);i++;if(i>licount){i=1;}});$("#hotelslider ul.slidul li img,#next").hover(function(){clearInterval(s);},function(){s=setInterval("$('#next').click()",9000);});s=setInterval("$('#next').click()",9000);});
$(function() {
    $(".GetAcallBack a:last-child, a.VisaApplyBTN").click(function() {
        $(".Query_form").addClass('Query_hAuto');
		$(".qureytrans").fadeIn(1000);
		$(".Closee").fadeIn(1000);
    });
    $(".Closee").click(function() {
        $(".Query_form").removeClass('Query_hAuto');
		$(".qureytrans, .SuccessText").fadeOut(1000);
		$(".Closee").fadeOut(1000);
		$(".CallMeBack").fadeOut(1000).removeClass('CalBackAdcls');
    });
    $("a.wntcallus").click(function() { 
		var imgg = $(this).parents(".PackageList").find('img').attr('src');
		var packhed = $(this).parents(".PackageList").find('p.pTxt').text();
		$(".CallMeBack #img").attr('src',imgg);
		$(".CallMeBack h2").text(packhed);
		$("#pacake_newname").val(packhed);
		$(".CallMeBack").fadeIn(1000); 
		$(".qureytrans").fadeIn(1000);
		$(".Closee").fadeIn(1000);
    });
	$(".GetAcallBack a:first-child").click(function() {
		var imgg2 = $('#Defaultimg').attr('src'); 
        $(".CallMeBack").fadeIn(1000).addClass('CalBackAdcls');
		$(".CallMeBack #img").attr('src',imgg2);
		$(".CallMeBack h2").text('Get this Holiday Exclusively for You!');		
		$(".qureytrans").fadeIn(1000);
		$(".Closee").fadeIn(1000);
    });
	$("div.DetHeading ul li a").click(function(){
		$("div.DetHeading ul li a").removeClass('ActiveCls');
		$(this).addClass('ActiveCls');
	});
	var GTotal = $(".GTotla").text();
	$(".PaxTopPricesw .PriceDv strong").text(GTotal);
	$("div.Filter_warp ul li a").click(function(){
		$("div.FilterTrans").show();
		$(".DropDown").hide();
		$(this).siblings(".DropDown").slideToggle();
	});
	$("div.FilterTrans").click(function(){
		$(".DropDown").hide();
		$(this).hide();
	});
});
document.getElementById("reqId").innerHTML =
Math.floor(Math.random()  * 10000);