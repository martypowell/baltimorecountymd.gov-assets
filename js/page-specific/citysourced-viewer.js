namespacer("baltimoreCounty.pageSpecific");

baltimoreCounty.pageSpecific.citySourcedViewer = (function($, querystringer, maps, undefined) {
	'use strict';

	var getNearbyData = function(settings, callback) {
			$.ajax('//testservices.baltimorecountymd.gov/api/citysourced/getreportsbylatlng', {
				method: 'POST',
				data: settings
			})
				.done(function(data) {
					if (callback)
						callback(data);
				})
				.fail(function(error) {

				});
		},

		/**
		 * Descending date sort.
		 */
		commentDateComparer = function(a, b) {
			var aMoment = moment(a.Created),
				bMoment = moment(b.Created);

			if (aMoment.isAfter(bMoment)) 
				return -1;
			else 
				return 1;
		},

		/**
		 * Hides all but the top `numberToShow` comments in the `$target` list.
		 */
		hideMostComments = function($target, commentData, numberToShow) {
			if (commentData && commentData.length > numberToShow) {
				$target.find('li').not(function(index, element) {
					return index <= numberToShow - 1;
				}).hide();
				$target.after('<p><a href="javascript:;" id="show-comments" aria-role="button">Load ' + (commentData.length-numberToShow) +' more comments</a></p>');
				$('#show-comments').on('click', function() {
					$target.find('li').slideDown(500);
					$(this).hide();
				});	
			}
		},

		init = function() {

			var qs = querystringer.getAsDictionary(),
				reportId = qs.reportId;

			if (reportId) {
				$.ajax("//testservices.baltimorecountymd.gov/api/citysourced/getreport/" + reportId)
					.done(function (data, textStatus, jqXHR) {
						var endDate = new Date();
						endDate.setDate(-90);

						var nearbyDataSettings = {
							Latitude: data.Latitude,
							Longitude: data.Longitude,
							StartDate: endDate.toLocaleDateString('en-US')
						};

						baltimoreCounty.pageSpecific.citySourcedData = data;

						if (data) {
							data.IsOpen = data.IsOpen ? 'open' : 'closed';
							if (data.Status === "On Hold")
								data.IsOpen = 'on-hold';

							if (data.Comments && data.Comments.length > 0) {
								data.Comments.sort(commentDateComparer);
							}
						}

						var sourceHtml = $('#citysourced-viewer-template').html(),
							template = Handlebars.compile(sourceHtml),
							html = template(data),
							$element = $('#citysourced-viewer');

						getNearbyData(nearbyDataSettings, function(nearbyData) {
							$element.hide();
							$element.html(html);
							hideMostComments($('#comments'), data.Comments, 3);															
							$element.slideDown(300, function() {
								baltimoreCounty.pageSpecific.nearbyData = nearbyData;
								$('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8&libraries=places&callback=baltimoreCounty.pageSpecific.viewerGoogleMaps.initGoogle" async defer></script>');
							});
						});
					})
					.fail(function (jqXHR, textStatus, errorThrown) {
						$('#reportId').text(reportId);
						$('.bc-citysourced-reporter').hide();
						$('.bc-citysourced-viewer-alert').slideDown(300);
					});
			} else {
				$('.bc-citysourced-reporter').hide();
				$('.bc-citysourced-viewer-alert').slideDown(300);
			}
		};

	return {
		init: init
	};

})(jQuery, baltimoreCounty.utility.querystringer, baltimoreCounty.pageSpecific.viewerGoogleMaps);

$(function() { baltimoreCounty.pageSpecific.citySourcedViewer.init() });