let utilsModule = (() => {

    let _this = null,
        _OPTIONS = ['金毛狮王【谢逊】', '白眉鹰王【殷天正】', '青翼蝠王【韦一笑】', '紫衫龙王【黛绮丝】', '张无忌', '赵敏'];
    
    let _bindThis = function _bindThis($this) {
        _this = $this;
    };

    let _checkOnly = function _checkOnly() {
        let [all, select, source] = arguments;
        _this[all] = _this[select].length === _this[source].length ? true : false;
    };
    let _checkAll = function _checkAll() {
        let [select, all, source] = arguments;
        _this[select] = _this[all] ? _this[source] : [];
    };
    let _searchInput = function _searchInput() {
        let [search, source, prevSource] = arguments;
        if (_this[search] !== '') {
            _this[source] = _this[source].filter((item, index) => item.includes(_this[search]));
        } else {
            _this[source] = [..._this[prevSource]];
        }
    };

    let _searchClick = function searchClick() {
        let [prevSource, source] = arguments;
        _this[prevSource] = [..._this[source]];
    };

    let _through2 = function through2() {
        let { willSource, select, prevSource, edSource, all, search } = arguments[0];
        _this[willSource] = _this[willSource].filter((item, index) => !_this[select].includes(item));

        _this[prevSource] = _this[prevSource].filter((item, index) => !_this[select].includes(item));

        _this[edSource].push(..._this[select]);
        _this[select] = [];
        if (_this[willSource].length === 0) {
            _this[all] = false;
        }
        if (_this[search]) {
            _this[willSource] = [..._this[prevSource]];
            _this[search] = '';
        }
    };

    return {
        _OPTIONS,
        _checkOnly,
        _checkAll,
        _searchInput,
        _searchClick,
        _through2,
        _bindThis,
    };
})();