$ = jQuery.noConflict();

function holiday_count() {
    $('.count_sotr').html($('[atr-holiday-list]').length + ' of ' + $('[atr-sort]').length);
    if (($('[atr-sort]:visible').length) == 0) {
        $('.holiday_result_not').show();
    } else {
        $('.holiday_result_not').hide();
    }
}
$(function() {
    var price_array = new Array();
    $("[atr-sort]").find("[atr-holiday_price]").each(function(index, elem) {
        price_array.push(elem.getAttribute('atr-holiday_price'));
    });
    Array.prototype.max = function() {
        return Math.max.apply(null, this);
    };
    Array.prototype.min = function() {
        return Math.min.apply(null, this);
    };
    var price_min = price_array.min();
    var price_max = price_array.max();
    setTimeout(function() {
        $(".price-range-package").slider({
            range: true,
            min: price_min,
            max: price_max,
            values: [price_min, price_max],
            slide: function(event, ui) {
                $(".minpriceshow").html("<i class='fa fa-inr'></i>" + ui.values[0]);
                $(".maxpriceshow").html("<i class='fa fa-inr'></i>" + ui.values[1]);
                var mi = ui.values[0];
                var mx = ui.values[1];
                holiday_sort_price(mi, mx);
                if (price_min < ui.values[0] || price_max > ui.values[1]) {
                    $("[atr-remove-price-sort]").show();
                } else {
                    $("[atr-remove-price-sort]").hide();
                }
            }
        });
        $(".minpriceshow").html("<i class='fa fa-inr'></i>" + $(".price-range-package").slider("values", 0));
        $(".maxpriceshow").html("<i class='fa fa-inr'></i>" + $(".price-range-package").slider("values", 1));
        $('[atr-remove-price-sort]').click(function() {
            $("[atr-remove-price-sort]").hide();
            holiday_sort_price(price_min, price_max);
            $(".price-range-package").slider("values", 0, price_min);
            $(".price-range-package").slider("values", 1, price_max);
            $(".minpriceshow").html("<i class='fa fa-inr'></i>" + price_min);
            $(".maxpriceshow").html("<i class='fa fa-inr'></i>" + price_max);
        });
    });
});

function holiday_sort_price(minPrice, maxPrice) {
    var $columns = $("[atr-sort]");
    $columns.find("[atr-holiday_price]").each(function(index, elem) {
        var price = elem.getAttribute('atr-holiday_price');
        var STAR = elem.getAttribute('atr-star');
        var trues = elem.getAttribute('atr-star-sort');
        var nights = elem.getAttribute('atr-nights-sort');
        if (price <= minPrice || price >= maxPrice) {
            $(this).parents("[atr-sort]").hide();
            $(this).parents("[atr-sort]").removeAttr("atr-price-sort");
            $(this).parents("[atr-sort]").removeAttr("atr-holiday-list");
        }
        if (price >= minPrice && price <= maxPrice) {
            $(this).parents("[atr-sort]").hide();
            $(this).parents("[atr-sort]").show();
            $(this).parents("[atr-sort]").attr("atr-price-sort", "true");
            $(this).parents("[atr-sort]").attr("atr-holiday-list", "true");
        }
    });
    holiday_count();
}
$(function() {
    var night_array = new Array();
    $("[atr-sort]").find("[atr-nights-sort]").each(function(index, elem) {
        night_array.push(elem.getAttribute('atr-nights-sort'));
    });
    Array.prototype.max = function() {
        return Math.max.apply(null, this);
    };
    Array.prototype.min = function() {
        return Math.min.apply(null, this);
    };
    var night_min = night_array.min();
    var night_max = night_array.max();
    setTimeout(function() {
        $(".nights-range-package").slider({
            range: true,
            min: night_min,
            max: night_max,
            values: [night_min, night_max],
            slide: function(event, ui) {
                $(".minnightsshow").html(ui.values[0] + " Nights");
                $(".maxnightsshow").html(ui.values[1] + " Nights");
                var mi = ui.values[0];
                var mx = ui.values[1];
                holiday_sort_night(mi, mx);
                if (night_min < ui.values[0] || night_max > ui.values[1]) {
                    $("[atr-remove-nights-sort]").show();
                } else {
                    $("[atr-remove-nights-sort]").hide();
                }
            }
        });
        $(".minnightsshow").html($(".nights-range-package").slider("values", 0) + " Nights");
        $(".maxnightsshow").html($(".nights-range-package").slider("values", 1) + " Nights");
        $('[atr-remove-nights-sort]').click(function() {
            $("[atr-remove-nights-sort]").hide();
            holiday_sort_night(night_min, night_max);
            $(".nights-range-package").slider("values", 0, night_min);
            $(".nights-range-package").slider("values", 1, night_max);
            $(".minnightsshow").html(night_min + " Nights");
            $(".maxnightsshow").html(night_max + " Nights");
        });
    }, 4000);
});

