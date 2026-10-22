// gopdf_docs moved to ononreader.com when gopdf became onon. Send each old
// page to its new home, keeping any #anchor; reference headings kept their ids.
(function () {
	var path = location.pathname.replace(/^\/gopdf_docs/, '').replace(/index\.html$/, '');
	var parts = path.split('/').filter(Boolean);
	var to = '/';
	var page = parts[0] || '';
	if (page === 'guide') to = '/docs/configuration/';
	else if (page === 'reference' || page === 'versions') to = '/docs/reference/';
	else if (page === 'git') to = '/docs/reference/main/';
	else if (/^\d+\.\d+\.\d+$/.test(page)) to = '/docs/reference/' + page + '/';
	location.replace('https://ononreader.com' + to + location.hash);
})();
