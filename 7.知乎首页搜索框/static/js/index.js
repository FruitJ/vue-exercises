// 公共状态管理
let store = new Vuex.Store({
    state: {
        isShow: false, // board 【搜索结果面板是否展示】
        historyResult: JSON.parse(localStorage.getItem("historyResult")) || [],
        isboardShow: true,
        searchResult: [],
        value: '',
    },
    mutations: {
        changeIsShow(state, bol) {
            state.isShow = bol;
        },
        searchKeyWord(state, option) {
            let vir = 0;
            if (state.historyResult.length !== 0) {
                vir = state.historyResult[state.historyResult.length - 1].id;
            }

            state.historyResult.push({
                id: vir + 1,
                content: option,
            });
            localStorage.setItem('historyResult', JSON.stringify(state.historyResult));
        },
        removeItem(state, id) {
            if (id) {
                state.historyResult = JSON.parse(localStorage.getItem('historyResult')).filter((item, index) => item.id !== id);
            } else {
                state.historyResult = [];
            }
            localStorage.setItem('historyResult', JSON.stringify(state.historyResult));
        },
        changeIsBoardShow(state, option) {
            state.isboardShow = option;
        },
        changeSearchResult(state, option) {
            state.searchResult = option;
        },
        changeValue(state, option) {
            state.value = option;
        },
    },
    actions: {
        searchWord(store, option) {
            store.commit('changeSearchResult',option);
        },
    },
    getters: {
        value(state) {
            return state.value;
        },
        searchResult(state) {
            return state.searchResult;
        },
        historyResult(state) {
            return state.historyResult;
        },
        isHistoryAreaShow(state) {
            return state.historyResult.length ? 'block' : 'none';
        },
        isShow(state) {
            return state.isShow ? 'block' : 'none';
        },
        isboardShow(state) {
            return state.isboardShow ? 'block' : 'none';
        },
    },
});

// 搜索面板【搜索组件】
const BoardSearchComponent = {
    template: "#boardsearchTemplate",
    computed: {
        ...Vuex.mapGetters(['searchResult']),        
    },
    methods: {
        toPage(id) {
            let res = this.searchResult.filter((item, index) => item.id === id);
            console.log(res);
            this.searchKeyWord(res[0].content);
            this.changeIsShow(false);
            this.changeIsBoardShow(true);
            this.changeValue("");
        },
        ...Vuex.mapMutations(['searchKeyWord', 'changeIsShow', 'changeIsBoardShow', 'changeValue']),
    },
};

// 搜索面板【历史组件】
const BoardHistoryComponent = {
    template: "#boardHistoryTemplate",
    computed: {
        ...Vuex.mapGetters(['historyResult', 'isHistoryAreaShow']),
    },
    methods: {
        remove(id) {
            this.removeItem(id);
        },
        removeAll() {
            this.removeItem();
        },
        ...Vuex.mapMutations(['removeItem']),
    },
};

// 搜索面板【热搜组件】
const BoardHotComponent = {
    template: "#boardHotTemplate",
    props: ['hotlist'],
    methods: {
        toPage(id) {
            let res = this.hotlist.filter((item, index) => item.id === id);
            console.log(res);
            this.searchKeyWord(res[0].content);
            this.changeIsShow(false);
        },
        ...Vuex.mapMutations(['searchKeyWord', 'changeIsShow']),
    },
};

// 搜索结果面板组件
const BoardComponent = {
    template: "#boardTemplate",
    components: {
        BoardHotComponent,
        BoardHistoryComponent,
        BoardSearchComponent,
    },
    props: ['hotlist'],
    computed: {
        ...Vuex.mapGetters(['isShow', 'isboardShow']),
    },
};

// 搜索框组件
const SearchComponent = {
    template: "#searchTemplate",
    methods: {
        submit(ev) {
            this.$emit('submit', ev);
        },
        focus() {
            this.changeIsShow(true);
        },
        search() {

            this.value ? this.searchKeyWord(this.value) : null;
            this.changeValue('');
            this.changeIsShow(false);
            this.changeIsBoardShow(true);
        },
        async input(ev) {
            this.changeValue(ev.target.value);
            if (this.value !== " " && this.value !== "") {
                
                // 发送 jsonp 跨域请求来请求数据
                let request = new Request;
                let data = await request.jsonp({
                    url: "https://www.baidu.com/sugrec",
                    params: {
                        wd: this.value,
                        cb: "cb",
                        prod: "pc",
                        _: +new Date(),
                    },
                });
                data = data.g.map((item, index) => ({
                    id: item.sa,
                    content: item.q,
                }));
                this.searchWord(data);
                this.changeIsBoardShow(false);
            } else {
                this.changeIsBoardShow(true);
            }
            
        },
        ...Vuex.mapMutations(['changeIsShow', 'searchKeyWord', 'changeIsBoardShow', 'changeValue']),
        ...Vuex.mapActions(['searchWord']),
    },
    computed: {
        ...Vuex.mapGetters(['value']),
    },
    data() {
        return {
            val: '',
        }
    },
};

// 定义 zhihu 搜索框组件
const ZhihuSearchComponent = {
    template: "#zhihuSearchTemplate",
    components: {
        SearchComponent,
        BoardComponent,
    },
    props: ['hotlist'],
    methods: {
        submit(ev) {
            // 阻止 form 表单的默认行为
            this.$emit('submit', ev);
        }
    },
};

// 根组件
let vm = new Vue({
    el: '#app',
    store,
    components: {
        ZhihuSearchComponent,
    },
    async created() { // 获取热搜数据

        let data = await fetch("../static/data/hotSearch.json").then((res) => res.json());
        this.hotList = [...data];
    },
    methods: {
        submit(ev) {
            ev.preventDefault();
        },
        fn(ev) {
            let className = ev.target.className;
            if (className.includes("row") || className.includes("global")) {
                this.changeIsShow(false);
            }
        },
        ...Vuex.mapMutations(['changeIsShow']),
    },
    data: {
        hotList: [],
    }
});