function holiday_sort_night(night_min, night_max) {
    var $columns = $("[atr-sort]");
    $columns.find("[atr-nights-sort]").each(function(index, elem) {
        var price = elem.getAttribute('atr-nights-sort');
        var STAR = elem.getAttribute('atr-star');
        var trues = elem.getAttribute('atr-star-sort');
        var nights = elem.getAttribute('atr-nights-sort');
        if (price <= night_min || price >= night_max) {
            $(this).parents("[atr-sort]").hide();
            $(this).parents("[atr-sort]").removeAttr("atr-price-sort");
            $(this).parents("[atr-sort]").removeAttr("atr-holiday-list");
        }
        if (price >= night_min && price <= night_max) {
            $(this).parents("[atr-sort]").hide();
            $(this).parents("[atr-sort]").show();
            $(this).parents("[atr-sort]").attr("atr-price-sort", "true");
            $(this).parents("[atr-sort]").attr("atr-holiday-list", "true");
        }
    });
    holiday_count();
}
$(".select_star_holiday").click(function() {
    var checked_Ay = [];
    $('input[type=checkbox]').each(function() {
        if (this.checked) {
            checked_Ay.push(this.value);
        }
    });
    if (checked_Ay.length > 0) {
        $("[atr-remove-star-sort]").show();
    } else {
        $("[atr-remove-star-sort]").hide();
    }
    var $columns = $("[atr-sort]");
    $columns.find("[atr-star]").each(function(index, elem) {
        var STAR = elem.getAttribute('atr-star');
        if (checked_Ay.length > 0) {
            if ($.inArray(STAR, checked_Ay) != -1) {
                $(this).parents("[atr-sort]").show();
                $(this).parents("[atr-sort]").attr("atr-star-sort", "true");
                $(this).parents("[atr-sort]").attr("atr-holiday-list", "true");
            } else {
                $(this).parents("[atr-sort]").hide();
                $(this).parents("[atr-sort]").removeAttr("atr-star-sort");
                $(this).parents("[atr-sort]").removeAttr("atr-holiday-list");
            }
        } else {
            $(this).parents("[atr-sort]").show();
            $(this).parents("[atr-sort]").attr("atr-hotel-list", "true");
            $(this).parents("[atr-sort]").removeAttr("atr-star-sort");
            $(this).parents("[atr-sort]").removeAttr("atr-holiday-sort");
        }
    });
    holiday_count();
});
$(function() {
    var count = 1;
    $("#extra_next").click(function() {
        if (count > 9) {
            return false;
        }
        $(".extra_bed_con").html(count);
        $(".extra_inp").val(count);
        count++;
    });
    $("#extra_prev").click(function() {
        if (count - 1 <= 1) {
            return false;
        }
        count--;
        $(".extra_bed_con").html(count - 1);
        $(".extra_inp").val(count - 1);
    });
});
$(function() {
    var infant = 0;
    $("#sct_infant_next").click(function() {
        if (infant <= 2) {
            $(".sct_infant_text").html(infant);
            $(".infant_input").val(infant);
            infant++;
        } else {
            return false;
        }
    });
    $("#sct_infant_prev").click(function() {
        if (infant <= 0) {
            return false;
        } else {
            $(".sct_infant_text").html(infant - 1);
            $(".infant_input").val(infant - 1);
            infant--;
        }
    });
    var count = 2;
    var count_child = 1;
    $("#sct_adult_next").click(function() {
        if (count > 3) {
            return false;
        }
        $(".sct_adult_text").html(count);
        $(".adt_input").val(count);
        count++;
    });
    $("#sct_adult_prev").click(function() {
        if (count - 1 <= 1) {
            return false;
        }
        count--;
        $(".sct_adult_text").html(count - 1);
        $(".adt_input").val(count - 1);
    });
    var child = "";
    $("#sct_child_next").click(function() {
        if (count_child > 2) {
            return false;
        }
        child = "<div class='sct_child_age' id='child_age_" + count_child + "'><div class='col-md-2 col-sm-3 col-xs-4'><label class='txt_fff'>Child - " + count_child + " age</label><div class='input-group'><a href='javascript:void(0)' class='input-group-addon hotel_addon' id='sct_child_age_" + count_child + "_prev' onclick='child_age_prv(" + count_child + ")'> <i class='fa fa-minus subr'></i> </a><span id='sct_child_age_" + count_child + "_text' class='form-control hotel_txt2'>1</span> <input type='hidden' name='age_1_" + count_child + "' value='1' class='child_age_1_" + count_child + "_input' id='child_age_1_" + count_child + "_input'><a href='javascript:void(0)' class='input-group-addon hotel_addon' onclick='child_age_next(" + count_child + ")' id='sct_child_age_" + count_child + "_next'> <i class='fa fa-plus subr2'></i> </a></div></div><div class='col-md-2 col-sm-3 col-xs-4 '><label class='raj_text'>Bed Required</label><select class='form-control no_radius' name='bed_1_" + count_child + "'><option value='0'>No Bed</option><option value='1'>With Bed</option></select></div></div>";
        $(".sct_child_text").html(count_child);
        $(".child_input").val(count_child);
        $(".child_age").append(child);
        count_child++;
    });
    $("#sct_child_prev").click(function() {
        if (count_child <= 1) {
            return false;
        }
        count_child--;
        $(".sct_child_text").html(count_child - 1);
        $(".child_input").val(count_child - 1);
        $(".sct_child_age").remove("#child_age_" + count_child);
    });
});
var child_age = 2;
var child_age2 = 2;

