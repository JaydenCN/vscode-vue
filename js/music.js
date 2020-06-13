// https://autumnfish.cn/mv/url

layui.use(["layer", "element", "form"], function () {
  var layer = layui.layer;
  var element = layui.element;
  var form = layui.form;
  var $ = layui.$;
  form.on("submit(mvPlay)", function () {
    layer.open({
      title: "MV",
      type: 1,
      offset: "l",
      maxmin: true,
      content: $("#layui-vue"),
      area: ["680px", "440px"],
      shade: 0,
      end: function () {
        var Media = $("#videoMv");
        var au = Media[0];
        au.pause(); //暂停
      },
    });
    return false;
  });

  var app = new Vue({
    el: "#layuiRow",
    data() {
      return {
        //搜索值
        keywords: "",
        //音乐列表
        musicList: [],
        //音乐路径
        musicUrl: "",
        //作责图片地址
        pictureUrl: "./img/goddess.jpeg",
        //音乐热门评论
        hotComments: [],
        //动画
        isTrue: false,
        //遮罩层状态
        isShow: false,
        //mv地址
        mvUrl: "",
      };
    },
    methods: {
      musicSearch() {
        var that = this;
        if (this.keywords == "" || this.keywords == null) {
          layer.msg("请输入内容！", { icon: 2 });
          return;
        }
        axios
          .get("https://autumnfish.cn/search?keywords=" + this.keywords)
          .then((res) => {
            console.log(res.data.result.songs);
            res.data.result.songs.forEach((element) => {
              if (element.name.length > 4) {
                element.name = element.name.substring(0, 4) + "...";
              }
            });
            that.musicList = res.data.result.songs;
          })
          .catch((err) => {
            layer.msg("网络异常！请稍后再试", { icon: 2 });
          });
      },
      playMusic(id) {
        console.log("00" + id);
        var that = this;
        axios
          .get("https://autumnfish.cn/song/url?id=" + id)
          .then((res) => {
            that.musicUrl = res.data.data[0].url;
          })
          .catch((err) => {
            layer.msg("网络异常！请稍后再试", { icon: 2 });
          });
        axios
          .get("https://autumnfish.cn/song/detail?ids=" + id)
          .then((res) => {
            that.pictureUrl = res.data.songs[0].al.picUrl;
          })
          .catch((err) => {
            layer.msg("网络异常！请稍后再试", { icon: 2 });
          });
        axios
          .get("https://autumnfish.cn/comment/hot?type=0&id=" + id)
          .then((res) => {
            console.log(res.data.hotComments);
            that.hotComments = res.data.hotComments;
          })
          .catch((err) => {
            layer.msg("网络异常！请稍后再试", { icon: 2 });
          });
      },
      play() {
        this.isTrue = !this.isTrue;
      },
      pause() {
        this.isTrue = !this.isTrue;
      },
      playMv(mid) {
        var that = this;
        axios
          .get("https://autumnfish.cn/mv/url?id=" + mid)
          .then((res) => {
            console.log("11" + mid);
            that.isShow = true;
            that.mvUrl = res.data.data.url;
          })
          .catch((err) => {
            layer.msg("网络异常！请稍后再试", { icon: 2 });
          });
      },
    },
  });
});
