$(function () {
	$(".melahead").click(function () {
		$(this).next(".melinside").slideToggle();
		$(this).find('i').toggleClass('fa fa-plus fa fa-minus');
	});
});
$(function () {
	$(".corporates-gst-click").click(function () {
		$(".corporates-gst-box").slideToggle();
		$(this).find('i').toggleClass('fa fa-plus fa fa-minus');
	});
});
$(function () {
	var currency = '<i class="fa fa-inr"></i>';
	var obj = {}
	var array = new Array();
	var priceArray = new Array();
	var stopArray = new Array();
	 var departtimeArray = new Array();
	 var destinationnearArray = new Array();
	var airline_name = new Array();
	var airline_code = new Array();
	var flighttypeArray = new Array();
	$("[atr-sort]").each(function (index, element) {
		priceArray.push($(this).find("[atr-price]").attr('atr-price'));
		stopArray.push($(this).find("[atr-stops]").attr('atr-stops'));
		departtimeArray.push($(this).find("[atr-departuretime]").attr('atr-departuretime'));
		destinationnearArray.push($(this).find("[atr-destinationnearby]").attr('atr-destinationnearby'));
		airline_name.push($(this).find("[atr-airlinename]").attr('atr-airlinename'));
		airline_code.push($(this).find("[atr-airlincode]").attr('atr-airlincode'));
		flighttypeArray.push($(this).find("[atr-faretype]").attr('atr-faretype'));
		obj = {
			index: $(this).find("[atr-index]").attr('atr-index'),
			AirlineName: $(this).find("[atr-airlinename]").attr('atr-airlinename'),
			Airlinecode: $(this).find("[atr-airlincode]").attr('atr-airlincode'),
			price: $(this).find("[atr-price]").attr('atr-price'),
			stop: $(this).find("[atr-stops]").attr('atr-stops'),
			departtime: $(this).find("[atr-departuretime]").attr('atr-departuretime'),
			destinationnearby: $(this).find("[atr-destinationnearby]").attr('atr-destinationnearby'),
			fare_type: $(this).find("[atr-faretype]").attr('atr-faretype')
		};
		array.push(obj);
	});
	$("#spnSort_Airline").data("sortKey", "[id^='airlinename_']");
	$("#spnSort_Departure").data("sortKey", "[id^='departure_']");
	$("#spnSort_Arrival").data("sortKey", "[id^='arrival_']");
	$("#spnSort_Duration").data("sortKey", "[id^='duration_']");
	$("#spnSort_PubPrice").data("sortKey", "[id^='PubPrice_']");
	var airlineSortOrder = 'Desc';
	var departueSortOrder = 'Desc';
	var arrivalSortOrder = 'Desc';
	var durationSortOrder = 'Desc';
	var pubPriceSortOrder = 'Desc';
	$('[id^="spnSort_"]').on('click', function (e) {
		e.preventDefault();
		$(".bs-waiting-modal-sm").modal('show');
		$('[id^="spnSort_"]').removeClass("selected");
		$("i", this).toggleClass("fa fa-sort-up fa fa-sort-down");
		var spanId = $(this).attr('id');
		var sortType = spanId.replace(/spnSort_/, '');
		var sortOrder;
		if (sortType == "PubPrice") {
			$("#spnSort_PubPrice").addClass("selected");
			sortOrder = pubPriceSortOrder;
			if (pubPriceSortOrder == 'Asc') {
				pubPriceSortOrder = 'Desc';
			} else {
				pubPriceSortOrder = 'Asc';
			}
		} else if (sortType == "Duration") {
			$("#spnSort_Duration").addClass("selected");
			sortOrder = durationSortOrder;
			if (durationSortOrder == 'Asc') {
				durationSortOrder = 'Desc';
			} else {
				durationSortOrder = 'Asc';
			}
		} else if (sortType == "Departure") {
			$("#spnSort_Departure").addClass("selected");
			sortOrder = departueSortOrder;
			if (departueSortOrder == 'Asc') {
				departueSortOrder = 'Desc';
			} else {
				departueSortOrder = 'Asc';
			}
		} else if (sortType == "Airline") {
			$("#spnSort_Airline").addClass("selected");
			sortOrder = airlineSortOrder;
			if (airlineSortOrder == 'Asc') {
				airlineSortOrder = 'Desc';
			} else {
				airlineSortOrder = 'Asc';
			}
		} else {
			$("#spnSort_Arrival").addClass("selected");
			sortOrder = arrivalSortOrder;
			if (arrivalSortOrder == 'Asc') {
				arrivalSortOrder = 'Desc';
			} else {
				arrivalSortOrder = 'Asc';
			}
		}
		sortUsingNestedText($(this).data("sortKey"), sortOrder, sortType);
		$(".bs-waiting-modal-sm").modal('hide');
		load_banner();
	});
	$("#FastestBtn").click(function () {
		durationSortOrder = 'Asc';
		sortUsingNestedText("[id^='duration_']", durationSortOrder, "Duration");
		$("#flightResult .OneMultResult").css("display", "none");
		$("#flightResult .OneMultResult:nth-child(7),#flightResult .OneMultResult:nth-child(8)").css("display", "block");
		$("#CheapestBtn").css("color", "#f26a27");
		$(this).css("color", "#263f85");
		countflight();
	});
	$("#CheapestBtn").click(function () {
		pubPriceSortOrder = 'Asc';
		sortUsingNestedText("[id^='PubPrice_']", pubPriceSortOrder, "PubPrice");
		$("#flightResult .OneMultResult").css("display", "none");
		$("#flightResult .OneMultResult:nth-child(7),#flightResult .OneMultResult:nth-child(8),#flightResult .OneMultResult:nth-child(9)").css("display", "block");
		$("#FastestBtn").css("color", "#f26a27");
		$(this).css("color", "#263f85");
		countflight();
	});
	$("#ShowAllFare").click(function () {
		$("#flightResult .OneMultResult").css("display", "block");
		countflight();
	});
	$("#spnSortib_Airlineib").data("sortKey", "[id^='airlinenameib_']");
	$("#spnSortib_Departureib").data("sortKey", "[id^='departureib_']");
	$("#spnSortib_Arrivalib").data("sortKey", "[id^='arrivalib_']");
	$("#spnSortib_Durationib").data("sortKey", "[id^='durationib_']");
	$("#spnSortib_PubPriceib").data("sortKey", "[id^='PubPriceib_']");
	var airlineSortOrderib = 'Desc';
	var departueSortOrderib = 'Desc';
	var arrivalSortOrderib = 'Desc';
	var durationSortOrderib = 'Desc';
	var pubPriceSortOrderib = 'Desc';
	$('[id^="spnSortib_"]').on('click', function (e) {
		e.preventDefault();
		$(".bs-waiting-modal-sm").modal('show');
		$('[id^="spnSortib_"]').removeClass("selected");
		$("i", this).toggleClass("fa fa-sort-up fa fa-sort-down");
		var spanId = $(this).attr('id');
		var sortType = spanId.replace(/spnSortib_/, '');
		var sortOrder;
		if (sortType == "PubPriceib") {
			$("#spnSortib_PubPriceib").addClass("selected");
			sortOrder = pubPriceSortOrderib;
			if (pubPriceSortOrderib == 'Asc') {
				pubPriceSortOrderib = 'Desc';
			} else {
				pubPriceSortOrderib = 'Asc';
			}
		} else if (sortType == "Durationib") {
			$("#spnSortib_Durationib").addClass("selected");
			sortOrder = durationSortOrderib;
			if (durationSortOrderib == 'Asc') {
				durationSortOrderib = 'Desc';
			} else {
				durationSortOrderib = 'Asc';
			}
		} else if (sortType == "Departureib") {
			$("#spnSortib_Departureib").addClass("selected");
			sortOrder = departueSortOrderib;
			if (departueSortOrderib == 'Asc') {
				departueSortOrderib = 'Desc';
			} else {
				departueSortOrderib = 'Asc';
			}
		} else if (sortType == "Airlineib") {
			$("#spnSortib_Airlineib").addClass("selected");
			sortOrder = airlineSortOrderib;
			if (airlineSortOrderib == 'Asc') {
				airlineSortOrderib = 'Desc';
			} else {
				airlineSortOrderib = 'Asc';
			}
		} else {
			$("#spnSortib_Arrivalib").addClass("selected");
			sortOrder = arrivalSortOrderib;
			if (arrivalSortOrderib == 'Asc') {
				arrivalSortOrderib = 'Desc';
			} else {
				arrivalSortOrderib = 'Asc';
			}
		}
		sortUsingNestedTextib($(this).data("sortKey"), sortOrder, sortType);
		$(".bs-waiting-modal-sm").modal('hide');
	});
	stopArray = stopArray.filter(function (e, i, stopArray) {
		return stopArray.lastIndexOf(e) === i;
	});
	stopArray.sort();
	var stophtml = "";
	for (i = 0; i < stopArray.length; i++) {
		if (stopArray[i] == 0) {
			stophtml += '<div class="checkbox"><label><input type="checkbox" atr-stop-hit class="aj_filter" value="0" >Non Stop</label></div>';
		} else {
			stophtml += '<div class="checkbox"><label><input type="checkbox" atr-stop-hit  class="aj_filter" value="' + stopArray[i] + '" >' + stopArray[i] + ' Stop</label></div>';
		}
	}
	$('[atr-stop-html-data]').html(stophtml);
	
	/* departtime Start By Anil*/
	
	departtimeArray = departtimeArray.filter(function(e, i, departtimeArray) {
        return departtimeArray.lastIndexOf(e) === i;
    });
    //departtimeArray.sort();
    var departtimehtml = "";
    for (i = 0; i < departtimeArray.length; i++) {
		
            departtimehtml += '<div class="checkbox"><label><input type="checkbox" atr-departtime-hit  class="aj_filter" value="' + departtimeArray[i] +'" >' + departtimeArray[i] +  departtimerange(departtimeArray[i]) + ' </label></div>';
       
    }
    $('[atr-departtime-html-data]').html(departtimehtml);
	
	
	/* departtime End Anil*/
	/* Destination Near By  Anil*/
	destinationnearArray = destinationnearArray.filter(function(e, i, destinationnearArray) {
        return destinationnearArray.lastIndexOf(e) === i;
    });
    var destinationnearhtml = "";
    for (i = 0; i < destinationnearArray.length; i++) {
		
            destinationnearhtml += '<div class="checkbox"><label><input type="checkbox" atr-destinationnearby-hit  class="aj_filter" value="' + destinationnearArray[i] +'" >' + destinationnearArray[i]  + ' </label></div>';
       
    }
    $('[atr-destinationnearby-html-data]').html(destinationnearhtml);
	
	/* Destination Near By  Anil*/
	
	var result = groupBy(array, function (item) {
		return [item.AirlineName, item.Airlinecode];
	});
	var counters = {};
	var matrixarray = new Array();
	result.forEach(function (v1, k1) {
		var matrix = min_value(v1);
		matrixarray.push(matrix);
		var itemAirlineName = matrix.AirlineName;
		if (!counters[itemAirlineName]) {
			counters[itemAirlineName] = matrix.Airlinecode;
		}
	});
	var airlinedata = "";
	Object.keys(counters).sort().forEach(function (v, i) {
		airlinedata += '<div class="checkbox"><label><input type="checkbox" atr-airline-name-hit  value="' + v + '" name="filter" class="aj_filter">' + counters[v] + '   ' + v + '</label></div>';
	});
	$('[atr-airline-html-data]').html(airlinedata);

	function groupBy(array, f) {
		var groups = {};
		array.forEach(function (o) {
			var group = JSON.stringify(f(o));
			groups[group] = groups[group] || [];
			groups[group].push(o);
		});
		return Object.keys(groups).map(function (group) {
			return groups[group];
		})
	}

	function min_value(dataset) {
		var min = Infinity,
			key;
		dataset.forEach(function (v, k) {
			if (min > +v.price) {
				min = +v.price;
				key = k;
			}
		});
		return dataset[key];
	}
	flighttypeArray = flighttypeArray.filter(function (e, i, flighttypeArray) {
		return flighttypeArray.lastIndexOf(e) === i;
	});
	var flighttypehtml = "";
	for (i = 0; i < flighttypeArray.length; i++) {
		flighttypehtml += '<div class="checkbox raj_checkbox"><label><input type="checkbox" atr-faretype-hit name="filter" class="aj_filter" value="' + flighttypeArray[i] + '" />' + flighttypeArray[i] + '  </label></div>';
	}
	$('[atr-faretype-html-data]').html(flighttypehtml);
	var flighttype = new Array();
	$('[atr-faretype-hit]').click(function () {
		var faretypevalue = $(this).val();
		if ($(this).is(':checked')) {
			flighttype.push(faretypevalue);
			$(this).parents().parents().addClass("checked");
			$(this).prop('checked', true);
		} else {
			flighttype = jQuery.grep(flighttype, function (value) {
				return value != faretypevalue;
			});
			$(this).parents().parents().removeClass("checked");
			$(this).prop('checked', false);
		}
	});
	var airline = new Array();
	$('[atr-airline-name-hit]').click(function () {
		var airlinename = $(this).val();
		if ($(this).is(':checked')) {
			airline.push(airlinename);
			$(this).parents().parents().addClass("checked");
			$(this).prop('checked', true);
		} else {
			airline = jQuery.grep(airline, function (value) {
				return value != airlinename;
			});
			$(this).parents().parents().removeClass("checked");
			$(this).prop('checked', false);
		}
	});
	var stop = new Array();
	$('[atr-stop-hit]').click(function () {
		var stopvalue = $(this).val();
		if ($(this).is(':checked')) {
			stop.push(stopvalue);
			$(this).parents().parents().addClass("checked");
			$(this).prop('checked', true);
		} else {
			stop = jQuery.grep(stop, function (value) {
				return value != stopvalue;
			});
			$(this).parents().parents().removeClass("checked");
			$(this).prop('checked', false);
		}
	});
	/* Departure Time  */
	 var departtime = new Array();
    $('[atr-departtime-hit]').click(function() {
        var departvalue = $(this).val();
        if ($(this).is(':checked')) {
            departtime.push(departvalue);
            $(this).parents().parents().addClass("checked");
            $(this).prop('checked', true);
        } else {
            departtime = jQuery.grep(departtime, function(value) {
                return value != departvalue;
            });
            $(this).parents().parents().removeClass("checked");
            $(this).prop('checked', false);
        }
		
    });
	
	/* Departure Time  */
	/* Destination Near By  */
	 var destinationnearby = new Array();
    $('[atr-destinationnearby-hit]').click(function() {
        var dnearbyval = $(this).val();
        if ($(this).is(':checked')) {
            destinationnearby.push(dnearbyval);
            $(this).parents().parents().addClass("checked");
            $(this).prop('checked', true);
        } else {
            destinationnearby = jQuery.grep(destinationnearby, function(value) {
                return value != dnearbyval;
            });
            $(this).parents().parents().removeClass("checked");
            $(this).prop('checked', false);
        }
    });
	
	/* Destination Near By  */
	
	$(".aj_filter").click(function () {
		$(".bs-waiting-modal-sm").modal('show');
		var filters = {};
		var ftypecount = flighttype.length;
		var airlinecount = airline.length;
		var departtimecount = departtime.length;
		var dnearbycount = destinationnearby.length;
		var stopcount = stop.length;
		var pattern = /[0-9]+/g;
		var min = $.trim($(".minprice_12").text());
		var max = $.trim($(".maxprice_12").text());
		min = Number($.trim(min.replace(/[^0-9]+/g, '')).match(pattern));
		max = Number($.trim(max.replace(/[^0-9]+/g, '')).match(pattern));
		if (ftypecount !== 0) {
			filters['fare_type'] = flighttype;
		}
		if (airlinecount !== 0) {
			filters['AirlineName'] = airline;
		}
		if (departtimecount !== 0) {
            filters['departtime'] = departtime;
        }
		if (dnearbycount !== 0) {
            filters['destinationnearby'] = destinationnearby;
        }
		if (stopcount !== 0) {
			filters['stop'] = stop;
		}
		var filtered = multiFilter(array, filters);
		$("[atr-sort]").hide();
		$.each(filtered, function (i, value) {
			if (value.price <= min || value.price >= max) {
				$("#ResSet_" + value.index).hide();
			}
			if (value.price >= min && value.price <= max) {
				$("#ResSet_" + value.index).show();
			}
		});
		countflight();
		$(".bs-waiting-modal-sm").modal('hide');
		load_banner();
	});
	Array.prototype.max = function () {
		return Math.max.apply(null, this);
	};
	Array.prototype.min = function () {
		return Math.min.apply(null, this);
	};
	var price_min = priceArray.min();
	var price_max = priceArray.max();
	$(".price-range").slider({
		range: true,
		min: price_min,
		max: price_max,
		values: [price_min, price_max],
		slide: function (event, ui) {
			$(".minprice_12").html(currency + ' ' + ui.values[0]);
			$(".maxprice_12").html(currency + ' ' + ui.values[1]);
		},
		change: function (event, ui) {
			var mi = ui.values[0];
			var mx = ui.values[1];
			var filters = {};
			var ftypecount = flighttype.length;
			var airlinecount = airline.length;
			var departtimecount = departtime.length;
			var dnearbycount = destinationnearby.length;
			var stopcount = stop.length;
			if (ftypecount !== 0) {
				filters['fare_type'] = flighttype;
			}
			if (airlinecount !== 0) {
				filters['AirlineName'] = airline;
			}
			if (departtimecount !== 0) {
            filters['departtime'] = departtime;
			}
			if (dnearbycount !== 0) {
            filters['destinationnearby'] = destinationnearby;
			}
			if (stopcount !== 0) {
				filters['stop'] = stop;
			}
			var filtered = multiFilter(array, filters);
			$("[atr-sort]").hide();
			$.each(filtered, function (i, value) {
				if (value.price <= mi || value.price >= mx) {
					$("#ResSet_" + value.index).hide();
				}
				if (value.price >= mi && value.price <= mx) {
					$("#ResSet_" + value.index).show();
				}
			});
			countflight();
			$(".bs-waiting-modal-sm").modal('hide');
			load_banner();
		}
	});
	$(".minprice_12").html(currency + ' ' + $(".price-range").slider("values", 0));
	$(".maxprice_12").html(currency + ' ' + $(".price-range").slider("values", 1));
	$('[atr-clearfilter]').click(function () {
		$('[atr-airline-name-hit]').prop('checked', false);
		$('[atr-airline-name-hit]').parents().parents().removeClass("checked");
		$('[atr-stop-hit]').prop('checked', false);
		$('[atr-stop-hit]').parents().parents().removeClass("checked");
		$('[atr-faretype-hit]').prop('checked', false);
		$('[atr-faretype-hit]').parents().parents().removeClass("checked");
		$('[atr-departtime-hit]').prop('checked', false);
		$('[atr-departtime-hit]').parents().parents().removeClass("checked");
		$('[atr-destinationnearby-hit]').prop('checked', false);
		$('[atr-destinationnearby-hit]').parents().parents().removeClass("checked");
		$(".price-range").slider("values", 0, price_min);
		$(".price-range").slider("values", 1, price_max);
		$(".minprice_12").html(currency + ' ' + price_min);
		$(".maxprice_12").html(currency + ' ' + price_max);
		flighttype = [];
		airline = [];
		stop = [];
		$.each(array, function (i, value) {
			$("#ResSet_" + value.index).show();
		});
		countflight();
		load_banner();
	});
});
function departtimerange(val)
{
	switch(val) {
		case 'Early-Morning':
			return timerange="(12am - 8am)";
			break;
		case 'Morning':
			return timerange="(8am - 12pm)";
			break;
		case 'Mid-Day':
			return timerange="(12pm - 4pm)";
			break;
		case 'Evening':
			return timerange="(4pm - 8pm)";
			break;
		case 'Night':
			return timerange="(8pm - 12am)";
			break;
		default: return ' ';	
	}	
}

function multiFilter(array, filters) {
	var filterKeys = Object.keys(filters);
	
	return array.filter((item) => {
		return filterKeys.every(key => !!~filters[key].indexOf(item[key]));
	});
}
var flightResult = $('#flightResult');
var flightDiv = $('#flightResult div.result_p');
setTimeout(function () {
	sortUsingNestedText($("#spnSort_PubPrice").data("sortKey"), "Asc", "Price");
}, 2000);

function sortUsingNestedText(keySelector, sortOrder, sortType) {
	var items = flightDiv.sort(function (a, b) {
		if (sortType == "Airline") {
			var vA = $.trim($(keySelector, a).text());
			var vB = $.trim($(keySelector, b).text());
		} else {
			if (sortType == "Duration") {
				var pattern = /[0-9]+/g;
				var vA = $.trim($(keySelector, a).attr('atr-totalduration'));
				var vB = $.trim($(keySelector, b).attr('atr-totalduration'));
				vA = Number($.trim(vA.replace(/[^0-9]+/g, '')).match(pattern));
				vB = Number($.trim(vB.replace(/[^0-9]+/g, '')).match(pattern));
			} else {
				var pattern = /[0-9]+/g;
				var vA = $.trim($(keySelector, a).text());
				var vB = $.trim($(keySelector, b).text());
				vA = Number($.trim(vA.replace(/[^0-9]+/g, '')).match(pattern));
				vB = Number($.trim(vB.replace(/[^0-9]+/g, '')).match(pattern));
			}
		}
		if (sortOrder == 'Asc') {
			return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
		} else {
			return (vA > vB) ? -1 : (vA < vB) ? 1 : 0;
		}
	});
	flightResult.append(items);
}
var flightResultib = $('#flightResultib');
var flightDivib = $('#flightResultib div.result_pib');
setTimeout(function () {
	sortUsingNestedTextib($("#spnSortib_PubPriceib").data("sortKey"), "Asc", "Price");
}, 2000);

function sortUsingNestedTextib(keySelector, sortOrder, sortType) {
	var items = flightDivib.sort(function (a, b) {
		if (sortType == "Airlineib") {
			var vA = $.trim($(keySelector, a).text());
			var vB = $.trim($(keySelector, b).text());
		} else {
			if (sortType == "Durationib") {
				var pattern = /[0-9]+/g;
				var vA = $.trim($(keySelector, a).attr('atr-totalduration'));
				var vB = $.trim($(keySelector, b).attr('atr-totalduration'));
				vA = Number($.trim(vA.replace(/[^0-9]+/g, '')).match(pattern));
				vB = Number($.trim(vB.replace(/[^0-9]+/g, '')).match(pattern));
			} else {
				var pattern = /[0-9]+/g;
				var vA = $.trim($(keySelector, a).text());
				var vB = $.trim($(keySelector, b).text());
				vA = Number($.trim(vA.replace(/[^0-9]+/g, '')).match(pattern));
				vB = Number($.trim(vB.replace(/[^0-9]+/g, '')).match(pattern));
			}
		}
		if (sortOrder == 'Asc') {
			return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
		} else {
			return (vA > vB) ? -1 : (vA < vB) ? 1 : 0;
		}
	});
	flightResultib.append(items);
}
$(function(){
	setTimeout(function(){ load_banner(); }, 10000);
});
function load_banner() { 
	$(".calloutbanner").remove();
	var geturl = $("#siteurl").val(); 
	$("#flightResult .result_p:nth-child(8)").after('<div class="calloutbanner">' + '<a href="#none">' + '<img src="' + geturl + 'assets/images/Package_offer_fligpage.jpg" alt="...">' + '</a>' + '</div>');
	}
	
$(function () {
	$('#flightResult .result_p:nth-child(2)').click();
	$('#flightResultib .result_pib:nth-child(2)').click();
});

function countflight() {
	$('[atr-flightcount]').html($('[atr-sort]:visible').length);
	if (($('[atr-sort]:visible').length) == 0) {
		$('.noflightlistcontainer').show();
	} else {
		$('.noflightlistcontainer').hide();
	}
}
$(function () {
	countflight();
	myautocomplete('int');
	$("[name='GetSearchType']").click(function () {
		var value = this.value;
		if (value == "oneway") {
			myautocomplete('int');
			$('.MultiCityFormShow').hide();
			$('.OtherSearchFormShow').show();
			$("[name='search_type']").val(value);
			$('.JtypeShow').hide();
			$('input[name=j_type]').attr("disabled", "disabled");
			$("[name='return_date']").attr("disabled", "disabled").addClass('desable_rt');
			$("[name='return_date']").val('').removeAttr("data-validation", "required");
			$(".roundtrip").removeClass('activetext');
			$(".multab").removeClass('activetext');
			$(".oneway").addClass('activetext');
			$("#topmainslider .item img").css("height", "550px");
		} else if (value == "round") {
			myautocomplete('int');
			$('.MultiCityFormShow').hide();
			$('.OtherSearchFormShow').show();
			$("[name='search_type']").val(value);
			$('.JtypeShow').show();
			$('input[name=j_type]').removeAttr("disabled");
			$("[name='return_date']").removeAttr("disabled").removeClass('desable_rt').attr("data-validation", "required");
			$(".oneway").removeClass('activetext');
			$(".multab").removeClass('activetext');
			$(".roundtrip").addClass('activetext');
			$("#topmainslider .item img").css("height", "550px");
		} else if (value == "multi_city") {
			$("[name='search_type']").val(value);
			$('.MultiCityFormShow').show();
			$('.OtherSearchFormShow').hide();
			$(".roundtrip").removeClass('activetext');
			$(".oneway").removeClass('activetext');
			$(".multab").addClass('activetext');
		} else {
			$('.MultiCityFormShow').hide();
			$('.OtherSearchFormShow').show();
			$("[name='search_type']").val('oneway');
			$('.JtypeShow').hide();
			$('input[name=j_type]').attr("disabled", "disabled");
			$("[name='return_date']").parent().css('pointer-events', 'none');
			$("[name='return_date']").attr("disabled", "disabled");
			$("[name='return_date']").val('');
		}
	});
	$(".date_rt").click(function () {
		$(".sct_round").click();
	});
	$("input[name=j_type]").click(function () {
		$("[name='from_location']").val('');
		$("[name='to_location']").val('');
		if ($(this).val() == 'special_lcc') {
			myautocomplete('dom');
		} else {
			myautocomplete('int');
		}
	});
});
$(function () {
	$("[name='adltvalue']").change(function () {
		$("[name='infantdvalue']").next().text("0");
		$("[name='childvalue']").next().text("0");
		var value = this.value;
		var infval = [];
		for (var i = 0; i <= value; i++) {
			infval.push('<option value="' + i + '">' + i + '</option>');
		}
		$("[name='infantdvalue']").html(infval);
		var child_count = 9 - value;
		var child_vl = [];
		for (var i = 0; i <= child_count; i++) {
			child_vl.push('<option value="' + i + '">' + i + '</option>');
		}
		$("[name='childvalue']").html(child_vl);
	});
	$("#mc_adult").change(function () {
		var value = this.value;
		var infval = [];
		for (var i = 0; i <= value; i++) {
			infval.push('<option value="' + i + '">' + i + '</option>');
		}
		document.getElementById("mc_infant").innerHTML = infval;
		var child_count = 9 - value;
		var child_vl = [];
		for (var i = 0; i <= child_count; i++) {
			child_vl.push('<option value="' + i + '">' + i + '</option>');
		}
		document.getElementById("mc_child").innerHTML = child_vl;
	});
});
$(document).ready(function () {
	$(".mclicktoshow").click(function () {
		$(this).closest(".repeat-box").find(".showdetail").slideToggle();
		$(this).closest(".repeat-box").find(".togleshowitem").slideToggle();
	});
	$(".Mremark-Btn").click(function () {
		$(this).closest(".repeat-box").find(".ReMarkShow").slideToggle();
	});
});

function goBack() {
	window.history.back();
}

function custom_date_format(date) {
	var create_date = date.split("-");
	return finaldate = create_date[1] + "/" + create_date[0] + "/" + create_date[2];
}