function child_age_next(number) {
    if (number == 1) {
        if (child_age > 12) {
            return false;
        }
        document.getElementById("sct_child_age_" + number + "_text").innerHTML = child_age;
        document.getElementById("child_age_1_" + number + "_input").value = child_age;
        child_age++;
    }
    if (number == 2) {
        if (child_age2 > 12) {
            return false;
        }
        document.getElementById("sct_child_age_" + number + "_text").innerHTML = child_age2;
        document.getElementById("child_age_1_" + number + "_input").value = child_age2;
        child_age2++;
    }
}

function child_age_prv(number) {
    if (number == 1) {
        if (child_age - 2 < 1) {
            return false;
        }
        document.getElementById("sct_child_age_" + number + "_text").innerHTML = child_age - 2;
        document.getElementById("child_age_1_" + number + "_input").value = child_age - 2;
        child_age--;
    }
    if (number == 2) {
        if (child_age2 - 2 < 1) {
            return false;
        }
        document.getElementById("sct_child_age_" + number + "_text").innerHTML = child_age2 - 2;
        document.getElementById("child_age_1_" + number + "_input").value = child_age2 - 2;
        child_age2--;
    }
}
$(function() {
    var room = 2;
    $("#room_nxt").click(function() {
        if (room > 4) {
            return false;
        }
        $("#room_val_text").html(room);
        $(".room_val").val(room);
        if (room == 2) {
            $(".raj_room_2").show();
        }
        if (room == 3) {
            $(".raj_room_3").show();
        }
        if (room == 4) {
            $(".raj_room_4").show();
        }
        room++;
    });
    $("#room_prv").click(function() {
        if (room - 1 <= 1) {
            return false;
        }
        room--;
        $("#room_val_text").html(room - 1);
        $(".room_val").val(room - 1);
        if (room == 2) {
            $(".raj_room_2").hide();
        }
        if (room == 3) {
            $(".raj_room_3").hide();
        }
        if (room == 4) {
            $(".raj_room_4").hide();
        }
    });
});
$(function() {
    $(".raj_room_hit1").click(function() {
        $(".raj_room_show1").slideDown();
        $(".raj_room_show2").slideUp();
        $(".raj_room_show3").slideUp();
        $(".raj_room_show4").slideUp();
        $(this).html("Edit");
        $(".raj_room_hit2").html("Done");
        $(".raj_room_hit3").html("Done");
        $(".raj_room_hit4").html("Done");
    });
    $(".raj_room_hit2").click(function() {
        $(".raj_room_show2").slideDown();
        $(".raj_room_show1").slideUp();
        $(".raj_room_show3").slideUp();
        $(".raj_room_show4").slideUp();
        $(this).html("Edit");
        $(".raj_room_hit1").html("Done");
        $(".raj_room_hit3").html("Done");
        $(".raj_room_hit4").html("Done");
    });
    $(".raj_room_hit3").click(function() {
        $(".raj_room_show3").slideDown();
        $(".raj_room_show1").slideUp();
        $(".raj_room_show2").slideUp();
        $(".raj_room_show4").slideUp();
        $(this).html("Edit");
        $(".raj_room_hit1").html("Done");
        $(".raj_room_hit4").html("Done");
        $(".raj_room_hit2").html("Done");
    });
    $(".raj_room_hit4").click(function() {
        $(".raj_room_show4").slideDown();
        $(".raj_room_show1").slideUp();
        $(".raj_room_show3").slideUp();
        $(".raj_room_show2").slideUp();
        $(this).html("Edit");
        $(".raj_room_hit1").html("Done");
        $(".raj_room_hit3").html("Done");
        $(".raj_room_hit2").html("Done");
    });
});
$(function() {
    var infant2 = 0;
    $("#sct_infant_next2").click(function() {
        if (infant2 <= 2) {
            $(".sct_infant_text2").html(infant2);
            $(".infant_input2").val(infant2);
            infant2++;
        } else {
            return false;
        }
    });
    $("#sct_infant_prev2").click(function() {
        if (infant2 <= 0) {
            return false;
        } else {
            $(".sct_infant_text2").html(infant2 - 1);
            $(".infant_input2").val(infant2 - 1);
            infant2--;
        }
    });
    var count22 = 2;
    var count_child22 = 1;
    $("#sct_adult_next2").click(function() {
        if (count22 > 3) {
            return false;
        }
        $(".sct_adult_text2").html(count22);
        $(".adt_input2").val(count22);
        count22++;
    });
    $("#sct_adult_prev2").click(function() {
        if (count22 - 1 <= 1) {
            return false;
        }
        count22--;
        $(".sct_adult_text2").html(count22 - 1);
        $(".adt_input2").val(count22 - 1);
    });
    var child22 = "";
    $("#sct_child_next2").click(function() {
        if (count_child22 > 2) {
            return false;
        }
        child22 = "<div class='sct_child_age2' id='child_age_2_" + count_child22 + "'><div class='col-sm-3 col-md-2 col-xs-4 frm-dv1'><label class='txt_fff'>Child - " + count_child22 + " age</label><div class='input-group'><a href='javascript:void(0)' class='input-group-addon hotel_addon' id='sct_child_age_2_" + count_child22 + "_prev' onclick='child_age_prv2(" + count_child22 + ")'> <i class='fa fa-minus subr'></i> </a><span id='sct_child_age_2_" + count_child22 + "_text' class='form-control hotel_txt2'>1</span> <input type='hidden' name='age_2_" + count_child22 + "' value='1' class='child_age_2_" + count_child22 + "_input' id='child_age_2_" + count_child22 + "_input'><a href='javascript:void(0)' class='input-group-addon hotel_addon' onclick='child_age_next2(" + count_child22 + ")' id='sct_child_age_2_" + count_child22 + "_next'> <i class='fa fa-plus subr2'></i> </a></div></div><div class='col-md-2 col-sm-3 col-xs-4 '><label class='raj_text'>Bed Required</label><select class='form-control no_radius' name='bed_2_" + count_child22 + "'><option value='0'>No Bed</option><option value='1'>With Bed</option></select></div></div>";
        $(".sct_child_text2").html(count_child22);
        $(".child_input2").val(count_child22);
        $(".child_age2").append(child22);
        count_child22++;
    });
    $("#sct_child_prev2").click(function() {
        if (count_child22 <= 1) {
            return false;
        }
        count_child22--;
        $(".sct_child_text2").html(count_child22 - 1);
        $(".child_input2").val(count_child22 - 1);
        $(".sct_child_age2").remove("#child_age_2_" + count_child22);
    });
});
var child_age21 = 2;
var child_age22 = 2;

