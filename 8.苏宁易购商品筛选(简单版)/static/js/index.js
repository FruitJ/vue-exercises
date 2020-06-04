let store = new Vuex.Store({
    state: {
        list: [],
        list_copy: [],
        order: false,
        logoStatus: 'background-position: -50px -381px;', 
    },
    mutations: {
        initList(state, option) {
            state.list = option;
            state.list_copy = [...option];
        },
        optionUpdate(state, option) {

            state.list = state.list_copy.filter((item) => item[option.alias] === option.item);
        },
        sortUpdate(state, option) {
            state.list = state.list.sort((a, b) => b[option] - a[option]);
        }, 
        changeOrder(state, option) {
            state.order = option;
            if(state.order) {
                state.list = state.list.sort((a, b) => a.price - b.price);
                state.logoStatus = ` -29px -381px`;
            }else {
                state.list = state.list.sort((a, b) => b.price - a.price);
                state.logoStatus = `-50px -381px`;
            } 
        },
    },
    getters: {
        logoStatus(state, option) {
            return state.logoStatus;
        },
        list(state, option) {
            return state.list;
        },
    },
});


/* 苏宁商城筛选组件【选项】 */
const SuningFilterOptionComponent = {
    template: "#suningFilterOptionTemplate",
    props: ['options'],
    methods: {
        optionUpdates(item, alias) {
            this.optionUpdate({
                item,
                alias,
            });
        },
        ...Vuex.mapMutations(['optionUpdate']),
    },
   
};

/* 苏宁商城筛选组件【排序】 */
const SuningFilterSortComponent = {
    template: "#suningFilterSortTemplate",
    methods: {
        sort(type) {
            this.sortUpdate(type);
        },
        sortPrice() {
            this.changeOrder(!this.$store.state.order);
        },
        ...Vuex.mapMutations(['sortUpdate', 'changeOrder']),
    },
    computed: {
        ...Vuex.mapGetters(['logoStatus']),
    },
};

/* 苏宁商城筛选组件 */
const SuningFilterComponent = {
    template: "#suningFilterTemplate",
    components: {
        SuningFilterSortComponent,
        SuningFilterOptionComponent,
    },
    props: ['options'],
};

/* 苏宁商城筛选内容展示组件 */
const SuningBoardComponent = {
    template: "#suningBoardTemplate",
    computed: {
        ...Vuex.mapGetters(['list']),
    },
};

/* 苏宁商城模块组件 */
const SuningShopComponent = {
    template: "#suningShopTemplate",
    components: {
        SuningBoardComponent,
        SuningFilterComponent,
    },
    props: ['options'],
};

let vm = new Vue({
    el: '#app',
    components: {
        SuningShopComponent,
    },
    store,
    async created() {
        // 请求数据
        let data = await fetch("../static/data/data.json").then((res) => res.json());
        // 初始数据做降序处理
        this.list = [...data.list].sort((a, b) => b.price - a.price);
        this.options = [...data.option];
        this.$store.commit('initList', this.list);
    },
    data: {
        list: [],
        options: [],
    }
});