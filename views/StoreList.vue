<!--
  描述：拖放地图组件，默认尺寸是 500 * 300
  接收属性参数：
    lat: 纬度
    lng: 经度
  自定义事件：
    drag: 拖放完成事件
  示例：
    <mapDrag @drag="dragMap" lat="22.574405" lng="114.095388"></mapDrag>
-->
<template>
  <div class="m-map" style="margin: 20px auto; display: flex">
    <div id="map" class="map">正在加载数据 ...</div>
    <div class="storecont">
      <div class="storelist" v-for="(item, index) in storelist" :key="index">
        <h3 class="storecity">
          {{ item.name }}<span>{{ item.totalCount }}</span
          >家
        </h3>
        <ul :key="subIndex" v-for="(sub, subIndex) in item.records">
          <li>{{ sub.name }}</li>
          <li>地址：{{ sub.address }}</li>
          <li>电话：{{ sub.tel }}</li>
          <li>营业时间：{{ sub.openTime }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import remoteLoad from "../utils/remoteLoad.js";
import { MapKey } from "../config/config";
export default {
  data() {
    return {
      storelist: [],
      map: {},
      storeMaps: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.loading = true;
      this.$http
        .get(`store/getGroupStores`)
        .then((response) => {
          this.storelist = response.data.data;
          this.loading = false;
        })
        .catch(function (error) {
          window.console.log(error);
        });
    },
    // 实例化地图
    initMap() {
      this.map = new AMap.Map("map", {
        resizeEnable: true,
        center: new AMap.LngLat(121.40227, 31.133749),
        zoom: 10,
      });
      let _this = this;
      this.$http
        .get("store/getStores?offset=0&pageSize=10000")
        .then(({ data }) => {
          if (data.rspCode === 0) {
            _this.storeMaps = [];
            _this.storeMaps = data.data.records;
            //添加一个缩放控件

            AMapUI.loadUI(
              ["overlay/SimpleMarker", "control/BasicControl"],
              function (SimpleMarker, BasicControl) {
                _this.map.addControl(
                  new BasicControl.Zoom({
                    position: "lt",
                  })
                );

                //缩放控件，显示Zoom值
                _this.map.addControl(
                  new BasicControl.Zoom({
                    position: "lb",
                    showZoomNum: true,
                  })
                );

                //图层切换控件
                _this.map.addControl(
                  new BasicControl.LayerSwitcher({
                    position: "rt",
                  })
                );
                _this.initAllStorePoint(SimpleMarker);
              }
            );
          } else {
            _this.$message.warning(response.rspMsg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createInfoWindow(title, content) {
      let info = document.createElement("div");
      info.className = "custom-info input-card content-window-card";

      //可以通过下面的方式修改自定义窗体的宽高
      // 定义顶部标题
      let top = document.createElement("div");
      let titleD = document.createElement("div");
      let closeX = document.createElement("img");
      top.className = "info-top";
      titleD.innerHTML = title;
      closeX.src = "https://webapi.amap.com/images/close2.gif";
      let _this = this;
      closeX.onclick = function () {
        _this.map.clearInfoWindow();
      };

      top.appendChild(titleD);
      top.appendChild(closeX);
      info.appendChild(top);

      // 定义中部内容
      let middle = document.createElement("div");
      middle.className = "info-middle";
      middle.style.backgroundColor = "F9F9F9";
      middle.innerHTML = content;
      info.appendChild(middle);

      // 定义底部内容
      let bottom = document.createElement("div");
      bottom.className = "info-bottom";
      bottom.style.position = "relative";
      bottom.style.top = "0px";
      bottom.style.margin = "0 auto";
      let sharp = document.createElement("img");
      sharp.src = "//webapi.amap.com/images/sharp.png";
      bottom.appendChild(sharp);
      info.appendChild(bottom);
      return info;
    },
    initAllStorePoint(SimpleMarker) {
      let _this = this;
      _this.storeMaps.forEach((store) => {
        if (
          parseFloat(store.longitude).toString() === "NaN" ||
          parseFloat(store.latitude).toString() === "NaN"
        ) {
          return;
        }
        let marker = new SimpleMarker({
          //iconLabel: store.storeName,
          //自定义图标节点(img)的属性
          iconStyle: {
            src: "//wework.qpic.cn/bizmail/bCpoePTI33iblaajQRibdMYfSn0dvYV7K9ib8tSjqTSWADe5v4bf8YjDg/0",
            style: {
              width: "30px",
              height: "30px",
            },
          },
          map: _this.map,
          showPositionPoint: true,
          position: [store.longitude, store.latitude],
        });
        let title = `${store.name} `;
        let content = [];
        content.push(
          `<img  width="30px" height="30px" src='//wework.qpic.cn/bizmail/bCpoePTI33iblaajQRibdMYfSn0dvYV7K9ib8tSjqTSWADe5v4bf8YjDg/0'>`
        );
        content.push(
          `<p>地址：${
            store.address === null
              ? "上海市闵行区沪闵路7876号"
              : store.address
          }</p>`
        );
        content.push(
          `电话：${store.tel === null ? "400-880-4695" : store.tel}`
        );
        let infoWindow = new AMap.InfoWindow({
          isCustom: true, //使用自定义窗体
          content: _this.createInfoWindow(title, content.join("<br/>")),
          offset: new AMap.Pixel(20, -30),
        });
        AMap.event.addListener(marker, "click", function () {
          infoWindow.open(_this.map, marker.getPosition());
        });
      });
    },
  },
  async created() {
    await remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=${MapKey}`);
    await remoteLoad("http://webapi.amap.com/ui/1.0/main.js");
    this.initMap();
  },
};
</script>

<style lang="css">
.m-map {
  width: 1024px;
  margin: 20px auto;
  position: relative;
  text-align: center;
}
.m-map .map {
  width: 800px;
  height: 700px;
}
.m-map .search {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 285px;
  z-index: 1;
}
.m-map .search input {
  width: 180px;
  border: 1px solid #ccc;
  line-height: 20px;
  padding: 5px;
  outline: none;
}
.m-map .search button {
  line-height: 26px;
  background: #fff;
  border: 1px solid #ccc;
  width: 50px;
  text-align: center;
}
.m-map .result {
  max-height: 300px;
  overflow: auto;
  margin-top: 10px;
}
.storecont {
  width: 380px;
  margin-left: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  height: 700px;
  overflow-y: auto;
}

.storelist h3 {
  background: #e4f2f3;
  color: #19b3ab;
  font-weight: 400;
  margin: 0 0 5px -10px;
  padding: 10px;
}
.storelist h3 span {
  padding-left: 5px;
  padding-right: 5px;
}
.storelist ul {
  border-bottom: 1px solid #eee;
  list-style: none;
  margin: 0;
  padding: 5px 5px 10px 10px;
  text-align: left;
}
.storelist li {
  color: #666;
  font-size: 13px;
  line-height: 180%;
  margin: 0;
}
.storelist li:first-child {
  color: #00bcb4;
  font-size: 14px;
  font-weight: 500;
}

.info-middle {
  padding: 10px;
  font-size: 13px;
  line-height: 120%;
  text-align: left;
}
.info-middle img {
  width: 70px;
  height: 70px;
  margin: 5px 10px 50px 0;
  float: left;
  vertical-align: middle;
}
.info-middle p {
  margin: 0;
  padding: 5px 0;
}
.custom-info {
  background: #f9f9f9;
  border: solid 1px #ccc;
}
.info-top {
  position: relative;
  background: #f9f9f9;
  border-bottom: 1px solid #ccc;
  border-radius: 5px 5px 0 0;
  text-align: left;
  line-height: 120%;
  color: #333333;
  font-size: 14px;
  font-weight: bold;
   padding: 10px;
}

.info-top span {
  font-size: 11px;
  color: #f00;
}
.info-top img {
  position: absolute;
  top: 10px;
  right: 10px;
  transition-duration: 0.25s;
}

.info-top img:hover {
  box-shadow: 0px 0px 5px #000;
}

.info-bottom {
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center;
}

.info-bottom img {
  position: relative;
  z-index: 104;
}
</style>