function child_age_next2(number) {
    if (number == 1) {
        if (child_age21 > 12) {
            return false;
        }
        document.getElementById("sct_child_age_2_" + number + "_text").innerHTML = child_age21;
        document.getElementById("child_age_2_" + number + "_input").value = child_age21;
        child_age21++;
    }
    if (number == 2) {
        if (child_age22 > 12) {
            return false;
        }
        document.getElementById("sct_child_age_2_" + number + "_text").innerHTML = child_age22;
        document.getElementById("child_age_2_" + number + "_input").value = child_age22;
        child_age22++;
    }
}

function child_age_prv2(number) {
    if (number == 1) {
        if (child_age21 - 2 < 1) {
            return false;
        }
        document.getElementById("sct_child_age_2_" + number + "_text").innerHTML = child_age21 - 2;
        document.getElementById("child_age_2_" + number + "_input").value = child_age21 - 2;
        child_age21--;
    }
    if (number == 2) {
        if (child_age22 - 2 < 1) {
            return false;
        }
        document.getElementById("sct_child_age_2_" + number + "_text").innerHTML = child_age22 - 2;
        document.getElementById("child_age_2_" + number + "_input").value = child_age22 - 2;
        child_age22--;
    }
}
$(function() {
    var infant3 = 0;
    $("#sct_infant_next3").click(function() {
        if (infant3 <= 2) {
            $(".sct_infant_text3").html(infant3);
            $(".infant_input3").val(infant3);
            infant3++;
        } else {
            return false;
        }
    });
    $("#sct_infant_prev3").click(function() {
        if (infant3 <= 0) {
            return false;
        } else {
            $(".sct_infant_text3").html(infant3 - 1);
            $(".infant_input3").val(infant3 - 1);
            infant3--;
        }
    });
    var count23 = 2;
    var count_child23 = 1;
    $("#sct_adult_next3").click(function() {
        if (count23 > 3) {
            return false;
        }
        $(".sct_adult_text3").html(count23);
        $(".adt_input3").val(count23);
        count23++;
    });
    $("#sct_adult_prev3").click(function() {
        if (count23 - 1 <= 1) {
            return false;
        }
        count23--;
        $(".sct_adult_text3").html(count23 - 1);
        $(".adt_input3").val(count23 - 1);
    });
    var child23 = "";
    $("#sct_child_next3").click(function() {
        if (count_child23 > 2) {
            return false;
        }
        child23 = "<div class='sct_child_age3' id='child_age_3_" + count_child23 + "'><div class='col-sm-3 col-md-2 col-xs-4 frm-dv1 '><label class='txt_fff'>Child - " + count_child23 + " age</label><div class='input-group'><a href='javascript:void(0)' class='input-group-addon hotel_addon' id='sct_child_age_3_" + count_child23 + "_prev' onclick='child_age_prv3(" + count_child23 + ")'> <i class='fa fa-minus subr'></i> </a><span id='sct_child_age_3_" + count_child23 + "_text' class='form-control hotel_txt2'>1</span> <input type='hidden' name='age_3_" + count_child23 + "' value='1' class='child_age_3_" + count_child23 + "_input' id='child_age_3_" + count_child23 + "_input'><a href='javascript:void(0)' class='input-group-addon hotel_addon' onclick='child_age_next3(" + count_child23 + ")' id='sct_child_age_2_" + count_child23 + "_next'> <i class='fa fa-plus subr2'></i> </a></div></div><div class='col-md-2 col-sm-3 col-xs-4 '><label class='raj_text'>Bed Required</label><select class='form-control no_radius' name='bed_3_" + count_child23 + "'><option value='0'>No Bed</option><option value='1'>With Bed</option></select></div></div>";
        $(".sct_child_text3").html(count_child23);
        $(".child_input3").val(count_child23);
        $(".child_age3").append(child23);
        count_child23++;
    });
    $("#sct_child_prev3").click(function() {
        if (count_child23 <= 1) {
            return false;
        }
        count_child23--;
        $(".sct_child_text3").html(count_child23 - 1);
        $(".child_input3").val(count_child23 - 1);
        $(".sct_child_age3").remove("#child_age_3_" + count_child23);
    });
});
var child_age31 = 2;
var child_age32 = 2;

