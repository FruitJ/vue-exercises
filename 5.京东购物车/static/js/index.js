let vm = new Vue({
    el: '#app',
    created() {
        this.initData();
    },
    filters: {
        toFixed(val) {
            return `￥${val.toFixed(2)}`;
        },
    },
    computed: {
        shopsAllNum() {
            let sum = 0;
            this.list.forEach(item => {
                item.shops.forEach((item, index) => {
                    sum += item.num;
                })
            });
            return sum;
        },
        selectedNum() {
            let realShopsList = [];
            this.list.forEach(item => {
                realShopsList.push(...item.shops.filter((item, index) => {
                    return item.isSelected;
                }));
            });
            return realShopsList.reduce((prev, next) => prev + next.num, 0);
        },
        totalPrice() {
            let sum = 0;
            for(let i = 0; i < this.list.length; i++) {
                let data = this.list[i].shops;
                for(let j = 0; j < data.length; j++) {
                    if(data[j].isSelected) {
                        sum += data[j].price * data[j].num;
                    }
                }
            }
            return sum;
        },
    },
    methods: {
        initData() {
            fetch("../static/data/data.json").then((res) => res.json()).then((data) => {
                this.list = data;
                this.list.forEach((item, index) => {
                    this.selectArr.push(item.isChecked);
                });
                this.isSelectAll = this.selectArr.every((item) => item);
            }).catch((err) => {
                console.log(err);
            });
        },
        selectedOnly(_index) {
            let dataSource = this.list[_index];
            let flag = dataSource.shops.every((item, index) => item.isSelected);
            this.selectArr[_index] = flag;
            let tag = this.selectArr.every((item, index) => item);
            this.isSelectAll = tag;
        },
        selectedAll(_index) {
            let flag = this.selectArr[_index];
            this.list[_index].shops = this.list[_index].shops.map((item, index) => {
                item.isSelected = flag;
                return item;
            });
            this.isSelectAll = this.selectArr.every((item) => item);
        },
        checkedAll() {
            this.selectArr = [];
            for(let i = 0; i < this.list.length; i++) {
                for(let j = 0; j < this.list[i].shops.length; j++) {
                    this.list[i].shops[j].isSelected = this.isSelectAll;
                }
                this.selectArr.push(this.isSelectAll);
            }
        },
        removeItem(allIndex, id) {
            this.list[allIndex].shops = this.list[allIndex].shops.filter((item, index) => item.id != id);
            if(!this.list[allIndex].shops.length) {
                this.list.splice(allIndex, 1);
                this.selectArr.splice(allIndex, 1);
            }
            if(this.selectArr.length === 0) {
                this.isSelectAll = false;
            }
        },
        clear() {
            this.list = [];
            this.isSelectAll = false;
        },
    },
    data: {
        list: [],
        selectArr: [],
        isSelectAll: false,
    }
});