$=jQuery.noConflict();$(".hotel_auto_from").autocomplete({source:function(request,response){var home_url=$("#siteurl").val();var url=home_url+'hotel/get_city_state';$.ajax({url:url,dataType:"json",data:{term:request.term},success:function(data){response(data);}});},minLength:2,open:function(){$(".ui-autocomplete").addClass('hotelautocmp').removeClass('autocomplet_effect');},select:function(event,ui){$("#cityDom").val(ui.item.id);$(".hotel_cheak_in").focus();}});function travellercount()
{var adtval=0;var chdval=0;var lengthshow=$(".totel_room").val();for(i=1;i<=lengthshow;i++){adtval+=parseInt(document.forms["hotelform"]["room"+i+"adult"].value);chdval+=parseInt(document.forms["hotelform"]["room"+i+"child"].value);}
$(".sct_people_count").html(adtval+chdval);$(".sct_room_count").html(lengthshow);}
function get_hotel_adt(thisval)
{travellercount();}
$(function(){$(".child_1").change(function(){var child_val=this.value;travellercount();if(!child_val==0){var div_child='';var i=1;for(i=1;i<=child_val;i++){div_child+='<div class="col-md-3 col-xs-6"><label>Age</label><div class="selector" ><select class="full-width" name="room_1_age_'+i+'"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select><span class="custom-select full-width">1</span></div></div>';}
$("#child_age_room").html(div_child);}});var room=2;$(".add_room").click(function(){if(room<=4){$(".totel_room").val(room);var room_d='<div id="room_remov_'+room+'"><hr><h5 class="title">Room '+room+'</h5><div class="row"><div class="col-md-3 col-xs-6"><label>Adult(S)</label><div class="selector"><select class="full-width" name="room'+room+'adult" onchange="get_hotel_adt(this)""><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select><span class="custom-select full-width">1</span></div></div><div class="col-md-3 col-xs-6"><label> Child </label><div class="selector" ><select class="full-width child_1" name="room'+room+'child" onchange="add_child_age('+room+',this.value)"><option value="0">0</option><option value="1">1</option><option value="2">2</option></select><span class="custom-select full-width">0</span></div></div><div class="" id="child_age_room'+room+'"></div></div></div>';$(".room_data").append(room_d);$(".remove_btt").show();$("#carousel-id .item img").css({"height":"660px"});if(room==3){$("#carousel-id .item img").css({"height":"780px"});}
if(room==4){$("#carousel-id .item img").css({"height":"900px"});}
room++;if(room==5){$(".add_room").hide();}else{$(".add_room").show();}}
travellercount();});$(".remove_room").click(function(){room--;$("#room_remov_"+room).remove();var total_r=room-1;$(".totel_room").val(total_r);travellercount();if(room==2)
{$(".remove_btt").hide();$("#carousel-id .item img").css({"height":"560px"});}
if(room==3)
{$("#carousel-id .item img").css({"height":"660px"});}
if(room==4)
{$("#carousel-id .item img").css({"height":"780px"});$(".add_room").show();}});});function add_child_age(getroom,getselect)
{travellercount();if(!getselect==0){var div_child2='';var j=1;for(j=1;j<=getselect;j++){div_child2+='<div class="col-md-3 col-xs-6"><label>AGE</label><div class="selector" ><select class="full-width" name="room_'+getroom+'_age_'+j+'"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select><span class="custom-select full-width">1</span></div></div>';}
$("#child_age_room"+getroom).html(div_child2);}}
function custom_date_format(date)
{var create_date=date.split("-");return finaldate=create_date[1]+"/"+create_date[0]+"/"+create_date[2];}
$(function(){$(".cab_cheak_in").datepicker({showOn:'both',buttonImage:'assets/images/icon/blank.png',buttonText:'',buttonImageOnly:true,changeYear:false,showOtherMonths:true,minDate:0,dateFormat:"dd-mm-yy",dayNamesMin:["S","M","T","W","T","F","S"],beforeShow:function(input,inst){var themeClass=$(input).parent().attr("class").replace("datepicker-wrap","");$('#ui-datepicker-div').attr("class","");$('#ui-datepicker-div').addClass("ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all date_class_z");$('#ui-datepicker-div').addClass(themeClass);},onClose:function(selectedDate){var finaldate=custom_date_format(selectedDate);var myDate=new Date(finaldate);myDate.setDate(myDate.getDate()+1);$(".cab_cheak_out").datepicker("option","minDate",myDate);}});$(".cab_cheak_out").datepicker({showOn:'both',buttonImage:'assets/images/icon/blank.png',buttonText:'',buttonImageOnly:true,changeYear:false,showOtherMonths:true,minDate:0,dateFormat:"dd-mm-yy",dayNamesMin:["S","M","T","W","T","F","S"],beforeShow:function(input,inst){var themeClass=$(input).parent().attr("class").replace("datepicker-wrap","");$('#ui-datepicker-div').attr("class","");$('#ui-datepicker-div').addClass("ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all");$('#ui-datepicker-div').addClass(themeClass);},onClose:function(selectedDate){$(".cab_cheak_in").datepicker("option","maxDate",selectedDate);}});});function slidedown_rate(getid)
{$('.breakup').parents(".parentt").children(".slide2"+getid).slideToggle();}
function room_block(roomindex,roomsct){var url=$("#siteurl").val();$(".hbtn_hit").attr("disabled","disabled");var select_room_session=$('.select_room').parents('.arr-parrent').children('.child').attr('id-room');var selects_hotel_info=$('.select_room').parents('.arr-parrent').children('.child').attr('selects-hotel-info');var hotel_name=$('.hotel_name').text();$('.loder_'+roomindex+'').after('<img src="'+url+'assets/images/room_block_loading.gif" class="loader loaderselected loading_img" />').attr('disabled','disabled');$.ajax({type:"POST",url:url+'hotel/BlockRoom',data:{roomindex:roomindex,roomsct:roomsct,select_room_session:select_room_session,selects_hotel_info:selects_hotel_info,hotel_name:hotel_name},success:function(data){$('.loading_img').hide();var res=data.split("$-");if(res[0]=='true'){location.href=url+"hotel/booking_details/"+res[1];}else{$('#booking_conform').modal('show');$("#hotel_status").html(res[1]);}}});}
$(".CancellationPolicyBtn").click(function(){$(this).parent().parent().next("tr").children(".CancellationPolicyBtnTD").slideToggle(100);});function conformation_false()
{$(".hbtn_hit").removeAttr("disabled");}
$(function(){$('.issue_expiry_date').datepicker({showOn:'both',buttonImage:'assets/images/icon/blank.png',buttonText:'',buttonImageOnly:true,changeYear:true,showOtherMonths:true,minDate:"-10Y",maxDate:"0D",dateFormat:"dd-mm-yy",dayNamesMin:["S","M","T","W","T","F","S"],beforeShow:function(input,inst){var themeClass=$(input).parent().attr("class").replace("datepicker-wrap","");$('#ui-datepicker-div').attr("class","");$('#ui-datepicker-div').addClass("ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all");$('#ui-datepicker-div').addClass(themeClass);},});$(".passport_expiry_date").datepicker({showOn:'both',buttonImage:'assets/images/icon/blank.png',buttonText:'',buttonImageOnly:true,changeYear:true,showOtherMonths:true,minDate:"1D",maxDate:"+10Y",dateFormat:"dd-mm-yy",dayNamesMin:["S","M","T","W","T","F","S"],beforeShow:function(input,inst){var themeClass=$(input).parent().attr("class").replace("datepicker-wrap","");$('#ui-datepicker-div').attr("class","");$('#ui-datepicker-div').addClass("ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all");$('#ui-datepicker-div').addClass(themeClass);},});});$(function(){$("#s_pax").click(function(){$("#show_tra").toggle("slow",function(){});});});function opencomb(indexs,charges,room)
{var total_price=0;var index='';$(".radio_class").each(function(){if($(this).is(':checked'))
{total_price+=parseInt($(this).attr('charge'));index+=$(this).val()+'_';}
$(".total_pri").html(total_price);$("#booknowbtn").attr('data-roomsct',index.slice(0,-1));});}
function roomblock_OpenCob(getval)
{var home_url=$("#siteurl").val();$(".Open_Cb").attr("disabled","disabled");$('.Open_Cb').after('<img src="'+home_url+'assets/images/room_block_loading.gif" class="loader loaderselected loading_img" />');var roomsct=$(getval).data('roomsct');var select_room_session=$(getval).data('id_room');var selects_hotel_info=$(getval).data('selects_hotel_info');var hotel_name=$('.hotel_name').text();$.ajax({type:"POST",url:home_url+'hotel/BlockRoom_Open',data:{roomsct:roomsct,select_room_session:select_room_session,selects_hotel_info:selects_hotel_info,hotel_name:hotel_name},success:function(data){$('.loading_img').hide();var res=data.split("$-");if(res[0]=='true'){location.href=home_url+"hotel/booking_details/"+res[1];}else{$('#booking_conform').modal('show');$("#hotel_status").html(res[1]);}}});}
$(function(){$(".collapsed").click(function(){var mftotal_room=$(".totel_room").val();if(mftotal_room==4){$(".add_room_modify").hide();}
if(mftotal_room<=1){$(".h_butt").hide();}else{$(".h_butt").show();}});});$(function(){var roomss=$(".totel_room").val();var rooms=parseInt(roomss)+1;var room=rooms;$(".add_room_modify").click(function(){if(room<=4){$(".totel_room").val(room);var room_d='<div id="room_remov_'+room+'"><hr><h5 class="title">Room '+room+'</h5><div class="row"><div class="col-xs-3"><label>Adults</label><div class="selector"><select class="full-width" name="room'+room+'adult"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select><span class="custom-select full-width">1</span></div></div><div class="col-xs-3"><label> Children </label><div class="selector" ><select class="full-width child_1" name="room'+room+'child" onchange="add_child_age('+room+',this.value)"><option value="0">0</option><option value="1">1</option><option value="2">2</option></select><span class="custom-select full-width">0</span></div></div><div class="" id="child_age_room'+room+'"></div></div></div>';$(".room_data").append(room_d);$(".remove_roo").show();room++;if(room==5){$(".add_room_modify").hide();}else{$(".add_room_modify").show();}}else{$(".add_room_modify").hide();}});$(".remove_roo").click(function(){room--;$("#room_remov_"+room).remove();$(".totel_room").val(room-1);if(room==2)
{$(".h_butt").hide();}
if(room==4)
{$(".add_room_modify").show();}});});$(function(){var price_array=new Array();$("[atr-sort]").find("[atr-hotel_price]").each(function(index,elem){price_array.push(elem.getAttribute('atr-hotel_price'));});Array.prototype.max=function(){return Math.max.apply(null,this);};Array.prototype.min=function(){return Math.min.apply(null,this);};var price_min=price_array.min();var price_max=price_array.max();setTimeout(function(){$(".price-range-hotel").slider({range:true,min:price_min,max:price_max,values:[price_min,price_max],slide:function(event,ui){$(".minpriceshowHotel").html("<i class='fa fa-inr'></i>"+ui.values[0]);$(".maxpriceshowHotel").html("<i class='fa fa-inr'></i>"+ui.values[1]);var mi=ui.values[0];var mx=ui.values[1];shortfilterprice(mi,mx);if(price_min<ui.values[0]||price_max>ui.values[1]){$("[atr-remove-price-sort]").show();}else{$("[atr-remove-price-sort]").hide();}}});$(".minpriceshowHotel").html("<i class='fa fa-inr'></i>"+$(".price-range-hotel").slider("values",0));$(".maxpriceshowHotel").html("<i class='fa fa-inr'></i>"+$(".price-range-hotel").slider("values",1));$('[atr-remove-price-sort]').click(function(){$("[atr-remove-price-sort]").hide();shortfilterprice(price_min,price_max);$(".price-range-hotel").slider("values",0,price_min);$(".price-range-hotel").slider("values",1,price_max);$(".minpriceshowHotel").html("<i class='fa fa-inr'></i>"+price_min);$(".maxpriceshowHotel").html("<i class='fa fa-inr'></i>"+price_max);});},1000);function hotel_count()
{$('.count_sotr').html($('[atr-hotel-list]').length+' of '+$('[atr-sort]').length);if(($('[atr-sort]:visible').length)==0){$('.hotel_result_not').show();}else{$('.hotel_result_not').hide();}}
function shortfilterprice(minPrice,maxPrice){var $columns=$("[atr-sort]");var Hotel_list=0;$columns.find("[atr-hotel_price]").each(function(index,elem){var price=elem.getAttribute('atr-hotel_price');var STAR=elem.getAttribute('atr-star');var trues=elem.getAttribute('atr-star-sort');if(price<=minPrice||price>=maxPrice){$(this).parents("[atr-sort]").hide();$(this).parents("[atr-sort]").removeAttr("atr-price-sort");$(this).parents("[atr-sort]").removeAttr("atr-hotel-list");}
if(price>=minPrice&&price<=maxPrice){$(this).parents("[atr-sort]").hide();if(Hotel_list<=20){$(this).parents("[atr-sort]").show();Hotel_list++;}
$(this).parents("[atr-sort]").attr("atr-price-sort","true");$(this).parents("[atr-sort]").attr("atr-hotel-list","true");}});hotel_count();}
$(".select_star").click(function(){var checked_Ay=[];$('input[type=checkbox]').each(function(){if(this.checked){checked_Ay.push(this.value);}});if(checked_Ay.length>0){$("[atr-remove-star-sort]").show();}else{$("[atr-remove-star-sort]").hide();}
var Hotel_list=0;var $columns=$("[atr-sort]");$columns.find("[atr-star]").each(function(index,elem){var STAR=elem.getAttribute('atr-star');if(checked_Ay.length>0){if($.inArray(STAR,checked_Ay)!=-1){$(this).parents("[atr-sort]").hide();if(Hotel_list<=20){$(this).parents("[atr-sort]").show();Hotel_list++;}
$(this).parents("[atr-sort]").attr("atr-star-sort","true");$(this).parents("[atr-sort]").attr("atr-hotel-list","true");}else{$(this).parents("[atr-sort]").hide();$(this).parents("[atr-sort]").removeAttr("atr-star-sort");$(this).parents("[atr-sort]").removeAttr("atr-hotel-list");}}else{$(this).parents("[atr-sort]").hide();if(Hotel_list<=20){$(this).parents("[atr-sort]").show();Hotel_list++;}
$(this).parents("[atr-sort]").attr("atr-hotel-list","true");$(this).parents("[atr-sort]").removeAttr("atr-star-sort");$(this).parents("[atr-sort]").removeAttr("atr-price-sort");}});hotel_count();});$('[atr-remove-star-sort]').click(function(){$('input[type=checkbox]').each(function(){if(this.checked){$(this).parents().removeClass("checked");$(this).prop('checked',false);}});$("[atr-remove-star-sort]").hide();var $columns=$("[atr-sort]");var Hotel_list=0;$columns.find("[atr-star]").each(function(index,elem){if(Hotel_list<=20){$(this).parents("[atr-sort]").show();Hotel_list++;}
$(this).parents("[atr-sort]").attr("atr-hotel-list","true");$(this).parents("[atr-sort]").removeAttr("atr-star-sort");$(this).parents("[atr-sort]").removeAttr("atr-price-sort");});hotel_count();});$('[atr-remove-name-sort]').click(function(){$(".hotelnemep").val("");$(".hotel_reset").hide();$("[atr-remove-star-sort]").hide();var $columns=$("[atr-sort]");var Hotel_list=0;$columns.find("[atr-star]").each(function(index,elem){if(Hotel_list<=20){$(this).parents("[atr-sort]").show();Hotel_list++;}
$(this).parents("[atr-sort]").attr("atr-hotel-list","true");$(this).parents("[atr-sort]").removeAttr("atr-star-sort");$(this).parents("[atr-sort]").removeAttr("atr-price-sort");});hotel_count();});function getresult(page){var VISIBLE=$('[atr-sort]:visible').length;var SORT_ATR_S=$('[atr-star-sort]').length;var SORT_ATR_P=$('[atr-price-sort]').length;if(SORT_ATR_S>0){if(VISIBLE<SORT_ATR_S){var item=0;$("[atr-star-sort]").each(function(index,elem){if(index>VISIBLE){if(item<20){$(this).show();item++;}}});}
hotel_count();}else if(SORT_ATR_P>0){if(VISIBLE<SORT_ATR_P){var item=0;$("[atr-price-sort]").each(function(index,elem){if(index>VISIBLE){if(item<20){$(this).show();item++;}}});hotel_count();}}else if(parseInt(SORT_ATR_S)+parseInt(SORT_ATR_P)==0){var Start=parseInt(page);var STOP=parseInt(page)+20;var i;for(i=Start;i<=STOP;i++){$(".Scrool_"+i).show();}}}
$(window).scroll(function(){if($(window).scrollTop()==$(document).height()-$(window).height()){var lastpage=parseInt($(".pagenum").val());var stoppage=parseInt($(".stoppagination").val());if(lastpage<=stoppage){var pagenum=parseInt($(".pagenum").val())+1;var Last_page=pagenum+20;$(".pagenum").val(Last_page);getresult(pagenum);}else{}}});$('[atr-submits-button]').click(function(){var home_url=$("#siteurl").val();var bookingid=$("#bookingid").val();$(this).submit();$('[atr-submit-button]').attr('disabled','disabled');;if($("#travelersdetails .error").length==0){var paymentmethod=$('input[name=paymentmethod]:checked').val();if(paymentmethod=='byonline'){$("#travelersdetails").submit();}else if(paymentmethod=='bywallet'){$.ajax({type:"POST",url:home_url+'hotel/checkwalletbalance',data:{bookingid:bookingid,},success:function(data,status){var data=$.trim(data);if(data=="vaild"){$("#travelersdetails").submit();}else{alert(data);$('[atr-submit-button]').removeAttr('disabled');}}});}else{alert('This Type Of Payment Option Not Available');$('[atr-submit-button]').removeAttr('disabled');}}else{alert('Please Fill Required Fields !!');$('[atr-submit-button]').removeAttr('disabled');}});});$(document).ready(function(){$(".selecthotelguestclick").click(function(){$(".selecthotelguestgrabber").slideToggle();});$(".done-h-t").click(function(){$(".selecthotelguestgrabber").hide();});});