function child_age_next3(number) {
    if (number == 1) {
        if (child_age31 > 12) {
            return false;
        }
        document.getElementById("sct_child_age_3_" + number + "_text").innerHTML = child_age31;
        document.getElementById("child_age_3_" + number + "_input").value = child_age31;
        child_age31++;
    }
    if (number == 2) {
        if (child_age32 > 12) {
            return false;
        }
        document.getElementById("sct_child_age_3_" + number + "_text").innerHTML = child_age32;
        document.getElementById("child_age_3_" + number + "_input").value = child_age32;
        child_age32++;
    }
}

function child_age_prv3(number) {
    if (number == 1) {
        if (child_age31 - 2 < 1) {
            return false;
        }
        document.getElementById("sct_child_age_3_" + number + "_text").innerHTML = child_age31 - 2;
        document.getElementById("child_age_3_" + number + "_input").value = child_age31 - 2;
        child_age31--;
    }
    if (number == 2) {
        if (child_age32 - 2 < 1) {
            return false;
        }
        document.getElementById("sct_child_age_3_" + number + "_text").innerHTML = child_age32 - 2;
        document.getElementById("child_age_3_" + number + "_input").value = child_age32 - 2;
        child_age32--;
    }
}
$(function() {
    var infant4 = 0;
    $("#sct_infant_next4").click(function() {
        if (infant4 <= 2) {
            $(".sct_infant_text4").html(infant4);
            $(".infant_input4").val(infant4);
            infant4++;
        } else {
            return false;
        }
    });
    $("#sct_infant_prev4").click(function() {
        if (infant4 <= 0) {
            return false;
        } else {
            $(".sct_infant_text4").html(infant4 - 1);
            $(".infant_input4").val(infant4 - 1);
            infant4--;
        }
    });
    var count24 = 2;
    var count_child24 = 1;
    $("#sct_adult_next4").click(function() {
        if (count24 > 3) {
            return false;
        }
        $(".sct_adult_text4").html(count24);
        $(".adt_input4").val(count24);
        count24++;
    });
    $("#sct_adult_prev4").click(function() {
        if (count24 - 1 <= 1) {
            return false;
        }
        count24--;
        $(".sct_adult_text4").html(count24 - 1);
        $(".adt_input4").val(count24 - 1);
    });
    var child24 = "";
    $("#sct_child_next4").click(function() {
        if (count_child24 > 2) {
            return false;
        }
        child24 = "<div class='sct_child_age4' id='child_age_4_" + count_child24 + "'><div class='col-sm-3 col-xs-4 col-md-2 frm-dv1'><label class='txt_fff'>Child - " + count_child24 + " age</label><div class='input-group'><a href='javascript:void(0)' class='input-group-addon hotel_addon' id='sct_child_age_4_" + count_child24 + "_prev' onclick='child_age_prv4(" + count_child24 + ")'> <i class='fa fa-minus subr'></i> </a><span id='sct_child_age_4_" + count_child24 + "_text' class='form-control hotel_txt2'>1</span> <input type='hidden' name='age_4_" + count_child24 + "' value='1' class='child_age_4_" + count_child24 + "_input' id='child_age_4_" + count_child24 + "_input'><a href='javascript:void(0)' class='input-group-addon hotel_addon' onclick='child_age_next4(" + count_child24 + ")' id='sct_child_age_4_" + count_child24 + "_next'> <i class='fa fa-plus subr2'></i> </a></div></div><div class='col-md-2 col-sm-3 col-xs-4 '><label class='raj_text'>Bed Required</label><select class='form-control no_radius' name='bed_4_" + count_child24 + "'><option value='0'>No Bed</option><option value='1'>With Bed</option></select></div></div>";
        $(".sct_child_text4").html(count_child24);
        $(".child_input4").val(count_child24);
        $(".child_age4").append(child24);
        count_child24++;
    });
    $("#sct_child_prev4").click(function() {
        if (count_child24 <= 1) {
            return false;
        }
        count_child24--;
        $(".sct_child_text4").html(count_child24 - 1);
        $(".child_input4").val(count_child24 - 1);
        $(".sct_child_age4").remove("#child_age_4_" + count_child24);
    });
});
var child_age41 = 2;
var child_age42 = 2;