function isMobile() {
	return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent || navigator.vendor || window.opera) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4)))
}
$(function () {
	if (isMobile()) {
		$(".flight_depart").datepicker({
			defaultDate: "",
			changeYear: false,
			showOtherMonths: true,
			minDate: 0,
			dateFormat: "dd-mm-yy",
			numberOfMonths: 1,
			dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
			beforeShow: function () {
				$(".ui-datepicker").addClass('raj_datepicker');
			},
			onClose: function (selectedDate) {
				$(".flight_arrive").datepicker("option", "minDate", selectedDate);
				$(".flight_arrive").focus();
			}
		});
		$(".flight_arrive").datepicker({
			defaultDate: "",
			changeYear: false,
			showOtherMonths: true,
			dateFormat: "dd-mm-yy",
			numberOfMonths: 1,
			dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
			beforeShow: function () {
				$(".ui-datepicker").addClass('raj_datepicker');
			},
			onClose: function (selectedDate) {
				$(".flight_depart").datepicker("option", "maxDate", selectedDate);
			}
		});
		$(".multisegdate1").datepicker({
			changeYear: false,
			showOtherMonths: true,
			minDate: 0,
			numberOfMonths: 1,
			dateFormat: "dd-mm-yy",
			dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
			beforeShow: function () {
				$(".ui-datepicker").addClass('raj_datepicker');
			},
			onClose: function (selectedDate) {
				$(".multisegdate2").datepicker("option", "minDate", selectedDate);
				$("[data-key='3']").focus();
			}
		});
		$(".multisegdate2").datepicker({
			changeYear: false,
			showOtherMonths: true,
			minDate: 0,
			dateFormat: "dd-mm-yy",
			numberOfMonths: 1,
			dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
			beforeShow: function () {
				$(".ui-datepicker").addClass('raj_datepicker');
			},
			onClose: function (selectedDate) {
				$(".multisegdate3").datepicker("option", "minDate", selectedDate);
			}
		});
		$(".multisegdate3").datepicker({
			changeYear: false,
			showOtherMonths: true,
			minDate: 0,
			dateFormat: "dd-mm-yy",
			numberOfMonths: 1,
			dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
			beforeShow: function () {
				$(".ui-datepicker").addClass('raj_datepicker');
			},
			onClose: function (selectedDate) {
				$(".multisegdate4").datepicker("option", "minDate", selectedDate);
			}
		});
		$(".multisegdate4").datepicker({
			changeYear: false,
			showOtherMonths: true,
			minDate: 0,
			dateFormat: "dd-mm-yy",
			numberOfMonths: 1,
			dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
			beforeShow: function () {
				$(".ui-datepicker").addClass('raj_datepicker');
			},
			onClose: function (selectedDate) {}
		});
		$(".hotel_cheak_in").datepicker({
			showOn: 'both',
			buttonText: '',
			buttonImageOnly: true,
			changeYear: false,
			showOtherMonths: true,
			numberOfMonths: 1,
			minDate: 0,
			dateFormat: "dd-mm-yy",
			dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
			beforeShow: function (input, inst) {
				var themeClass = $(input).parent().attr("class").replace("datepicker-wrap", "");
				$('#ui-datepicker-div').attr("class", "");
				$('#ui-datepicker-div').addClass("ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all date_class_z");
				$('#ui-datepicker-div').addClass('raj_datepicker');
			},
			onClose: function (selectedDate) {
				var finaldate = custom_date_format(selectedDate);
				var myDate = new Date(finaldate);
				myDate.setDate(myDate.getDate() + 1);
				$(".hotel_cheak_out").datepicker("option", "minDate", myDate);
				$(".hotel_cheak_out").focus();
			}
		});
		$(".hotel_cheak_out").datepicker({
			showOn: 'both',
			buttonText: '',
			buttonImageOnly: true,
			changeYear: false,
			showOtherMonths: true,
			numberOfMonths: 1,
			minDate: 0,
			dateFormat: "dd-mm-yy",
			dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
			beforeShow: function (input, inst) {
				var themeClass = $(input).parent().attr("class").replace("datepicker-wrap", "");
				$('#ui-datepicker-div').attr("class", "");
				$('#ui-datepicker-div').addClass("ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all");
				$('#ui-datepicker-div').addClass('raj_datepicker');
			},
			onClose: function (selectedDate) {
				$(".hotel_cheak_in").datepicker("option", "maxDate", selectedDate);
			}
		});
	}
});
$(function () {
	var geturl = $("#siteurl").val();
	$(".flight_depart").datepicker({
		defaultDate: "",
		changeYear: false,
		showOtherMonths: true,
		minDate: 0,
		dateFormat: "dd-mm-yy",
		numberOfMonths: 2,
		dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
		beforeShow: function () {
			$(".ui-datepicker").addClass('raj_datepicker');
		},
		onClose: function (selectedDate) {
			$(".flight_arrive").datepicker("option", "minDate", selectedDate);
			$(".ui-datepicker").removeClass('raj_datepicker');
			$(".flight_arrive").focus();
		}
	});
	$(".flight_arrive").datepicker({
		defaultDate: "",
		changeYear: false,
		showOtherMonths: true,
		dateFormat: "dd-mm-yy",
		numberOfMonths: 2,
		dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
		beforeShow: function () {
			$(".ui-datepicker").addClass('raj_datepicker');
		},
		onClose: function (selectedDate) {
			$(".flight_depart").datepicker("option", "maxDate", selectedDate);
			$(".ui-datepicker").removeClass('raj_datepicker');
		}
	});
	$(".flight_depart_today_ow").datepicker({
		defaultDate: "",
		changeYear: false,
		showOtherMonths: true,
		minDate: 0,
		dateFormat: "dd-mm-yy",
		numberOfMonths: 1,
		dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
		beforeShow: function () {
			$(".ui-datepicker").addClass('zindexad');
		},
		onClose: function (selectedDate) {}
	});
	$(".flight_depart_today").datepicker({
		defaultDate: "",
		changeYear: false,
		showOtherMonths: true,
		minDate: 0,
		dateFormat: "dd-mm-yy",
		numberOfMonths: 1,
		dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
		beforeShow: function () {
			$(".ui-datepicker").addClass('zindexad');
		},
		onClose: function (selectedDate) {
			$(".flight_arrive_today").datepicker("option", "minDate", selectedDate);
			$(".ui-datepicker").removeClass('zindexad');
		}
	});
	$(".flight_arrive_today").datepicker({
		defaultDate: "",
		changeYear: false,
		showOtherMonths: true,
		dateFormat: "dd-mm-yy",
		numberOfMonths: 1,
		dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
		beforeShow: function () {
			$(".ui-datepicker").addClass('zindexad');
		},
		onClose: function (selectedDate) {
			$(".flight_depart_today").datepicker("option", "maxDate", selectedDate);
			$(".ui-datepicker").removeClass('zindexad');
		}
	});
	$(".multisegdate1").datepicker({
		changeYear: false,
		showOtherMonths: true,
		minDate: 0,
		numberOfMonths: 2,
		dateFormat: "dd-mm-yy",
		dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
		beforeShow: function () {
			$(".ui-datepicker").addClass('raj_datepicker');
		},
		onClose: function (selectedDate) {
			$(".multisegdate2").datepicker("option", "minDate", selectedDate);
			$("[data-key='3']").focus();
		}
	});
	$(".multisegdate2").datepicker({
		changeYear: false,
		showOtherMonths: true,
		minDate: 0,
		dateFormat: "dd-mm-yy",
		numberOfMonths: 2,
		dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
		beforeShow: function () {
			$(".ui-datepicker").addClass('raj_datepicker');
		},
		onClose: function (selectedDate) {
			$(".multisegdate3").datepicker("option", "minDate", selectedDate);
		}
	});
	$(".multisegdate3").datepicker({
		changeYear: false,
		showOtherMonths: true,
		minDate: 0,
		dateFormat: "dd-mm-yy",
		numberOfMonths: 2,
		dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
		beforeShow: function () {
			$(".ui-datepicker").addClass('raj_datepicker');
		},
		onClose: function (selectedDate) {
			$(".multisegdate4").datepicker("option", "minDate", selectedDate);
		}
	});
	$(".multisegdate4").datepicker({
		changeYear: false,
		showOtherMonths: true,
		minDate: 0,
		dateFormat: "dd-mm-yy",
		numberOfMonths: 2,
		dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
		beforeShow: function () {
			$(".ui-datepicker").addClass('raj_datepicker');
		},
		onClose: function (selectedDate) {}
	});
	$(".hotel_cheak_in").datepicker({
		showOn: 'both',
		buttonText: '',
		buttonImageOnly: true,
		changeYear: false,
		showOtherMonths: true,
		numberOfMonths: 2,
		minDate: 0,
		dateFormat: "dd-mm-yy",
		dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
		beforeShow: function (input, inst) {
			var themeClass = $(input).parent().attr("class").replace("datepicker-wrap", "");
			$('#ui-datepicker-div').attr("class", "");
			$('#ui-datepicker-div').addClass("ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all date_class_z");
			$('#ui-datepicker-div').addClass('raj_datepicker');
		},
		onClose: function (selectedDate) {
			var finaldate = custom_date_format(selectedDate);
			var myDate = new Date(finaldate);
			myDate.setDate(myDate.getDate() + 1);
			$(".hotel_cheak_out").datepicker("option", "minDate", myDate);
			$(".hotel_cheak_out").focus();
		}
	});
	$(".hotel_cheak_out").datepicker({
		showOn: 'both',
		buttonText: '',
		buttonImageOnly: true,
		changeYear: false,
		showOtherMonths: true,
		numberOfMonths: 2,
		minDate: 0,
		dateFormat: "dd-mm-yy",
		dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
		beforeShow: function (input, inst) {
			var themeClass = $(input).parent().attr("class").replace("datepicker-wrap", "");
			$('#ui-datepicker-div').attr("class", "");
			$('#ui-datepicker-div').addClass("ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all");
			$('#ui-datepicker-div').addClass('raj_datepicker');
		},
		onClose: function (selectedDate) {
			$(".hotel_cheak_in").datepicker("option", "maxDate", selectedDate);
		}
	});
});
var mccount = 3;

function addcity() {
	if (mccount == 3) {
		$(".mc_add3").show();
		$(".removeform3").show();
		$(".remove_desabled1").removeAttr('disabled');
		$(".remove_desabled1").attr("data-validation", "required");
		$("[data-key='5']").focus();
		$("#topmainslider .item img").css("height", "600px");
	}
	if (mccount == 4) {
		$(".mc_add4").show();
		$(".removeform4").show();
		$(".removeform3").hide();
		$(".add_form").hide();
		$(".remove_desabled2").removeAttr('disabled');
		$(".remove_desabled2").attr("data-validation", "required");
		$("[data-key='7']").focus();
		$("#topmainslider .item img").css("height", "650px");
	}
	mccount++;
}
$(".removeButton").click(function () {
	if ($(this).attr("val") == "3") {
		$(".mc_add3").hide();
		$(".add_form").show();
		$(".remove_desabled1").attr('disabled', true);
		$(".remove_desabled1").removeAttr("data-validation");
		$("#topmainslider .item img").css("height", "550px");
		mccount = 3;
	}
	if ($(this).attr("val") == "4") {
		$(".mc_add4").hide();
		$(".add_form").show();
		$(".removeform3").show();
		$(".remove_desabled2").attr('disabled', true);
		$(".remove_desabled2").removeAttr("data-validation");
		$("#topmainslider .item img").css("height", "600px");
		mccount = 4;
	}
});

