layui.use(["element", "layer"], function () {
  var element = layui.element; // 导航的hover效果、二级菜单等功能，需要依赖element模块
  var layer = layui.layer;
  var app = new Vue({
    el: "#weather",
    data() {
      return {
        city: "",
        weatherArr: [],
        ganmao: "",
      };
    },
    methods: {
      searchWeatherKey() {
        if (this.city == null || this.city == "") {
          layer.msg("请输入要查询的地区！", { icon: 2 });
          return;
        }
        var that = this;
        axios
          .get("http://wthrcdn.etouch.cn/weather_mini?city=" + this.city)
          .then(function (response) {
            response.data.data.forecast.forEach((element, index) => {
              if (element.type == "多云") {
                element.type = "🌤";
              } else if (element.type == "暴雨") {
                element.type = "🌧";
              } else if (element.type == "雷阵雨") {
                element.type = "⛈";
              } else if (element.type == "晴") {
                element.type = "🌞";
              } else if (element.type == "阴") {
                element.type = "☁";
              } else if (element.type == "阵雨") {
                element.type = "🌦";
              } else if (element.type == "小雨") {
                element.type = "🌧";
              } else if (element.type == "中雨") {
                element.type = "🌧";
              } else if (element.type == "大雨") {
                element.type = "🌧";
              }
            });
            that.weatherArr = response.data.data.forecast;
            that.ganmao = response.data.data.ganmao;
          })
          .catch(function (err) {
            layer.msg("抱歉，不支持该地区！", { icon: 2 });
          });
      },
      address(city) {
        var that = this;
        //   另一种书写方式
        axios
          .get("http://wthrcdn.etouch.cn/weather_mini?city=" + city)
          .then((res) => {
            res.data.data.forecast.forEach((element, index) => {
              if (element.type == "多云") {
                element.type = "🌤";
              } else if (element.type == "暴雨") {
                element.type = "🌧";
              } else if (element.type == "雷阵雨") {
                element.type = "⛈";
              } else if (element.type == "晴") {
                element.type = "🌞";
              } else if (element.type == "阴") {
                element.type = "☁";
              } else if (element.type == "阵雨") {
                element.type = "🌦";
              } else if (element.type == "小雨") {
                element.type = "🌧";
              } else if (element.type == "中雨") {
                element.type = "🌧";
              } else if (element.type == "大雨") {
                element.type = "🌧";
              }
            });
            that.weatherArr = res.data.data.forecast;
            that.ganmao = res.data.data.ganmao;
          })
          .catch((err) => {
            layer.msg("抱歉，不支持该地区！", { icon: 2 });
          });
      },
    },
  });
});
