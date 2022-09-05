$ = jQuery.noConflict();
$(function () {
    var home_url = $("#siteurl").val();
    var currenturl = $("#currenturl").val();
    $(".contry-id").click(function () {
        $(".contruA").html("");
        $.ajax({
            url: home_url + "userinfo/get_contry",
            dataType: "json",
            data: { home_url: home_url },
            success: function (data) {
                $.each(data, function (key, value) {
                    $(".contruA").append("<option value=+" + value.phonecode + ">" + value.name + "(+" + value.phonecode + ")</option>");
                });
            },
        });
    });
    $(".suer_signup").click(function () {
        $(".ragistererror").remove();
        var home_url = $("#siteurl").val();
        $(".user-signup-message").show(1000);
        $.ajax({
            url: home_url + "userinfo",
            type: "post",
            dataType: "json",
            data: $("#registration_user").serialize(),
            success: function (data) {
                if (data["type"] == "error") {
                    var formData = $("#registration_user");
                    $.each(data["message"], function (key, val) {
                        $('[name="' + key + '"]', formData).after(val);
                    });
                    setTimeout(function () {
                        $(".ragistererror").hide(1000);
                    }, 5000);
                } else {
                    $("#registration_user")[0].reset();
                    if (currenturl == home_url + "flight/booking_detail") {
                        setTimeout(function () {
                            window.location.href = currenturl + "?login=true";
                        }, 2000);
                    } else {
                        setTimeout(function () {
                            window.location = currenturl;
                        }, 2000);
                    }
                }
                $(".user-signup-message").html(data["message"]);
                setTimeout(function () {
                    $(".user-signup-message").hide(1000);
                }, 5000);
            },
        });
    });
    $(".suer_signupp").click(function () {
        var home_url = $("#siteurl").val();
        $(".user-signup-message").show(1000);
        $.ajax({
            url: home_url + "userinfo",
            type: "post",
            dataType: "json",
            data: $("#registration_user").serialize(),
            success: function (data) {
                if (data["type"] == "error") {
                    var formData = $("#registration_user");
                    $.each(data["message"], function (key, val) {
                        $('[name="' + key + '"]', formData).after(val);
                    });
                } else {
                    $("#registration_user")[0].reset();
                    if (currenturl == home_url + "flight/booking_detail") {
                        setTimeout(function () {
                            window.location.href = currenturl + "?login=true";
                        }, 2000);
                    } else {
                        setTimeout(function () {
                            window.location = currenturl;
                        }, 2000);
                    }
                }
                $(".user-signup-message").html(data["message"]);
                setTimeout(function () {
                    $(".user-signup-message").hide(1000);
                }, 5000);
            },
        });
    });
    $(".login-user").click(function () {
        $(".user-login-message").show(1000);
        $.ajax({
            url: home_url + "userinfo/user_login",
            type: "post",
            dataType: "json",
            data: $("#login_user").serialize(),
            success: function (data) {
                if (data["type"] == "error") {
                } else {
                    $("#login_user")[0].reset();
                    if (currenturl == home_url + "flight/booking_detail") {
                        setTimeout(function () {
                            window.location.href = currenturl + "?login=true";
                        }, 2000);
                    } else {
                        setTimeout(function () {
                            window.location = currenturl;
                        }, 2000);
                    }
                }
                $(".user-login-message").html(data["message"]);
                setTimeout(function () {
                    $(".user-login-message").hide(1000);
                }, 5000);
            },
        });
    });
});
function userlogout() {
    var home_url = $("#siteurl").val();
    var currenturl = $("#currenturl").val();
    $.ajax({
        url: home_url + "userinfo/user_logout",
        success: function () {
            window.location = currenturl;
        },
    });
}
function selectcountry() {
    var home_url = $("#siteurl").val();
    $("#stateid").html("");
    $(".cityremove").html("");
    var element = $(".county").find("option:selected");
    var country = element.attr("countryid");
    $.ajax({
        url: home_url + "userinfo/getstate",
        dataType: "json",
        data: { country: country },
        success: function (data) {
            $.each(data, function (key, value) {
                $("#stateid").append("<option value=" + value.id + ">" + value.name + "</option>");
            });
        },
    });
}
function selectstate(getval) {
    var home_url = $("#siteurl").val();
    $(".cityremove").html("");
    $.ajax({
        url: home_url + "userinfo/getcity",
        dataType: "json",
        data: { getval: getval },
        success: function (data) {
            $.each(data, function (key, value) {
                $("#cityid").append("<option value=" + value.id + ">" + value.name + "</option>");
            });
        },
    });
}
$(document).ready(function () {
    $("#profile .edit-profile-btn").click(function (e) {
        e.preventDefault();
        $(".view-profile").fadeOut();
        $(".edit-profile").fadeIn();
    });
    $("input[type=radio][name=userfilter]").change(function () {
        if ($(this).val() == "Hotel") {
            $(".booking-history").hide();
            $(".userbookingforhotel").show();
        } else if ($(this).val() == "Flight") {
            $(".booking-history").hide();
            $(".userbookingforflight").show();
        } else if ($(this).val() == "Car") {
            $(".booking-history").hide();
            $(".userbookingforcar").show();
        } else if ($(this).val() == "Package") {
            $(".booking-history").hide();
            $(".userbookingforHoliday").show();
        } else if ($(this).val() == "Bus") {
            $(".booking-history").hide();
            $(".userbookingforbus").show();
        } else {
            $(".booking-history").hide();
            $(".userbookingforflight").show();
        }
    });
});
$('a[href="#profile"]').on("shown.bs.tab", function (e) {
    $(".view-profile").show();
    $(".edit-profile").hide();
});
function select_contry(val, thisvalue) {
    $(document).on("click", ".contruA", function () {
        $(".custom-select").text(val);
        $(".putcountrycode").val(val);
    });
}
$(function () {
    var home_url = $("#siteurl").val();
    $(".checkbox_login").click(function () {
        if (this.checked) {
            $(".lguest").hide();
            $(".llogin").show();
        } else {
            $(".lguest").show();
            $(".llogin").hide();
        }
    });
    $("[data-guestbtn]").click(function () {
        $(".loginformshow, .arrowback33,.lguest").show();
        $("[data-loginoptionbtn], .llogin, .getpassdiv").hide();
    });
    $(".arrowback33").click(function () {
        $(".loginformshow, .arrowback33, #signup, .getpassdiv").hide();
        $("[data-loginoptionbtn]").show();
    });
    $("[data-signupbtn]").click(function () {
        $("#signup, .arrowback33").show();
        $("[data-loginoptionbtn], .lguest, .llogin, .getpassdiv").hide();
    });
    $("[data-signinbtn]").click(function () {
        $(".checkbox_login").click();
        $(".loginformshow, .arrowback33, .llogin").show();
        $("[data-loginoptionbtn], .lguest, .getpassdiv").hide();
    });
    $(".booking-login-user").click(function () {
        $(this).submit();
        var email_id = $("#usersign_email").val();
        var passwords = $("#usersign_password").val();
        var currenturl = $("#currenturl").val();
        var url = $("#currenturl").val().split("/");
        $(".user-login-message").show(1000);
        $.ajax({
            url: home_url + "userinfo/user_login",
            type: "post",
            dataType: "json",
            data: { email_id: email_id, password: passwords },
            success: function (data) {
                if (data["type"] == "error") {
                    $(".user-login-message").html(data["message"]);
                } else {
                    if (currenturl == home_url + "flight/booking_detail") {
                        window.location.href = currenturl + "?login=true";
                    } else if (url[3] == "hotel") {
                        window.location.href = home_url + url[3] + "/get_pax_information/" + url[5];
                    } else {
                    }
                }
                $(".user-login-message").html(data["message"]);
                setTimeout(function () {
                    $(".user-login-message").hide(1000);
                }, 5000);
            },
        });
    });
    $(".booking_as_guest").click(function () {
        var home_url = $("#siteurl").val();
        var currenturl = $("#currenturl").val();
        var urls = currenturl.split("/");
        var email_id = $("#usersign_email").val();
        var contact_number = $("#usersign_contactnumber").val();
        var country_dial_code = $("#usersign_countrydailcode").val();
        $(".user-login-message").show(1000);
        $.ajax({
            url: home_url + "userinfo/booking_as_guest",
            type: "post",
            dataType: "json",
            data: { email_id: email_id, country_dial_code: country_dial_code, contact_number: contact_number },
            success: function (data) {
                console.log(data);
                if (data["type"] == "error") {
                    $(".user-login-message").html(data["message"]);
                } else {
                    if (currenturl == home_url + "flight/booking_detail") {
                        window.location.href = currenturl + "?login=true";
                    } else if (urls[3] == "hotel") {
                        window.location.href = home_url + urls[3] + "/get_pax_information/" + urls[5];
                    } else {
                        window.location.href = currenturl + "?login=true";
                    }
                }
                $(".user-login-message").html(data["message"]);
                setTimeout(function () {
                    $(".user-login-message").hide(1000);
                }, 5000);
            },
        });
    });
    $(".as_login_booking").click(function () {
        var url = $(".current_url").val().split("/");
        if (url[0] == "hotel") {
            window.location.href = home_url + url[0] + "/get_pax_information/" + url[2];
        } else {
        }
    });
});
function hotel_cancel(getid) {
    if (confirm("Do You Waant To Hotel Cancel")) {
        var home_url = $("#siteurl").val();
        $("#model_data_lod").load(location.href + " #model_data_lod");
        $("#anilhotel11").modal("show");
        $.ajax({
            type: "POST",
            url: home_url + "hotel/hotel_cancel",
            data: { getid: getid },
            dataType: "text",
            cache: false,
            success: function (data) {
                if (data) {
                    $(".anilhide").hide();
                    $(".datashow").show();
                    $(".cancelation_status").html(data);
                } else {
                    $(".anilhide").hide();
                    $(".datashow").show();
                    $(".cancelation_status").html("illegal access....!!!");
                }
            },
        });
    } else {
    }
}
$(".forgetpass-user").click(function () {
    $(this).prop("disabled", true);
    var home_url = $("#siteurl").val();
    $(".forgot-password-message").show(1000);
    $.ajax({
        url: home_url + "userinfo/user_forget_password",
        type: "post",
        dataType: "json",
        data: $("#forgotpass_user").serialize(),
        success: function (data) {
            $(".forgetpass-user").prop("disabled", false);
            if (data["type"] == "error") {
            } else {
                var currenturl = $("#currenturl").val();
                $("#forgotpass_user")[0].reset();
                if (currenturl == home_url + "flight/booking_detail") {
                    setTimeout(function () {
                        window.location.href = currenturl + "?login=true";
                    }, 5000);
                } else {
                    setTimeout(function () {
                        window.location = currenturl;
                    }, 5000);
                }
            }
            $(".forgot-password-message").html(data["message"]);
            setTimeout(function () {
                $(".user-login-message").hide(1000);
            }, 5000);
        },
    });
});
$(".recovery_passw").click(function () {
    $(this).prop("disabled", true);
    var home_url = $("#siteurl").val();
    $(".recovery-pass-message").show(1000);
    $.ajax({
        url: home_url + "userinfo/update_forget_password",
        type: "post",
        dataType: "json",
        data: $("#update_pass").serialize(),
        success: function (data) {
            $(".recovery_passw").prop("disabled", false);
            if (data["type"] == "error") {
            } else {
                var currenturl = $("#currenturl").val();
                $("#update_pass")[0].reset();
                setTimeout(function () {
                    $(".user-login-message").hide(1000);
                    window.location = home_url;
                }, 5000);
            }
            $(".recovery-pass-message").html(data["message"]);
        },
    });
});
$(".booking-forgot-password").click(function () {
    var home_url = $("#siteurl").val();
    $(".user-login-message").show(1000);
    $(".llogin").hide();
    $(".getpassdiv").show();
    $.ajax({
        url: home_url + "userinfo/userbooking_forget_password",
        type: "post",
        dataType: "json",
        data: $("#booking_login_user").serialize(),
        success: function (data) {
            if (data["type"] == "error") {
            } else {
                $("#booking_login_user")[0].reset();
            }
            $(".user-login-message").html(data["message"]);
            setTimeout(function () {
                $(".user-login-message").hide(1000);
            }, 3000);
        },
    });
});
$("[name=user_reference_package]").change(function () {
    var selectval = $(this).val();
    if (selectval == "Flight") {
        $(this).parent().siblings(".insertfield").children(".insertfieldvalue").val("FT-");
    } else if (selectval == "Hotel") {
        $(this).parent().siblings(".insertfield").children(".insertfieldvalue").val("HT-");
    } else {
        $(this).parent().siblings(".insertfield").children(".insertfieldvalue").val("");
    }
});
$(".checkmybooking").click(function () {
    $(this).submit();
    if ($("#getmybooking .error").length == 0) {
    } else {
        return false;
    }
    $(".verifymyotperror").text("");
    $(".verifymyotpsuccess").text("");
    $(".getbookingsuccess").text("");
    $(".getbookingerror").text("");
    var home_url = $("#siteurl").val();
    $.ajax({
        url: home_url + "userinfo/getmybookings",
        type: "POST",
        dataType: "json",
        data: $("#getmybooking").serialize(),
        success: function (getdata) {
            if (getdata["type"] == "success") {
                $("#MyVerifyOtpModal").modal("show");
                $(".getbookingsuccess").text(getdata["message"]);
            } else {
                $(".getbookingerror").text(getdata["message"]);
            }
        },
    });
});
$(".checkmyotp").click(function () {
    $(this).submit();
    if ($("#verifymyotp .error").length == 0) {
    } else {
        return false;
    }
    $(".verifymyotperror").text("");
    $(".verifymyotpsuccess").text("");
    $(".getbookingerror").text("");
    $(".getbookingsuccess").text("");
    var home_url = $("#siteurl").val();
    $.ajax({
        url: home_url + "userinfo/verifyotp",
        type: "POST",
        dataType: "json",
        data: $("#verifymyotp").serialize(),
        success: function (getdata) {
            if (getdata["type"] == "success") {
                $(".verifymyotpsuccess").text(getdata["message"]);
                $(".verifyotp").val("");
                setTimeout(function () {
                    window.location.href = home_url + getdata["rediecturl"];
                }, 3000);
            } else {
                $(".verifymyotperror").text(getdata["message"]);
                $(".soa").show();
            }
        },
    });
});
$(".soa_input").click(function () {
    var home_url = $("#siteurl").val();
    $(".verifymyotperror").text("");
    $(".verifymyotpsuccess").text("");
    $(".getbookingsuccess").text("");
    $(".getbookingerror").text("");
    $.ajax({
        url: home_url + "userinfo/getmybookings",
        type: "POST",
        dataType: "json",
        data: $("#getmybooking").serialize(),
        success: function (getdata) {
            if (getdata["type"] == "success") {
                $(".getbookingsuccess").text(getdata["message"]);
                var fewSeconds = 60;
                var btn = $(".soa_input");
                btn.prop("disabled", true);
                setTimeout(function () {
                    btn.prop("disabled", false);
                }, fewSeconds * 1000);
            } else {
                $(".getbookingerror").text(getdata["message"]);
            }
        },
    });
});
$("#HotelloadMore").click(function () {
    var visible = $("[atr-Hotel-show]:visible").length;
    var HBshow = $("[atr-Hotel-show]").length;
    if (visible <= HBshow) {
        var item = 0;
        $("[atr-Hotel-show]").each(function (index, elem) {
            if (index >= visible) {
                if (item < 10) {
                    $(this).show();
                    item++;
                }
            }
        });
    }
    if (visible == HBshow) {
        $(".HotelloadHide").hide();
        $(".HotelLessHide").show();
    } else {
        $(".HotelloadHide").show();
        $(".HotelLessHide").show();
    }
});
$("#HotelhideLess").click(function () {
    var visible = $("[atr-Hotel-show]:visible").length;
    var HBshow = $("[atr-Hotel-show]").length;
    if (visible <= HBshow) {
        var item = 9;
        $("[atr-Hotel-show]").each(function (index, elem) {
            if (index > item) {
                $(".show_" + item).hide();
                item++;
            }
        });
    }
    if (visible == HBshow) {
        $(".HotelloadHide").hide();
        $(".HotelLessHide").show();
    } else {
        $(".HotelloadHide").show();
    }
    if (visible == 10) {
        $(".HotelLessHide").hide();
    }
    if (visible == 11) {
        $(".HotelLessHide").hide();
    }
});
function ValidateEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
}
$(".subscribe").click(function () {
    var home_url = $("#siteurl").val();
    var email = $("#email_id").val();
    if (email == "") {
        $(".message").html("<samp style='color:red;'>Please Enter Your Email Id </samp>");
        setTimeout(function () {
            $(".message").text(" ");
        }, 4000);
    } else if (!ValidateEmail(email)) {
        $(".message").html("<samp style='color:red;'>Please Enter a Valid Email</samp>");
        setTimeout(function () {
            $(".message").text(" ");
        }, 4000);
    } else {
        $.ajax({
            url: home_url + "home/save_newsletter",
            type: "post",
            data: $("#Subscribe_Newsletter").serialize(),
            success: function (data) {
                if (data == "false") {
                    $(".message").html("<samp style='color:red;'>Email Already Exist! </samp>");
                    $("#Subscribe_Newsletter")[0].reset();
                    setTimeout(function () {
                        $(".message").text(" ");
                    }, 2000);
                } else {
                    $(".message").html("<samp style='color:green;'>Thanks for Subscribing! </samp>");
                    $("#Subscribe_Newsletter")[0].reset();
                    setTimeout(function () {
                        $(".message").text(" ");
                    }, 2000);
                }
            },
        });
    }
});
$(function () {
    var url = $("#siteurl").val();
    $(".sendcontact").click(function () {
        $(".success-message").html("");
        $(".success-message").show(1000);
        $(".loder").show();
        $(".sendcontact").text("Submitting...");
        $(".sendcontact").attr("disabled", "disabled");
        $.ajax({
            url: url + "home/contact",
            type: "post",
            dataType: "json",
            data: $("#save_contact").serialize(),
            success: function (data) {
                $(".sendcontact").removeAttr("disabled");
                if (data["type"] == "error") {
                    $(".loder").hide();
                    $(".sendcontact").text("Submit");
                } else {
                    $(".sendcontact").show();
                    $(".loder").hide();
                    $(".sendcontact").text("Submit");
                    $("#save_contact")[0].reset();
                }
                $(".success-message").html(data["message"]);
                setTimeout(function () {
                    $(".success-message").hide(1000);
                }, 5000);
            },
        });
    });
	
	 $(".getCouponOffer").click(function () {
        $(".success-message").html("");
        $(".success-message").show(1000);
        $(".getCouponOffer").text("Submitting...");
        $(".getCouponOffer").attr("disabled", "disabled");
        $.ajax({
            url: url + "home/getcouponoffer",
            type: "post",
            dataType: "json",
            data: $("#getcouponoffers").serialize(),
            success: function (data) {
                $(".getCouponOffer").removeAttr("disabled");
                if (data["type"] == "error") {
                   $(".success-message").html(data["message"]);
                    setTimeout(function () {
                        $(".ragistererror").hide(1000);
                    }, 5000);
                    $(".getCouponOffer").text("YES!I WANT TO SAVE 40%!");
                } else {
                    $(".getCouponOffer").show();
                    
                    $(".getCouponOffer").text("YES!I WANT TO SAVE 40%!");
                    $("#getcouponoffers")[0].reset();
                }
                $(".success-message").html(data["message"]);
                setTimeout(function () {
                    $(".success-message").hide(1000);
                }, 5000);
            },
        });
    });
	
	
	
	
	
	
	
    $(".cabbookingclick").click(function () {
        $(".cabbookingbtn").click();
    });
});
