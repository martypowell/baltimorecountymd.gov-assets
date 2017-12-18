namespacer('baltimoreCounty.pageSpecific');

baltimoreCounty.pageSpecific.swiftypeSearchResults = (function swiftypeSearchResults($,
	querystringer, Handlebars, constants) {
	var $searchResultsTarget;
	var templateSelector = '#swiftype-search-results-template';
	var errorMessageHtml = '<p>There were no results found for this search.</p>';

	function cleanSearchTerm(termToClean) {
		var cleanedSearchTerm = termToClean.trim();
		var safeSearchTerms = [];
		// Ensure the last character is not '+' as the the trailing space causes no results
		if (cleanedSearchTerm[cleanedSearchTerm.length - 1] === '+') {
			cleanedSearchTerm = cleanedSearchTerm.slice(0, -1);
		}

		var searchTerms = cleanedSearchTerm.split('+');
		for (var i = 0, len = searchTerms.length; i < len; i += 1) {
			var term = decodeURIComponent(searchTerms[i]);
			term = term.replace(/[?#\\/]/g, ' ')
				.replace(/&/g, 'and').trim();

			var encodedTerm = encodeURIComponent(term);
			safeSearchTerms.push(encodedTerm);
		}
		return safeSearchTerms.join('%20');
	}

	function getSearchResults(searchTerm, pageNumber) {
		var currentPageNumber = pageNumber || 1;
		var cleanedSearchTerm = cleanSearchTerm(searchTerm);
		var requestUrl = constants.keywordSearch.urls.api + cleanedSearchTerm + '/' + currentPageNumber;

		$.ajax(requestUrl)
			.then(searchResultRequestSuccessHandler,
				searchResultRequestErrorHandler);
	}

	function postClickThroughData(searchTerm, id, destinationUrl) {
		var cleanedSearchTerm = cleanSearchTerm(searchTerm);
		var requestUrl = constants.keywordSearch.urls.trackClickThrough + cleanedSearchTerm + '/' + id;

		$.ajax(requestUrl)
			.then(function() { postClickThroughSuccess(destinationUrl) },
				searchResultRequestErrorHandler);
	}

	function postClickThroughSuccess(destinationUrl) {
		window.location = destinationUrl;
	}

	function searchResultRequestErrorHandler(err) {
		console.error(err); // eslint-disable-line no-console
	}

	function buildResultSettings(result) {
		var highlight = result.highlight.body || result.highlight.sections || result.highlight.title;
		var title = result.title;
		var url = result.url;

		return {
			highlight: highlight,
			title: title,
			url: url
		};
	}

	function buildSearchResults(hits) {
		var results = [];

		for (var i = 0, hitCount = hits.length; i < hitCount; i += 1) {
			results.push(buildResultSettings(hits[i]));
		}

		return results;
	}

	function buildPageLinks(lastPage, currentPage) {
		var pageLinks = [];

		for (var i = 1; i <= lastPage; i += 1) {
			pageLinks.push({
				page: i,
				current: i === currentPage
			});
		}

		return pageLinks;
	}

	function calculateLastResultNumber(info) {
		return info.current_page * info.per_page < info.total_result_count ?
			info.current_page * info.per_page :
			info.total_result_count;
	}

	function calculateFirstResultNumber(info) {
		return ((info.current_page - 1) * info.per_page) + 1;
	}

	function buildSearchResultsHtml(templateSettings) {
		var source = $(templateSelector).html();
		var template = Handlebars.compile(source);
		var searchResultsHtml = template(templateSettings);

		return searchResultsHtml;
	}

	function searchResultRequestSuccessHandler(response) {
		var info = response.info.page;
		var hits = response.records.page;
		var query = info.query;
		var maxPages = 10;
		var tooManyResults = info.num_pages > maxPages;
		var lastPage = tooManyResults ? maxPages : info.num_pages;
		var lastResultNumber = calculateLastResultNumber(info);
		var firstResultNumber = calculateFirstResultNumber(info);
		var spellingSuggestion = info.spelling_suggestion ? info.spelling_suggestion.text : undefined;
		var searchResults = buildSearchResults(hits);
		var pageLinks = buildPageLinks(lastPage, info.current_page);

		info.base_url = window.location.pathname + '?q=' + info.query + '&page=';

		info.index = {
			first: firstResultNumber,
			last: lastResultNumber
		};

		var templateSettings = {
			searchResult: searchResults,
			info: info,
			pageLinks: pageLinks,
			tooManyResults: tooManyResults,
			spellingSuggestion: spellingSuggestion,
			query: query
		};

		var searchResultsHtml = buildSearchResultsHtml(templateSettings);

		$searchResultsTarget.html(searchResultsHtml);
		$searchResultsTarget.find('.loading').hide();
		$searchResultsTarget.find('.search-results-display').show();
	}

	function init() {
		var queryStringDictionary = querystringer.getAsDictionary();

		$searchResultsTarget = $('.search-results');

		if (queryStringDictionary.q) {
			getSearchResults(queryStringDictionary.q, queryStringDictionary.page);
		} else {
			$searchResultsTarget.html(errorMessageHtml);
		}
	}

	function trackClickThrough(clickEvent) {
		var $target = $(clickEvent.currentTarget);
		var searchTerm = window.location.search.replace('?q=', '');
		var id = $target.attr('data-id');
		var destinationUrl = $target.attr('href');

		postClickThroughData(searchTerm, id, destinationUrl);
	}


	return {
		/* test-code */
		calculateLastResultNumber: calculateLastResultNumber,
		calculateFirstResultNumber: calculateFirstResultNumber,
		buildPageLinks: buildPageLinks,
		/* end-test-code */
		init: init,
		trackClickThrough: trackClickThrough
	};
}(jQuery, baltimoreCounty.utility.querystringer, Handlebars, baltimoreCounty.constants));

$(function initialize() {
	$(document).on('click', '.search-results-display a', baltimoreCounty.pageSpecific.swiftypeSearchResults.trackClickThrough);

	baltimoreCounty.pageSpecific.swiftypeSearchResults.init();
});
