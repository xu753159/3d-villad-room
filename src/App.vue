<template>
  <div ref="fullscreen">
    <div class="model-change">
      <navbar @currentFloor="currentFloor" :floorArray="floorlist"></navbar>
    </div>
    <model1 v-if="floorIndex==0" ></model1>
    <model2 v-if="floorIndex==1" ></model2>
    <div id="qrcode1" v-if="qrcode">
        <vue-qr  :margin='30' :logoSrc="src1" :text="origin" :size="200" ></vue-qr>
    </div>
    <div ref="qrcode" id="qrcode">
    </div>
  </div>
</template>

<script>
import VueQr from "vue-qr";
import QRCode from 'qrcodejs2'
import Model1 from "./vueModel/model1";
import Model2 from "./vueModel/model2";
import navbar from "./components/common/Nav"
export default {
  name: "App",
  data() {
    return {
      floorIndex:0,
      src1:require('../public/logo.png'),
      qrcode:false,
      origin:"",
      floorlist: [
        {
        floorId: 0,
        floorname: "楼层一",
        CADimage: "static/villa1.jpg",
         roomList: [{
                "id": 0,
                "roomname": "大门1",
                "cameraposition": {
                    "x": -35,
                    "y": 35,
                    "z": -100
                },
                "camerarotation": {
                    "x": 0,
                    "y": -3.14,
                    "z": 0
                }
            },
            // {
            //     "id": 1,
            //     "roomname": "厨房",
            //     "cameraposition": {
            //         "x": 74,
            //         "y": 50,
            //         "z": -228
            //     },
            //     "camerarotation": {
            //         "x": 0,
            //         "y": -3.3,
            //         "z": 0,
            //     }
            // },
            {
                "id": 2,
                "roomname": "次卧1",
                "cameraposition": {
                    "x": -130,
                    "y": 35,
                    "z": 33
                },
                "camerarotation": {
                    "x": 0,
                    "y": 2.32,
                    "z": 0,
                }
            },
            // {
            //     "id": 3,
            //     "roomname": "次卧2",
            //     "cameraposition": {
            //         "x": 95,
            //         "y": 50,
            //         "z": 2.83
            //     },
            //     "camerarotation": {
            //         "x": 0,
            //         "y": -2.42,
            //         "z": 0,
            //     }
            // },
            {
                "id": 4,
                "roomname": "阳台",
                "cameraposition": {
                    "x": 50,
                    "y": 35,
                    "z": 164
                },
                "camerarotation": {
                    "x": 0,
                    "y": -4.29,
                    "z": 0,
                }
            },
            {
                "id": 5,
                "roomname": "主卧",
                "cameraposition": {
                    "x": 102,
                    "y": 35,
                    "z": -6.1
                },
                "camerarotation": {
                    "x": 0,
                    "y": -2.42,
                    "z": 0,
                }
            },
            {
                "id": 6,
                "roomname": "书房",
                "cameraposition": {
                    "x": 109,
                    "y": 35,
                    "z": -125
                },
                "camerarotation": {
                    "x": 0,
                    "y": -1.43,
                    "z": 0,
                }
            }
        ]
        },
        // {
        //   floorId: 0,
        //   floorname: "楼层二",
        //   CADimage: "static/timg.jpg",
        //   roomList: [
        //     {
        //       id: 0,
        //       roomname: "房间3",
        //       cameraposition: { x: -58, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },
        //     {
        //       id: 0,
        //       roomname: "房间4",
        //       cameraposition: { x: -95, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },
        //     {
        //       id: 0,
        //       roomname: "房间5",
        //       cameraposition: { x: 100, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },
        //     {
        //       id: 0,
        //       roomname: "房间1",
        //       cameraposition: { x: -58, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },
        //     {
        //       id: 0,
        //       roomname: "房间2",
        //       cameraposition: { x: -95, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },
        //     {
        //       id: 0,
        //       roomname: "房间3",
        //       cameraposition: { x: 50, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },
        //     {
        //       id: 0,
        //       roomname: "房间4",
        //       cameraposition: { x: -58, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },
        //     {
        //       id: 0,
        //       roomname: "房间5",
        //       cameraposition: { x: -95, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },
        //     {
        //       id: 0,
        //       roomname: "房间6",
        //       cameraposition: { x: 50, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },
        //     {
        //       id: 0,
        //       roomname: "房间7",
        //       cameraposition: { x: -58, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },
        //     {
        //       id: 0,
        //       roomname: "房间8",
        //       cameraposition: { x: -95, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },
        //     {
        //       id: 0,
        //       roomname: "房间9",
        //       cameraposition: { x: 50, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },
        //     {
        //       id: 0,
        //       roomname: "房间10",
        //       cameraposition: { x: -58, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },
        //     {
        //       id: 0,
        //       roomname: "房间11",
        //       cameraposition: { x: -95, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },
        //     {
        //       id: 0,
        //       roomname: "房间12",
        //       cameraposition: { x: 50, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },
        //     {
        //       id: 0,
        //       roomname: "房间13",
        //       cameraposition: { x: -58, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },
        //     {
        //       id: 0,
        //       roomname: "房间14",
        //       cameraposition: { x: -95, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },
        //     {
        //       id: 0,
        //       roomname: "房间15",
        //       cameraposition: { x: 50, y: 70, z: -13 },
        //       camerarotation: { x: 0, y: 2.3, z: 0 },
        //     },

        //   ],
        // },
      ],
    };
  },
  components: {
    Model1,
    Model2,
    VueQr,
    navbar

  },
  mounted(){
    this.origin=location.origin
    this.$global.modelcount=0
  },
  methods: {
    currentFloor(index){
      this.floorIndex=index
    },
    bindQRCode(url){
      document.getElementById('qrcode').innerHTML = ''//在调用qrCode前使用js原生方法清空元素内容
      let qrcode = new QRCode('qrcode', {
      width: 150, //图像宽度
     height: 150, //图像高度
     colorDark : "#000000", //前景色
     colorLight : "#ffffff", //背景色
     typeNumber:4, 
     correctLevel : QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
   })
    qrcode.clear() //清除二维码 
    qrcode.makeCode(url) //生成另一个新的二维码
    },
    downloadIamge() {
        let myCanvas = document.getElementById('qrcode').getElementsByTagName('canvas');
          var a = document.createElement('a')
           a.download =new Date().getTime()+".jpg"
           a.href = myCanvas[0].toDataURL('image/png').replace('image/png', 'image/octet-stream')
           document.body.appendChild(a);
           a.click();
          document.body.removeChild(a);
          
    }
  },
  created(){

    if(!sessionStorage.getItem('floor')){
      sessionStorage.setItem('floor',  this.floorIndex)
    }else{
      let floor = sessionStorage.getItem('floor')
      this.floorIndex = Number(floor)
    }
    

  }

};
</script>

<style>
body {
  height: 100vh;
  margin: 0;
  overflow: hidden;
   -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}


</style>