function mypopover() {
	$('.poper').popover({
		html: true,
		content: function () {
			return $("#popover-content", this).html();
		}
	});
}
$(document).ready(function () {
	$('.poper').popover({
		html: true,
		content: function () {
			return $("#popover-content", this).html();
		}
	});
});
var domesticAirline = ["IN-Agra (Kheria), AGR", "IN-Agatti Island (Agatti Island), AGX", "IN-Aizawl (Aizawl), AJL", "IN-Akola (Akola), AKD", "IN-Ahmedabad (Ahmedabad), AMD", "IN-Amritsar (Amritsar), ATQ", "IN-Bhubaneshwar (Bhubaneshwar), BBI", "IN-Vadodara (Vadodara), BDQ", "IN-Bellary (Bellary), BEP", "IN-Bhuj (Rudra Mata), BHJ", "IN-Bhopal (Bhopal), BHO", "IN-Bhavnagar (Bhavnagar), BHU", "IN-Bangalore (Bengaluru Intl), BLR", "IN-Mumbai (Mumbai), BOM", "IN-Car Nicobar (Car Nicobar), CBD", "IN-Calicut (Calicut), CCJ", "IN-Kolkata (Calcutta), CCU", "IN-Coimbatore (Peelamedu), CJB", "IN-Cooch Behar (Cooch Behar), COH", "IN-Kochi (Kochi), COK", "IN-Dhanbad (DHANBAD), DBD", "IN-Dehra Dun (Dehra Dun), DED", "IN-Delhi (Indira Gandhi Airport), DEL", "IN-Dharamsala (Gaggal), DHM", "IN-Dibrugarh (Mohanbari), DIB", "IN-Diu (DIU), DIU", "IN-Dimapur (Dimapur), DMU", "IN-Guwahati (Borjhar), GAU", "IN-Gaya (Gaya), GAY", "IN-Goa (Dabolim), GOI", "IN-Gorakhpur (Gorakhpur), GOP", "IN-Gwalior (Gwalior), GWL", "IN-Hubli (Hubli), HBX", "IN-Khajuraho (Khajuraho), HJR", "IN-Hyderabad (Shamsabad International Airport), HYD", "IN-Indore (Indore), IDR", "IN-Imphal (Imphal Municipal), IMF", "IN-Nasik (Gandhinagar), ISK", "IN-Agartala (Singerbhil), IXA", "IN-Bagdogra (Bagdogra), IXB", "IN-Chandigarh (Chandigarh), IXC", "IN-Allahabad (Bamrauli), IXD", "IN-Mangalore (Bajpe), IXE", "IN-Belgaum (Sambre), IXG", "IN-Kailashahar (Kailashahar), IXH", "IN-Lilabari (Lilabari), IXI", "IN-Jammu (Satwari), IXJ", "IN-Keshod (Keshod), IXK", "IN-Leh (Leh), IXL", "IN-Madurai (Madurai), IXM", "IN-Pathankot (Pathankot), IXP", "IN-Ranchi (Ranchi), IXR", "IN-Silchar (Kumbhirgram), IXS", "IN-Aurangabad (Chikkalthana), IXU", "IN-Jamshedpur (Sonari), IXW", "IN-Kandla (Kandla), IXY", "IN-Port Blair (Port Blair), IXZ", "IN-Jaipur (Jaipur), JAI", "IN-Jodhpur (Jodhpur), JDH", "IN-Jamnagar (Govardhanpur), JGA", "IN-Jagdalpur (Jagdalpur), JGB", "IN-Jabalpur (Jabalpur), JLR", "IN-Jorhat (Rowriah), JRH", "IN-Jaisalmer (Jaisalmer), JSA", "IN-Kolhapur (Kolhapur), KLH", "IN-Kanpur (Kanpur), KNU", "IN-Kota (Kota), KTU", "IN-Kulu (Bhuntar), KUU", "IN-Malda (Malda), LDA", "IN-Lucknow (Amausi), LKO", "IN-latur (LATUR), ltu", "IN-Ludhiana (Ludhiana), LUH", "IN-Chennai (Chennai), MAA", "IN-Mysore (Mysore), MYQ", "IN-Nagpur (Sonegaon), NAG", "IN-Nanded (Nanded), NDC", "IN-Daman (Daman), NMB", "IN-Neyveli (Neyveli), NVY", "IN-Bilaspur (Bilaspur), PAB", "IN-Patna (Patna), PAT", "IN-Porbandar (Porbandar), PBD", "IN-Pantnagar (Pantnagar), PGH", "IN-Pune (Lohegaon), PNQ", "IN-Pondicherry (PONDICHERRY), PNY", "IN-Rajkot (Rajkot Civil), RAJ", "IN-Rewa (Rewa), REW", "IN-Rajahmundry (Rajahmundry), RJA", "IN-Rajouri (Rajouri), RJI", "IN-Raipur (Raipur), RPR", "IN-Rourkela (Rourkela), RRK", "IN-Shillong (Shillong), SHL", "IN-Simla (Simla), SLV", "IN-Sholapur (Sholapur), SSE", "IN-Surat (Surat), STV", "IN-Srinagar (Srinagar), SXR", "IN-Salem (Salem), SXV", "IN-Tuticorin (Tuticorin), TCR", "IN-Tezu (Tezu), TEI", "IN-Tezpur (Salonibari), TEZ", "IN-Tirupati (Tirupati), TIR", "IN-Satna (Satna), TNI", "IN-Trivandrum (Trivandrum Int'l), TRV", "IN-Tiruchirapally (Tiruchirapally Civil), TRZ", "IN-Udaipur (Dabok), UDR", "IN-Vijayawada (Vijayawada), VGA", "IN-Varanasi (Varanasi), VNS", "IN-Vishakhapatnam (Vishakhapatnam), VTZ"];
var intDomAirports = ["IN-New Delhi (Indira Gandhi), DEL", "IN-Mumbai (Chatrapati Shivaji), BOM", "IQ-Iraq (Sulaymaniyah Airport), ISU", "IN-Goa (Dabolim), GOI", "IN-Bangalore (Bengaluru), BLR", "IN-Chennai (Chennai), MAA", "IN-Kolkata (Netaji Subhas Chandra Bose), CCU", "IN-Durgapur (Kazi Nazrul Islam), RDP", "IN-Hyderabad (Shamshabad Rajiv Gandhi), HYD", "IN-Pune (Lohegaon), PNQ", "IN-Ahmedabad (Sardar Vallabh Bhai Patel), AMD", "IN-Lucknow (Amausi), LKO", "IN-Kochi (Cochin), COK", "AE-Dubai (Dubai), DXB", "AE-Dubai Bus Station (Dubai Bus Station), XNB", "IN-Patna (Jai Prakash Narayan), PAT", "IN-Jaipur (Sanganeer), JAI", "IN-Srinagar (Srinagar), SXR", "IN-Bhubaneswar (Biju Patnaik), BBI", "IN-Guwahati (Lokpriya Gopinath Bordoloi), GAU", "SG-Singapore (Changi), SIN", "TH-Bangkok (Suvarnabhumi), BKK", "IN-Chandigarh (Chandigarh), IXC", "IN-Cuddapah (Cuddapah), CDP", "IN-Nagpur (Dr Ambedkar), NAG", "IN-Indore (Devi Ahilya Bai Holkar), IDR", "IN-Coimbatore (Peelamedu), CJB", "IN-Visakhapatnam (Vishakhapatnam), VTZ", "IN-Trivandrum (Thiruvananthapuram), TRV", "IN-Jammu (Satwari), IXJ", "IN-Raipur (Raipur), RPR", "IN-Bagdogra (Bagdogra), IXB", "IN-Varanasi (Lal Bahadur Shastri), VNS", "IN-Bhopal (Raja Bhoj), BHO", "IN-Mangalore (Bajpe), IXE", "IN-Ranchi (Birsa Munda), IXR", "IN-Port Blair (Veer Savarkar), IXZ", "US-New York (All airports), NYC", "US-New York (John F Kennedy), JFK", "US-New York (La Guardia), LGA", "IN-Vadodara (Vadodara), BDQ", "MY-Kuala Lumpur (Kuala Lumpur), KUL", "MY-Kuala Lumpur (Sultan Abdul Aziz Shah), SZB", "IN-Madurai (Madurai), IXM", "JP-Kochi (Kochi), KCZ", "NP-Kathmandu (Tribuvan), KTM", "IN-Amritsar (Sri Guru Ram Dass Jee), ATQ", "GB-London (All airports), LON", "CA-London (London Municipal), YXU", "GB-London (Heathrow), LHR", "GB-London (Gatwick), LGW", "GB-London (London City), LCY", "GB-London (Luton), LTN", "GB-London (Stansted), STN", "HK-Hong Kong (Hong Kong), HKG", "QA-Doha (Doha), DOH", "IN-Dehradun (Jolly Grant), DED", "IN-Tirupati (Tirupati), TIR", "LK-Colombo (Bandaranaike), CMB", "IN-Calicut (Kozhikode), CCJ", "IN-Imphal (Tulihal), IMF", "IN-Vijayawada (Vijayawada), VGA", "IN-Udaipur (Maharana Pratap), UDR", "IN-Agartala (Singerbhil), IXA", "IN-Aurangabad (Chikkalthana), IXU", "IN-Jodhpur (Jodhpur), JDH", "OM-Muscat (Seeb), MCT", "IN-Surat (Surat), STV", "US-San Francisco (San Francisco), SFO", "CA-Toronto (All airports), YTO", "CA-Toronto (Lester B Pearson), YYZ", "CA-Toronto (City Centre APT), YTZ", "TH-Phuket (Phuket), HKT", "US-Chicago (All airports), CHI", "US-Chicago (OHare), ORD", "US-Chicago (Midway), MDW", "AE-Abu Dhabi (Dhabi), AUH", "IN-Jabalpur (Jabalpur), JLR", "KW-Kuwait (Kuwait), KWI", "FR-Paris (Charles De Gaulle), CDG", "FR-Paris (All airports), PAR", "FR-Paris (Orly), ORY", "FR-Beauvais (Tille), BVA", "IN-Dibrugarh (Mohanbari), DIB", "AU-Sydney (Sydney Kingsford Smith), SYD", "CA-SYDNEY (Sydney), YQY", "IN-Rajkot (Rajkot Civil), RAJ", "MV-Male (Male), MLE", "SA-Riyadh (King Khaled), RUH", "AE-Sharjah (Sharjah), SHJ", "IN-Allahabad (Bamrauli), IXD", "US-Newark (Newark Liberty), EWR", "DE-Frankfurt (Frankfurt), FRA", "DE-Hahn (Frankfurt Hahn), HHN", "AU-Melbourne (Tullamarine), MEL", "US-Melbourne (Melbourne Regional), MLB", "SA-Dammam (King Fahad), DMM", "MU-Mauritius (Plaisancet), MRU", "IN-Silchar (Kumbhigram), IXS", "CN-Guangzhou (Baiyun), CAN", "CH-Zurich (Zurich), ZRH", "US-Los Angeles (Los Angeles), LAX", "IN-Rajahmundry (Rajahmundry), RJA", "SA-Jeddah (Jeddah), JED", "CN-Shanghai (Hongqiao), SHA", "CN-Shanghai (Pudong), PVG", "ID-Denpasar Bali (Ngurah Rai), DPS", "TR-Istanbul (Ataturk), IST", "TR-Istanbul (Sabiha Gokcen), SAW", "IN-Aizawl (Lengpui), AJL", "BH-Bahrain (Bahrain), BAH", "NL-Amsterdam (Schiphol), AMS", "NZ-Auckland (Auckland), AKL", "US-Washington DC (Washington Dulles), IAD", "US-Washington (All airports), WAS", "US-Washington DC (Ronald Reagan Washington Natl), DCA", "IN-Gorakhpur (Gorakhpur), GOP", "PH-Manila (Ninoy Aquino), MNL", "IN-Hubli (Hubli), HBX", "CN-Beijing (All airports), BJS", "CN-Beijing (Beijing Capital), PEK", "CN-Beijing (Beijing Nanyuan), NAY", "ID-Jakarta (All airports), JKT", "ID-Jakarta (Soekarno Hatta), CGK", "IN-Dimapur (Dimapur), DMU", "IN-Bhuj (Rudra Mata), BHJ", "IN-Kanpur (Chakeri), KNU", "US-Boston (Logan), BOS", "IN-Tuticorin (Tuticorin), TCR", "BD-DHAKA (Zia), DAC", "IN-Jorhat (Rowriah), JRH", "ZA-Johannesburg (O R Tambo), JNB", "CA-Vancouver (Vancouver), YVR", "CA-Vancouver (Vancouver Coal Harbour), CXH", "US-Atlanta (Hartsfield Jackson), ATL", "IN-Mysore (Mysore), MYQ", "DE-Munich (Munich), MUC", "KE-Nairobi (Jomo kenyatta ), NBO", "KE-Nairobi (Wilson), WIL", "RU-Moscow (All airports), MOW", "RU-Moscow (Sheremetyevo), SVO", "RU-Moscow (Domodedovo), DME", "RU-Moscow (Vnukovo), VKO", "RU-Moscow (Bykovo), BKA", "IN-Agatti Island (Agatti), AGX", "IT-Milan (All airports), MIL", "IT-Milan (Malpensa), MXP", "IT-Parma (Parma), PMF", "IT-Milan (Orio Al Serio), BGY", "IT-Milan (Linate), LIN", "GB-Manchester (Manchester), MAN", "US-MANCHESTER (Manchester), MHT", "KR-Seoul (All airports), SEL", "KR-Seoul (Incheon), ICN", "KR-Seoul (Gimpo), GMP", "ES-Barcelona (Barcelona), BCN", "VE-Barcelona (Gen J A Anzoategui), BLA", "IN-Jamnagar (Govardhanpur), JGA", "BE-Brussels (Brussels National), BRU", "BE-Charleroi (Brussels South), CRL", "IN-Kulu (Bhuntar), KUU", "IT-Rome (All airports), ROM", "IT-Rome (Fiumicino), FCO", "IT-Rome (), CIA", "IN-Agra (Kheria), AGR", "JP-Tokyo (All airports), TYO", "JP-Tokyo (Narita), NRT", "JP-Tokyo (Haneda), HND", "GR-Athens (Eleftherios Venizelos), ATH", "US-Athens (Athens Municipal), AHN", "US-Seattle (Seattle Tacoma), SEA", "US-Seattle (Kenmore Air Harbor Seaplane Base), LKE", "IN-Pondicherry (Pondicherry), PNY", "TH-Koh Samui (Koh Samui), USM", "IN-Belgaum (Sambre), IXG", "AT-Vienna (Vienna), VIE", "CH-Geneva (Geneve Cointrin), GVA", "EG-Cairo (Cairo), CAI", "US-Detroit (All airports), DTT", "US-Detroit (Detroit Metro Wayne Cnty), DTW", "DE-Berlin (All airports), BER", "DE-Berlin (Tegel), TXL", "DE-Berlin (Schoenefeld), SXF", "DE-Berlin (Tempelhof), THF", "ES-Madrid (Barajas), MAD", "IN-Nanded (Nanded), NDC", "IN-Bhavnagar (Bhavnagar), BHU", "SE-Stockholm (All airports), STO", "SE-Stockholm (Arlanda), ARN", "SE-Stockholm (Bromma), BMA", "SE-Stockholm (Skavsta), NYO", "SE-Stockholm (Hasslo), VST", "DK-Copenhagen (Copenhagen), CPH", "US-HOUSTON (Houston Hobby), HOU", "US-Houston (George Bush Intercontinental), IAH", "AU-Brisbane (Brisbane), BNE", "IN-Dharamsala (Gaggal), DHM", "ZA-Cape Town (Cape Town), CPT", "IN-Khajuraho (Khajuraho), HJR", "UA-Kiev (Borispol), KBP", "UA-Kiev (Zhulhany), IEV", "MY-Langkawi (Langkawi), LGK", "IN-Gwalior (Gwalior), GWL", "AU-Perth (Perth), PER", "CZ-Prague (Ruzyne), PRG", "IE-Dublin (Dublin), DUB", "GB-Birmingham (Birmingham), BHX", "US-Birmingham (Birmingham), BHM", "BT-Paro (), PBH", "US-Las Vegas (McCarran), LAS", "US-Philadelphia (Philadelphia), PHL", "US-Philadelphia (Trenton Mercer), TTN", "US-Phoenix (Sky Harbor), PHX", "US-Minneapolis St. Paul (Minneapolis St Paul), MSP", "CA-Calgary (Calgary), YYC", "IT-Venice (Marco Polo), VCE", "IT-Venice (Treviso), TSF", "CN-Hangzhou (Hangzhou), HGH", "IL-Tel Aviv (Dov), SDV", "IL-Tel Aviv Yafo (Ben Gurion), TLV", "TH-Krabi (Krabi), KBV", "US-Raleigh (Raleigh Durham), RDU", "US-Miami (Miami), MIA", "US-Orlando (Executive), ORL", "US-Orlando (Orlando), MCO", "TW-Taipei (Taiwan Taoyuan), TPE", "TW-Taipei (Sungshan), TSA", "FI-Helsinki (Helsinki), HEL", "DE-Dusseldorf (Dusseldorf), DUS", "CA-Montreal (All airports), YMQ", "CA-Montreal (Pierre Elliott Trudeau), YUL", "TZ-Dar Es Salaam (Es Salaam), DAR", "BR-Rio de Janeiro (All airports), RIO", "BR-Rio de Janeiro (Rio Internacional), GIG", "BR-Rio de Janeiro (Santos Dumont), SDU", "IN-Porbandar (Porbandar), PBD", "NG-Lagos (Murtala Muhammed), LOS", "NO-Oslo (Oslo), OSL", "VN-Ho Chi Minh City (Tan Son Nhut), SGN", "NO-Oslo (Sandefjord), TRF", "UZ-Tashkent (Vostochny), TAS", "HU-Budapest (Ferihegy), BUD", "BR-Sao Paulo (All airports), SAO", "BR-Sao Paulo (Guarulhos), GRU", "BR-Sao Paulo (Cangonhas), CGH", "BR-Sao Paulo (Viracopos), VCP", "CA-Edmonton (All airports), YEA", "CA-Edmonton (Edmonton), YEG", "SC-Mahe Island (Seychelles), SEZ", "US-Charlotte (Charlotte Douglas), CLT", "JP-Osaka (All airports), OSA", "JP-Osaka (Kansai), KIX", "JP-Osaka (Itami), ITM", "AF-Kabul (Kabul), KBL", "PT-Lisbon (Lisboa), LIS", "IN-Ludhiana (Ludhiana), LUH", "VN-Hanoi (Noibai), HAN", "AU-Adelaide (Adelaide), ADL", "US-Pittsburgh (Pittsburgh), PIT", "CN-Macau (Macau), MFM", "MO-Macau (), XZM", "PL-Warsaw (Warsaw), WAW", "JO-Amman (), ADJ", "JO-Amman (Queen Alia), AMM", "IN-Bodhgaya (Gaya), GAY", "GB-Glasgow (Glasgow), GLA", "GB-Glasgow (Prestwick), PIK", "US-Glasgow (International Glasgow), GGW", "US-San Diego (Lindbergh), SAN", "DE-Hamburg (Fuhlsbuettel), HAM", "TT-Tobago (Crown Point), TAB", "KH-Phnom Penh (Pochentong), PNH", "MX-Mexico City (Benito Juarez), MEX", "GB-Edinburgh Airport (Edinburgh), EDI", "US-Denver (Denver), DEN", "IN-Sholapur (Sholapur ), SSE", "CR-San Jose (Juan Santa Maria), SJO", "PH-San Jose (Antique), SJI", "US-San Jose (San Jose), SJC", "GH-Accra (Kotoka), ACC", "NZ-Wellington (Wellington), WLG", "ET-Addis Ababa (Bole), ADD", "NZ-Christchurch (Christchurch), CHC", "FJ-Nadi (Nadi), NAN", "ID-Balikpapan (Sepinggan), BPN", "DE-Stuttgart (Stuttgart), STR", "DE-Hannover (Hanover), HAJ", "RU-St Petersburg (Pulkovo), LED", "US-St Petersburg (St Petersburg Clearwater), PIE", "BS-Nassau (Nassau), NAS", "IN-Shimla (Simla), SLV", "CA-Winnipeg (Winnipeg), YWG", "KZ-Almaty (Almaty), ALA", "AO-Luanda (Four De Fevereiro), LAD", "-Lombok (), LOP", "CN-Kunming (Kunming), KMG", "IN-Latur (Latur), LTU", "UA-Odessa (Central), ODS", "IN-Kolhapur (Kolhapur), KLH", "RW-Kigali (Kigali), KGL", "US-Honolulu (Honolulu), HNL", "UG-Entebbe (Entebbe), EBB", "ZA-Durban (Durban), DUR", "US-Indianapolis (Indiaâ€Œnapolis), IND", "CA-Ottawa (Ottawa), YOW", "FR-Nice (Cote D Azur), NCE", "RO-Bucharest (All airports), BUH", "RO-Bucharest (Otopeni), OTP", "RO-Bucharest (Aurel Vlaicu), BBU", "US-Buffalo (Greater Buffalo), BUF", "KR-Busan (Kimhae), PUS", "GE-Tbilisi (Tbilisi), TBS", "US-Tampa (Tampa), TPA", "CN-Shenzhen (Baoan), SZX", "ZM-Lusaka (Lusaka), LUN", "US-Cleveland (Hopkins), CLE", "AU-Newcastle (Williamtown), NTL", "GB-Newcastle (Newcastle), NCL", "US-Portland (Portland), PDX", "US-Portland (Portland Jetport), PWM", "US-Austin (Bergstrom), AUS", "US-Cincinnati (Cincinnati No Kentucky), CVG", "SA-Madinah (Prince Mohammad Bin Abdulaziz), MED", "AR-Buenos Aires (All airports), BUE", "AR-Buenos Aires (Jorge Newbery), AEP", "AR-Buenos Aires (Ministro Pistarini), EZE", "CM-Douala (Douala), DLA", "GN-Conakry (Conakry), CKY", "TH-Thailand (Bangkok ), DMK", "AG-Antigua (V C Bird), ANU", "IQ-Al Najaf (Al Ashraf International), NJF", "NG-Abuja (Nnamdi Azikiwe), ABV", "IN-Bellary (Bellary Airport), BEP", "IN-Diu (Diu), DIU", "IN-Jamshedpur (Sonari Airport), IXW", "IN-Kandla (Kandla), IXY", "IN-Leh (Leh Kushok Bakula Rimpochee), IXL", "IN-Lilabari (Lilabari), IXI", "IN-Nasik (Gandhinagar), ISK", "IN-Nainital (Pantnagar), PGH", "IN-Pathankot (Pathankot), IXP", "IN-Salem (Salem), SXV", "IN-Shillong (Barapani), SHL", "IN-Tezpur (Tezpur), TEZ", "IN-Trichy (Tiruchirapally Civil), TRZ", "IN-Agra (nearest airport New Delhi), DEL", "IN-Ajmer (nearest airport Jaipur), JAI", "IN-Alleppey (nearest airport Kochi), COK", "IN-Coorg (nearest airport Mysore), MYQ", "IN-Dalhousie (nearest airport Dharamsala), DHM", "IN-Darjeeling (nearest airport Bagdogra), IXB", "IN-Faridabad (Faridabad), DEL", "IN-Gangtok (nearest airport Bagdogra), IXB", "IN-Gurgaon (nearest airport New Delhi), DEL", "IN-Kanyakumari (nearest airport Trivandrum), TRV", "IN-Kerela (nearest airport Calicut), CCJ", "IN-Ladakh (nearest airport Leh), IXL", "IN-Ooty (nearest airport Coimbatore), CJB", "IN-Shirdi (nearest airport Nasik), ISK", "IN-Sikkim (nearest airport Bagdogra), IXB", "IN-Banaras (Varanasi), VNS", "IN-Baroda (Vadodara), BDQ", "IN-Belgavi (Belgaum), IXG", "IN-Bombay (Mumbai), BOM", "IN-Calcutta (Kolkata), CCU", "IN-Lakshadweep (Agatti Island), AGX", "IN-Madras (Chennai), MAA", "DK-Aalborg (Aalborg), AAL", "NO-Alesund (Vigra), AES", "DK-Aarhus (Tirstrup), AAR", "GL-Aasiaat (Aasiaat), JEG", "IR-Abadan (Abadan), ABD", "RU-Abakan (Abakan), ABA", "CA-Abbotsford (Abbotsford), YXX", "TD-Abeche (Abeche), AEH", "GB-Aberdeen (Dyce), ABZ", "US-ABERDEEN (Aberdeen), ABR", "SA-Abha (Abha), AHB", "US-Abilene (Abilene Municipal), ABI", "EG-Abu Simbel (Abu Simbel), ABS", "MX-Acapulco (Alvarez), ACA", "VE-Acarigua (Oswaldo Guevara Mujica), AGV", "US-Adak Island (Adak), ADK", "TR-Adana (Adana), ADA", "YE-Aden (Amman), ADE", "TR-Adiyaman (), ADF", "RU-Sochi (Sochi), AER", "SB-Afutara (), AFT", "MA-Agadir (Inezgane), AGA", "FR-Agen (La Garenne), AGF", "MX-Aguascalientes (Aguascalientes Municipal), AGU", "IR-Ahwaz (Ahwaz), AWZ", "PG-Aitape (), TAJ", "CK-Aitutaki (Aitutaki), AIT", "FR-Ajaccio (Campo Dell Oro), AJA", "US-Akhiok (), AKK", "US-Akiachak (), KKI", "US-Akiak (), AKI", "JP-Akita (Akita), AXT", "CA-Aklavik (Aklavik), LAK", "US-Akron (Akron Canton Regional), CAK", "CN-Aksu (Aksu), AKU", "KZ-Aktau (Aktau), SCO", "KZ-Aktyubinsk (Aktyubinsk), AKX", "CA-Akulivik (Akulivik), AKV", "IS-Akureyri (Akureyri), AEY", "US-Akutan (Akutan Seaplane Base), KQA", "AE-Al Ain (Al Ain), AAN", "EG-El Arish (El Arish), AAC", "YE-Al Ghaidah Intl (Al Ghaidah), AAY", "MA-Al Hociema (Cherif El Idrissi), AHU", "SA-Al (Al Ahsa), HOF", "US-Alakanuk (Alakanuk), AUK", "US-Alamogordo (Alamogordo Municipal), ALM", "US-Alamosa (Alamosa Municipal), ALS", "ES-Albacete (), ABC", "SA-El (Al Baha), ABT", "AU-Albany (Albany), ALH", "US-Albany (Dougherty Cty), ABY", "US-Albany (Albany Cty), ALB", "US-Albuquerque (Albuquerque), ABQ", "AU-Albury (Albury), ABX", "GB-Alderney (Alderney), ACI", "US-Aleknagik (Aleknagik), WKK", "SY-Aleppo (Aleppo), ALP", "EG-Alexandria (El Nouzha), ALY", "EG-Alexandria (Borg El Arab), HBE", "US-Alexandria (Alexandria), AEX", "GR-Alexandroupolis (Dimokritos), AXD", "IT-Alghero (Alghero), AHO", "DZ-Algiers (Houari Boumedienne), ALG", "ES-Alicante (Alicante), ALC", "AU-Alice Springs (Alice Springs), ASP", "US-Alitak (), ALZ", "US-Allakaket (Allakaket), AET", "US-Allentown Bethlehem Easton (Lehigh Valley), ABE", "US-Alliance (Alliance), AIA", "GL-Alluitsup Paa (Alluitsup Paa Heliport), LLU", "CA-Alma (Alma), YTF", "ES-Almeria (Almeria), LEI", "MY-Alor Setar (Sultan Abdul Halim), AOR", "PG-Alotau (Gurney), GUR", "US-Alpena (Phelps Collins), APN", "BR-Alta Floresta (Alta Floresta), AFL", "NO-Alta (Alta), ALF", "BR-Altamira (Altamira), ATM", "CN-Altay (), AAT", "CH-Altenrhein (St Gallen Altenrhein), ACH", "US-Altoona Martinsburg (Altoona), AOO", "US-Altus (Altus Afb), LTS", "SE-Alvesta (), XXA", "JP-Amami (Amami), ASJ", "US-Amarillo (Amarillo), AMA", "US-Ambler (Ambler), ABL", "ID-Ambon (Pattimura), AMQ", "KE-Amboseli National Park (Amboseli), ASV", "RU-Amderma (Amderma), AMV", "US-Amook (Amook), AOS", "RU-Anadyr (Ugolny), DYR", "CA-Anahim Lake (Anahim Lake), YAA", "US-Anaktuvuk Pass (Anaktuvuk Pass), AKP", "MG-Analalava (Analalava), HVA", "RU-Anapa (Vityazevo), AAQ", "US-Anchorage (Anchorage), ANC", "IT-Ancona (Falconara), AOI", "PE-Andahuaylas (Andahuaylas), ANS", "NO-Andoya (Andoya), ANX", "UZ-Andizhan (Andizhan), AZN", "VU-Anelghowhat (Anelghowhat), AUY", "SE-Angelholm Helsingborg (Angelholm Helsingborg), AGH", "France-FR (Angers), ANE", "CA-Angling Lake (Wapekeka), YAX", "US-Angoon (), AGN", "US-Aniak (Aniak), ANI", "VU-Aniwa (Aniwa), AWD", "KM-Anjouan (Ouani), AJN", "CN-Ankang (Ankang), AKA", "TR-Ankara (Esenboga), ESB", "MG-Ankavandra (Ankavandra), JVA", "FR-Annecy (Meythet), NCY", "CN-Anqing (Anqing), AQG", "MG-Antalaha (Antsirabato), ANM", "TR-Antalya (Antalya), AYT", "MG-Antananarivo (Ivato), TNR", "CL-Antofagasta (Cerro Moreno), ANF", "MG-Antsalova (Antsalova), WAQ", "BE-Antwerp (Antwerp Brussels North), ANR", "US-Anvik (Anvik), ANV", "JP-Aomori (Aomori), AOJ", "IT-Aosta (Aosta), AOT", "CO-Apartado (Apartado), APO", "WS-Apia (Apia), APW", "US-Appleton (Outagamie Cty), ATW", "JO-Aqaba (Aqaba King Hussein), AQJ", "BR-Aracaju (Santa Maria), AJU", "BR-Aracatuba (Aracatuba), ARU", "RO-Arad (Arad), ARW", "BR-Araguaina (Araguaina), AUX", "SA-Arar (Arar), RAE", "CO-Arauca (Santiago Perez), AUC", "BR-Araxa (), AAX", "ET-Arba Minch (Arba Minch), AMH", "IQ-Erbil (Erbil), EBL", "US-Arcata (Arcata Eureka), ACV", "US-Arctic Village (Arctic Village), ARC", "IR-Ardabil (Ardabil), ADU", "PE-Arequipa (Rodriguez Ballon), AQP", "AU-Argyle (Argyle), GYL", "CL-Arica (Chacalluta), ARI", "RU-Arkhangelsk (Talagi), ARH", "CO-Armenia (El Eden), AXM", "AU-Armidale (Armidale), ARM", "SB-Arona (), RNA", "TZ-Arusha (Arusha), ARK", "CA-Eskimo Point (Arviat), YEK", "SE-Arvidsjaur (Arvidsjaur), AJR", "JP-Asahikawa (Asahikawa), AKJ", "US-Asheville Hendersonville (Asheville Municipal), AVL", "TM-Ashkhabad (Ashgabat), ASB", "ER-Asmara (Asmara), ASM", "US-Aspen (Aspen), ASE", "EG-Asyut (Asyut), ATZ", "KZ-Tselinograd (Astana), TSE", "RU-Astrakhan (Astrakhan), ASF", "ES-Asturias (Asturias), OVD", "GR-Astypalaia (Astypalaia), JTY", "PY-Asuncion (Salvio Pettirosse), ASU", "EG-Aswan (Aswan), ASW", "CK-Atiu Island (Atiu Island), AIU", "US-Atka (), AKB", "US-Atlantic City (Pomona Field), ACY", "US-Austin TX (Camp Mabry Austin City), ATT", "SB-Atoifi (Uru Harbour), ATD", "US-Atqasuk (Atqasuk Edward Burnell Sr Memorial), ATK", "CA-Attawapiskat (Attawapiskat), YAT", "KZ-Atyrau (Atyrau), GUW", "US-Augusta (Bush Field), AGS", "US-Augusta (Maine State), AUG", "SB-Auki (Auki), AKS", "CA-Aupaluk (Aupaluk), YPJ", "FR-Aurillac (Aurillac), AUR", "AU-Aurukun Mission (Aurukun), AUU", "AU-Avalon (Avalon), AVV", "SE-Avesta Krylbo (), XYP", "FR-Avignon (Caumont), AVN", "SB-Avu Avu (Avu Avu), AVU", "PG-Awaba (), AWB", "ET-Axum (Axum), AXU", "PE-Ayacucho (Coronel Fap Alfredo Mendivil Duarte), AYP", "AU-Ayers Rock (Ayers Rock), AYQ", "RO-Bacau (Bacau), BCM", "PH-Bacolod (Bacolod), BCD", "ES-Badajoz (Talavera La Real), BJZ", "AU-Badu Island (Badu Island), BDD", "IQ-Baghdad (Baghdad), BGW", "CA-Bagotville (Bagotville), YBG", "PH-Baguio (Baguio), BAG", "ET-Bahar Dar (Bahir Dar), BJR", "AR-Bahia Blanca (Commandante), BHI", "CO-Bahia Solano (Jose Celestino Mutis), BSC", "RO-Baia Mare (Tautii Magheraus), BAY", "CA-BAIE (Baie Comeau), YBC", "MY-Bakalalan (Bakalalan), BKM", "CA-Baker Lake (Baker Lake), YBK", "US-Bakersfield (Meadows Field), BFL", "AZ-Baku (Heydar Aliyev), GYD", "SB-Ballalae (Ballalae), BAS", "PG-Balimo (Balimo), OPU", "AU-Ballina Byron Bay (Ballina Byron Gateway), BNK", "CL-Balmaceda (Teniente Vidal), BBA", "US-Baltimore (Baltimore Washington), BWI", "IR-Bam (Bam), BXR", "AU-Amberley (Bamaga Injinoo), ABM", "ML-Bamako (Senou), BKO", "ID-Banda Aceh (Sultan Iskandarmuda), BTJ", "IR-Bandar Abbas (Bandar Abbass), BND", "ID-Bandar Lampung (Radin Inten II (Branti), TKG", "IR-Bandar Lengeh (Bandar Lengeh), BDH", "BN-Bandar Seri Begawan (Brunei), BWN", "ID-Bandung (Husein Sastranegara), BDO", "CN-Bangda (Qamdo Bangda), BPX", "US-Bangor (Bangor), BGR", "CF-Bangui (Bangui), BGF", "BA-Banja Luka (Banja Luka), BNX", "ID-Banjarmasin (Syamsudin Noor), BDJ", "GM-Banjul (Yundum), BJL", "VN-Buonmethuot (Buon Ma Thuot), BMV", "CN-Baoshan (), BSD", "CN-Baotou (Baotou), BAV", "US-Bar Harbor (Hancock County), BHB", "AU-Barcaldine (Barcaldine), BCI", "NO-Bardufoss (Bardufoss), BDU", "IT-Bari (Bari), BRI", "VE-Barinas (Barinas), BNS", "MY-Bario (Bario), BBN", "RU-Barnaul (Barnaul), BAX", "VE-Barquisimeto (Barquisimeto), BRM", "GB-Barra (Barra), BRR", "CO-Barrancabermeja (Yariguies), EJA", "CO-Barranquilla (E Cortissoz), BAQ", "BR-Barreiras (Barreiras), BRA", "GB-Barrow Island (Walney Island), BWF", "US-Barrow (Barrow WBAS), BRW", "US-Barter Island (Barter Island Lrrs), BTI", "PH-Basco (Basco), BSO", "CH-Basel Mulhouse (Basel EuroAirport Swiss), BSL", "MM-Pathein (Pathein), BSX", "FR-Bastia (Poretta), BIA", "ID-Batam (Hang Nadim), BTH", "AU-Bathurst (Bathurst), BHS", "CA-Bathurst (Bathurst), ZBF", "TR-Batman (Batman), BAL", "US-Baton Rouge (Ryan), BTR", "GE-Batumi (Batumi), BUS", "BR-Bauru (Bauru), BAU", "US-Bay City Midland Saginaw (Saginaw), MBS", "MZ-Bazaruto Island (), BZB", "CA-Bearskin Lake (Bearskin Lake), XBE", "US-Beaumont (Jefferson Cty), BPT", "US-Beaver (Beaver), WBQ", "US-Beckley (Raleigh Cty Memorial), BKW", "US-Bedford Hanscom (Bedford), BED", "AU-Bedourie (Bedourie), BEU", "LY-Al Bayda (La Abraq), LAQ", "CN-Beihai (Beihai), BHY", "MZ-Beira (Beira), BEW", "LB-Beirut (Beirut), BEY", "BR-Belem (Val De Cans), BEL", "NC-Waala (Belep Islands), BMY", "GB-Belfast (Belfast), BFS", "XB-Belfast (Belfast City), BHD", "RU-Belgorod (Belgorod), EGO", "CS-Belgrade (Belgrade Beograd), BEG", "CA-Bella Bella (), ZEL", "CA-Bella Coola (Bella Coola), QBC", "US-Belleville (Scott Afb Midamerica), BLV", "US-Bellingham (Bellingham), BLI", "SB-Bellona (Bellona), BNY", "BR-Belo Horizonte Belo Horizon (All airports), BHZ", "BR-Belo Horizonte Belo Horizon (Tancredo Neves), CNF", "BR-Belo Horizonte Belo Horizon (Pampulha), PLU", "MG-Belo sur Tsiribihina (Belo sur Tsiribihina), BMD", "US-Bemidji (Bemidji Municipal), BJI", "GB-Benbecula (Benbecula), BEB", "US-Bend Redmond (Roberts Field), RDM", "LY-Benghazi (Benina), BEN", "ID-Bengkulu (Fatmawati Soekarno), BKS", "US-Benton (Northwest Arkansas Regional), XNA", "CA-Berens River (Berens River), YBV", "NO-Bergen (Flesland), BGO", "FR-Bergerac (Roumaniere), EGC", "NO-Batsfjord (Batsfjord), BJF", "NO-Berlevag (Berlevag), BVG", "CH-Berne (Belp), BRN", "MG-Besalampy (Besalampy), BPY", "US-Bethel (Bethel), BET", "US-Bettles (Bettles), BTT", "FR-Beziers (Vias), BZR", "NP-Bhadrapur (), BDP", "NP-Bhairawa (Bhairahawa), BWA", "MM-Banmaw (Banmaw), BMO", "NP-Bharatpur (), BHR", "ID-Biak (Frans Kaisiepo), BIK", "FR-Biarritz (Anglet), BIQ", "CA-Big Trout Lake (Big Trout Lake), YTL", "MH-Bikini Atoll (Enyu Airfield), BII", "ES-Bilbao (Bilbao), BIO", "US-Billings (Logan Field), BIL", "DK-Billund (Billund), BLL", "AU-Biloela (Biloela), ZBL", "ID-Bima (Muhammad Salahuddin), BMU", "US-Binghamton Endicott Johnson City (Edwin A Link Field), BGM", "MY-Bintulu (Bintulu), BTU", "NP-Biratnagar (Biratnagar), BIR", "US-Birch Creek (Birch Creek), KBC", "AU-Birdsville (Birdsville), BVI", "IR-Birjand (Birjand), XBJ", "SA-Bisha (Bisha), BHH", "KG-Bishkek (Bishkek), FRU", "US-Bismarck (Bismarck Municipal), BIS", "Bissau-GW (Osvaldo Vieira), OXB", "CA-Black Tickle (Black Tickle), YBI", "AU-Blackall (Blackall), BKQ", "GB-Blackpool (Blackpool), BLK", "AU-Blackwater (Blackwater), BLT", "RU-Blagoveschensk (Ignatyevo), BQS", "CA-Lourdes (Lourdes De Blanc Sablon), YBX", "MW-Blantyre (Chileka), BLZ", "NZ-Woodbourne (Woodbourne), BHE", "US-Block Island (Block Island), BID", "ZA-Bloemfontein (Bloemfontein), BFN", "US-Bloomington (Normal), BMI", "US-Blountville (Tri City Regional), TRI", "US-Blytheville (Arkansas), BYH", "BR-Boa Vista (Boa Vista), BVB", "CV-Boa Vista (Rabil), BVC", "BF-Bobo (Bobo Dioulasso), BOY", "NO-Bodo (Bodo), BOO", "CO-Bogota (Eldorado), BOG", "AU-Boigu Island (Boigu), GIC", "US-Boise (Boise Municipal Gowen Field), BOI", "IR-Bojnourd (Bojnourd), BJB", "HR-Brac (Brac), BWK", "IT-Bologna (Guglielmo Marconi), BLQ", "IT-Bolzano (Bolzano), BZO", "CA-Bonaventure (Bonaventure), YVB", "PF-Bora Bora (Motu Mute), BOB", "FR-Bordeaux (Bordeaux), BOD", "SE-Borlange (Borlange), BLE", "DK-Ronne (Bornholm Ronne), RNN", "US-Boulder City (Boulder City Municipal), BLD", "AU-Boulia (Boulia), BQL", "BG-Bourgas (Bourgas), BOJ", "GB-Bournemouth (Bournemouth), BOH", "US-Bozeman (Gallatin Field), BZN", "US-Bradenton Sarasota (Sarasota Bradenton), SRQ", "GB-Bradford (Bradford), BRF", "US-Bradford (Bradford Regional), BFD", "US-Brainerd (Crow Wing County), BRD", "CA-Brandon (Brandon Muni), YBR", "BR-Brasilia (Brasilia), BSB", "SK-Bratislava (Ivanka), BTS", "RU-Bratsk (Bratsk), BTK", "CG-Brazzaville (Maya Maya), BZV", "DE-Bremen (Bremen), BRE", "FR-Brest (Guipavas), BES", "US-Stratford (Igor I Sikorsky Mem), BDR", "BB-Bridge Town (Grantley Adams), BGI", "GB-Brighton (Brighton), BSH", "IT-Brindisi (Casale), BDS", "GB-Bristol (Bristol), BRS", "FR-Brive (La Roche), BVE", "GB-Brize Norton (Brize Norton), BZZ", "CZ-Turany (Turany), BRQ", "CA-Brochet (Brochet), YBT", "CA-Brockville (), XBR", "AU-Broken Hill (Broken Hill), BHQ", "NO-Bronnoysund (Bronnoy), BNN", "US-Brooks Lodge (), RBH", "AU-Broome (Broome), BME", "US-Brownsville (South Padre Island), BRO", "US-Brunswick (Gylnco Jet Port), BQK", "CO-Bucaramanga (Palo Negro), BGA", "US-Buckland (Buckland), BKC", "CO-Buenaventura (Gerardo Tobar Lopez), BUN", "ZW-Chiredzi (Buffalo Range), BFO", "BI-Bujumbura (Bujumbura), BJM", "PG-Buka Island (Buka), BUA", "CG-Bukavu kavumu (Bukavu Kavumu), BKY", "UZ-Bukhara (Bukhara), BHK", "TZ-Bukoba (Bukoba), BKZ", "ZW-Bulawayo (Bulawayo), BUQ", "US-Bullhead City (Laughlin Bullhead), IFP", "AU-Bundaberg (Bundaberg), BDB", "CG-Bunia (Bunia), BUX", "US-Burbank (Burbank Glendale Pasadena), BUR", "FJ-Levuka (Levuka Airfield), LEV", "TH-Buri Ram (Buri Ram), BFV", "AU-Burketown (Burketown), BUC", "US-Burlington (Burlington Municipal), BRL", "US-Burlington (Burlington), BTV", "AU-Burnie (Wynyard), BWT", "CA-Burns Lake (), YPZ", "TR-Yenisehir (Yenisehir), YEI", "IR-Bushehr (Bushehr), BUZ", "PH-Busuanga (Busuanga), USU", "US-Butte (Bert Mooney), BTM", "PH-Butuan (Butuan), BXU", "PL-Bydgoszcz (Bydgoszcz Ignacy Jan Paderewski), BZG", "VN-Ca Mau (Ca Mau), CAH", "FR-Caen (Carpiquet), CFR", "PH-Cagayan De Oro (Lumbia), CGY", "IT-Cagliari (Elmas), CAG", "AU-Cairns (Cairns), CNS", "PE-Cajamarca (Mayor General FAP Armando Revoredo Iglesias), CJA", "CL-Calama (El Loa), CJC", "PH-Calbayog City (Calbayog), CYP", "US-Caldwell (), CDW", "CO-Cali (Alfonso Bonilla Aragon), CLO", "FR-Calvi (Saint Catherine), CLY", "VN-Nha Trang (Cam Ranh), CXR", "CA-Cambridge Bay (Cambridge Bay), YCB", "GB-Cambridge (Cambridge), CBG", "PH-Camiguin (Camiguin), CGM", "CA-Campbell River (Campbell River Municipal), YBL", "GB-Campbeltown (Campbeltown), CAL", "MX-Campeche (Ingeniero Alberto Acuna Ongay), CPE", "BR-Campina Grande (Presidente Joao Suassuna), CPV", "BR-Campinas (Campinas Intl), CPQ", "BR-Campo Grande (Campo Grande), CGR", "BR-Campos (Bartolomeu Lisandro), CAW", "TR-Canakkale (Canakkale), CKZ", "AU-Canberra (Canberra), CBR", "MX-Cancun (Cancun Aeropuerto Internacional), CUN", "SN-Cap Skiring (Cap Skiring), CSK", "CA-Cape Dorset (Cape Dorset), YTE", "US-Cape Girardeau (Cape Girardeau Municipal), CGI", "US-Cape Lisburne (Cape Lisburne Lrrs), LUR", "US-Cape Newenham (Cape Newenham Lrrs), EHM", "HT-Cap Haitien (Cap Haitien), CAP", "VE-Caracas (Simon Bolivar), CCS", "BR-Carajas (Carajas), CKS", "GB-Cardiff (Cardiff Wales), CWL", "GB-Carlisle (Carlisle), CAX", "US-San Diego (Carlsbad), CLD", "US-Carlsbad (Cavern City Air Terminal), CNM", "US-Carmel Monterey (Monterey Peninsula), MRY", "AU-Carnarvon (Carnarvon), CVQ", "CO-Cartagena (Rafael Nunez), CTG", "CA-Cartwright (Cartwright), YRF", "VE-Carupano (General Jose Francisco Bermudez), CUP", "MA-Casablanca (Mohamed V), CMN", "BR-Cascavel (Cascavel), CAC", "US-Casper (Natrona Cty), CPR", "CA-CASTLEGAR (Ralph West), YCG", "FR-Castres (Mazamet), DCM", "CA-Cat Lake (Cat Lake), YAC", "AR-Catamarca (Catamarca), CTC", "IT-Catania (Fontanarossa), CTA", "PH-Catarman (Catarman National), CRM", "PH-Caticlan (Godofredo P), MPH", "BR-Caxias Do Sul (Campo Dos Bugres), CXJ", "GF-Cayenne (Rochambeau), CAY", "PH-Cebu (Cebu), CEB", "US-Cedar City (Cedar City Municipal), CDC", "US-Cedar Rapids (Cedar Rapids Municipal), CID", "AU-Ceduna (Ceduna), CED", "US-Central (), CEM", "US-Chadron (Chadron), CDR", "IR-Chah Bahar (Chah Bahar), ZBR", "US-Chalkyitsik (Chalkyitsik), CIK", "FR-Chambery (Chambery Aix Les Bains), CMF", "US-Champaign (Univ Of Illinois Willard), CMI", "CN-Changchun (Changchun), CGQ", "CN-Changde (Changde), CGD", "CN-Changcha (Huanghua), CSX", "CN-Changzhi (Changzhi), CIH", "CN-Changzhou (Changzhou), CZX", "GR-Chania (Souda), CHQ", "BR-Chapeco (Chapeco), XAP", "US-Charleston (Charleston), CHS", "US-Charleston (Yeager), CRW", "AU-Charleville (Charleville), CTL", "US-Charlottesville (Charlottesville Albemarle), CHO", "CA-Charlottetown (), YHG", "CA-Charlottetown (Charlottetown Municipal), YYG", "NZ-Chatham Island (Chatham Islands), CHT", "CA-Chatham (), XCM", "US-Chattanooga (Chattanooga Lovell Fld), CHA", "RU-Cheboksary (Cheboksary), CSY", "US-Chefornak (), CYF", "RU-Chelyabinsk (Balandino), CEK", "CN-Chengdu (Shuangliu), CTU", "KR-Chongju (Cheongju), CJJ", "FR-Cherbourg (Maupertus), CER", "RU-Cherepovets (Cherepovets), CEE", "UA-Chernovtsk (Chernivtsi), CWC", "RU-Cherskiy (Cherskiy), CYX", "GB-Hawarden (Hawarden), CEG", "CA-Chesterfield Inlet (Chesterfield Inlet), YCS", "MX-Chetumal (Chetumal), CTM", "US-Chevak (Chevak), VAK", "CA-Chevery (Chevery), YHR", "US-Cheyenne (Cheyenne), CYS", "TH-Chiang Mai (Chiang Mai), CNX", "TH-Chiang Rai (Chaing Rai), CEI", "TW-Chiayi (Chiayi), CYI", "CA-Chibougamau (Chibougamau), YMT", "PE-Chiclayo (Cornel Ruiz), CIX", "US-Chico (Chico Municipal), CIC", "CN-Chifeng (Chifeng), CIF", "US-Chignik (), KCG", "US-Chignik (Chignik), KCL", "US-Chignik (), KCQ", "MX-Chihuahua (Chihuahua), CUU", "MZ-Chimoio (Chimoio), VPY", "GR-Chios (Chios), JKH", "ZM-Chipata (Chipata), CIP", "US-Chisana (), CZN", "CA-Chisasibi (Chisasibi), YKU", "US-Chisholm Hibbing (Hibbing Chisolm), HIB", "MD-Chisinau (Chisinau), KIV", "RU-Chita (Kadala), HTA", "PK-Chitral (Chitral), CJL", "BD-Chittagong (Patenga), CGP", "SB-Choiseul Bay (Choiseul Bay), CHY", "RU-Chokurdah (), CKH", "CN-Chongqing (Jiangbei), CKG", "CX-Christmas Island (Christmas Island), XCH", "KI-Kiritimati (Christmas Island), CXI", "US-Chuathbaluk (Chuathbaluk), CHU", "CA-Churchill Falls (Churchill Falls), ZUM", "CA-Churchill (Churchill), YYQ", "FJ-Cicia (Cicia), ICI", "US-Circle (Circle City), IRC", "VE-Ciudad Bolivar (Ciudad Bolivar), CBL", "MX-Ciudad Del Carmen (Ciudad Del Carmen), CME", "PY-Ciudad del Este (Ciudad del Este), AGT", "MX-Ciudad Juarez (Intl Abraham Gonzalez), CJS", "MX-Ciudad Obregon (Ciudad Obregon), CEN", "MX-Ciudad Victoria (General Pedro Jose Mendez), CVM", "US-Clarks Point (Clarks Point), CLP", "US-Clarksburg (Clarksburg Benedum), CKB", "FR-Clermont Ferrand (Auvergne), CFE", "AU-Cloncurry (Cloncurry), CNJ", "US-Clovis (Clovis), CVN", "MW-Club Makokola (Club Makokola), CMK", "RO-Cluj (Napoca), CLJ", "CA-Clyde River (Clyde River), YCY", "BO-Cobija (Heroes Del Acre), CIJ", "EC-Coca (Francisco De Orellana), OCC", "BO-Cochabamba (J Wilsterman), CBB", "AU-Coconut Island (Coconut Island), CNC", "CC-Cocos Islands (), CCK", "US-Cody Yellowstone (Yellowstone Regional), COD", "AU-Coen (Coen), CUQ", "US-Coffman Cove (), KCC", "AU-Coffs Harbour (Coffs Harbour), CFS", "US-Cold Bay (Cold Bay), CDB", "MX-Colima (Colima), CLQ", "US-College Station (Easterwood Field), CLL", "DE-Cologne (Koeln Bonn), CGN", "US-Colorado Springs (Colorado Springs Municipal), COS", "US-Columbia (Columbia Metro), CAE", "US-Columbia (Columbia Regional), COU", "US-Columbus (Port Columbus), CMH", "US-Columbus (Columbus Metro Ft Benning), CSG", "US-Columbus (Golden), GTR", "CA-Colville Lake (Colville Lake), YCK", "AR-Comodoro Rivadavia (Comodoro Rivadavia), CRD", "CA-Comox (Royal Canadian Air Force Station), YQQ", "VN-Conson (Co Ong), VCS", "CL-Concepcion (Carriel Sur), CCP", "RO-Constanta (Kogalniceanu), CND", "AU-Coober Pedy (Coober Pedy), CPD", "AU-Cooktown (Cooktown), CTN", "CL-Copiapo (Chamonate), CPO", "CA-Coral Harbour (Fairmont Hot Springs), YZS", "AR-Cordoba (Pajas Blanco), COR", "US-Cordova (Mudhole Smith), CDV", "GR-Kerkyra (I Kapodistrias), CFU", "IE-Cork (Cork), ORK", "US-Corning Elmira (Elmira Corning Regional), ELM", "CA-Cornwall (), YCC", "VE-Coro (Jose Leonardo Chirinos), CZE", "CO-Corozal (Las Brujas), CZU", "US-Corpus Christi (Corpus Christi), CRP", "AR-Corrientes (Corrientes), CNQ", "US-Cortez (Montezuma County), CEZ", "BR-Corumba (Corumba), CMG", "PT-Corvo (Corvo), CVU", "PH-Cotabato (Cotabato), CBO", "BJ-Cotonou (Cotonou), COO", "CA-Courtenay (), YCA", "GB-Coventry (Coventry), CVT", "BD-Coxs Bazar (Coxs Bazar), CXB", "MX-Cozumel (Aeropuerto De Cozumel), CZM", "VU-Craig Cove (Craig Cove), CCV", "US-Craig (), CGA", "RO-Craiova (Craiova), CRA", "CA-Cranbrook (Canadian Rockies), YXC", "US-Crescent City (Crescent City Municipal), CEC", "US-Crooked Creek (Crooked Creek), CKD", "CA-Cross Lake (Cross Lake), YCR", "IT-Crotone (Crotone), CRV", "BR-Cruiziro Do Sul (Cruzeiro Do Sul), CZS", "CO-Cucuta (Camilo Dazo), CUC", "EC-Cuenca (Cuenca), CUE", "BR-Cuiaba (Marechal Rondon), CGB", "MX-Culiacan (Fedl De Bachigualato), CUL", "VE-Cumana (Antonio Jose De Sucre), CUM", "IT-Levaldigi (Levaldigi), CUF", "AU-Cunnamulla (Cunnamulla), CMA", "AN-Curacao (Areopuerto Hato), CUR", "BR-Curitiba (Afonso Pena), CWB", "PE-Cuzco (Tte Velazco Astete), CUZ", "VN-Danang (Danang), DAD", "KR-Taegu (Daegu Ab), TAE", "SN-Dakar (Leopold Sedar Senghor), DKR", "EH-Dakhla (Dakhla), VIL", "TR-Dalaman (Dalman), DLM", "VN-Dalat (Dalat), DLI", "PK-Dalbandin (Dalbandin), DBA", "CN-Dali (Dali), DLU", "CN-Dalian (Zhoushuizi), DLC", "US-Dallas Fort Worth (Dallas Ft Worth), DFW", "US-DALLAS (Love Field), DAL", "SY-Damascus (Damascus), DAM", "CN-Dandong (Dandong), DDG", "AU-Darnley Island (Darnley Island), NLF", "PG-Daru (Daru), DAU", "AU-Darwin (Darwin), DRW", "ID-Datadawai (Datadawai), DTD", "CN-Datong (Datong), DAT", "CA-Dauphin (Dauphin Barker), YDN", "PH-Davao (Mati), DVO", "SA-Dawadmi (Dawadmi Domestic), DWD", "MM-Dawei (Dawei), TVY", "CA-Dawson (Dawson City), YDA", "CA-Dawson Creek (Dawson Creek), YDQ", "CN-Dazhou (Dachuan), DAX", "CN-Dayong (Dayong), DYG", "US-Dayton (Dayton), DAY", "US-Daytona Beach (Daytona Beach Regional), DAB", "US-Decatur (Decatur Municipal), DEC", "CA-Deer Lake (Deer Lake), YDF", "CA-Deer Lake (Deer Lake), YVZ", "US-Deering (Deering), DRG", "CA-Deline (Deline), YWJ", "TR-Denizli (Cardak), DNZ", "PK-Dera Ghazi Khan (Dera Ghazi Khan), DEA", "US-Des Moines (Des Moines Municipal), DSM", "US-Devils Lake (), DVL", "AU-Devonport (Devonport), DPO", "US-Dickinson (), DIK", "VN-Dienbienphu (Dien Bien Phu), DIN", "FR-Dijon (Longvic), DIJ", "RU-Dikson (), DKS", "TP-Dili (Presidente Nicolau Lobato), DIL", "US-Dillingham (Dillingham Municipal), DLG", "VU-Dillons Bay (Dillons Bay), DLY", "FR-Dinard (Pleurtuit), DNR", "PH-Dipolog (Dipolog), DPL", "CN-Shangri (Diqing), DIG", "ET-Dire Dawa (Dire Dawa), DIR", "TR-Diyabakir (Diyarbakir), DIY", "TN-Djerba (Zarzis), DJE", "DJ-Djibouti (Ambouli), JIB", "UA-Dnepropetrovsk (Dnipropetrovsk), DNK", "US-Dodge City (Dodge City Municipal), DDC", "NP-Dolpa (Dolpa), DOP", "GB-Doncaster (Robin Hood Doncaster Sheffield), DSA", "IE-Dongloe (Donegal), CFN", "UA-Donetsk (Donetsk), DOK", "CN-Dongsheng (Dongsheng), DSN", "CN-Dongying (Dongying), DOY", "AU-Doomadgee (Doomadgee), DMD", "DE-Dortmund (Wickede Dortmund), DTM", "US-Dothan (Dothan Municipal), DHN", "BR-Dourados (Dourados), DOU", "DE-Dresden (Dresden), DRS", "CA-Dryden (Dryden Municipal), YHD", "AU-Dubbo (Dubbo), DBO", "US-Du Bois (Dubois Jefferson Cty), DUJ", "HR-Dubrovnik (Dubrovnik), DBV", "US-Dubuque (Dubuque Municipal), DBQ", "US-Duluth (Duluth), DLH", "PH-Dumaguete (Dumaguete), DGT", "CA-Duncan/Quam (), DUQ", "GB-Dundee (Dundee), DND", "NZ-Dunedin (Momona), DUD", "CN-Dunhuang (Dunhuang), DNH", "MX-Durango (Durango), DGO", "US-Durango (Durango La Plata Cty), DRO", "TJ-Dushanbe (Dushanbe), DYU", "US-Dutch Harbor (Emergency Field), DUT", "YT-Dzaoudzi (Dzaoudzi), DZA", "US-Eagle (Eagle), EAA", "ZA-East London (East London), ELS", "CA-Eastmain River (Eastmain River), ZEM", "CL-Easter Island (Mataveri), IPC", "US-Eastsound (Orcas Island), ESD", "US-Eau Claire (Claire Municipal), EAU", "US-Edna Bay (Edna Bay), EDA", "TR-EDREMIT KORFEZ (EDREMIT KORFEZ), EDO", "AU-Edward River (Pormpuraaw), EDR", "US-Eek (Eek), EEK", "US-Egegik (Egegik), EGX", "IS-Egilsstadir (Egilsstadir), EGS", "IL-Elat (Elat), ETH", "NL-Eindhoven (Welschap), EIN", "DE-Eisenach (Eisenach), EIB", "RU-Ekaterinburg (Koltsovo), SVX", "US-Ekuk (Ekuk), KKU", "US-Ekwok (Ekwok), KEK", "AR-El Calafate (El Calafate), FTE", "US-El Centro Imperial (Imperial County), IPL", "US-El Dorado (Goodwin Field), ELD", "PH-El Nido (El Nido), ENI", "SD-El Obeid (El Obeid), EBD", "US-El Paso (El Paso), ELP", "CL-El Salvador (El Salvador), ESR", "VE-El Vigia (), VIG", "CO-Yopal (El Alcarava), EYP", "TR-Elazig (Elazig), EZS", "AU-Elcho Island (Elcho Island), ELC", "KE-Eldoret (Eldoret), EDL", "US-Elfin Cove (), ELV", "US-Elim (Elim), ELI", "US-Elko (J C Harris Field), EKO", "VE-Elorza (), EOZ", "US-Ely (Yelland), ELY", "VU-Sangafa (Sangafa), EAE", "AU-Emerald (Emerald), EMD", "US-Emmonak (Emmonak), EMK", "ID-Ende (H Hasan Aroeboesman), ENE", "RU-Yeniseysk (Yeniseysk), EIE", "SE-Enkoping (), XWQ", "FI-Enontekio (Enontekio), ENF", "CN-Enshi (Enshi), ENH", "CY-Nicosia (Ercan), ECN", "DE-Erfurt (Erfurt), ERF", "US-Erie (Erie), ERI", "MA-Er (Moulay Ali Cherif), ERH", "TR-Erzincan (Erzincan), ERC", "TR-Erzurum (Erzurum), ERZ", "DK-Esbjerg (Esbjerg), EBJ", "US-Escanaba (Delta County), ESC", "TR-Eskissehir (Anadolu), AOE", "EC-Tachina (General Rivadeneira), ESM", "AU-Esperance (Esperance), EPR", "VU-Santo (Santo Pekoa), SON", "AR-Esquel (Esquel), EQS", "MA-Essadouira (Mogador), ESU", "TO-Eua Island (Kaufana), EUA", "US-Eugene (Eugene), EUG", "US-Evansville (Evansville Regional), EVV", "US-Excursion Inlet (), EXI", "GB-Exeter (Exeter), EXT", "NO-Fagernes (Leirin), VDB", "US-Fairbanks (Fairbanks), FAI", "PK-Faisalabad (Faisalabad), LYP", "ID-Fak Fak (Fak Fak), FKQ", "US-Fall River New Bedford (New Bedford Municipal), EWB", "US-False Pass (False Pass), KFP", "MG-Farafangana (Farafangana), RVA", "US-Fargo (Hector), FAR", "US-Farmington (Four Corners Regional), FMN", "GB-Farnborough (Farnborough), FAB", "PT-Faro (Faro), FAO", "FO-Vagar (Vagar), FAE", "TD-Faya (Faya Largeau), FYT", "US-Fayetteville (Fayetteville Municipal), FAY", "SB-Fera Island (Fera/Maringe), FRE", "UZ-Fergana (Fergana), FEG", "BR-Fernando Do Noronha (Fernando De Noronha), FEN", "MA-Fez (Fez), FEZ", "FR-Figari (Sud Corse), FSC", "GB-Bristol (Bristol Filton), FZO", "US-Flagstaff (Flagstaff), FLG", "SE-Flen (), XYI", "CA-Flin Flon (Flin Flon), YFO", "US-Flint (Bishop), FNT", "IT-Florence (Amerigo Vespucci), FLR", "US-Florence (Gilbert Field), FLO", "US-Muscle Shoals (Muscle Shoals), MSL", "CO-Florencia (Gustavo Artunduaga Paredes), FLA", "PT-Flores Island (Flores), FLW", "BR-Florianopolis (Hercilio Luz), FLN", "NO-Floro (Flora), FRO", "IT-Foggia (Gino Lisa), FOG", "NO-Forde (Forde Bringeland), FDE", "IT-Forli (Forli), FRL", "AR-Formosa (El Pucu), FMA", "CA-Fort Albany (Fort Albany), YFA", "US-F (Fort Collins Loveland Muni), FNL", "MG-Tolagnaro (Tolagnaro), FTU", "US-Fort Dodge (Ft Dodge Municipal), FOD", "CA-Fort Frances (Fort à¤«à¥à¤°à¤¾à¤‚à¤¸s Municipal), YAG", "CA-Fort Good Hope (Fort Good Hope), YGH", "CA-Fort Hope (Fort Hope), YFH", "US-Fort Lauderdale (Ft Lauderdale Hollywood), FLL", "US-Fort Leonard Wood (Forney Field), TBN", "CA-Fort Mcmurray (Fort Mcmurray), YMM", "CA-Fort Mcpherson (Fort Mcpherson), ZFM", "US-Fort Myers (Regional Southwest), RSW", "CA-Fort Nelson (Fort Nelson), YYE", "CA-Fort Severn (Fort Severn), YER", "CA-Fort Simpson (Fort Simpson), YFS", "CA-Fort Smith (Ft Smith Municipal), YSM", "US-Fort Smith (Ft Smith Municipal), FSM", "CA-FORT ST JOHN (Ft St John Municipal), YXJ", "US-Fort Wayne (Baer Field), FWA", "US-Fort Yukon (Fort Yukon), FYU", "BR-Fortaleza (Pinto Martines), FOR", "CA-St. Lewis (St. Lewis (Fox Harbour), YFX", "BR-Franca (Franca), FRC", "GA-Franceville (Mvengue), MVB", "US-Franklin (Chess Lamberton), FKL", "CA-FREDERICTON (Fredericton Municipal), YFC", "SL-Freetown (Lungi), FNA", "US-Fresno (Fresno Air Terminal), FAT", "US-Friday Harbor (Friday Harbor), FRD", "DE-Friedrichshafen (Friedrichshafen Lowenthal), FDH", "ES-Fuerteventura Puerto Del Rosario (Fuerteventura), FUE", "JP-Fukue (Fukue), FUJ", "JP-Fukuoka (Itazuke), FUK", "JP-Fukushima (), FKS", "TV-Funafuti Atol (Funafuti), FUN", "VU-Futuna Island (Futuna), FTA", "WF-Futuna Island (Pointe Vele), FUT", "CN-Fuyang (), FUG", "CN-Fuzhou (Fuzhou), FOC", "BW-Gaborone (Gaborone), GBE", "TN-Gafsa (Gafsa), GAF", "US-Gainesville (Gainesville Regional), GNV", "EC-Galapagos Is (Baltra), GPS", "US-Galena (Galena), GAL", "SE-Gallivare (Gallivare), GEV", "US-Gallup (Gallup Municipal), GUP", "IE-Galway (Carnmore), GWY", "GA-Gamba (Gamba), GAX", "ET-Gambella (Gambella), GMB", "US-Gambell (Gambell), GAM", "MV-Gan Island (), GAN", "CA-Gander (Gander), YQX", "CN-Ganzhou (Ganzhou), KOW", "US-Garden City (Garden City Municipal), GCK", "PG-Gasmata Island (Gasmata Island), GMI", "SA-Gassim (Gassim), ELQ", "SB-Gatokae (Gatokae), GTA", "VU-Gaua Island (Gaua Island), ZGU", "TR-Gaziantep (Oguzeli), GZT", "PL-Gdansk (Rebiechowo), GDN", "SD-Geneina (Geneina), EGN", "PH-General Santos City (General Santos), GES", "IT-Genoa (Christoforo Colombo), GOA", "ZA-George (George), GRJ", "GY-Georgetown (Cheddi Jagan), GEO", "SH-Georgetown (), ASI", "AU-Geraldton (Geraldton), GET", "ES-Gerona (Costa Brava), GRO", "CA-Gethsemani (Gethsemani), ZGS", "LY-Ghadames (Ghadames East), LTD", "LY-Ghat (Ghat), GHT", "IR-Gheshm (Gheshm), GSM", "GI-Gibraltar (North Front), GIB", "PK-Gilgit (Gilgit), GIL", "CA-Gillam (Gillam), YGX", "US-Gillette (Campbell Cty), GCC", "CA-Gillies Bay (Gillies Bay), YGB", "NZ-Gisborne (Gisborne), GIS", "SB-Gizo (Nusatupe), GZO", "CA-Gjoa Haven (Gjoa Haven), YHK", "US-Gladewater Kilgore Longview (Greg County), GGG", "AU-Gladstone (Gladstone), GLT", "US-Glendive (Dawson Community), GDV", "GB-Golouchestershire (Gloucestershire), GLO", "ET-Gode (Gode), GDE", "CA-Gods Lake Narrows (Gods Lake Narrows), YGO", "CA-Gods River (Gods River), ZGI", "BR-Goiania (Santa Genoveva), GYN", "AU-Gold Coast (Gold Coast), OOL", "CN-Golmud (Golmud), GOQ", "US-Golovin (Golovin), GLV", "CG-Goma (Goma), GOM", "BY-Gomel (Gomel), GME", "ET-Gondar (Gondar), GDQ", "US-Goodnews Mumtrak (Goodnews Mumtrak), GNU", "CA-Goose Bay (Municipal Goose Bay), YYR", "IR-Gorgan (Gorgan), GBT", "PG-Goroka (Goroka), GKA", "ID-Gorontalo (Jalaluddin), GTO", "SE-Gothenburg (Landvetter), GOT", "SE-Gothenborg (Save), GSE", "MA-Goulimime (), GLN", "AU-Gove (Gove), GOV", "BR-Governador Valadares (Governador Valadares), GVR", "PT-Graciosa Island (Graciosa), GRW", "AU-Grafton (Grafton), GFN", "ES-Granada (Granada), GRX", "US-Grand Canyon (Grand Canyon Natl Park), GCN", "US-Grand Forks (Grand Forks Mark Andrews), GFK", "US-Grand Island (Hall Cty Regional), GRI", "US-Grand Junction (Walker Field), GJT", "US-Grand Rapids (Kent County), GRR", "CA-Grande Prairie (Grande Prairie), YQU", "AU-Granites (), GTS", "US-Grayling (Grayling), KGX", "AT-Graz (Thalerhof), GRZ", "US-Great Bend (Great Bend), GBD", "US-Great Falls (Great Falls), GTF", "US-Green Bay (Austin Straubel Fld), GRB", "US-Greensboro High Point High Point (Piedmont Triad), GSO", "US-Greenville (Greenville Municipal), GLH", "USA-US (Pitt), PGV", "US-Greenville Greer (Greenville Spartanburg), GSP", "FR-Grenoble (Saint Geoirs), GNB", "AU-Griffith (Griffith), GFF", "GB-Grimsby (Binbrook), GSY", "IS-Grimsey (Grimsey), GRY", "CA-Grise Fiord (Grise Fiord), YGZ", "NL-Groningen (Eelde), GRQ", "AU-Groote Eylandt (Groote Eylandt), GTE", "RU-Grozny (Grozny), GRV", "MX-Guadalajara (Miguel Hidalgo), GDL", "GU-Tamning (Antonio B Won Pat), GUM", "CO-Guapi (Juan Casiano), GPI", "VE-Guasdualito (), GDO", "EC-Guayaquil (Simon Bolivar), GYE", "BO-Guayaramerin (Guayaramerin), GYA", "MX-Guaymas (Gen Jose M Yanez), GYM", "GB-Guernsey (Guernsey), GCI", "CN-Guilin (Guilin), KWL", "CN-Guiyang (Longdongbao), KWE", "US-Gulfport (Biloxi Regional), GPT", "UG-Gulu (Gulu), ULU", "US-Gunnison (Gunnison), GUC", "KR-Gunsan (Kunsan), KUV", "SA-Guriat (Guriat), URY", "US-Gustavus (Gustavus), GST", "PK-Gwadar (Gwadar), GWD", "KR-Kwangju (Gwangju), KWJ", "AZ-Ganja (Ganja), KVD", "AM-Gyumri (Gyumri), LWN", "TO-Lifuka (Lifuka Island), HPA", "JP-Hachijojima (Hachijojima), HAC", "SA-King Khalid Mil.city (King Khaled Military City), HBT", "SE-Hagfors (Hagfors), HFS", "IL-Haifa (Haifa), HFA", "CN-Haikou (Haikou), HAK", "SA-Hail (Hail), HAS", "CN-Hailar (Dongshan), HLD", "US-Hailey (Sun Valley), SUN", "US-Haines (Haines Municipal), HNS", "VN-Haiphong (Cat Bi), HPH", "JP-Hakodate (Hakodate), HKD", "CA-Halifax (Halifax), YHZ", "CA-Hall Beach (Hall Beach), YUX", "SE-Halmstad (Halmstad), HAD", "IR-Hamadan (Hamadan), HDM", "AU-Hamilton Island (Hamilton Island), HTI", "CA-Hamilton (Hamilton), YHM", "NZ-Hamilton (Hamilton), HLZ", "NO-Hammerfest (Hammerfest), HFT", "US-Hampton Newport News Williamsburg (Williamsburg), PHF", "US-Hana (Hana Municipal), HNM", "JP-Hanamaki (Hanamaki), HNA", "US-Hancock (Houghton Cty Memorial), CMX", "MV-Haa Dhaalu Atoll (Hanimaadhoo), HAQ", "US-Hanover Lebanon White River (Lebanon Regional), LEB", "CN-Hanzhong (Hanzhong), HZG", "ZW-Harare (Harare), HRE", "CN-Harbin (Taiping), HRB", "US-Harlingen (Rio Grande Valley), HRL", "US-Harrisburg (Harrisburg), MDT", "US-Harrison (Boone County), HRO", "US-Mary Esther (Hurlburt Fld), HRT", "NO-Harstad (Evenes), EVE", "SE-Hassleholm (), XWP", "NO-Hasvik (Hasvik), HAA", "TH-Hat Yai (Hat Yai), HDY", "RU-Khatanga (Khatanga), HTG", "NO-Haugesund (Karmoy), HAU", "CU-Havana (Jose Marti), HAV", "US-Havasupai (Havasupai), HAE", "CA-Havre St Pierre (Havre St Pierre), YGV", "US-Havre (City County), HVR", "CA-Hay River (Hay River Municipal), YHY", "US-Hayden (Hayden), HDN", "AU-Hayman Island (Hayman Island), HIS", "US-Hays (Hays Municipal), HYS", "US-Healy Lake (), HKB", "SE-Hedemora (), XXU", "CN-Hefei (Luogang), HFE", "MM-Heho (Heho), HEH", "DE-Heidelberg (Heidelberg), HDB", "CN-Heihe (Heihe), HEK", "US-Helena (Helena Municipal), HLN", "DE-Helgoland (Helgoland), HGL", "SE-Hemavan (Hemavan), HMV", "TW-Hengchun (Hengchun), HCN", "GR-Heraklion (N Kazantzakis), HER", "AF-Herat (Herat), HEA", "DE-Heringsdorf (Heringsdorf), HDF", "MX-Hermosillo (Gen Ignacio Pesqueira Garcia), HMO", "SE-Herrljunga (), XYC", "AU-Hervey Bay (Hervey Bay), HVB", "CA-HIGH LEVEL (Footner Lake), YOJ", "US-Hilo (Hilo Hawaii), ITO", "US-Hilton Head (Hilton Head), HHH", "JP-Hiroshima (Hiroshima), HIJ", "AU-Hobart (Hobart), HBA", "US-Hobbs (Lea Co Rgnl), HOB", "YE-Hodeidah (Hodeidah), HOD", "ZA-Hoedspruit (Hoedspruit Afb), HDS", "DE-Hof (Hof Plauen), HOQ", "CN-Hohhot (Hohhot), HET", "NZ-Hokitika (Hokitika), HKK", "US-Hollis (Hollis), HYL", "CA-Holman (Holman), YHI", "US-Holy Cross (Holy Cross), HCR", "GB-Angelsey (Anglesey), HLY", "US-Homer (Homer Municipal), HOM", "SB-Honiara (Henderson), HIR", "NO-Honningsvag (Valan), HVG", "US-Hoolehua (Molokai), MKK", "US-Hoonah (Hoonah), HNH", "US-Hooper Bay (Hooper Bay), HPB", "CA-Hopedale (Hopedale), YHO", "AU-Horn Island (Horn Island), HID", "PT-Horta (Horta), HOR", "PG-Hoskins (Hoskins), HKN", "US-Hot Springs (Memorial Field), HOT", "CN-Hotan (Hotan), HTN", "LA-Houeisay (Houeisay), HOE", "TH-Prachuap Khiri Khan (Hua Hin), HHQ", "TW-Hualien (Hualien), HUN", "CN-Huangyan (Huangyan Luqiao), HYN", "MX-Bahias Dehuatulco (Bahias De Huatulco), HUX", "SE-Hudiksvall (Hudiksvall), HUV", "CA-Hudson Bay (Hudson Bay), YHB", "VN-Hue (Phu Bai), HUI", "AU-Hughenden (Hughenden), HGD", "US-Hughes (Hughes Municipal), HUS", "GB-Humberside (Humberside), HUY", "US-Huntington Ashland (Tri State Milton), HTS", "US-Huntsville (Huntsville), HSV", "EG-Hurghada (Hurghada), HRG", "US-Huron (Huron Municipal), HON", "US-Huslia (Huslia), HSL", "US-Hyannis (Barnstable Cty), HYA", "US-Hydaburg (Hydaburg), HYG", "RO-Iasi (Iasi), IAS", "CO-Ibague (Perales), IBE", "ES-Ibiza (Ibiza), IBZ", "US-Idaho Falls (Fanning Field), IDA", "RU-Igarka (Igarka), IAA", "US-Igiugig (Igiugig), IGG", "CA-Igloolik (Igloolik), YGT", "BR-Iguassu Falls (Cataratas), IGU", "AR-Iguazu (Iguazu), IGR", "GR-IKARIA ISLAND (Ikaria), JIK", "IR-Ilam (Ilam), IIL", "NC-Ile Des Pins (Ile Des Pins), ILP", "CA-Iles De La Madeleine (House Harbour), YGR", "CA-Ilford (Ilford), ILF", "BR-Ilheus (Eduardo Gomes), IOS", "US-Iliamna (Iliamna), ILI", "PH-Iloilo (Mandurriao), ILO", "GL-Ilulissat (Ilulissat), JAV", "IR-Imam Khomeini (Imam Khomeini), IKA", "BR-Imperatriz (Imperatriz), IMP", "ET-Indaselassie (Indaselassie), SHC", "MZ-Inhambane (Inhambane), INH", "AT-Innsbruck (Kranebitten), INN", "US-International Falls (Intl Falls), INL", "CA-Inukjuak (Inukjuak), YPH", "CA-Inuvik (Inuvik Mike Zubko), YEV", "NZ-Invercargill (Invercargill), IVC", "AU-Inverell (Inverell), IVR", "GB-Inverness (Inverness), INV", "US-Inyokern (Kern County), IYK", "GR-Ioannina (Ioannina), IOA", "BR-Ipatinga (Usiminas), IPN", "CO-Ipiales (San Luis), IPI", "MY-Ipoh (Ipoh), IPH", "VU-Ipota (Ipota), IPA", "GB-Ipswich (Ipswich), IPW", "CA-Iqaluit (Iqaluit), YFB", "CL-Iquique (Cavancha Chucumata), IQQ", "PE-Iquitos (C F Secada), IQT", "RU-Irkutsk (Irkutsk), IKT", "US-Iron Mountain (Ford), IMT", "US-Ironwood (Gogebic County), IWD", "IS-Isafjordur (Isafjordur), IFJ", "IR-Isfahan (Esfahan Shahid Beheshti), IFN", "JP-Ishigaki (Ishigaki), ISG", "PK-Islamabad (Islamabad), ISB", "CA-Island Lake (Island Lake), YIV", "GB-Islay (Islay), ILY", "GB-Isle Of Man (Ronaldsway), IOM", "US-Islip (Long Island Macarthur), ISP", "US-Ithaca (Tomkins County), ITH", "FI-Ivalo (Ivalo), IVL", "UA-Ivano (Ivano Frankivsk), IFO", "CA-Ivujivik (Ivujivik), YIK", "JP-Iwami (), IWJ", "MX-Ixtapa Zihuatanejo (Zihuatanejo), ZIH", "TR-Izmir (All airports), IZM", "TR-Izmir (Adnan Menderes), ADB", "JP-Izumo (Izumo), IZO", "US-Jackson (Jackson Hole), JAC", "US-Jackson (Jackson Evers), JAN", "US-Jackson (McKellar Fld), MKL", "US-Jacksonville (Albert J Ellis), OAJ", "US-Jacksonville (Jacksonville), JAX", "PG-Jacquinot Bay (Jacquinot Bay), JAQ", "MX-Jalapa (Lencero), JAL", "ID-Jambi (Sultan Thaha), DJB", "US-Jamestown (Jamestown), JHW", "US-Jamestown (Jamestown), JMS", "ID-Jayapura (Sentani), DJJ", "SA-Gizan (King Abdullah Bin Abdulaziz), GIZ", "MH-Ailinglapalap Atoll (Jeh), JEJ", "KR-Jeju (Jeju), CJU", "ES-Jerez De La Frontera (La Parra), XRY", "GB-Jersey (States), JER", "BD-Jessore (Jessore), JSR", "CN-Ji An (Jing Gang Shan), JGS", "CN-Jiamusi (Jiamusi), JMU", "ET-Jijiga (), JIJ", "CN-Jinan (Jinan), TNA", "CN-Jingdezhen (Jingdezhen), JDZ", "CN-Jinghong (Jinghong), JHG", "KR-Sacheon (Sacheon Air Base), HIN", "CN-Jinzhou (Jinzhou), JNZ", "BR-Ji-Parana (), JPR", "IR-Jiroft (), JYR", "CN-Jiujiang (Jiujiang Lushan), JIU", "CN-Jiayuguan (Jiayuguan), JGN", "BR-Joao Pessoa (Presidente Castro Pinto), JPA", "FI-Joensuu (Joensuu), JOE", "US-Johnstown (Johnstown Cambria), JST", "MY-Johor Bahru (Sultan Ismail), JHB", "BR-Joinville (Cubatao), JOI", "PH-Jolo (Jolo), JOL", "US-Jonesboro (Jonesboro Muni), JBR", "SE-Jonkoping (Axamo), JKG", "US-Joplin (Joplin Municipal), JLN", "Saudi Arabia-SA (Al), AJF", "BR-Juazeiro Do Norte (Orlando Bezerra de Menezes), JDO", "BR-Juiz De Fora (Francisco De Assis), JDF", "AR-Jujuy (El Cadillal), JUJ", "AU-Julia Creek (Julia Creek), JCK", "PE-Juliaca (Juliaca), JUL", "NP-Jumla (Jumla), JUM", "US-Juneau (Juneau), JNU", "CN-Quzhou (Quzhou), JUZ", "FI-Jyvaskyla (Jyvaskyla), JYV", "MV-Kaadedhdhoo (Kaadedhdhoo), KDM", "ET-Kabri Dehar (Kabri Dehar), ABK", "MV-Laamu Atoll (Kadhdhoo), KDO", "SB-Kagau Island (Kagau Island), KGE", "JP-Kagoshima (Kagoshima), KOJ", "TR-KAHRAMANMARAS (KAHRAMANMARAS), KCM", "US-Kahului (Kahului), OGG", "ID-Kaimana (Kaimana), KNG", "NZ-Kaitaia (Kaitaia), KAT", "FI-Kajaani (Kajaani), KAJ", "US-Kake (), KAE", "US-Kakhonak (Kakhonak), KNK", "GR-Kalamata (Kalamata), KLX", "US-Kalamazoo (Kalamazoo Cty), AZO", "US-Molokai (Kalaupapa), LUP", "AU-Kalbarri (Kalbarri), KAX", "MM-Kalemyo (Kalay), KMV", "AU-Kalgoorlie (Kalgoorlie Boulder), KGI", "PH-Kalibo (Kalibo), KLO", "RU-Kaliningrad (Kaliningrad), KGD", "US-Kalispell (Glacier Park), FCA", "SE-Kalmar (Kalmar), KLR", "US-Kalskag (Kalskag), KLG", "US-Kaltag (Kaltag), KAL", "GR-Kalymnos (Kalymnos Island), JKL", "SY-Kamishly (Kamishly), KAC", "CA-KAMLOOPS (Davie Fulton), YKA", "-Kampala (), KLA", "US-Kamuela (Waimea Kohala), MUE", "CG-Kananga (Kananga), KGA", "FJ-Vunisea (Vunisea), KDV", "PG-Kandrian (Kandrian), KDR", "GL-Sondrestrom (Sondre Stromfjord), SFJ", "CA-Kangiqsualujjuaq (Kangiqsualujjuaq), XGR", "CA-Kangiqsujuaq (Kangiqsujuaq), YWB", "CA-Kangirsuk (Kangirsuk), YKG", "US-Kansas City (Kansas City), MCI", "TW-Kaohsiung (Kaohsiung), KHH", "US-Kapalua (Kapalua), JHM", "CA-Kapuskasing (Japuskasing Municipal), YYU", "PK-Karachi (Quaid E Azam), KHI", "Kazakhstan-KZ (Sary), KGF", "CN-Karamay (Karamay), KRY", "EE-Armari Air Force Base (Amari), KDL", "ZW-Kariba (Kariba), KAB", "CZ-Karlovy Vary (Karlovy Vary), KLV", "DE-Karlsruhe Baden Baden (Soellingen), FKB", "SE-Karlstad (Karlstad), KSD", "US-Karluk (Karluk), KYK", "GR-Karpathos (Karpathos), AOK", "AU-Karratha (Karratha), KTA", "TR-Kars (Kars), KSY", "UZ-Khanabad (Karshi Khanabad), KSQ", "AU-Karumba (Karumba), KRB", "DK-Karup (Karup), KRP", "US-Kasaan (), KXA", "CA-Kasabonika (Kasabonika), XKS", "CA-Kashechewan (Kashechewan), ZKE", "CN-Kashi (Kashi), KHG", "US-Kasigluk (Kasigluk), KUK", "GR-Kasos Island (Kasos Island), KSJ", "DE-Kassel (Kassel Calden), KSF", "GR-Kastelorizo (Kastelorizo), KZS", "GR-Kastoria (Aristotelis), KSO", "AU-Katherine (Tindal), KTR", "PL-Katowice (Pyrzowice), KTW", "SE-Katrineholm (), XXK", "US-Kauai (Lihue Municipal), LIH", "GR-Kavala (Megas Alexandros), KVA", "PG-Kavieng (Kavieng), KVG", "MM-Kawthoung (Kawthoung), KAW", "ML-Kayes (Kayes Dag Dag), KYS", "TR-Kayseri (Erkilet), ASR", "RU-Kazan (Kazan), KZN", "US-Kearney (Kearney Municipal Arrpt), EAR", "CA-Keewaywin (), KEW", "GR-Kefallinia (Argostoli), EFL", "CA-Kegaska (Kegaska), ZKG", "CA-Kelowna (Ellison Field), YLW", "RU-Kemorovo (Kemerovo), KEJ", "FI-Kemi Tornio (Kemi Tornio), KEM", "US-Kenai (Kenai Municipal), ENA", "ID-Kendari (Wolter Monginsidi), KDI", "MM-Kengtung (Kengtung), KET", "CA-Kenora (Kenora), YQK", "PG-Kerema (), KMA", "NZ-Kerikeri (Kerikeri), KKE", "IR-Kerman (Kerman), KER", "IR-Kermanshah (Kermanshah), KSH", "IE-Kerry County (Kerry County), KIR", "US-Ketchikan (Ketchikan), KTN", "US-Key West (Key West), EYW", "RU-Khabarovsk (Novyy), KHV", "MM-Khamti (Khamti), KHM", "RU-Khanty (Khanty Mansiysk), HMA", "UA-Kharkov (Kharkov), HRK", "SD-Khartoum (Civil), KRT", "OM-Khasab (Khasab), KHS", "UA-Kherson (Kherson), KHE", "TH-Khon Kaen (Khon Kaen), KKC", "TJ-Khudzhand (Khudzhand), LBD", "US-Kiana (Bob Barker Memorial), IAN", "PG-Kikori (Kikori), KRI", "TZ-Kilimanjaro (Kilimanjaro), JRO", "US-Killeen (Robert Gray Aaf), GRK", "ZA-Kimberley (Kimberley), KIM", "CA-Kimmirut (Kimmirut), YLC", "CG-Kindu (Kindu), KND", "US-King Cove (King Cove), KVC", "Australia-King Island (King Island), KNS", "SA-King Khalid Mil. City (), KMC", "US-King Salmon (King Salmon), AKN", "CA-Kingfisher Lake (Kingfisher Lake), KIF", "US-Kingman (Mohave County), IGM", "AU-Kingscote (Kingscote), KGC", "CA-Kingston (Norman Rodgers), YGK", "TW-Chinmen (Shang Yi), KNH", "CD-Kinshasa (Kinshasa), FIH", "US-Kinston (Stalliings Field), ISO", "US-Kipnuk (), KPN", "SB-Kirakira (Ngorangora), IRA", "NO-Kirkenes (Hoeybuktmoen), KKN", "US-Kirksville (Kirksville Municipal), IRK", "GB-Kirkwall Orkney Island (Kirkwall), KOI", "SE-Kiruna (Kiruna), KRN", "CG-Kisangani (Kisangani Simisini), FKI", "IR-Kish Island (Kish Island), KIH", "KE-Kisumu (Kisumu), KIS", "JP-Kitakyushu (New Kitakyushu), KKJ", "CA-Waterloo (Waterloo), YKF", "GR-Kithira (Kithira), KIT", "US-Kitoi Bay (Kitoi Bay), KKB", "FI-Kittila (Kittila), KTT", "PG-Kiunga (Kiunga), UNG", "US-Kivalina (Kivalina), KVL", "AT-Klagenfurt (Klagenfurt), KLU", "LT-Palanga (Palanga), PLQ", "US-Klamath Falls (Kingsley Field), LMT", "US-Klawock (Klawock), KLW", "IE-Knock (Knock), NOC", "US-KNOXVILLE (McGhee Tyson), TYS", "JP-Kobe (Kobe), UKB", "US-Kobuk (Kobuk,Wien), OBU", "US-Kodiak (Kodiak), ADQ", "RU-Kogalym (Kogalym), KGP", "FI-Kokkola Pietarsaari (Kokkola), KOK", "PG-Kokoda (Kokoda), KKD", "JP-Kanazawa (Komatsu), KMQ", "Amur-Russia (Komsomolsk), KXK", "US-Kona (Keahole), KOA", "NC-Kone (Kone), KNQ", "US-Kongiganak (Kongiganak), KKH", "TR-Konya (Konya), KYA", "CN-Korla (Korla), KRL", "FJ-Koro Island (Koro Island), KXF", "GR-Kos (Kos), KGS", "SK-Kosice (Barca), KSC", "KZ-Kostanay (Kostanay West), KSN", "PL-Koszalin (), OSZ", "MY-Kota Bharu (Pengkalan Chepa), KBR", "MY-Kota Kinabalu (Kota Kinabalu), BKI", "RU-Kotlas (Kotlas), KSZ", "US-Kotlik (Kotlik), KOT", "US-Kotzebue (Ralph Wien Memorial), OTZ", "GA-Koulamoutou (Koulamoutou), KOU", "NC-Koumac (Koumac), KOC", "AU-Kowanyama (Kowanyama), KWM", "US-Koyuk (Koyuk), KKA", "US-Koyukuk (Koyukuk), KYU", "GR-Kozani (Filippos), KZI", "PL-Krakow (John Paul II), KRK", "SE-Kramfors (Kramfors Solleftea), KRF", "RU-Krasnodar (Krasnodar), KRR", "RU-Krasnojarsk (Krasnojarsk), KJA", "NO-Kristiansand (Kjevik), KRS", "SE-Kristianstad (Kristianstad), KID", "NO-Kristiansund (Kvernberget), KSU", "UA-Krivoy Rog (Krivoy Rog), KWG", "MY-Kuala Terengganu (Sultan Mahmood), TGG", "MY-Kuantan (Kuantan), KUA", "AU-Kubin Island (Kubin), KUG", "MY-Kuching (Kuching), KCH", "MY-Kudat (Kudat), KUD", "LY-Kufra (Kufra), AKF", "CA-Pelly Bay (Kugaaruk), YBB", "CA-Coppermine (Kugluktuk), YCO", "GL-Kulusuk (Kulusuk), KUS", "JP-Kumamoto (Kumamoto), KMJ", "JP-Kumejima (Kumejima), UEO", "PG-Kundiawa (Chimbu), CMU", "AU-Kununurra (Kununurra), KNX", "FI-Kuopio (Kuopio), KUO", "ID-Kupang (El Tari), KOE", "CN-Kuqa (Kuqa), KCA", "EE-Kuressaare (Kuressaare), URE", "RU-Kurgan (Kurgan), KRO", "RU-Kursk (Kursk East), URS", "JP-Kushiro (Kushiro), KUH", "GE-Kutaisi (Kopitnari), KUT", "CA-Kuujjuaq (Kuujjuaq), YVP", "CA-Kuujjuarapik (Kuujjuaraapik), YGW", "FI-Kuusamo (Kuusamo), KAO", "MH-Kwajalein Atoll (), EAL", "MH-Kwajalein (Kwajalein), KWA", "US-Kwethluk (Kwethluk), KWT", "US-Kwigillingok (Kwigillingok), KWK", "MM-Kyaukpyu (Kyaukpyu), KYP", "RU-Kyzyl (Kyzyl), KYZ", "Kazakhstan-KZ (Kzyl), KZO", "CO-La Chorrera (La Chorrera), LCR", "ES-La Coruna (La Coruna), LCG", "US-La Crosse (La Crosse Municipal), LSE", "VE-La Fria (La Fria), LFR", "CA-La Grande Riviere (La Grande Riviere), YGL", "BO-La Paz (El Alto), LPB", "MX-La Paz (Aeropuerto Gen Marquez De Leon), LAP", "CO-La Pedrera (La Pedrera), LPD", "AR-La Rioja (La Rioja), IRJ", "FR-La Rochelle (Laleu), LRH", "CL-La Serena (La Florida), LSC", "CA-La Tabatiere (La Tabatiere), ZLT", "CA-La Tuque (), YLQ", "MA-Laayoune (Hassan I), EUN", "FJ-Lambasa (Labasa), LBS", "ID-Labuhan Bajo (Mutiara ), LBJ", "MY-Labuan (Labuan), LBU", "CA-Lac Brochet (Lac Brochet), XLB", "PG-Nadzab (Nadzab), LAE", "US-Lafayette (Lafayette Municipal), LFT", "EC-Lago Agrio (Nueva Loja), LGQ", "MY-Lahad Datu (Lahad Datu), LDU", "PK-Lahore (Lahore), LHE", "US-Lake Charles (Lake Charles Municipal), LCH", "US-Lake Minchumina (Lake Minchumina), LMA", "PG-Lake Murray (Lake Murray), LMY", "FJ-Lakeba Island (Lakeba Island), LKB", "NO-Banak (Banak), LKL", "CO-Lamacarena (Lamacarena), LMC", "VU-Lamap (Lamap), LPM", "VU-Lamen Bay (Lamen Bay), LNB", "IR-Lamerd (), LFM", "IT-Lamezia Terme (S Eufemia), SUF", "NP-Lamidanda (Lamidanda), LDN", "TH-Lampang (Lampang), LPT", "IT-Lampedusa (Lampedusa), LMP", "KE-Lamu (Lamu Manda), LAU", "US-Lanai City (Lanai), LNY", "ID-Langgur (Dumatumbun), LUV", "CA-Langley (), YLY", "FR-Lannion (Lannion), LAI", "CA-Lansdowne House (Lansdowne House), YLH", "ZA-Johannesburg (Lanseria), HLA", "US-Lansing (Lansing), LAN", "ES-Lanzarote (Lanzarote), ACE", "CN-Lanzhou (Lanzhou), LHW", "PH-Laoag (Laoag), LAO", "IR-Lar (Lar), LRR", "US-Laramie (General Brees Fld), LAR", "US-Laredo (Laredo), LRD", "CY-Larnaca (Larnaca), LCA", "US-Larsen Bay (), KLN", "ES-Las Palmas (Aeropuerto De Gran Canaria), LPA", "VE-Paraguana (Josefa Camejo), LSP", "MM-Lashio (Lashio), LSH", "SY-Latakia (Bassel Al Assad), LTK", "US-Latrobe (Westmorland County), LBE", "AU-Launceston (Launceston), LST", "US-Laurel (Hattiesburg Laurel Regional), PIB", "AU-Laverton (Laverton), LVO", "MY-Lawas (Lawas), LWY", "US-Lawton (Lawton Municipal), LAW", "MX-Lazaro Cardenas (Lazaro Cardenas), LZC", "FR-Le Havre (Octeville), LEH", "FR-Le Puy (Loudes), LPY", "AU-Learmonth (Learmonth), LEA", "GB-Leeds (Leeds Bradford), LBA", "PH-Legaspi (Legaspi), LGP", "AU-Leinster (Leinster), LER", "DE-Leipzig Halle (Leipzig), LEJ", "NO-Leknes (Leknes), LKN", "ES-Leon (Leon), LEN", "MX-Leon Guanajuato (Del Bajio), BJX", "AU-Leonora (Leonora), LNO", "GR-Leros (Leros), LRS", "RU-Leshukonskoye (), LDG", "CA-LETHBRIDGE (Lethbridge), YQL", "CO-Leticia (Alfredo Vasquez Cobo), LET", "US-Levelock (Levelock), KLL", "US-Lewisburg (Greenbrier Valley), LWB", "US-Lewiston (Lewiston Nez Pierce), LWS", "US-Lewistown (Lewistown Municipal), LWT", "US-Lexington (Blue Grass Field), LEX", "China-CN (Lhasa), LXA", "CN-Lianyungang (Lianyungang), LYG", "US-Liberal (Liberal Municipal), LBL", "GA-Libreville (Libreville), LBV", "MZ-Lichinga (Lichinga), VXC", "LV-Liepaja (Liepaja), LPX", "NC-Lifou (Lifou), LIF", "PG-Lihir Island (Lihir Island), LNV", "CN-Lijiang (Lijiang), LJG", "FR-Lille (Lesquin), LIL", "MW-Lilongwe (Lilongwe), LLW", "PE-Lima (Jorge Chavez), LIM", "MY-Limbang (Limbang), LMN", "GR-Limnos (Limnos), LXS", "FR-Limoges (Bellegarde), LIG", "CN-Lincang (), LNJ", "US-Lincoln (Lincoln Municipal), LNK", "TZ-Lindi (Kikwetu), LDI", "SE-Linkoping (Saab), LPI", "CN-Linyi (Shubuling), LYI", "AT-Linz (Hoersching), LNZ", "RU-Lipetsk (Lipetsk), LPK", "AU-Lismore (Lismore), LSY", "US-Little Rock (Little Rock Regional), LIT", "CN-Liuzhou (Bailian), LZH", "GB-Liverpool (Liverpool), LPL", "ZM-Livingstone (Livingstone), LVI", "BR-Livramento (Dos Galpoes), LVB", "SI-Ljubljana (Brnik), LJU", "CA-Lloydminster (Lloydminster), YLL", "AU-Lockhart River (Lockhart River), IRG", "PL-Lodz (Lublinek), LCJ", "ES-Logrono (), RJL", "MM-Loikaw (Loikaw), LIW", "EC-La Toma (Catamayo) (Camilo Ponce Enriquez), LOH", "KE-Lokichoggio (Lokichoggio), LKG", "TG-Lome (Lome), LFW", "GB-Londonderry (Eglinton), LDY", "BR-Londrina (Londrina), LDB", "MY-Long Akah (Long Akah), LKH", "MY-Long Banga (Long Banga), LBP", "US-LONG BEACH (Long Beach Municipal), LGB", "MY-Long Datih (Long Lellang), LGL", "MY-Long Seridan (Long Seridan), ODN", "VU-Longana (Longana), LOD", "AU-Longreach (Longreach), LRE", "CN-Longyan (), LCX", "SJ-Longyearbyen (Svalbard), LYR", "VU-Lonorore (Lonorore), LNE", "US-Lopez (Lopez Island), LPS", "AU-Lord Howe Island (Lord Howe Island), LDH", "MX-Loreto (Loreto), LTO", "FR-Lorient (Lann Bihoue), LRT", "MX-Los Mochis (Federal Los Mochis), LMM", "PG-Losuia (Losuia), LSA", "US-LOUISVILLE (Louisville), SDF", "FR-Lourdes Tarbes (Tarbes), LDE", "LA-Luang Prabang (Luang Phabang), LPQ", "AO-Lubango (Lubango), SDD", "US-Lubbock (Lubbock Preston Smith), LBB", "CG-Lubumashi (Lubumbashi), FBM", "NA-Luderitz (Luderitz), LUD", "DE-Luebeck (Lubeck Blankensee), LBC", "CH-Lugano (Agno), LUG", "UA-Lugansk (Lugansk), VSG", "NP-Lukla (Lukla), LUA", "SE-Lulea (Kallax), LLA", "CN-Luoyang (Luoyang), LYA", "CA-Lutselke (Lutselke), YSG", "LU-Luxembourg (Luxembourg), LUX", "CN-Luxi (Mangshi), LUM", "EG-Luxor (Luxor), LXR", "CN-Luzhou (Luzhou), LZO", "PH-Angeles City (Diosdado Macapagal), CRK", "UA-Lviv (Snilow), LWO", "SE-Lycksele (Lycksele), LYC", "US-Lynchburg (Lynchburg Municipal), LYH", "CA-Lynn Lake (Lynn Lake), YYL", "FR-Lyon (Lyon Saint Exupery), LYS", "NL-Maastricht (Maastricht Aachen), MST", "AU-Mabuiag Island (Mabuiag Island), UBB", "BR-Maca_ (Maca), MEA", "BR-Macapa (Macapa), MCP", "EC-Macas (Coronel E Carvajal), XMS", "BR-Maceio (Palmeres), MCZ", "AU-Mackay (Mackay), MKY", "US-Macon (Lewis B Wilson), MCN", "PG-Madang (Madang), MAG", "PT-Madeira (Madeira), FNC", "US-Madison (Dane County Regional), MSN", "TH-Mae Hong Son (Mae Hong Son), HGN", "VU-Maewo Island (Naone), MWF", "RU-Magadan (Magadan), GDX", "RU-Magnetiogorsk (Magnitogorsk), MQF", "MM-Magwe (Magwe), MWQ", "MG-Maintirano (Maintirano), MXT", "CV-Maio (Maio), MMO", "MG-Mahajanga (Philibert tsiranana ), MJN", "MH-Majuro (Amata Kabua), MAJ", "ET-Makale (Makale), MQX", "RU-Makhachkala (Uytash), MCX", "CA-Makkovik (Makkovik), YMN", "GA-Makokou (Makokou), MKU", "TW-Makung (Magong), MZG", "ZA-Malamala (Malamala), AAM", "GQ-Malabo (Santa Isabel), SSG", "ES-Malaga (Malaga), AGP", "SD-Malakal (Malakal), MAK", "ID-Malang (Abdul Rachman Saleh), MLG", "TR-Malatya (Erhac), MLX", "KE-Malindi (Malindi), MYD", "SE-Malmo (), MMA", "SE-Malmo (Sturup), MMX", "FJ-Malololailai (Malololailai), PTF", "MT-Malta (Luqa), MLA", "FJ-Mana Island (Mana Island), MNF", "ID-Manado (Samratulang), MDC", "MG-Mananjary (Mananjary), MNJ", "BR-Manaus (Intl Eduardo Gomes), MAO", "MM-Mandalay (Mandalay), MDL", "CK-Mangaia Island (Mangaia Island), MGS", "US-Manhattan (Manhattan Municipal), MHK", "AU-Maningrida (Maningrida), MNG", "US-Manistee (Blacker), MBL", "CO-Manizales (Santaguida), MZL", "MG-Manja (Manja), MJA", "US-Manley Hot Spring (Manley Hot Spring), MLY", "DE-Mannheim (Mannheim City), MHG", "US-Manokotak (), KMO", "ID-Manokwari (Rendani), MKW", "EC-Manta (Eloy Alfaro), MEC", "PG-Manus Island (Momote), MAS", "MX-Manzanillo (Manzanillo), ZLO", "SZ-Manzini (Matsapha), MTS", "MZ-Maputo (Maputo), MPM", "AR-Mar Del Plata (Mar Del Plata), MDQ", "KE-Mara Lodges (Mara Lodges), MRE", "BR-Maraba (Maraba), MAB", "VE-Maracaibo (La Chinita), MAR", "SB-Marau (Marau), RUS", "TR-Mardin (), MQM", "NC-Mare (Mare), MEE", "ZA-Margate (Margate), MGH", "FI-Mariehamn (Mariehamn), MHQ", "US-Marietta (Dobbins Arb), MGE", "US-Marietta Parkersburg (Wood County), PKB", "BR-Marilia (Dr Gasto Vidigal), MII", "BR-Maringa (Regional De Maringa Silvio Name Junior), MGF", "US-Marion (Williamson County), MWA", "UA-Mariupol (Mariupol), MPW", "MG-Maroantsetra (Maroantsetra), WMN", "US-Marquette (Marquette County), MQT", "MA-Marrakech (Menara), RAK", "EG-Marsa Alam (Marsa Alam), RMF", "FR-Marseille (Marseille Provence), MRS", "US-Marshall Fortuna (Marshall Fortuna), MLL", "US-Marthas Vineyard (Dukes County), MVY", "MY-Marudi (Marudi), MUR", "CA-Marys Harbour (Marys Harbour), YMH", "PH-Masbate (Masbate), MBT", "LS-Maseru (Moshoeshoe), MSU", "IR-Mashhad (Mashhad), MHD", "US-Mason City (Mason City), MCW", "ER-Massawa (Massawa), MSW", "US-Massena (Richards Field), MSS", "CA-Masset (Masset), ZMT", "ZW-Masvingo (Masvingo), MVZ", "MX-Matamoros (Servando Canales), MAM", "ID-Mataram (Selaparang), AMI", "TW-Matsu Islands (Matsu Beigan), MFK", "JP-Matsuyama (Matsuyama), MYJ", "VE-Maturin (Quiriquire), MUN", "CK-Mauke Island (Mauke), MUK", "ID-Maumere (Wai Oti), MOF", "AF-Mazar (Mazar I Sharif), MZR", "MX-Mazatlan (Buelina), MZT", "SB-Mbambanakira (Babanakira), MBU", "CG-Mbandaka (Mbandaka), MDK", "CG-Mbuji (Mbuji Mayi), MJM", "US-Mc Allen Mission (Miller), MFE", "AU-Mcarthur River (McArthur River Mine), MCV", "US-McCall (), MYL", "US-Mccook (Mccook), MCK", "US-Mcgrath (McGrath), MCG", "ID-Medan (Polonia), MES", "CO-Medellin (Enrique Olaya Herrara), EOH", "CO-Medellin (Jose Marie Cordova), MDE", "US-Medford (Medford Jackson Cty), MFR", "CA-MEDICINE HAT (Medicine Hat), YXH", "AU-Meekatharra (Meekatharra), MKR", "NP-Meghauli (Meghauli), MEY", "NO-Mehamn (Mehamn), MEH", "CN-Meixian (Meixian), MXZ", "US-Mekoryuk (Mekoryuk), MYU", "ES-Melilla (Melilla), MLN", "JP-Memanbetsu (Memanbetsu), MMB", "DE-Memmingen Allgau (Memmingen Allgau), FMM", "US-Memphis (Memphis), MEM", "PG-Mendi (Mendi), MDU", "AR-Mendoza (El Plumerillo), MDZ", "ES-Menorca (Aerop De Menorca), MAH", "ID-Merauke (Mopah), MKQ", "US-Merced (Merced Municipal), MCE", "MX-Merida (Merida), MID", "VE-Merida (Alberto Carnevalli), MRD", "US-Meridian (Key Field), MEI", "AU-Merimbula (Merimbula), MIM", "United States-US (Phoenix), AZA", "US-Metlakatla (), MTM", "FR-Metz Nancy (Metz Nancy Lorraine), ETZ", "MX-Mexicali (Rodolfg Sachez Taboada), MXL", "US-Meyers Chuck (), WMK", "CN-Mianyang (Mianyang), MIG", "US-Midland (Midland), MAF", "GR-Mikonos (Mykonos à¤—à¥à¤°à¥€à¤¸), JMK", "AU-Mildura (Mildura), MQL", "US-Miles City (Miles City Municipal), MLS", "AU-Milingimbi (Milingimbi), MGT", "GR-Milos (Milos), MLO", "GB-Milton Keynes (Milton Keynes), KYN", "US-Milwaukee (General Mitchell), MKE", "MX-Minatitlan (Minatitlan), MTT", "RU-Mineralnye Vody (Mineralnyye Vody), MRV", "US-Minot (Minot), MOT", "BY-Minsk (Minsk ), MHP", "BY-Minsk (Minsk ), MSQ", "US-Minto (Minto), MNT", "MY-Miri (Miri), MYY", "RU-Mirnyj (Mirny), MJZ", "JP-Misawa (Misawa), MSJ", "PG-Misima Island (Misima Island), MIS", "US-Missoula (Missoula), MSO", "LY-Misratah (Misratah), MRA", "CK-Mitiaro Island (Mitiaro Island), MOI", "CO-Mitu (Fabio Alberto Leon Bentley), MVP", "JP-Miyake Jima (Miyake Jima), MYE", "JP-Miyako (Miyako), MMY", "JP-Miyazaki (Miyazaki), KMI", "ZA-Mafeking (Mmabatho), MBD", "NO-Mo i Rana (Mo I Rana), MQN", "US-Moab (Canyonlands Field), CNY", "FJ-Moala (Moala), MFJ", "US-Mobile (Mobile Municipal), MOB", "US-Modesto (Harry Sham Fld), MOD", "KM-Moheli (Bandaressalam), NWA", "PK-Moenjodaro (Moenjodaro), MJD", "NO-Molde (Aro), MOL", "US-Moline (Quad City), MLI", "KE-Mombasa (Moi), MBA", "TN-Monastir (Habib Bourguiba), MIR", "JP-Monbetsu (Monbetsu), MBE", "MX-Monclova (Monclova), LOV", "CA-Moncton (Moncton Municipal), YQM", "MM-Mong Hsat (Mong Hsat), MOG", "AU-Monkey Mia (Shark Bay), MJK", "SB-Stirling Island (Mono), MNY", "US-MONROE (Monroe Regional), MLU", "LR-Monrovia (Monrovia Spriggs Payne), MLW", "LR-Monrovia (Roberts), ROB", "CA-Mont Joli (Mont Joli), YYY", "CA-Mont Tremblant (), YTM", "JM-Montego Bay (Sangster), MBJ", "CO-Monteria (Los Garzones), MTR", "MX-Monterrey (Escobedo), MTY", "BR-Montes Claros (Mario Ribeiro), MOC", "UY-Montevideo (Carrasco), MVD", "US-Montgomery (Dannelly Field), MGM", "FR-Montpellier (Frejorgues), MPL", "US-Montrose (Montrose County), MTJ", "MS-Geralds (Geralds), MNI", "CA-Moosonee (Moosonee), YMO", "ML-Mopti (Ambodedjo), MZI", "SE-Mora (Mora), MXX", "MG-Morafenobe (Morafenobe), TVA", "AU-Moranbah (Moranbah), MOV", "AU-Moree (Moree), MRZ", "MX-Morelia (Michoacan Municipal), MLM", "US-Morgantown (Morgantown Municipal), MGW", "AU-Mornington (Mornington), ONG", "PG-Moro (Moro), MXH", "MG-Morombe (Morombe), MXM", "MG-Morondava (Morondava), MOQ", "KM-Moroni (Prince Said Ibrahim In), HAH", "KM-Moroni (Iconi), YVA", "AU-Moruya (Moruya), MYA", "US-Moser Bay (Moser Bay), KMY", "NO-Mosjoen (Kjaerstad), MJF", "BA-Mostar (Mostar), OMO", "VU-Ablow (Mota Lava), MTV", "GA-Mouila (Mouilla Ville), MJL", "MM-Mawlamyine (Mawlamyine), MNU", "AU-Mount Gambier (Mount Gambier), MGB", "PG-Mount Hagen (Mount Hagen), HGU", "AU-Mount Isa (Mount Isa), ISA", "AU-Mount Magnet (Mount Magnet), MMG", "FK-Mount Pleasant (Mount Pleasant), MPN", "US-Mountain Village (Mountain Village), MOU", "UG-Moyo (Moyo), OYG", "NA-Mpacha (Mpacha), MPA", "TZ-Mtwara (Mtwara), MYW", "BR-Mucuri (Mucuri), MVS", "CN-Mudanjiang (Mudanjiang), MDG", "DE-Muenster (Muenster), FMO", "MY-Mukah (Mukah), MKM", "FR-Mulhouse Basel (Mulhouse Euroairport French), MLH", "PK-Multan (Multan), MUX", "MY-Mulu (Mulu), MZV", "SB-Munda (Munda), MUA", "ES-Murcia (San Javier), MJV", "RU-Murmansk (Murmansk), MMK", "AU-Murray Island (Murray Island), MYI", "TR-Mus (Mus), MSR", "US-Muskegon (Muskegon Cty), MKG", "CA-Muskrat Dam (Muskrat Dam), MSA", "TZ-Musoma (Musoma), MUZ", "TZ-Mwanza (Mwanza), MWZ", "MM-Myeik (Myeik), MGZ", "MM-Myitkyina (Myitkyina), MYT", "US-Myrtle Beach (Myrtle Beach Jetway), MYR", "GR-Mytilene (Mytilene), MJT", "MW-Mzuzu (Mzuzu), ZZU", "US-Beaufort (Beaufort Mcas), NBC", "MA-Nador (), NDR", "RU-Nadym (Nadym), NYM", "PH-Naga (Naga), WNP", "JP-Nagasaki (Nagasaki), NGS", "JP-Nagoya (Chubu Centrair), NGO", "CA-Nain (Nain), YDP", "JP-Nakashibetsu (Nakashibetsu), SHB", "AZ-Nakhchivan (Nakhchivan), NAJ", "TH-Nakhon Si Thammarat (Nakhon Si Thammarat), NST", "CA-Nakina (Nakina), YQN", "TH-Nakhon Phanom (Nakhon Phanom), KOP", "UZ-Namangan (Namangan), NMA", "PG-Namatanai (), ATN", "MZ-Nampula (Nampula), APL", "NO-Namsos (Namsos), OSY", "TH-Nan (Nan), NNT", "CA-NANAIMO (Nanaimo), YCD", "CA-Nanaimo (), ZNA", "CN-Nanchang (Changbei), KHN", "CN-Nanchong (Nanchong), NAO", "TW-Matsu Islands (Matsu Nangan), LZN", "CA-Nanisivik (Nanisivik), YSR", "CN-Nanking Nanjing (Nanjing), NKG", "CN-Nanning (Nanning), NNG", "GL-Nanortalik (Nanortalik Heliport), JNN", "FR-Nantes (Nantes Atlantique), NTE", "CN-Nantong (Nantong), NTG", "US-Nantucket (Nantucket Memorial), ACK", "US-Nanwalek (), KEB", "CN-Nanyang (Nanyang), NNY", "KE-Nanyuki (Nanyuki Civil), NYK", "US-Napakiak (), WNA", "US-Napaiskak (Napaiskakspb), PKA", "NZ-NAPIER (Napier), NPE", "IT-Naples (Capodichino), NAP", "US-Naples (Naples Municipal), APF", "TH-Narathiwat (Narathiwat), NAW", "AU-Narrabri (Narrabri), NAA", "AU-Narrandera (Narrandera), NRA", "GL-Narsarsuaq (Narsarsuaq), UAK", "NO-Narvik (Framnes), NVK", "Russia-RU (Naryan), NNM", "US-Nashville (Nashville), BNA", "BR-Natal (Augusto Severo), NAT", "CA-Natashquan (Natashquan), YNA", "CA-Natuashish (), YNP", "US-Naukiti (Naukiti), NKI", "NR-Nauru (Nauru), INU", "BR-Navegantes (Navegantes), NVT", "GR-Naxos (Naxos), JNX", "TD-N Djamena (N Djamena), NDJ", "ZM-Ndola (Ndola), NLA", "GL-Neerlerit Inaat (Neerlerit Inaat), CNP", "CO-Neiva (Benito Salas), NVA", "SA-Nejran (Nejran), EAM", "US-Nelson Lagoon (Nelson Lagoon), NLG", "NZ-Nelson (Nelson), NSN", "ZA-Mpumalanga (Kruger Mpumalanga), MQP", "CA-Nemiscau (Nemiscau), YNS", "NP-Nepalganj (), KEP", "RU-Neryungri (Neryungri), NER", "DE-Neumuenster (), EUM", "AR-Neuquen (Presidente Peron), NQN", "TR-Nevsehir (Kapadokya), NAV", "US-New Bern (Craven County Regional), EWN", "US-New Haven (Tweed New Haven), HVN", "US-New Koliganek (New Koliganek), KGK", "US-New Orleans (Louis Armstrong), MSY", "NZ-New Plymouth (New Plymouth), NPL", "US-New Stuyahok (New Stuyahok), KNW", "US-Newburgh (Stewart), SWF", "AU-Newman (Newman), ZNE", "GB-Newquay (Newquay Civil), NQY", "US-Newtok (Newtok), WWT", "FJ-Ngau (Ngau), NGI", "VN-Nhatrang (Nhatrang), NHA", "US-Niagara Falls (Niagara Falls), IAG", "US-Nightmute (Nightmute), NME", "JP-Niigata (Niigata), KIJ", "UA-Nikolaev (), NLV", "US-Nikolai (Nikolai), NIB", "US-Nikolski (), IKO", "CN-Ninbo (Lishe), NGB", "CS-Nis (Nis), INI", "PG-Nissan Island (Nissan Island), IIS", "TO-Angaha (Mataaho), NFO", "TO-Niuatoputapu (Kuini Lavenia), NTT", "NU-Niue Island (Hanan), IUE", "RU-Nizhnevartovsk (Nizhnevartovsk), NJC", "RU-Nizhniy Novgorod (Nizhniy Novgorod), GOJ", "US-Noatak (Noatak), WTK", "RU-Noyabrsk (Noyabrsk), NOJ", "US-Nome (Nome), OME", "US-Nondalton (Nondalton), NNL", "US-Noorvik (Curtis Memorial), ORV", "NF-Norfolk Island (Norfolk Island), NLK", "US-Norfolk (Norfolk), ORF", "RU-Norilsk (Alykel), NSK", "CA-Norman Wells (Norman Wells), YVQ", "AU-Normanton (Normanton), NTN", "SE-Norrkoeping (Kungsangen), NRK", "VU-Norsup (Norsup), NUS", "CA-North Bay (North Bay Municipal), YYB", "US-North Bend (North Bend Municipal), OTH", "US-North Platte (Lee Bird Field), LBF", "CA-North Spirit Lake (North Spirit Lake), YNO", "GB-Northampton (Northampton), ORM", "CA-Norway House (Norway House), YNE", "GB-Norwich (Norwich), NWI", "MG-Nosy (Fascene), NOS", "GB-Nottingham (East Midlands), EMA", "MR-Nouadhibou (Nouadhibou), NDB", "MR-Nouakchott (Nouakchott), NKC", "NC-Noumea (Magenta), GEA", "NC-Noumea (Tontouta), NOU", "RU-Novokuznetsk (Spichenkovo), NOZ", "RU-Novosibirsk (Tolmachevo), OVB", "RU-Novyi Urengoy (Novyi Urengoy), NUX", "IR-Noshahr (Noshahr), NSH", "MX-Nuevo Laredo (Quetzalcoatl), NLD", "US-Nuiqsut (Nuiqsut), NUI", "TO-Tongatapu (Tongatapu), TBU", "UZ-Nukus (Nukus), NCU", "US-Nulato (Nulato), NUL", "US-Nunapitchuk (Nunapitchuk), NUP", "CO-Nuqui (Nuqui), NQU", "DE-Nuremberg (Nuremberg), NUE", "GL-Nuuk (Nuuk), GOH", "SD-Nyala (Nyala), UYL", "MM-Nyuang U (Bagan), NYU", "SE-Nykoping (), XWZ", "US-Oak Harbor (Oak Harbor), ODW", "AU-Oakey (Oakey), OKY", "US-Oakland (All airports), ODM", "US-Oakland (Metro Oakland), OAK", "NZ-Oamaru (Oamaru), OAM", "MX-Oaxaca (Xoxocotlan), OAX", "JP-Obihiro (Obihiro), OBO", "PG-Obo (Obo), OBX", "JP-Odate Noshiro (), ONJ", "US-Ogdensburg (Ogdensburg Municipal), OGS", "CA-Ogoki Post (Ogoki Post), YOG", "MK-Ohrid (Ohrid), OHD", "JP-Oita (Oita), OIT", "JP-Okayama (Okayama), OKJ", "RU-Okhotsk (Okhotsk), OHO", "JP-Okinawa (Naha Field), OKA", "US-Oklahoma City (Will Rogers World), OKC", "IT-Olbia (Olbia Costa Smeralda), OLB", "CA-Old Crow (Old Crow), YOC", "US-Old Harbor (), OLH", "US-Olga Bay (), KOY", "VU-Olpoi (Olpoi), OLJ", "AU-Olympic Dam (Olympic Dam), OLP", "US-Omaha (Eppley Airfield), OMA", "GA-Omboue Hospial (Omboue Hopital), OMB", "RU-Omsk (Omsk), OMS", "NA-Ondangwa (Ondangwa), OND", "US-Ontario (Ontario), ONT", "CA-Opapamiska Lake (), YBS", "RO-Oradea (Oradea), OMR", "AU-Orange (Springhill), OAG", "NA-Oranjemund (Oranjemund), OMD", "SE-Orebro (Orebro Bofors), ORB", "RU-Orenburg (Orenburg), REN", "NO-Orland (Orland), OLA", "SE-Ornskoldsvik (Ornskoldsvik), OER", "RU-Orsk (Orsk), OSW", "NO-Orsta (Hovden), HOV", "KG-Osh (Osh), OSS", "CA-Oshawa (Oshawa), YOO", "JP-Oshima (Oshima), OIM", "HR-Osijek (Osijek), OSI", "SE-Oskarshamn (Oskarshamn), OSK", "CL-Osorno (Canal Balo), ZOS", "SE-Ostersund (Froesoe), OSD", "CZ-Ostrava (Mosnov), OSR", "BF-Ouagadougou (Ouagadougou), OUA", "MA-Ouarzazate (Ourzazate), OZZ", "LA-Muang Xay (Oudomxay), ODY", "MA-Oujda (Angads), OUD", "FI-Oulu (Oulu), OUL", "NC-Ouvea (Ouvea), UVE", "US-Ouzinkie (), KOZ", "IL-Ovda (Ovda), VDA", "US-Owensboro (Daviess County), OWB", "CA-Oxford House (Oxford House), YOH", "GB-Oxford (Kidlington), OXF", "US-Oxnard (Oxnard), OXR", "GA-Oyem (Oyem), OYE", "PH-Ozamis (Ozamis), OZC", "VU-Paama Island (Tavie), PBJ", "GL-Paamiut (Paamiut Heliport), JFR", "ID-Padang (Tabing), PDG", "DE-Paderborn (Paderborn), PAD", "US-Paducah (Barkley Regional), PAH", "PH-Pagadian (Pagadian), PAG", "US-Page (Page), PGA", "AS-Pago Pago (Pago Pago), PPG", "SE-Pajala (), PJA", "MM-Pakhokku (Pakhokku), PKK", "LA-Pakse (Pakse), PKZ", "CA-St (St Augustin), YIF", "ID-Palangkaraya (Tjilik Riwut), PKY", "ID-Palembang (Mahmud Badaruddin Li), PLM", "IT-Palermo (Punta Raisi), PMO", "AU-Palm Island (Palm Island), PMK", "US-Palm Springs (Palm Springs Municipal), PSP", "ES-Palma Mallorca (Palma Mallorca), PMI", "BR-Palmas (Palmas), PMW", "US-Palmdale (Palmdale Rgnl Usaf Plt 42), PMD", "NZ-Palmerston North (Palmerston North), PMR", "ID-Palu (Mutiara), PLW", "ES-Pamplona (Pamplona Noain), PNA", "CN-Panzhihua (Panzhihua), PZI", "US-Panama City (Bay County), PFN", "US-Panama City (Northwest Florida Beaches), ECP", "ID-Pangkal Pinang (Depati Amir), PGK", "MY-Pangkor Island (Pulau Pangkor), PKG", "CA-Pangnirtung (Pangnirtung), YXP", "PK-Panjgur (Panjgur), PJG", "IT-Pantelleria (Pantelleria), PNL", "PF-Papeete (Intl Tahiti Faaa), PPT", "CY-Paphos (Paphos), PFO", "AU-Paraburdoo (Paraburdoo), PBO", "SR-Paramaribo (Zanderij), PBM", "CZ-Pardubice (Pardubice), PED", "BR-Parintins (), PIN", "AU-Parkes (Parkes), PKE", "GR-Paros (Paros Community), PAS", "IR-Parsabad (Parsabade Moghan), PFQ", "US-Pasco (Tri Cities), PSC", "PK-Pasni (Pasni), PSI", "BR-Passo Fundo (Lauro Kurtz), PFB", "CO-Pasto (Cano), PSO", "BR-Patos De Minas (), POJ", "GR-Patras (Araxos), GPA", "FR-Pau (Uzein), PUF", "CA-Paulatuk (Paulatuk), YPC", "KZ-Pavlodar (Pavlodar), PWQ", "CA-Peace River (Municipal Peace River), YPE", "CA-Peawanuck (Peawanuck), YPO", "RU-Pechora (Pechora), PEX", "US-Pedro Bay (Pedro Bay), PDB", "ID-Pekanbaru (Simpang Tiga), PKU", "US-Pelican (), PEC", "US-Pellston (Emmet Cty), PLN", "BR-Pelotas (Pelotas), PET", "MZ-Pemba (Pemba), POL", "MY-Penang (Penang), PEN", "US-Pendleton (Pendleton), PDT", "US-Pensacola (Pensacola Regional Municipal), PNS", "CA-Penticton (Penticton Municipal), YYF", "GB-Penzance (Penzance Heliport), PZE", "US-Peoria (Greater Peoria), PIA", "CO-Pereira (Matecana), PEI", "RU-Perm (Perm), PEE", "FR-Perpignan (Llabanere), PGF", "US-Perryville (), KPV", "IT-Perugia (Sant Egidio), PEG", "IT-Pescara (Liberi), PSR", "PK-Peshawar (Peshawar), PEW", "US-Petersburg (Petersburg Municipal), PSG", "BR-Petrolina (Senador Nilo Coelho), PNZ", "KZ-Petropavlosk (Petropavlosk South), PPK", "RU-Petropavlovsk (Petropavlovsk Kamchatskiy), PKC", "RU-Petrozavodsk (Petrozavodsk), PES", "RU-Pevek (), PWE", "ZA-Phalaborwa (Phalaborwa), PHW", "NP-Phaplu (Phaplu), PPL", "TH-Phitsanulok (Phitsanulok), PHS", "VN-Phu Quoc (Duong Dong), PQC", "TT-Port Of Spain Trinidad (Piarco), POS", "CA-Pickle Lake (Pickle Lake), YPL", "PT-Pico (Pico), PIX", "MX-Piedras Negras (Piedras Negras), PDS", "US-Pierre (Pierre Municipal), PIR", "ZA-Pietermaritzburg (Pietermaritzburg), PZB", "CA-Pikangikum (Pikangikum), YPM", "CA-Pikwitonei (), PIW", "US-Pilot Point (Pilot Point), PIP", "US-Pilot Point (), UGB", "US-Pilot Station (), PQS", "TW-Pingtung (Pingtung South), PIF", "IT-Pisa (Gal Galilei), PSA", "PE-Pisco (Pisco), PIO", "PE-Piura (Capitan Fap Guillermo Concha Iberico), PIU", "US-Port Moller (Platinum), PTU", "US-Plattsburgh (Plattsburgh), PBG", "VN-Pleiku (Pleiku), PXU", "GB-Plymouth (Roborough), PLH", "US-Pocatello (Pocatello Municipal), PIH", "ME-PODGORICA (Golubovci), TGD", "KR-Pohang (Pohang), KPO", "US-Point Baker (), KPB", "US-Point Hope (Point Hope), PHO", "US-Point Lay (Point Lay Lrrs), PIZ", "FR-Poitiers (Biard), PIS", "NP-Pokhara (Pokhara), PKR", "ZA-Polokwane (Pietersburg), PTG", "RU-Yakutia (Poliarny), PYJ", "CA-Pond Inlet (Pond Inlet), YIO", "PT-Ponta Delgada (Nordela), PDL", "ID-Pontianak (Supadio), PNK", "CO-Popayan (Guillermo Leon Valencia), PPN", "CA-Poplar Hill (Poplar Hill), YHP", "PG-Popondetta (Girua), PNP", "SK-Poprad (Tatry), TAT", "FI-Pori (Pori), POR", "VE-Porlamar (Delcaribe Gen S Marino), PMV", "CA-Port Alberni (Port Alberni), YPB", "US-Port Alsworth (Port Alsworth), PTA", "US-Port Angeles (William Fairchild), CLM", "US-Port Bailey (), KPY", "US-Port Clarence (Port Clarence Coast Guard Station), KPC", "ZA-Port Elizabeth (Port Elizabeth), PLZ", "GA-Port Gentil (Port Gentil), POG", "US-Port Graham (Port Graham), PGM", "CA-Port Hardy (Port Hardy Municipal), YZT", "AU-Port Hedland (Port Hedland), PHE", "US-Port Heiden (Port Heiden), PTH", "CA-Port Hope Simpson (Port Hope Simpson), YHA", "AU-Port Lincoln (Port Lincoln), PLO", "US-Port Lions (), ORI", "AU-Port Macquarie (Port Macquarie), PQQ", "US-Port Moller (), PML", "PG-Port Moresby (Jackson Field), POM", "US-Port Protection (Port Protection), PPV", "VU-Port Vila (Bauerfield), VLI", "US-Port Williams (), KPR", "MX-Pachuca (Ingeniero Juan Guillermo Villasana), PCA", "BR-Porto Alegre (Porto Alegre), POA", "PT-Porto Santo (Porto Santo), PXO", "BR-Porto Seguro (Aeroporto de Porto Seguro), BPS", "BR-Porto Velho (Governador Jorge Teixeira De Oliveira), PVH", "PT-Porto (Porto), OPO", "GB-Portsmouth (Portsmouth), PME", "US-Portsmouth (Pease Tradeport), PSM", "AR-Posadas (Posadas), PSS", "CA-Postville (Postville), YSO", "CA-Povungnituk (Povungnituk), YPX", "CA-Powell River (Westview), YPW", "MX-Poza Rica (Tajin), PAZ", "PL-Poznan (Lawica), POZ", "CV-Praia (Francisco Mendes), RAI", "SC-Praslin (Praslin), PRI", "US-Prescott (Prescott Municipal), PRC", "BR-President Prudente (Presidente Prudente), PPB", "US-Presque Isle (Northern Maine Regional), PQI", "GR-Preveza (Aktio), PVK", "CA-Prince George (Prince George Municipal), YXS", "CA-Prince Rupert (Digby Island), YPR", "ST-Principe (Principe), PCP", "CS-Pristina (Pristina), PRN", "AU-Prosserpine (Proserpine Whitsunday Coast), PPP", "US-Providence (T F Green St), PVD", "CO-Providencia (El Embrujo), PVA", "US-Provincetown (Provincetown), PVC", "US-Deadhorse (Deadhorse), SCC", "RU-Pskov (Kresty), PKV", "PE-Pucallpa (Capitan Rolden), PCL", "CL-Pucon (Pucan), ZPC", "MX-Puebla (Huejostingo), PBC", "US-Pueblo (Pueblo), PUB", "CO-Puerto Asis (Tres De Mayo), PUU", "VE-Puerto Ayacucho (Casique Aramare), PYH", "CO-Puerto Carreno (Puerto Carreno), PCR", "MX-Puerto Escondido (Puerto Escondido Municipal), PXM", "CO-Puerto Inirida (Puerto Inirida), PDA", "CO-Puerto Leguizamo (), LQM", "AR-Puerto Madryn (El Tehuelche), PMY", "PE-Puerto Maldonado (Padre Aldamiz), PEM", "CL-Puerto Montt (Tepual), PMC", "VE-Puerto Ordaz (Puerto Ordaz), PZO", "MX-Punta Penasco (Puerto Penasco), PPE", "PH-Puerto Princesa (Puerto Princesa), PPS", "BO-Puerto Suarez (Tte De Av Salvador Ogaya G), PSZ", "MX-Puerto Vallarta (Ordaz), PVR", "HR-Pula (Pula), PUY", "US-Pullman (Pullman Moscow), PUW", "CL-Punta Arenas (Presidente Ibanez), PUQ", "UY-Punta del Este (Capitan Corbeta C A Curbelo), PDP", "MM-Putao (Putao), PBU", "KR-Pyongyang (Pyongyang), FNJ", "GL-Qaanaaq (Qaanaaq), NAQ", "GL-Uummannaq (Qaarsut), JQA", "SA-Hafr Al (Qaisumah), AQI", "GL-Qasigiannguit (Qasigiannguit), JCH", "GL-Qeqertarsuaq Airport (Qeqertarsuaq Heliport), JGO", "CN-Qiemo (Qiemo), IQM", "CA-Broughton Island (Qikiqtarjuaq), YVM", "CN-Qingdao (Liuting), TAO", "CN-Qingyang (Qingyang), IQN", "CN-Qinhuangdao (Shanhaiguan), SHP", "CN-Qiqihar (Qiqihar Sanjiazi), NDG", "CA-Qualicum (Qualicum), XQU", "CN-Quanzhou (Quanzhou), JJN", "CA-Quaqtaq (Quaqtaq), YQC", "CA-Quebec (), XFZ", "CA-Quebec (Quebec), YQB", "NZ-Queenstown (Frankton), ZQN", "MX-Queretaro (Queretaro), QRO", "CA-Quesnel (Quesnel), YQZ", "PK-Quetta (Quetta), UET", "VN-Phucat (Phu Cat), UIH", "CO-Quibdo (Quibdo), UIB", "AU-Quilpie (Quilpie), ULP", "FR-Quimper (Pluguffan), UIP", "US-Quincy (Baldwin Field), UIN", "US-Quinhagak (Kwinhagak), KWN", "EC-Quito (Mariscal), UIO", "MA-Rabat (Sale), RBA", "PG-Rabaul (Lakunai), RAB", "VN-Rach Gia (Rach Gia), VKG", "CA-Rae Lakes (Rae Lakes), YRA", "SA-Rafha (Rafha), RAH", "IR-Rafsanjan (Rafsanjan), RJN", "PK-Rahim Yar Khan (Sheikh Zayed), RYK", "CA-Rainbow Lake (Rainbow Lake), YOP", "SB-Ramata (Ramata), RBV", "US-Rampart (), RMP", "IR-Ramsar (Ramsar), RZR", "CA-Rankin Inlet (Rankin Inlet), YRT", "TH-Ranong (Ranong), UNN", "US-Rapid City (Rapid City Regional), RAP", "CK-Rarotonga (Rarotonga), RAR", "AE-Ras Al Khaimah (Ras Al Khaimah), RKT", "IR-Rasht (Rasht), RAS", "BR-Recife (Recife), REC", "CA-Red Deer Industrial (Red Deer Regional), YQF", "US-Red Devil (Red Devil), RDV", "US-Red Dog (), RDB", "CA-Red Lake (Federal Red Lake), YRL", "CA-Red Sucker Lake (Red Sucker Lake), YRS", "MY-Redang (Redang), RDN", "VU-Redcliffe (Redcliffe), RCL", "US-Redding (Redding Municipal), RDD", "IT-Reggio Calabria (Tito Menniti), REG", "CA-REGINA (Regina Municipal), YQR", "SB-Rennell Island (Rennell/Tingoa), RNL", "FR-Rennes (Saint Jacques), RNS", "US-Reno (Reno Tahoe), RNO", "CA-Repulse Bay (Repulse Bay), YUT", "AR-Resistencia (Resistencia), RES", "CA-Resolute (Resolute), YRB", "ES-Reus (Reus), REU", "IS-Reykjavik (All airports), REK", "IS-Reykjavik (Reykjavik Keflavik), KEF", "IS-Reykjavik (Reykjavik Domestic), RKV", "MX-Reynosa (General Lucio Blanco), REX", "US-Rhinelander (Oneida County), RHI", "GR-Rhodes (Diagoras), RHO", "BR-Ribeirao Preto (Leite Lopes), RAO", "BO-Riberalta (Gen Buech), RIB", "ZA-Richards Bay (Richards Bay), RCB", "AU-Richmond (Richmond), RCM", "US-Richmond (Richmond), RIC", "LV-Riga (Riga), RIX", "CA-Rigolet (Rigolet), YRG", "HR-Rijeka (Rijeka), RJK", "IT-Rimini (Rimini), RMI", "BR-Rio Branco (Presidente Medici), RBR", "AR-Rio Gallegos (Rio Gallegos Internacional), RGL", "AR-Rio Grande (Rio Grande), RGA", "BR-Rio Grande (Rio Grande), RIG", "CO-Riohacha (Riohacha), RCH", "JP-Rishiri Island (Rishiri), RIS", "US-Riverton (Riverton), RIW", "YE-Mukalla (Riyan), RIY", "US-Roanoke (Roanoke Regional), ROA", "CA-Roberval (Roberval), YRJ", "US-Roche Harbor (Roche Harbor), RCE", "US-Rochester (Monroe Cty New York), ROC", "US-Rochester (MN) (Rochester Municipal), RST", "US-Rock Springs (Rock Springs Municipal), RKS", "US-Rockford (Chicago Rockford ), RFD", "AU-Rockhampton (Rockhampton), ROK", "US-Rockland (Rockland), RKD", "FR-Rodez (Marcillac), RDZ", "MU-Rodrigues Is (Rodrigues Island), RRG", "NO-Roervik (Ryumsjoen), RVK", "TH-Roi Et (Roi Et), ROI", "AU-Roma (Roma), RMA", "BR-Rondonopolis (Rondonopolis), ROO", "MH-Rongelap Island (Rongelap Island), RNP", "SE-Ronneby (Kallinge), RNB", "NO-Roros (Roros), RRS", "AR-Rosario (Fisherton), ROS", "US-Rosario (), RSJ", "NO-Rost (Stolport), RET", "DE-Laage (Laage), RLG", "RU-Rostov (Rostov), ROV", "US-Roswell (Industrial Aircenter), ROW", "MP-Rota (Rota), ROP", "NZ-Rotorua (Rotorua), ROT", "NL-Rotterdam (Rotterdam), RTM", "FJ-Rotuma (Rotuma), RTA", "FR-Rouen (Boos), URO", "CA-Round Lake (Round Lake (Weagamow Lake), ZRJ", "CA-Rouyn (Rouyn Noranda), YUY", "FI-Rovaniemi (Rovaniemi), RVN", "PH-Roxas City (Roxas), RXS", "US-Ruby (Ruby), RBY", "NP-Rukumkot (Rukumkot), RUK", "NP-Rumjatar (Rumjatar), RUM", "BO-Rurrenabaque (Rurrenabaque), RBQ", "US-Russian Mission (), RSH", "US-Rutland (Rutland), RUT", "PL-Rzeszow (Jasionka), RZE", "DE-Saarbruecken (Saarbrucken), SCN", "HU-Saarmelleek (), SOB", "CA-Sachigo Lake (Sachigo Lake), ZPB", "CA-Sachs Harbour (Sachs Harbour), YSY", "US-Sacramento (Stockton Metro), SCK", "US-Sacramento (Sacramento), SMF", "JP-Saga (Saga), HSG", "IR-Maragheh (Sahand), ACP", "AU-Saibai Island (Saibai Island), SBR", "PK-Saidu Sharif (Saidu Sharif), SDT", "CA-Saint Catharines (), YCM", "US-Saint Cloud (Saint Cloud Municipal), STC", "RE-St (Gillot), RUN", "US-St George Island (St George Island), STG", "US-Saint George (Saint George Municipal), SGU", "CA-SAINT JOHN (St John Municipal), YSJ", "CA-St Johns (St Johns), YYT", "SN-St. Louis (Saint Louis), XLS", "US-St Marys (St Marys), KSM", "US-St Michael (St Michael), SMK", "US-St. Paul Island (St Paul Island), SNP", "MG-Sainte Marie (Sainte Marie), SMS", "MP-Saipan (Saipan), SPN", "TH-Sakon Nakhon (Sakon Nakhon), SNO", "CV-Amilcar Cabral (Amilcar Cabral), SID", "SE-Sala (), XYX", "OM-Salalah (Salalah), SLL", "ES-Salamanca (Salamanca), SLM", "RU-Salekhard (Salekhard), SLY", "US-Salem (Mcnary Field), SLE", "MX-Salina Cruz (Salina Cruz Naval Air Station), SCX", "US-Salina (Salina Municipal), SLN", "EC-Salinas (General Ulpiano Paez), SNC", "US-Salisbury (Wicomico Regional), SBY", "CA-Salluit (Salluit), YZG", "US-Salmon (), SMN", "US-Salt Lake City (Salt Lake City), SLC", "AR-Salta (Salta), SLA", "MX-Saltillo (Saltillo), SLW", "BR-Salvador (Luis E Magalhaes), SSA", "AT-Salzburg (W A Mozart), SZG", "RU-Samara (Samara), KUF", "UZ-Samarkand (Samarkand), SKD", "MG-Sambava (Sambava), SVB", "KE-Samburu South (Samburu South), UAS", "GR-Samos (Samos), SMI", "Turkey-TR (Samsun), SZF", "CO-San Andres Island (Gustavo Rojas Pinilla), ADZ", "US-San Angelo (Mathis Field), SJT", "US-San Antonio (San Antonio), SAT", "VE-San Antonio (San Antonio Del Tachira), SVZ", "BO-San Borja (Capit?n Av. German Quiroga G.), SRJ", "AR-San Carlos De Bariloch (San Carlos De Bariloche), BRC", "EC-San Cristobal (), SCY", "IT-Tremiti Islands (San Domino Island Heliport), TQR", "VE-San Fernando De Apure (San Fernando De Apure), SFD", "PH-San Fernando (San Fernando), SFE", "MX-San Jose Cabo (Los Cabos), SJD", "CO-San Jose Del Guaviare (Jorge E Gonzalez Torres), SJE", "AR-San Julian (San Juan), UAQ", "PR-San Juan (Luiz Munoz Marin), SJU", "US-San Luis Obispo (), CSL", "US-San Luis Obispo (San Luis Obispo County), SBP", "MX-San Luis Potosi (San Luis Potosi Municipal), SLP", "AR-San Luis (San Luis), LUQ", "AR-San Martin Des Andes (Aviador C Campos), CPC", "AR-San Rafael (San Rafael), AFA", "ES-San Sebas de la Gomera (), GMZ", "ES-San Sebastian (San Sebastian), EAS", "VE-San Tome (San Tome), SOM", "CO-San Vincente De Caguan (Eduardo Falla Solano), SVI", "YE-Sanaa (Sanaa), SAH", "IR-Sanandaj (Sanandaj), SDG", "US-Sand Point (Sand Point), SDP", "MY-Sandakan (Sandakan), SDK", "NO-Sandane (Anda), SDN", "NO-Sandnessjoen (Stokka), SSJ", "CA-Sandspit (Sandspit), YZP", "CA-Sandy Lake (Sandy Lake), ZSJ", "US-Sanford (Orlando Sanford), SFB", "CA-Sanikiluaq (Sanikiluaq), YSK", "BO-Santa Ana (), SBL", "SB-Santa Ana (Santa Ana), NNB", "US-Santa Ana (John Wayne), SNA", "US-Santa Barbara (Santa Barbara), SBA", "ES-Santa Cruz De La Palma (La Palma), SPC", "SB-Santa Cruz Graciosa Bay Luova (Santa Cruz/Graciosa Bay/Luova), SCZ", "BO-Santa Cruz (Santa Cruz), SRZ", "BO-Santa Cruz (Viru Viru), VVI", "AR-Santa Fe (Sauce Viejo), SFN", "US-Santa Fe (Santa Fe Municipal), SAF", "BR-Santa Maria (Santa Maria), RIA", "PT-Santa Maria (island) (Santa Maria), SMA", "US-Santa Maria (Santa Maria Public), SMX", "CO-Santa Marta (Simon Bolivar), SMR", "AR-Santa Rosa (Santa Rosa), RSA", "BR-Santa Rosa (Santa Rosa), SRA", "US-Santa Rosa (Sonoma County), STS", "ES-Santander (Santander), SDR", "BR-Santarem (Santarem), STM", "ES-Santiago (Santiago), SCQ", "AR-Santiago Del Estero (Santiago Del Estero), SDE", "CL-Santiago (Arturo Merino Benitez), SCL", "BR-Santo Angelo (Santo Angelo), GEL", "VE-Santo Domingo (Mayor Buenaventura Vivas), STD", "CN-Sanya (Phoenix), SYX", "CV-Sao Filipe (Sao Filipe), SFL", "PT-Sao Jorge Island (Sao Jorge), SJZ", "BR-Sao Jose Do Rio Preto (Sao Jose Do Rio Preto), SJP", "BR-Sao Jose Dos Campos (Professor Urbano Ernesto Stumpf), SJK", "BR-Sao Luis (Marechal Cunha Machado), SLZ", "CV-Sao Nocolau Island (Preguica), SNE", "ST-Sao Tome (Sao Tome), TMS", "CV-Sao Vicente Island (Sao Pedro), VXE", "JP-Sapporo (All airports), SPK", "JP-Sapporo (Chitose), CTS", "JP-Sapporo (Okadama), OKD", "VU-Pentecost Island (Sara), SSR", "BA-Sarajevo (Butmir), SJJ", "US-Saranac Lake (Adirondack), SLK", "RU-Saratov (Central), RTW", "CO-Saravena (Saravena), RVE", "IR-Dasht (Sari Dasht E Naz), SRY", "CA-Sarnia (Sarnia), YZR", "CA-Saskatoon (Saskatoon Municipal), YXE", "RO-Satu Mare (Satu Mare), SUJ", "CA-Sault Ste Marie (Sault Ste Marie), YAM", "US-Sault Ste. Marie (All airports), SSM", "US-Sault Ste Marie (Chippewa Cnty), CIU", "US-Savannah (Savannah), SAV", "FI-Savonlinna (Savonlinna), SVL", "US-Savoonga (Savoonga), SVA", "FJ-Savusavu (Savusavu), SVU", "US-Scammon Bay (), SCM", "CA-Schefferville (Schefferville), YKL", "US-Scottsbluff (Scottsbluff Municipal), BFF", "US-Scranton Wilkes (Wilkes Barre Scranton), AVP", "US-Seal Bay (Seal Bay), SYB", "LY-Sebha (Sebha), SEB", "CA-Sechelt (Sechelt), YHS", "SB-Sege (Sege), EGM", "FI-Seinajoki , Ilmajoki (Seinajoki), SJY", "YE-Sayun Intl (Sayun), GXF", "US-Selawik (Selawik), WLK", "US-Seldovia (Seldovia), SOV", "ID-Semarang (Achmad Yani), SRG", "KZ-Semiplatinsk (Semipalatinsk), PLX", "JP-Sendai (Sendai), SDJ", "CA-Sept (Sept Iles Municipal), YZV", "LY-Sirt (Gardabya), SRX", "ES-Sevilla (San Pablo), SVQ", "TN-Sfax (Thyna), SFA", "US-Shageluk (Shageluk), SHX", "IR-Shahre-Kord (), CQD", "US-Shaktoolik (Shaktoolik), SKK", "CA-Shamattawa (Shamattawa), ZTM", "IE-Shannon (Shannon), SNN", "CN-Shantou (Wai Sha), SWA", "EG-Sharm El Sheikh (Sharm El Sheikh), SSH", "SA-Sharurah (Sharurah), SHW", "GB-Sheffield (Sheffield), SZD", "US-Sheldon Point (), SXP", "CN-Shenyang (Shenyang Taoxian), SHE", "US-Sheridan (Sheridan Cty), SHR", "GB-Scatsta (Scatsta), SDZ", "GB-Sumburgh (Sumburgh), LSI", "CN-Shijiazhuang (Shijiazhuang Daguocun), SJW", "ET-Shilavo (Shilavo), HIL", "KZ-Chimkent (Shymkent), CIT", "TZ-Shinyanga (Shinyanga), SHY", "JP-Nanki (Nanki Shirahama), SHM", "IR-Shiraz (Shiraz Shahid Dastghaib), SYZ", "US-Shishmaref (Shishmaref), SHH", "JP-Shonai (Shonai), SYO", "US-Show Low (), SOW", "US-Shreveport (Shreveport Regional), SHV", "US-Shungnak (Shungnak), SHG", "PK-Sialkot (Sialkot), SKT", "RO-Sibiu (Sibiu), SBZ", "MY-Sibu (Sibu), SBW", "US-Sidney (Richland Municipal), SDY", "KH-Siem Reap (Siem Reap), REP", "US-Silver City (Grant County), SVC", "CN-Simao (Simao), SYM", "NP-Simara (Simara), SIF", "UA-Simferopol (Simferopol), SIP", "NP-Simikot (Simikot), IMK", "BR-Sinop (), OPS", "US-Sioux City (Sioux Gateway), SUX", "US-Sioux Falls (Regional Joe Foss Field), FSD", "CA-Sioux Lookout (Sioux Lookout), YXL", "IR-Sirri Island (), SXI", "GL-Sisimiut (Sisimiut), JHS", "GR-Sitia (Sitia), JSH", "US-Sitka (Sitka), SIT", "MM-Sittwe (Sittwe), AKY", "TR-Sivas (Sivas), VAS", "US-Skagway (Skagway), SGY", "PK-Skardu (Skardu), KDU", "SE-Skelleftea (Skelleftea), SFT", "GR-Skiathos (Alexandros Papadiamantis), JSI", "NO-Skien (Geiteryggen), SKE", "GR-Skiros (Skiros), SKU", "MK-Skopje (Skopje), SKP", "SE-Skovde (Skovde), KVB", "US-Sleetmute (Sleetmute), SLQ", "SK-Sliac (Sliac), SLD", "IE-Sligo (Sligo), SXL", "CA-Smith Falls (), YSH", "CA-Smithers (Smithers), YYD", "CA-Snare Lake (), YFJ", "MG-Soalala (Soalala), DWB", "YE-Socotra (Socotra), SCT", "SE-Soderhamn (Soderhamn), SOO", "BG-Sofia (Sofia Vrazhdebna), SOF", "NO-Sogndal (Sogndal), SOG", "VU-Sola (Sola), SLH", "ID-Solo City (Adi Sumarmo Wiryokusumo), SOC", "RU-Solovetsky Islands (Solovki), CSH", "DK-Sonderborg (Sonderborg), SGD", "CN-Jiuzhaigou (Jiuzhaigou Huanglong), JZH", "NO-Sorkjosen (Sorkjosen), SOJ", "ID-Sorong (Jefman), SOQ", "US-South Bend (Michiana Regional), SBN", "CA-South Indian Lake (South Lake), XSI", "US-South Naknek (South Naknek), WSN", "VU-Malekula Island (Southwest Bay), SWJ", "GB-Southampton (Southampton), SOU", "GB-Southend (Southend), SEN", "HR-Split (Split), SPU", "US-Spokane (Spokane), GEG", "US-SPRINGFIELD (Springfield Branson Regional), SGF", "US-Springfield (Capital), SPI", "GB-Leuchars (Leuchars), ADX", "CA-St. Anthony (St Anthony), YAY", "AU-St George (St George), SGO", "US-St. Louis (Lambert St Louis), STL", "FR-St. (Montoir), SNR", "PM-St. (St Pierre), FSP", "US-State College (University Park), SCE", "US-Staunton (Shenandoah Valley), SHD", "NO-Stavanger (Sola), SVG", "RU-Stavropol (Shpakovskoye), STW", "CA-St. Theresa Point (St. Theresa Point), YST", "US-Stebbins (Stebbins), WBB", "CA-Stephenville (Stephenville), YJT", "US-Stevens Village (Stevens Village), SVS", "NO-Stokmarknes (Skagen), SKN", "US-Stony River (Stony River), SRV", "NO-Stord (Sorstokken), SRP", "GB-Stornoway (Stornoway), SYY", "SE-Mohed (Storuman), SQO", "FR-Strasbourg (Enzheim), SXB", "SB-Suavanao (Suavanao), VAO", "RO-Suceava (Stefan Cel Mare), SCV", "BO-Sucre (Juana Azurduy De Padilla), SRE", "CA-Sudbury (Sudbury Municipal), YSB", "AU-Sue Islet (Warraber Island), SYU", "PK-Sui (Sui), SUL", "TH-Sukhothai (Sukhothai), THS", "PG-Suki (Suki), SKC", "PK-Sukkur (Sukkur), SKZ", "CA-Summer Beaver (Summer Beaver), SUR", "US-Sumter (Shaw Afb), SSC", "SE-Sundsvall (Sundsvall), SDL", "AU-Sunshine Coast (Maroochydore), MCY", "ID-Surabaya (Juanda), SUB", "TH-Surat Thani (Surat Thani), URT", "RU-Surgut (Surgut), SGC", "PH-Sangley Point (Surigao), SUG", "NP-Surkhet (Surkhet), SKH", "FJ-Suva (Nausori), SUV", "SE-Sveg (Sveg), EVG", "NO-Svolvaer (Helle), SVJ", "GB-Swansea (Swansea), SWS", "RU-Syktyvkar (Syktyvkar), SCW", "BD-Sylhet Osmani (Osmany), ZYL", "US-Syracuse (Hancock), SYR", "GR-Syros Island (Syros Island), JSY", "PL-Szczecin (Goleniow), SZZ", "EG-Taba (Taba), TCP", "IR-Tabriz (Tabriz), TBZ", "PG-Tabubil (Tabubil), TBG", "SA-Tabuk (Tabuk), TUU", "CN-Tacheng (Tocache), TCG", "MM-Tachilek (Tachileik), THL", "PH-Tacloban (Daniel Z Romualdez), TAC", "PE-Tacna (Coronel Carlos Ciriani Santa Rosa), TCQ", "CA-Tadoule Lake (Tadoule Lake), XTL", "PH-Tagbilaran (Tagbilaran), TAG", "TW-Taichung (), RMQ", "SA-Taif (Taif), TIF", "TW-Tainan (Tainan), TNN", "TW-Fengnin (Fengnin), TTT", "CN-Taiyuan (Wusu), TYN", "YE-Taiz (Taiz), TAI", "JP-Takamatsu (Takamatsu), TAK", "US-Takotna (Takotna), TCT", "PE-Talara (Capitan Montes), TYL", "PG-Talasea (), TLW", "US-Tallahassee (Tallahassee Municipal), TLH", "EE-Tallinn (Ulemiste), TLL", "CA-Spence Bay (Taloyoak), YYH", "MG-Toamasina (Toamasina), TMM", "SN-Tambacounda (Tambacounda), TUD", "ID-Waikabubak (Tambolaka), TMC", "RU-Tambow (Tambow), TBW", "CO-Tame (Tame), TME", "VN-Chu Lai (Chu Lai), VCL", "FI-Tampere (Tampere Pirkkala), TMP", "MX-Tampico (General F Javier Mina), TAM", "AU-Tamworth (Tamworth), TMW", "MA-Tan Tan (Plage Blanche), TTA", "US-Tanana (Ralph Calhoun), TAL", "MA-Tangier (Boukhalef), TNG", "ID-Tanjung Pandan (H As Hanandjoeddin), TJQ", "ID-Tanjung (Warukin), TJG", "VU-Tanna (Tanna island), TAH", "MX-Tapachula (Tapachula), TAP", "NP-Taplejung (Taplejung), TPJ", "ID-Taraken (Juwata), TRK", "PE-Tarapoto (Cadete Guillermo Del Castillo Paredes), TPP", "KI-Tarawa (Bonriki), TRW", "AU-Tarcoola (), TAQ", "AU-Taree (Taree), TRO", "PG-Tari (Tari), TIZ", "BO-Tarija (Capitan Oriel Lea Plaza), TJA", "GL-Tasiilaq (), AGM", "CA-Tasiujaq (Tasiujaq), YTQ", "US-Tatalina (Tatalina Lrrs), TLJ", "NZ-Taupo (Taupo), TUO", "NZ-Tauranga (Tauranga), TRG", "FJ-Matei (Matei), TVU", "MY-Tawau (Tawau), TWU", "PH-Tawitawi (), TWT", "GA-Tchibanga (Tchibanga), TCH", "GB-Teesside (Durham Tees Valley), MME", "IR-Tehran (Mehrabad), THR", "US-Teller Mission (Brevig Mission), KTS", "US-Teller (Teller), TLA", "US-Telluride (Telluride Municipal), TEX", "ID-Timika (Moses Kilangin), TIM", "CL-Temuco (Manquehue), ZCO", "US-Tenakee Springs (), TKE", "ES-Tenerife (All airports), TCI", "ES-Tenerife (Tenerife Norte Los Rodeos), TFN", "ES-Tenerife (Reina Sofia), TFS", "MX-Tepic (Tepic), TPQ", "PT-Lajes (terceira Island) (Lajes), TER", "BR-Teresina (Senador Petronio Portella), THE", "UZ-Termez (Termez), TMJ", "ID-Ternate (Sultan Babullah), TTE", "CA-TERRACE (Terrace Municipal), YXT", "MZ-Tete (Tete Chingodzi), TET", "CA-Tete A La Baleine (Tete A La Baleine), ZTB", "US-Teterboro (Teterboro), TEB", "MA-Tetouan (Saniat Rmel), TTU", "US-Texarkana (Texarkana Municipal), TXK", "MM-Thandwe (Thandwe), SNW", "AU-Thargomindah (Thargomindah), XTG", "CA-The Pas (The Pas Municipal), YQD", "GR-Thessaloniki (Makedonia), SKG", "CA-Thicket Portage (), YTD", "US-Thief River Falls (Thief River Falls), TVF", "GR-Thira (Santorini), JTR", "CA-Thompson (Thompson), YTH", "US-Thorne Bay (Thorne Bay), KTB", "IS-Thorshofn (Thorshofn), THO", "CA-THUNDER BAY (Thunder Bay), YQT", "AU-Thursday Island (Thursday Island), TIS", "CN-Tianjin (Binhai), TSN", "NC-Tiga (Tiga), TGJ", "MX-Tijuana (General Abelardo L Rodriguez), TIJ", "RU-Tiksi (Tiksi), IKS", "NZ-Timaru (Timaru), TIU", "RO-Timisoara (Traian Vuia), TSR", "CA-Timmins (Timmins Municipal), YTS", "US-Tin City (), TNC", "MP-West Tinian (Tinian), TIQ", "MY-Tioman (Pulau Tià¤“à¤®à¤¾à¤¨), TOD", "AL-Tirana (Rinas), TIA", "GB-Tiree (Tiree), TRE", "RO-Tirgu Mures (Transilvania Targu Mures), TGM", "ME-Tivat (Tivat), TIV", "LY-Tobruk (Gamal Abdel Nasser), TOB", "US-Togiak Village (Togiak), TOG", "US-Tok (Tok), TKJ", "US-Toksook Bay (Toksook Bay), OOK", "JP-Tokunoshima (Tokunoshima), TKN", "JP-Tokushima (Tokushima), TKS", "US-Toledo (Toledo Express), TOL", "MX-Toluca (Licenciado Adolfo Lopez Mateos), TLC", "ML-Tombouctou (Tombouctou), TOM", "RU-Tomsk (Tomsk Bogashevo), TOF", "CN-Tongliao (Tongliao), TGO", "VU-Tongoa Island (Tongoa Island), TGH", "CN-Tongren (), TEN", "AU-Toowoomba (Toowoomba), TWB", "MX-Torreon (Francisco Sarabia), TRC", "VU-Loh Linua (Torres Airstrip), TOH", "SE-Torsby (Torsby), TYF", "JP-Tottori (Tottori), TTJ", "NC-Touho (Touho), TOU", "FR-Hyeres (Le Palyvestre), TLN", "FR-Toulouse (Blagnac), TLS", "AU-Townsville (Townsville), TSV", "JP-Toyama (Toyama), TOY", "TN-Tozeur (Nefta), TOE", "TR-Trabzon (Trabzon), TZX", "TH-Trang (Trang), TST", "IT-Trapani (Trapani Birgi), TPS", "TH-Trat (Trat), TDX", "US-Traverse City (Cherry Capital), TVC", "AR-Trelew (Almà¤‡à¤°à¤¾à¤¨te Zar), REL", "IT-Trieste (Ronchi Dei Legionari), TRS", "BO-Trinidad (Tte Av Jorge Henrich Arauz), TDD", "LY-Tripoli (Tripoli), TIP", "SE-Trollhattan (Trollhattan Vanersborg), THN", "BR-Trombetas (Trombetas), TMT", "NO-Tromso (Langnes), TOS", "NO-Trondheim (Trondheim Vaernes), TRD", "PE-Trujillo (Capitan Carlos Martinez De Pinillos), TRU", "MG-Tsiroanomandidy (Tsiroanà¤“à¤®à¤¾à¤¨didy), WTS", "JP-Tsushima (Tsushima), TSJ", "US-Tucson (Tucson), TUS", "AR-Tucuman (Teniente Benjamin Matienzo), TUC", "BR-Tucurui (Tucurui), TUR", "PG-Tufi (Tufi), TFI", "PH-Tuguegarao (Tuguegarao), TUG", "CA-Tuktoyaktuk (Tuktoyaktuk), YUB", "EC-Tulcan (Teniente Coronel Luis A Mantilla), TUA", "MG-Toliara (Toliara), TLE", "CA-Tulita (Tulita), ZFN", "US-Tulsa (Tulsa), TUL", "US-Tuluksak (Tuluksak), TLT", "CO-Tumaco (La Florida), TCO", "PE-Tumbes (Pedro Canga), TBP", "TN-Tunis (Carthage), TUN", "US-Tuntutuliak (Tuntutuliak), WTL", "US-Tununak (Tununak), TNK", "CN-Huangshan (Tunxi), TXN", "US-Tupelo (C D Lemons Municipal), TUP", "SA-Turaif (Turaif), TUI", "PK-Turbat (Turbat), TUK", "IT-Turin (Torino Caselle), TRN", "FI-Turku (Turku), TKU", "MX-Tuxtla Gutierrez (Angel Albino Corzo), TGZ", "VN-Tuy Hoa (Dong Tac), TBB", "US-Twin Falls (Twin Falls City County), TWF", "US-Twin Hills (Twin Hills), TWA", "US-Tyler (Pounds Field), TYR", "RU-Tyumen (Roschino), TJM", "JP-Yamaguchi (Yamaguchi Ube), UBJ", "BR-Uberaba (Uberaba), UBA", "BR-Uberlandia (Ten Cel Av Cesar Bombonato), UDI", "TH-Ubon Ratchathani (Ubon Ratchathani), UBP", "TH-Udon Thani (Udon Thani), UTH", "RU-Ufa (Ufa), UFA", "US-Uganik (Uganik), UGI", "IN-Ujjain (), UJA", "ID-Ujung Pandang (Hasanudin), UPG", "RU-Ukhta (Ukhta), UCT", "MN-Ulaanbaatar (Buyant Uhaa), ULN", "RU-Ulan (Mukhino), UUD", "CN-Ulanhot (Ulanhot), HLH", "VU-Ambryn Island (Ulai), ULB", "KR-Ulsan (Ulsan), USN", "RU-Ulyanovsk (Ulyanovsk East), ULY", "SE-Umea (Umea), UME", "CA-Umiujaq (Umiujaq), YUD", "ZA-Umtata (Umtata), UTT", "US-Unalakleet (Unalakleet), UNK", "ZA-Upington (Upington), UTN", "RU-Uraj (Uraj), URJ", "KZ-Uralsk (Uralsk), URA", "UZ-Urgench (Urgench), UGC", "IR-Urmieh (Urmieh), OMH", "MX-Uruapan (Licenciado Y Gen Ignacio Lopez Rayon), UPN", "BR-Uruguaiana (Rubem Berta), URG", "CN-Urumqi (Diwopu), URC", "TR-Usak (Usak), USQ", "AR-Ushuaia (Ushuaia Malvinas à¤†à¤°à¥à¤œà¥‡à¤‚à¤Ÿà¥€à¤¨à¤¾s), USH", "RU-Usinsk (Usinsk), USK", "KZ-Ust Kamenogorsk (Ust Kamenogorsk), UKK", "TH-Pattaya (U Taphao), UTP", "GL-Uummannaq (Uummannaq), UMD", "UA-Uzhgorod (Uzhhorod), UDJ", "FI-Vaasa (Vaasa), VAA", "NO-Vadso (Vadso), VDS", "NO-Vaeroy (), VRY", "US-Vail Eagle (Eagle County), EGE", "CA-Val DOr (Val d Or Municipal), YVO", "US-Valdez (Valdez Municipal), VDZ", "CL-Valdivia (Pichoy), ZAL", "US-Valdosta (Valdosta Regional), VLD", "ES-Valencia (Valencia), VLC", "VE-Valencia (Valenica), VLN", "VE-Valera (Dr Antonio Nicolas Briceno), VLV", "VU-Valesdir (Valesdir), VLS", "ES-Valladolid (Valladolid), VLL", "CO-Valledupar (Alfonso Lopez Pumarejo), VUP", "US-Valparaiso (Ft Walton Beach), VPS", "ES-Hierro (Hierro), VDE", "TR-Van (Van), VAN", "PG-Vanimo (Vanimo), VAI", "FJ-Vanua Balavu (Vanua Balavu), VBV", "NO-Vardoe (Vardoe), VAW", "BG-Varna (Varna), VAR", "TO-Vavau (Vavau), VAV", "SE-Vaxjo (Vaxjo), VXO", "US-Venetie (Venetie), VEE", "MX-Veracruz (Las Bajadas General Heriberto Jara), VER", "US-Vernal (Vernal), VEL", "IT-Verona (Verona), VRN", "IS-Vestmannaeyjar (Vestmannaeyjar), VEY", "ZW-Victoria Falls (Victoria Falls), VFA", "CA-Victoria (Victoria Inner Harbour), YWH", "CA-VICTORIA (Victoria), YYJ", "US-Victoria (Victoria Regional), VCT", "AR-Viedma (Gobernador Castello), VDM", "LA-Vientiane (Wattay), VTE", "ES-Vigo (Vigo), VGO", "MZ-Vilankulu (Vilankulo), VNX", "SE-Vilhelmina (Vilhelmina), VHM", "BR-Vilhena (Vilhena), BVH", "CO-Villagarzon (Villagarzon), VGZ", "MX-Villahermosa (C P A Carlos Rovirosa), VSA", "CO-Villavicencio (Vanguardia), VVC", "LT-Vilnius (Vilnius), VNO", "VN-Vinh (Vinh), VII", "PH-Virac (Virac), VRC", "US-Visalia (Visalia), VIS", "SE-Visby (Visby), VBY", "BR-Vitoria Da Cnquis (Vitoria Da Cnquis), VDC", "BR-Vitoria (Eurico Sales), VIX", "ES-Vitoria (Vitoria), VIT", "RU-Beslan (Beslan), OGZ", "RU-VLADIVOSTOK (Vladivostok), VVO", "RU-Volgograd (Gumrak), VOG", "GR-Nea Anghialos (Nea Anchialos), VOL", "IS-Vopnafjordur (Vopnafjordur), VPN", "RU-Vorkuta (Vorkuta), VKT", "RU-Voronezh (Chertovitskoye), VOZ", "CA-Wabush (Wabush), YWK", "US-Waco (Madison Cooper), ACT", "SA-Wadi Ad Dawasir (), WAE", "SD-Wadi Halfa (), WHF", "AU-Wagga (Forrest Hill), WGA", "ID-Waingapu (Mau Hau), WGP", "US-Wainwright (Wainwright), AIN", "JP-Wajima (Noto), NTQ", "JP-Wakkanai (Wakkanai), WKJ", "VU-Walaha (Walaha), WLH", "US-Wales (), WAA", "US-Walla Walla (Walla Walla City County), ALW", "WF-Wallis (Wallis), WLS", "NA-Walvis Bay (Walvis Bay), WVB", "NZ-Wanaka (Wanaka), WKA", "NZ-Wanganui (Wanganui), WAG", "CN-Wanxian (Wanxian), WXN", "PG-Wapenamanda (Wapenamanda), WBM", "CA-Waskaganish (Waskaganish), YKQ", "US-Waterfall (), KWF", "IE-Waterford (Waterford), WAT", "US-Waterloo (Livingston Betsworth Fld), ALO", "US-Watertown (Watertown), ART", "US-WATERTOWN (Watertown Municipal), ATY", "US-Wausau (Central Wisconsin), CWA", "CA-Webequie (Webequie), YWP", "SA-Wejh (Wejh), EJH", "CN-Weifang (Weifang), WEF", "CN-Weihai (Weihai), WEH", "AU-Weipa (Weipa), WEI", "CA-Wemindji (Wemindji), YNC", "US-Wenatchee (Pangborn Memorial), EAT", "CN-Wenzhou (Wenzhou Yongqiang), WNZ", "US-West Palm Beach (Palm Beach), PBI", "US-West Point (), KWP", "US-West Yellowstone (Yellowstone), WYS", "US-Westchester County (Westchester County), HPN", "DE-Westerland (Westerland Sylt), GWT", "IE-Leixlip (Weston), WST", "NZ-Westport (Westport), WSZ", "US-Westsound (Westsound), WSX", "PG-Wewak (Wewak), WWK", "CA-Lac La Martre (Lac La Martre), YLE", "NZ-Whakatane (Whakatane), WHK", "CA-Whale Cove (Whale Cove), YXN", "US-Whale Pass (Whale Pass), WWP", "NZ-Whangarei (Whangarei), WRE", "US-White Mountain (White Mountain), WMO", "CA-Whitehorse (Whitehorse), YXY", "AU-Whyalla (Whyalla), WYA", "US-Wichita Falls (Wichita Falls Municipal), SPS", "US-Wichita (Mid Continent), ICT", "DE-Wiesbaden (), UWE", "CA-Williams Harbour (Williams Harbour), YWM", "CA-Williams Lake (Williams Lake Municipal), YWL", "US-Williamsport (Williamsport Lycoming Municipal), IPT", "US-Williston (Sloulin Field), ISN", "US-WILMINGTON (New Hanover Cty), ILM", "AU-Wiluna (Wiluna), WUN", "NA-Windhoek (Eros), ERS", "NA-Windhoek (Hosea Kutako), WDH", "AU-Windorah (Windorah), WNR", "US-Windsor Locks (Bradley), BDL", "CA-Windsor (Windsor), YQG", "AU-Winton (Winton), WIN", "PG-Wipim (Wipim), WPM", "MH-Majuro Atoll (Woja), WJA", "US-Wolf Point (Wolf Point Intl), OLF", "AU-Wollongong (Wollongong), WOL", "KR-Wonju (Wonju), WJU", "US-Worland (Worland Municipal), WRL", "US-Wrangell (Wrangell), WRG", "PL-Wroclaw (Strachowice), WRO", "CN-Wu Hai (), WUA", "CN-Wuhan (Tianhe), WUH", "CA-Wunnumin Lake (Wunnumin Lake), WNN", "CN-Wuxi (Wuxi), WUX", "CN-Wuyishan (Nanping Wuyishan), WUS", "CN-Wuzhou (Changzhoudao), WUZ", "CN-Xiamen (Xiamen), XMN", "CN-Xi An (Xiguan) (Xiguan), SIA", "CN-Xian (Xianyang), XIY", "CN-Xiangfan (Xiangfan), XFN", "CN-Xichang (Qingshan), XIC", "LA-Phon Savan (Xieng Khouang), XKH", "CN-Xilinhot (Xilinhot), XIL", "CN-Xingyi (), ACX", "CN-Xining (Xining Caojiabu), XNN", "CN-Xuzhou (Xuzhou Guanyin), XUZ", "US-Yakima (Yakima Terminal), YKM", "US-Yakutat (Yakutat), YAK", "RU-Yakutsk (Yakutsk), YKS", "AU-Yam Island (Yam Island), XMY", "JP-Yamagata (Yamagata), GAJ", "CN-Yanan (Yanan), ENY", "SA-Yenbo (Yenbo), YNB", "CN-Yancheng (Yancheng), YNZ", "SB-Yandina (Yandina), XYA", "MM-Yangon (Mingaladon), RGN", "KR-Sokcho Gangneung (Yangyang), YNY", "CN-Yanji (Yanji), YNJ", "CN-Yantai (Laishan), YNT", "IR-Yasouj (), YES", "IR-Yazd (Yazd Shahid Sadooghi), AZD", "CA-Yellowknife (Yellowknife), YZF", "KR-Yeosu (Yeosu), RSU", "AM-Yerevan (Yerevan), EVN", "CN-Yibin (Yibin), YBP", "CN-Yichang (Yichang), YIH", "CN-Yinchuan (Yinchuan), INC", "CN-Yining (Yining), YIN", "CN-Yiwu (Yiwu), YIW", "ID-Yogyakarta (Adi Sutjipto), JOG", "JP-Miho (Miho), YGJ", "JP-Yonaguni Jima (Yonaguni), OGN", "CA-York Landing (York Landing), ZAC", "AU-Yorke Island (Yorke Island), OKR", "US-Youngstown (Youngstown Municipal), YNG", "CN-Yulin (Yulin), UYN", "US-Yuma (Yuma), YUM", "RU-Yuzhno (Khomutovo), UUS", "IR-Zabol (), ACZ", "MX-Zacatecas (Zacatecas), ZCL", "US-Zachar Bay (), KZB", "HR-Zadar (Zadar), ZAD", "HR-Zagreb (Zagreb), ZAG", "IR-Zahedan (Zahedan), ZAH", "GR-Zakinthos Is (Zakinthos), ZTH", "PH-Zamboanga (Zamboanga), ZAM", "IR-Zanjan (), JWN", "TZ-Zanzibar (Kisauni), ZNZ", "UA-Zaporozhye (Zaporozhye), OZH", "ES-Zaragoza (Zaragoza Ab), ZAZ", "KZ-Dzhambul (Taraz), DMB", "CN-Zhanjiang (Zhanjiang), ZHA", "CN-Zhaotong (Zhaotong), ZAT", "CN-Zhengzhou (Xinzheng), CGO", "KZ-Zhezkazgan (Zhezkazgan), DZN", "CN-Zhoushan (Zhoushan), HSN", "CN-Zhuhai (Zhuhai), ZUH", "PL-Zielona Gora (Babimost), IEG", "SN-Ziguinchor (Ziguinchor), ZIG", "SK-Zilina (Zilina), ILZ", "MR-Zouerate (Zouerate), OUZ", "AE-Dubai (Dubai World Central - Al Maktoum International Airport), DWC", "LK-Sri Lanka (Mattala Rajapaksa International Airport), HRI"];
$(document).ready(function () {
	$(".autoselectinput").focus(function () {
		$(this).select().val('');
	});
});

