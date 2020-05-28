let vm = new Vue({
    el: '#app',
    methods: {
        selectOnly_AN() {
            utils.selectOnly.call(this, 'isAN_All', 'alternative', 'temp_AN');
        },
        selectAll_AN() {
            utils.selectAll.call(this, 'alternative', 'isAN_All', 'prev_AN');
        },
        filter_AN() {
            utils.filter.call(this, 'search_AN', 'temp_AN', 'prev_AN');
        },
        shuttle_AN() {
            utils.shuttle.call(this, {
                temp_target: 'temp_S',
                temp_origin: 'temp_AN',
                selected_origin: 'alternative',
                selected_target: 'selected',
                isAll: 'isAN_All',
                prev_origin: 'prev_AN',
                prev_target: 'prev_S',
                search: 'search_AN',
            });
        },
        selectOnly_S() { // ...
            utils.selectOnly.call(this, 'isS_All', 'selected', 'temp_S');
        },
        selectAll_S() {
            utils.selectAll.call(this, 'selected', 'isS_All', 'prev_S');
        },
        filter_S() {
            utils.filter.call(this, 'search_S', 'temp_S', 'prev_S');
        },
        shuttle_S() {
            utils.shuttle.call(this, {
                temp_target: 'temp_AN',
                temp_origin: 'temp_S',
                selected_origin: 'selected',
                selected_target: 'alternative',
                isAll: 'isS_All',
                prev_origin: 'prev_S',
                prev_target: 'prev_AN',
                search: 'search_S',
            });
        },
    },
    data: {
        temp_AN: OPATIONS,
        temp_S: [],
        prev_AN: [...OPATIONS],
        prev_S: [],
        alternative: [], // 备选数据集合
        selected: [], // 已选数据集合
        search_AN: '',
        search_S: '',
        isAN_All: false, // 备选 - 全选按钮 
        isS_All: false, // 已选 - 全选按钮
    }
});