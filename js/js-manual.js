$(function(){$(".datepicker").datepicker({inline:true,showOtherMonths:true,numberOfMonths:2,minDate:0,dateFormat:'dd-mm-yy'}).datepicker('widget').wrap('<div class="ll-skin-latoja"/>');});$("#checkoutbus,#checkinhotel,.firstdatepicker").datepicker({defaultDate:"",inline:true,dateFormat:"dd-mm-yy",minDate:0,numberOfMonths:2,onClose:function(selectedDate){$("#checkinbus,#checkouthotel,.seconddatepicker").datepicker("option","minDate",selectedDate);$('.inter_auto-focus3').focus();}});$("#checkinbus,#checkouthotel,.seconddatepicker").datepicker({defaultDate:"",inline:true,dateFormat:"dd-mm-yy",minDate:0,numberOfMonths:2,});var url=$("#site_url").val();function ValidateEmail(email){var expr=/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;return expr.test(email);};$(".subscribe").click(function(){var url=$("#siteurl").val();var email=$("#email_ids").val();$('.subscribe').text('Submitting...');setTimeout(function(){$(".subscribe").text('Submit');},5000);if(email==''){$(".message").html("<samp style='color:red;'>Please Enter Your Email Id </samp>");setTimeout(function(){$(".message").text(' ');},5000);}else if(!ValidateEmail(email)){$(".message").html("<samp style='color:red;'>Please Enter a Valid Email</samp>");setTimeout(function(){$(".message").text(' ');},5000);}else{$.ajax({url:url+'home/save_newsletter',type:"post",data:$("#Subscribe_Newsletters").serialize(),success:function(data){if(data=="false"){$(".message").html("<samp style='color:red;'>Email Already Exist! </samp>");$('.subscribe').text('Submit');$("#Subscribe_Newsletters")[0].reset();setTimeout(function(){$(".message").text(' ');},2000);}else{$(".message").html("<samp style='color:white;'>NewsLetter Successfully Submitted</samp>");$('.subscribe').text('Submit');$("#Subscribe_Newsletters")[0].reset();setTimeout(function(){$(".message").text(' ');},2000);}}});}});$(".sendcontact").click(function(){$(".success-message").html('');$(".success-message").show(1000);$('.loder').show();$('.sendcontact').text('Submitting...');$.ajax({url:url+'page/contact',type:"post",dataType:"json",data:$("#save_contact").serialize(),success:function(data){if(data['type']=="error"){$('.loder').hide();$('.sendcontact').text('Submit');}else{$('.sendcontact').show();$('.loder').hide();$('.sendcontact').text('Submit');}
$(".success-message").html(data['message']);setTimeout(function(){$(".success-message").hide(1000);$("#save_contact")[0].reset();},5000);}});});$(".sendpackages").click(function(){$(".success-message-msg").html('');$(".success-message-msg").show(1000);$('.loder').show();$('.sendpackages').text('Submitting...');$.ajax({url:url+'package/package_query',type:"post",dataType:"json",data:$("#packages_save").serialize(),success:function(data){if(data['type']=="error"){$('.loder').hide();$('.sendpackages').text('Submit');}else{$('.loder').hide();$('.sendpackages').text('Submit');$("#packages_save")[0].reset();}
$(".success-message-msg").html(data['message']);setTimeout(function(){$(".success-message-msg").hide(1000);},5000);}});});$(".jai_feedback").click(function(){var site_url=$('#siteurl').val();$(".listinghotel_error").html('');$(".success_msg").show(1000);$(".validation_msg").show(1000);$('.jai_feedback').attr('disabled','disabled');$.ajax({url:site_url+'feedback-query',type:"post",dataType:"json",data:$("#feedback_forms").serialize(),success:function(data){$('.jai_feedback').removeAttr('disabled');if(data['type']=="error"){var formData=$("#feedback_forms");$.each(data['message'],function(key,val){$('[name="'+key+'"]',formData).after(val);});}
if(data['type']=="errors"){$(".validation_msg").html(data['message']);setTimeout(function(){$(".validation_msg").fadeOut('slow');},5000);}else{$(".success_msg").html(data['message']);setTimeout(function(){$(".success_msg").fadeOut('slow');},5000);$("#feedback_forms")[0].reset();}}});});$(function(){$(".visa_enquery").click(function(){$(".listinghotel_error").remove();$(".validation_msg").html('');$(".success_msg").show(1000);$(".success_msg").html('');var home_url=$('#siteurl').val();var url=home_url+'visa-query';$.ajax({url:url,type:"post",dataType:"json",data:$("#visa_query").serialize(),success:function(data){if(data['type']=="error"){var formData=$("#visa_query");$.each(data['message'],function(key,val){$('[name="'+key+'"]',formData).after(val);});}else{$(".success_msg").html(data['message']);setTimeout(function(){$(".success_msg").fadeOut('slow');},5000);$("#visa_query")[0].reset();}}});});});$(".get_packsearch").autocomplete({source:function(request,response){var url='home/get_city_state';$.ajax({url:url,dataType:"json",data:{term:request.term},success:function(data){console.log(data)
response(data);}});},minLength:1,open:function(){$(".ui-autocomplete").html(data['message']);},select:function(event,ui){$("#cityDom").val(ui.item.id);}});$(document).ready(function(){$(".hideflightcoach").click(function(){$("#flightbooking .paxcount_dv5").click();});$(".atr-clickbtn").click(function(){$("#travelersdetails").find(".atr-getname").each(function(){var gettext=$(this).val();var htmldata="<label class='col-xs-3'> "+gettext+"</label>";$("#gethtmll").append(htmldata);});});$(".atr-clickbtn").click(function(){$("#travelersdetails").find(".art-paxtype").each(function(){var paxtext=$(this).text();var paxdata="<label class='col-xs-12 rjp0'> "+paxtext+"</label>";$("#getpaxtitle").append(paxdata);});});$(".atr-reset").click(function(){$("#gethtmll, #getpaxtitle").html(" ");});$(".atr-clickbtn").click(function(){$(this).submit();var error="";$(this).parents("#travelersdetails").find(".error").each(function(){var textvalue=$(this).val();if(textvalue==""||textvalue==null){error="yes";return false;}else{error="no";}});if(error=="yes"){$("#gethtmll, #getpaxtitle").html(" ");return false;}else{if(!$("#terms").is(":checked")){alert("Please accept terms and conditions");return false;}
else{$("#myModal").modal('show');}}});});$(document).ready(function(){var site_name=$("#site_url").val();var class_name=$("#site_fetch_class").val();var method_name=$("#site_fetch_method").val();if(class_name=="home"&&method_name=="index"){$(".flightbookingclick").click(function(){$(".flightbookingbtn").click();});$(".hotelbookingclick").click(function(){$(".hotelbookingbtn").click();});$(".busbookingclick").click(function(){$(".busbookingbtn").click();});$(".packagebookingclick").click(function(){$(".packagebookingbtn").click();});}else{$(".flightbookingclick,.hotelbookingclick,.busbookingclick").click(function(){window.location.href=site_name;});}});$(document).ready(function(){$("#bookpackage_form").modal("show");});$(document).ready(function(){$(".hotelfilter").click(function(){$(".hotelfilterbox").slideToggle();});});$(document).ready(function(){$(".showhidemodifysearch").click(function(){$(".ModifyserDV").slideToggle();$(".modTrans").slideToggle(1);$(this).children('.fa-plus').toggleClass('fa-minus');$(this).toggleClass('radb0');});$("[data-ModifyClos], .modTrans").click(function(){$(".ModifyserDV").slideUp();$(".modTrans").slideUp(1);$(".showhidemodifysearch .fa-plus").toggleClass('fa-minus');});});$(document).ready(function(){$('.switchinputvalue').on('click',function(e){e.preventDefault();var obj={"address":$('#md_from_location').val(),"address2":$('#md_to_location').val()};$('#md_from_location').val(obj.address2);$('#md_to_location').val(obj.address);});});$(document).ready(function(){var site_name=$("#site_url").val();var class_name=$("#site_fetch_class").val();var method_name=$("#site_fetch_method").val();if(class_name=="home"&&method_name=="index"){$(".flightbookingclick").click(function(){$(".flightbookingbtn").click();});$(".hotelbookingclick").click(function(){$(".hotelbookingbtn").click();});}else{$(".flightbookingclick,.hotelbookingclick").click(function(){window.location.href=site_name;});}});$(document).ready(function(){$(".allpassrow").find(".passengerdiv").eq(0).children(".book_passenger").hide();$(".allpassrow").find(".passengerdiv").eq(0).addClass("bttnone");});$(document).ready(function(){$(".morehotelpara").click(function(){$(this).next("span").slideToggle();});});var url=window.location.href;var activeTab=url.substring(url.indexOf("#")+1);$('.nav-tabs a[href="#'+activeTab+'"]').tab('show');$('[data-toggle="tab"]').click(function(){var active_tab_url=$(this).attr("href");window.location.hash=active_tab_url;});