function myautocomplete(type) {
	if (type == 'int') {
		$("[name='from_location']").autocomplete({
			minLength: 0,
			autoFocus: true,
			maxResults: 15,
			source: function (request, response) {
				var results = $.ui.autocomplete.filter(intDomAirports, request.term);
				response(results.slice(0, this.options.maxResults))
			},
			open: function () {
				$(".ui-autocomplete").addClass('autocomplet_effect');
			},
			select: function (event, ui) {
				$("[name='from_location']").val(ui.item.label);
				if (event.keyCode == 9) {} else {
					$("[name='to_location']").focus();
				}
				return false;
			},
			create: function () {
				$(this).data('ui-autocomplete')._renderItem = function (ul, item) {
					var str = item.label;
					var data = str.split("-");
					var country_code = data[0];
					var data1 = data[1].split("(");
					var city = data1[0];
					if (data1[1]) {
						var data2 = data1[1].split("),");
						var airportname = data2[0];
						var airportcode = data2[1];
					}
					return $("<li>").data("ui-autocomplete-item", item).append("<a>" + "<div class='dest_left'>" + "<i class='fa fa-plane'></i>" + "<samp class='city'>" + city + "</samp>" + "<samp class='airpotcode'>(" + airportcode + ")</samp>" + "<samp class='airportname'>" + airportname + "</samp>" + "</div><div class='flag'><samp>" + country_code + "</samp><i class='country_flag " + country_code.toLowerCase() + "'></i></div>" + "</a>").appendTo(ul);
				};
			}
		}).focus(function () {
			$(this).autocomplete('search', $(this).val())
		});
		$("[name='to_location']").autocomplete({
			minLength: 0,
			autoFocus: true,
			maxResults: 15,
			source: function (request, response) {
				var results = $.ui.autocomplete.filter(intDomAirports, request.term);
				response(results.slice(0, this.options.maxResults))
			},
			open: function () {
				$(".ui-autocomplete").addClass('autocomplet_effect');
			},
			select: function (event, ui) {
				$("[name='to_location']").val(ui.item.label);
				if (event.keyCode == 9) {} else {
					$("[name='depart_date']").focus();
				}
				return false;
			},
			create: function () {
				$(this).data('ui-autocomplete')._renderItem = function (ul, item) {
					var str = item.label;
					var data = str.split("-");
					var country_code = data[0];
					var data1 = data[1].split("(");
					var city = data1[0];
					if (data1[1]) {
						var data2 = data1[1].split("),");
						var airportname = data2[0];
						var airportcode = data2[1];
					}
					return $("<li>").data("ui-autocomplete-item", item).append("<a>" + "<div class='dest_left'>" + "<i class='fa fa-plane'></i>" + "<samp class='city'>" + city + "</samp>" + "<samp class='airpotcode'>(" + airportcode + ")</samp>" + "<samp class='airportname'>" + airportname + "</samp>" + "</div><div class='flag'><samp>" + country_code + "</samp><i class='country_flag " + country_code.toLowerCase() + "'></i></div>" + "</a>").appendTo(ul);
				};
			}
		}).focus(function () {
			$(this).autocomplete('search', $(this).val())
		});
	} else {}
}
$(".multisegorigin").autocomplete({
	minLength: 1,
	maxResults: 15,
	source: function (request, response) {
		var results = $.ui.autocomplete.filter(intDomAirports, request.term);
		response(results.slice(0, this.options.maxResults))
	},
	open: function () {
		$(".ui-autocomplete").addClass('autocomplet_effect');
	},
	select: function (event, ui) {
		var key = $(this).attr("data-key");
		var inputs = $(this).closest('#search_form_flight').find(':input');
		if (key == 1) {} else {
			inputs.eq(inputs.index(this) + 1).focus();
		}
	},
	create: function () {
		$(this).data('ui-autocomplete')._renderItem = function (ul, item) {
			var str = item.label;
			var data = str.split("-");
			var country_code = data[0];
			var data1 = data[1].split("(");
			var city = data1[0];
			if (data1[1]) {
				var data2 = data1[1].split("),");
				var airportname = data2[0];
				var airportcode = data2[1];
			}
			return $("<li>").data("ui-autocomplete-item", item).append("<a>" + "<div class='dest_left'>" + "<i class='fa fa-plane'></i>" + "<samp class='city'>" + city + "</samp>" + "<samp class='airpotcode'>(" + airportcode + ")</samp>" + "<samp class='airportname'>" + airportname + "</samp>" + "</div><div class='flag'><samp>" + country_code + "</samp><i class='country_flag " + country_code.toLowerCase() + "'></i></div>" + "</a>").appendTo(ul);
		};
	}
});
$(".multisegdest").autocomplete({
	minLength: 1,
	maxResults: 15,
	source: function (request, response) {
		var results = $.ui.autocomplete.filter(intDomAirports, request.term);
		response(results.slice(0, this.options.maxResults))
	},
	open: function () {
		$(".ui-autocomplete").addClass('autocomplet_effect');
	},
	select: function (event, ui) {
		var key = $(this).attr("data-key");
		var inputs = $(this).closest('#search_form_flight').find(':input');
		if (key == 1) {
			$(".secondfill").val(ui.item.value);
			inputs.eq(inputs.index(this) + 1).focus();
		} else if (key == 4) {} else {
			inputs.eq(inputs.index(this) + 2).val(ui.item.value);
			inputs.eq(inputs.index(this) + 1).focus();
		}
	},
	create: function () {
		$(this).data('ui-autocomplete')._renderItem = function (ul, item) {
			var str = item.label;
			var data = str.split("-");
			var country_code = data[0];
			var data1 = data[1].split("(");
			var city = data1[0];
			if (data1[1]) {
				var data2 = data1[1].split("),");
				var airportname = data2[0];
				var airportcode = data2[1];
			}
			return $("<li>").data("ui-autocomplete-item", item).append("<a>" + "<div class='dest_left'>" + "<i class='fa fa-plane'></i>" + "<samp class='city'>" + city + "</samp>" + "<samp class='airpotcode'>(" + airportcode + ")</samp>" + "<samp class='airportname'>" + airportname + "</samp>" + "</div><div class='flag'><samp>" + country_code + "</samp><i class='country_flag " + country_code.toLowerCase() + "'></i></div>" + "</a>").appendTo(ul);
		};
	}
});
$(".switchinputvalue").click(function () {
	var from_val = $("[name='from_location']").val();
	var to_val = $("[name='to_location']").val();
	if (from_val !== "" && to_val !== "") {
		$("[name='from_location']").val(to_val);
		$("[name='to_location']").val(from_val);
	} else {}
});
$(function () {
	var geturl = $("#siteurl").val();

	function split(val) {
		return val.split(/,\s*/);
	}

	function extractLast(term) {
		return split(term).pop();
	}
	$("[name='pref_airline']").on("keydown", function (event) {
		if (event.keyCode === $.ui.keyCode.TAB && $(this).autocomplete("instance").menu.active) {
			event.preventDefault();
		}
	}).autocomplete({
		source: function (request, response) {
			$.getJSON(geturl + "flight/fetch_all_airline", {
				term: extractLast(request.term)
			}, response);
		},
		search: function () {
			var term = extractLast(this.value);
			if (term.length < 2) {
				return false;
			}
		},
		focus: function () {
			return false;
		},
		select: function (event, ui) {
			var terms = split(this.value);
			terms.pop();
			if (ui.item.label == "No Result Found") {
				val = this.value.split(",")
				val.pop();
				val = val + ",";
				$("[name='pref_airline']").val(val);
			} else {
				terms.push(ui.item.id);
				terms.push("");
				this.value = terms.join(",");
			}
			return false;
		}
	});
});

