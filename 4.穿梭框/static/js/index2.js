let vm = new Vue({
    el: '#app',
    methods: {
        checkOnlyWill() {
            utilsModule._checkOnly('willAll', 'willSelect', 'willSource');
        },
        checkAllWill() {
            utilsModule._checkAll('willSelect', 'willAll', 'willSource');
        },
        searchInputWill() {
            utilsModule._searchInput('searchWill', 'willSource', 'prevWillSource');
        },
        searchClickWill() {
            utilsModule._searchClick('prevWillSource', 'willSource');
        },
        through2ed() {
            utilsModule._through2({
                willSource: 'willSource',
                select: 'willSelect',
                prevSource: 'prevWillSource',
                edSource: 'edSource',
                all: 'willAll',
                search: 'searchWill',
            });
        },
        checkOnlyEd() {
            utilsModule._checkOnly('edAll', 'edSelect', 'edSource');
        },
        checkAllEd() {
            utilsModule._checkAll('edSelect', 'edAll', 'edSource');
        },
        searchInputEd() {
            utilsModule._searchInput('searchEd', 'edSource', 'prevEdSource');
        },
        searchClickEd() {
            utilsModule._searchClick('prevEdSource', 'edSource');
        },
        through2will() {
            utilsModule._through2({
                willSource: 'edSource',
                select: 'edSelect',
                prevSource: 'prevEdSource',
                edSource: 'willSource',
                all: 'edAll',
                search: 'searchEd',
            });
        },
        bindThis() {
            utilsModule._bindThis(this);
        },
    },
    data: {
        willSource: utilsModule._OPTIONS,
        edSource: [],
        prevWillSource: [],
        prevEdSource: [],
        willSelect: [],
        edSelect: [],
        willAll: false,
        edAll: false,
        searchWill: '',
        searchEd: '',
    },
});