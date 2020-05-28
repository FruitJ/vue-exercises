let vm = new Vue({
    el: '#app',
    methods: {
        _insert() {
            this.list.push(this.val);
            this.val = '';
        },
        _delete(delIndex) {
            this.list = this.list.filter((_, index) => index !== delIndex);
        },
    },
    data: {
        val: '',
        list: [],
    }
});