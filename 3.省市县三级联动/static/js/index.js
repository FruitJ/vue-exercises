const PROVINCE = "省份",
    CITY = "城市",
    COUNTIES = "县区";
let vm = new Vue({
    created() { // 利用生命周期函数的执行时机来获取数据
        axios.get('../static/json/data.json').then((res) => this.list = res.data).catch((err) => console.log(err));
    },
    el: '#app',
    methods: {
        getProvinceData() { // 鼠标按下获取省份数据
            this.province = Object.keys(this.list);
        },
        selectProvince() { // 选择省份
            this.city = Object.keys(this.list[`${this.defaultProvinceVal}`]);
            if (this.prevProvinceVal !== '' && this.prevProvinceVal !== this.defaultProvinceVal) {
                this.defaultCityVal = CITY;
                this.defaultCountiesVal = COUNTIES;
            }
            this.prevProvinceVal = this.defaultProvinceVal;
        },
        selectCity() { // 选择城市
            this.counties = this.list[`${this.defaultProvinceVal}`][`${this.defaultCityVal}`];
            if (this.prevCityVal !== '' && this.prevCityVal !== this.defaultCityVal) {
                this.defaultCountiesVal = COUNTIES;
            }
            this.prevCityVal = this.defaultCityVal;
        },
    },
    data: {
        list: {}, // 省市县/区数据集合
        defaultProvinceVal: PROVINCE, // 省份值
        defaultCityVal: CITY, // 城市值 
        defaultCountiesVal: COUNTIES, // 县区值
        province: [], // 省份数据集合
        city: [], // 城市数据集合
        counties: [], // 县区数据集合
        prevProvinceVal: '', // 上一次选取的省份值
        prevCityVal: '', // 上一次选取的城市值
    }
});