function activateTab(selector) {
	$(selector).on('click.twbstab', function () {
		$(this).tab('show');
	}).closest('.disabled').removeClass('disabled');
}
$(document).ready(function () {
	$("#myTab > li").click(function () {
		if ($(this).hasClass("disabled"))
			return false;
	});
});
activateTab('#myTab a:first');
$(function () {
	$('.btn-demo').on('click', function () {
		if (!$("#terms").is(":checked")) {
			return false;
		} else if ($(this).data('activate') == '#flight_payment') {
			$(this).submit();
			if ($("#travelersdetails .error").length == 0) {
				var selector = '#myTab a[href="' + $(this).data('activate') + '"]';
				$('.nav-tabs a[href="' + $(this).data('activate') + '"]').tab('show')
				activateTab(selector);
			} else {
				alert('Please Fill Required Fields !!');
				return false;
			}
		} else if ($(this).data('activate') == '#flight_travel') {
			if ($(this).data('login') == 'False') {
				$('#user_login_model').modal('show');
			} else {
				var selector = '#myTab a[href="' + $(this).data('activate') + '"]';
				$('.nav-tabs a[href="' + $(this).data('activate') + '"]').tab('show')
				activateTab(selector);
			}
		} else {
			var selector = '#myTab a[href="' + $(this).data('activate') + '"]';
			$('.nav-tabs a[href="' + $(this).data('activate') + '"]').tab('show')
			activateTab(selector);
		}
	});
});
$(function () {
	var geturl = $("#siteurl").val();
	$(".passport_exp").datepicker({
		showOn: 'both',
		buttonImage: geturl + 'assets/images/icon/blank.png',
		buttonText: '',
		buttonImageOnly: true,
		dateFormat: "dd-mm-yy",
		minDate: "0D",
		maxDate: "+10Y",
		changeMonth: true,
		changeYear: true,
		showOtherMonths: true,
		dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
		beforeShow: function (input, inst) {
			var themeClass = $(input).parent().attr("class").replace("datepicker-wrap", "");
			$('#ui-datepicker-div').attr("class", "");
			$('#ui-datepicker-div').addClass("ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all");
			$('#ui-datepicker-div').addClass(themeClass);
		}
	});
	$(".infant_date").datepicker({
		showOn: 'both',
		buttonImage: geturl + 'assets/images/icon/blank.png',
		buttonText: '',
		buttonImageOnly: true,
		dateFormat: "dd-mm-yy",
		minDate: "-23M",
		maxDate: "+0D",
		changeMonth: true,
		changeYear: true,
		showOtherMonths: true,
		dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
		beforeShow: function (input, inst) {
			var themeClass = $(input).parent().attr("class").replace("datepicker-wrap", "");
			$('#ui-datepicker-div').attr("class", "");
			$('#ui-datepicker-div').addClass("ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all");
			$('#ui-datepicker-div').addClass(themeClass);
		}
	});
	$(".child_date").datepicker({
		showOn: 'both',
		buttonImage: geturl + 'assets/images/icon/blank.png',
		buttonText: '',
		buttonImageOnly: true,
		dateFormat: "dd-mm-yy",
		minDate: "-143M",
		changeMonth: true,
		changeYear: true,
		maxDate: "-2Y",
		showOtherMonths: true,
		dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
		beforeShow: function (input, inst) {
			var themeClass = $(input).parent().attr("class").replace("datepicker-wrap", "");
			$('#ui-datepicker-div').attr("class", "");
			$('#ui-datepicker-div').addClass("ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all");
			$('#ui-datepicker-div').addClass(themeClass);
		}
	});
	$(".adult_date").datepicker({
		showOn: 'both',
		buttonImage: geturl + 'assets/images/icon/blank.png',
		buttonText: '',
		buttonImageOnly: true,
		dateFormat: "dd-mm-yy",
		changeMonth: true,
		changeYear: true,
		maxDate: "-12Y",
		yearRange: "-100:-12",
		showOtherMonths: true,
		dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
		beforeShow: function (input, inst) {
			var themeClass = $(input).parent().attr("class").replace("datepicker-wrap", "");
			$('#ui-datepicker-div').attr("class", "");
			$('#ui-datepicker-div').addClass("ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all");
			$('#ui-datepicker-div').addClass(themeClass);
		}
	});
	$('.flightfarerule').click(function () {
		var index = $(this).attr("index");
		var traceid = $(this).attr("traceid");
		$(".MjDataForFareRule").html("<div style='text-align: center;font-size: 17px;color: #171f29;' >Please Wait While We Search Your Selected FareRule</div>");
		$.ajax({
			type: "POST",
			url: geturl + 'flight/getfarerule',
			datatype: "text",
			data: {
				index: index,
				traceid: traceid
			},
			cache: false,
			success: function (data) {
				$('.MjDataForFareRule').html(data);
			}
		});
	});
	$('.flightfarebreakup').click(function () {
		var index = $(this).attr("index");
		var triptype = $(this).attr("triptype");
		var AirlineCode = $(this).attr("AirlineCode");
		$(".MjDataForFareBreakup").html("<div style='text-align: center;font-size: 17px;color: #171f29;' >Please Wait While We Search Your Selected FareRule</div>");
		$.ajax({
			type: "POST",
			url: geturl + 'flight/getfarebreakup',
			datatype: "text",
			data: {
				index: index,
				triptype: triptype,
				AirlineCode: AirlineCode
			},
			cache: false,
			success: function (data) {
				$('.MjDataForFareBreakup').html(data);
			}
		});
	});
	$('.specialcase-btn').click(function (event) {
		event.preventDefault();
		if ($(this).hasClass("silver")) {
			var href = $(this).attr("href");
			$('#LoadingModal').modal('show');
			$.get('' + href + '', function (data, status) {
				if (data == 'True') {
					href = href.replace("searchforspecial", "result");
					window.location = href;
				} else {
					alert(data);
				}
			});
		} else {}
	});
	$('.Farequote').click(function () {
		$("#fareconfLoad").show();
		var key_indexOB = $(this).attr("resultindex");
		$(".MjDataForFlightConfirmation").html("<div style='text-align: center;font-size: 17px;color: #171f29;' > </div>");
		$.ajax({
			type: "POST",
			url: geturl + 'flight/farequote',
			datatype: "text",
			data: {
				key_indexOB: key_indexOB
			},
			cache: false,
			success: function (data) {
				data = $.trim(data);
				if (data == "false") {
					location.href = geturl + 'flight/booking_detail';
				} else {
					$('.MjDataForFlightConfirmation').html(data);
				}
				$("#fareconfLoad").hide();
			}
		});
	});
	$('.FarequoteRoundtrip').click(function () {
		$("#fareconfLoad").show();
		var airlineob = $(this).attr("airlineob");
		var airlineib = $(this).attr("airlineib");
		if (($(this).hasClass("checkspecialcaselcc"))) {
			if (airlineob != airlineib) {
				alert('Please Select Same Airline For Secial Lcc Fare ');
				return false;
			} else {}
		} else {}
		var resultindexob = $(this).attr("resultindexob");
		var resultindexib = $(this).attr("resultindexib");
		$(".MjDataForFlightConfirmation").html("<div style='text-align: center;font-size: 17px;color: #171f29;' > </div>");
		$.ajax({
			type: "POST",
			url: geturl + 'flight/farequote',
			datatype: "text",
			data: {
				resultindexob: resultindexob,
				resultindexib: resultindexib
			},
			cache: false,
			success: function (data) {
				data = $.trim(data);
				if (data == "false") {
					location.href = geturl + 'flight/booking_detail';
				} else {
					$('.MjDataForFlightConfirmation').html(data);
				}
				$("#fareconfLoad").hide();
			}
		});
	});
	$('[atr-submit-button]').click(function () {
		$(this).submit();
		$('[atr-submit-button]').attr('disabled', 'disabled');
		$('.addmoremoneywallet').hide();
		if ($("#travelersdetails .error").length == 0) {
			var paymentmethod = $(this).val();
			if (paymentmethod == 'byonline') {
				$('.paymt_method').val(paymentmethod);
				$("#travelersdetails").submit();
			} else if (paymentmethod == 'bywallet') {
				$('.paymt_method').val(paymentmethod);
				$.get(geturl + 'flight/checkwalletbalance', function (data, status) {
					var dataa = $.trim(data);
					if (dataa == "vaild") {
						$("#travelersdetails").submit();
					} else {
						alert(data);
						$('.addmoremoneywallet').show();
						$('[atr-submit-button]').removeAttr('disabled');
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
	$(".addextramoney").click(function () {
		$(this).attr('disabled', 'disabled');
		var amount = $('#addextramoneytowallet').val();
		$('#putaddextramoney').val(amount);
		$.ajax({
			url: $('#siteurl').val() + 'flight/addextramoneyvalues',
			type: "POST",
			dataType: "text",
			data: $("#travelersdetails").serialize(),
			success: function (getdata) {
				var getdataa = $.trim(getdata);
				if (getdataa == 'Success') {
					$("#addextramoneyform").submit();
				} else {
					alert('There Is Some Error Please Contact Admin !');
				}
			}
		});
	});
	$('input[name=paymentmethod]').change(function () {
		var selectedval = $(this).val();
		if (selectedval == 'bycod') {
			$('.addmoremoneywallet').hide();
			$('.codremark').show();
		} else {
			$('.addmoremoneywallet').hide();
			$('.codremark').hide();
		}
	});
});

function resultshort(shortval) {
	if (shortval == 'airlinename') {
		$("[attr-resultshort]").removeClass("active");
		$('.sort-by-name').addClass("active");
	} else if (shortval == 'price') {
		$("[attr-resultshort]").removeClass("active");
		$('.sort-by-price').addClass("active");
	} else if (shortval == 'duration') {
		$("[attr-resultshort]").removeClass("active");
		$('.sort-by-rating').addClass("active");
	} else {
		$("[attr-resultshort]").removeClass("active");
		$('.sort-by-name').addClass("active");
	}
}

function onword(val, onwordprice, arrayindex, airlinename, thisval, onwordepoints) {
	if (($('.forspecialcaselcc').hasClass("dark-blue1"))) {
		$('.FarequoteRoundtrip').addClass("checkspecialcaselcc");
	} else {
		$('.FarequoteRoundtrip').addClass("checknormalcase");
	}
	$('.onwardflightcontainer').css({
		"background-color": "white",
		"color": "#333"
	}).find(".sct-view-rt2 p span,.sct-view-rt2 .fa").css("color", "#333");
	$(thisval).css({
		"background-color": "#fffcc7",
		"color": "black"
	}).find(".sct-view-rt2 p span,.sct-view-rt2 .fa").css("color", "black");
	document.getElementById("onword_push").innerHTML = val;
	totalprice_round(onwordprice, "OB");
	totalepointsround(onwordepoints, "OB");
	var att = document.createAttribute("ResultIndexOB");
	att.value = arrayindex;
	var airlineatt = document.createAttribute("AirlineOB");
	airlineatt.value = airlinename;
	document.getElementById("submitBooking").setAttributeNode(airlineatt);
	document.getElementById("submitBooking").setAttributeNode(att);
}

function returnn(val, returnprice, arrayindex, airlinename, thisval, returnepoints) {
	$('.returnflightcontainer').css({
		"background-color": "white",
		"color": "#333"
	}).find(".sct-view-rt2 p span,.sct-view-rt2 .fa").css("color", "#333");
	$(thisval).css({
		"background-color": "#fffcc7",
		"color": "black"
	}).find(".sct-view-rt2 p span,.sct-view-rt2 .fa").css("color", "black");
	document.getElementById("return_push").innerHTML = val;
	totalprice_round(returnprice, "IB");
	totalepointsround(returnepoints, "IB");
	var att = document.createAttribute("ResultIndexIB");
	att.value = arrayindex;
	var airlineatt = document.createAttribute("AirlineIB");
	airlineatt.value = airlinename;
	document.getElementById("submitBooking").setAttributeNode(airlineatt);
	document.getElementById("submitBooking").setAttributeNode(att);
	document.getElementById("submitBooking").style.display = 'block';
	document.getElementById("submitPrice").style.display = 'block';
}
var priceob = 0;
var priceib = 0;
var epointob = 0;
var epointib = 0;

function totalepointsround(points, type) {
	if (type == "OB") {
		epointob = 0;
		epointob = points;
	}
	if (type == "IB") {
		epointib = 0;
		epointib = points;
	}
	tepoints = epointob + epointib;
	document.getElementById("putepoints").innerHTML = tepoints;
}

function totalprice_round(price, type) {
	if (type == "OB") {
		priceob = 0;
		priceob = price;
	}
	if (type == "IB") {
		priceib = 0;
		priceib = price;
	}
	tprice = priceob + priceib;
	document.getElementById("putprice").innerHTML = tprice;
}
$(function () {
	$('#onword_select').click();
	$('#return_select').click();
});

function serachfarecalender(href) {
	$('#LoadingModal').modal('show');
	$.get('' + href + '', function (data, status) {
		if (data == 'True') {
			href = href.replace("searchforspecial", "result");
			window.location = href;
		} else {
			alert(data);
		}
	});
}
$('.full').click(function () {
	if ($('#full_id').is(':checked')) {
		$('.remark_ob').css('display', 'block');
		$('.cnth').css('display', 'none');
		$('.cntd').css('display', 'none');
	} else {
		$('.remark_ob').css('display', 'none');
		$('.cnth').css('display', 'block');
		$('.cntd').css('display', 'block');
	}
});
$('.full_ib').click(function () {
	if ($('#full_id_ib').is(':checked')) {
		$('.remark_ib').css('display', 'block');
		$('.cnth_ib').css('display', 'none');
		$('.cntd_ib').css('display', 'none');
	} else {
		$('.remark_ib').css('display', 'none');
		$('.cnth_ib').css('display', 'block');
		$('.cntd_ib').css('display', 'block');
	}
});
$('.checkrefund').click(function () {
	var valsite = $('#siteurl').val();
	if (confirm("Do You Want to Proceed for Refund Check")) {
		var refund_chnge_id = $(this).attr('cncl_id');
		$(".mjmodal").modal('show');
		$.ajax({
			method: "POST",
			url: valsite + 'flight/check_refund',
			data: {
				refund_id: refund_chnge_id
			},
			success: function (data) {
				$('.mhide').hide();
				$(".cancelation_status").html(data);
			}
		});
	} else {
		$(this).prop('checked', false);
	}
});

function mclosee() {
	$('.checkrefund').prop('checked', false);
}
$('input[name=redeemdiscount]').click(function () {
	var epointamount = $(this).val();
	var amount = $('.epointvalidateamount').text();
	var numberofepoints = $('.numberofepoints').text();
	var amountreedemed = epointamount / numberofepoints;
	var roundamtreedmd = amountreedemed.toFixed();
	if ($(this).is(':checked')) {
		$('.epointvalidateshow').text(amount - roundamtreedmd);
	} else {
		$('.epointvalidateshow').text(amount)
	}
});

function checksame() {
	var from_location = $('.from_location').val();
	var to_location = $('.to_location').val();
	if (from_location == to_location) {
		$('.checksame').prop('disabled', true);
	} else {
		$('.checksame').prop('disabled', false);
	}
}
$(function () {
	var clearfix = "<div class='clearfix'></div>"
	$(clearfix).insertBefore(".fpassenger .intdaterow")
});
$(document).ready(function () {
	$(".FlightToggleBtn").click(function () {
		$(this).parents('.DomesticRT').find(".FlightToggle").slideToggle();
	});
});