function child_age_next4(number) {
    if (number == 1) {
        if (child_age41 > 12) {
            return false;
        }
        document.getElementById("sct_child_age_4_" + number + "_text").innerHTML = child_age41;
        document.getElementById("child_age_4_" + number + "_input").value = child_age41;
        child_age41++;
    }
    if (number == 2) {
        if (child_age42 > 12) {
            return false;
        }
        document.getElementById("sct_child_age_4_" + number + "_text").innerHTML = child_age42;
        document.getElementById("child_age_4_" + number + "_input").value = child_age42;
        child_age42++;
    }
}

function child_age_prv4(number) {
    if (number == 1) {
        if (child_age41 - 2 < 1) {
            return false;
        }
        document.getElementById("sct_child_age_4_" + number + "_text").innerHTML = child_age41 - 2;
        document.getElementById("child_age_4_" + number + "_input").value = child_age41 - 2;
        child_age41--;
    }
    if (number == 2) {
        if (child_age42 - 2 < 1) {
            return false;
        }
        document.getElementById("sct_child_age_4_" + number + "_text").innerHTML = child_age42 - 2;
        document.getElementById("child_age_4_" + number + "_input").value = child_age42 - 2;
        child_age42--;
    }
}
$('[atr-submitp-button]').click(function() {
    $('.sendmessage').text('');
    var home_url = $("#siteurl").val();
    $(this).submit();
    $('[atr-submitp-button]').attr('disabled', 'disabled');
    $('.addmoremoneywallet').hide();
    if ($("#travelersdetails .error").length == 0) {
        var paymentmethod = $('input[name=paymentmethod]:checked').val();
        if (paymentmethod == 'byonline') {
            $("#travelersdetails").submit();
        } else if (paymentmethod == 'bywallet') {
            $.ajax({
                type: "POST",
                url: home_url + 'package/checkwalletbalance',
                success: function(data, status) {
                    if (data == "vaild") {
                        $("#travelersdetails").submit();
                    } else {
                        alert(data);
                        $('.addmoremoneywallet').show();
                        $('[atr-submitp-button]').removeAttr('disabled');
                    }
                }
            });
        } else {
            alert('This Type Of Payment Option Not Available');
            $('[atr-submit-button]').removeAttr('disabled');
        }
    } else {
        alert('Please Fill Required Fields !!');
        $('[atr-submit-button]').removeAttr('disabled');
    }
});
$(".packageaddextramoney").click(function() {
    $(this).attr('disabled', 'disabled');
    var amount = $('#addextramoneytowallet').val();
    $('#putaddextramoney').val(amount);
    $.ajax({
        url: $('#siteurl').val() + 'package/addextramoneyvalues',
        type: "POST",
        dataType: "text",
        data: $("#travelersdetails").serialize(),
        success: function(getdata) {
            if (getdata == 'Success') {
                $("#addextramoneyform").submit();
            } else {
                alert('There Is Some Error Please Contact Admin !');
            }
        }
    });
});

