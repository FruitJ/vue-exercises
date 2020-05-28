let FRUITS = ["苹果", "香蕉", "梨子"],
    FRUITS_LEN = FRUITS.length;
let vm = new Vue({
    el: '#app',
    methods: {
        selectAll() {
            this.fruits = this.isAll ? FRUITS : [];
        },
        selectOnly() {
            this.isAll = this.fruits.length === FRUITS_LEN;
        }
    },
    data: {
        isAll: false,
        fruits: [],
        temp: FRUITS,
    }
});