module.exports = function(url, queryParams) {
    var queryString = '';

    if (queryParams) {
        queryString = '?' + Object.keys(queryParams)
            .map(k => {
                return encodeURIComponent(k)
                    + '=' + encodeURIComponent(queryParams[k])
            }).join('&');
    }

    return fetch(url + queryString).then(resp => resp.json());
};