$(document).ready(function(){
	
	
	$("#Newholidayqqery").click(function(){
		$("#Newholidayqqery").html('Sending...');
		var home_url = $("#siteurl").val();
		$("#Newholidayqqery").attr('disabled', true); 
		$(".errorshow").html(' ');
		$.ajax({
			type: "POST",
			url: home_url+'/package/new_holiday_query',
			dataType: "json",
			data: $("#formholidayqqery").serialize(),
			success: function(data){
				$("#Newholidayqqery").attr('disabled', false); 
				if(data['type'] == "error"){
					var formData = $("#formholidayqqery");
					$.each(data['message'], function(key, val){
						$('[name="' + key + '"]', formData).after(val);
					});
					
				}else{
					$(".SuccessText").show();
					$(".Query_form").hide();
					$("#formholidayqqery").find("input[type=text], input[type=email], textarea").val("");
				}
				setTimeout(function(){
					$(".errorshow").slideDown().fadeOut(7000);
				},5000);	
				$("#Newholidayqqery").html('Submit');
			}
		});
	});
	$("#Newholidayqqery_call").click(function(){
		var home_url = $("#siteurl").val();
		$("#Newholidayqqery_call").attr('disabled', true); 
		$(".errorshow").html(' ');
		$("#Newholidayqqery_call").html('Sending...');
		$.ajax({
			type: "POST",
			url: home_url+'/package/new_holiday_querycall',
			dataType: "json",
			data: $("#HQ_call").serialize(),
			success: function(data){
				$("#Newholidayqqery_call").attr('disabled', false); 
				if(data['type'] == "error"){
					var formData = $("#HQ_call");
					$.each(data['message'], function(key, val){
						$('[name="' + key + '"]', formData).after(val);
					});
				}else{
					$(".SuccessText").show();
					$("#HQ_call").find("input[type=text], input[type=email], textarea").val("");
				} 
				setTimeout(function(){ 
					$(".errorshow").slideDown().fadeOut(3000);
				},5000);
				$("#Newholidayqqery_call").html('Get Call');	
			}
		});
	});
	
	$("#formholidayqqery input").blur(function() {
		var checkValue = $(this).val();
		if (checkValue== '' || checkValue==null) {
			$(this).css("border-bottom", "1px solid #ef0b0b");
		}else{
			$(this).css("border-bottom", "1px solid #ccc");
		}
	});
	
	$("#HQ_call input").blur(function() {
		var checkValue = $(this).val();
		if (checkValue== '' || checkValue==null) {
			$(this).css("border-bottom", "1px solid #ef0b0b");
		}else{
			$(this).css("border-bottom", "1px solid #ccc");
		}
	});
	
	
	$(".deparcherdateuser").datepicker({
		defaultDate: "",
		changeYear: false,
		showOtherMonths: true,
		minDate: 0,
		dateFormat: "dd-mm-yy",
		numberOfMonths: 1,
		dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
		beforeShow: function () {
			$(".ui-datepicker").addClass('Z-ndtop');
		} 
	});	
	
});

