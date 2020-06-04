void (() => {

    function _createScript(url, id) {
        let script = document.createElement("script");
        script.setAttribute('src', url);
        script.setAttribute('id', id);
        document.head.appendChild(script);
    }

    function _formatUrl(url, params) {
        let fix = '';

        if (url.lastIndexOf("?") !== -1) {
            if (url[url.length - 1] !== "?") {
                fix = '&';
            }
        } else {
            fix = '?';
        }
        let qs = ``;
        Object.keys(params).forEach((item, index) => {
            qs += `${item}=${params[item]}&`;
        });
        qs = qs.substring(0, qs.length - 1);
        return `${url}${fix}${qs}`;
    }

    class Request {

        constructor() {

        }
    
        jsonp({
            url,
            params,
        }) {
        return new Promise((resolve, reject) => {

            url = _formatUrl(url, params);
            let randomId = `jsonp${+new Date()}${Math.floor(Math.random() * 999)}`;
            _createScript(url, randomId);
            let script = document.querySelector(`#${randomId}`);
            script.parentNode.removeChild(script);
            window[params.cb] = (res) => {
                resolve(res);
            };
        });
    }
}

    window.Request = Request;
}) ();