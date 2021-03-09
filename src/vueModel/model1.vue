<template>

  <div id="modelXXXX">
      <Progress
      :modelTotal="modelList.length"
      ></Progress>
      <div class="box"  >
        <renderer :insetsize="renderOptions.insetsize"  >
          <dat-gui :setup="uiSetup" :model="ui"></dat-gui>
          <scene>
            <pointer-lock-controls
              wallname="well"
              
            >
              <camera :position="cameraInt.position" :rotation="cameraInt.rotation"></camera>
              <audio-listener></audio-listener>
            </pointer-lock-controls>
            <assist-camera  v-if="showMap"  :position="SandMap.assistCamer.position"
             :rotation="SandMap.assistCamer.rotation"></assist-camera>

            <direction-light
              hex="#fff"
              :intensity="1.5"
              :position="ui.modeldata.lights[0].position"
              :rotation="{ x: 0, y: 0, z: 0 }"
            ></direction-light>
            <direction-light
              hex="#fff"
              :intensity="1.5"
              :position="ui.modeldata.lights[1].position"
              :rotation="{ x: 0, y: 0, z: 0 }"
            ></direction-light>
 

            <ambient-light hex="#edc873" :intensity="0.3"></ambient-light>

            <sand-map v-if="showMap" :SandMap="SandMap"></sand-map>

        
            <audio-list v-for="(audio, index) in audioList" :audio="audio" :key="index + 'audio'"
            :audioOptions="Option.audioOptions"
            ></audio-list>

            <tips-list v-for="(tips, index) in Tipslist" :key="index + 'tips'" :tips="tips" 
            :tipOptions="Option.tipOptions"
            ></tips-list>

            <!-- <land-mark v-for="(landmark, index) in landmarklist" :key="index + 'landmark'" :landmark="landmark"
            :landmarkOption="Option.landmarkOptions"
            ></land-mark> -->

            <model-list    :modelList="modelList"
            ></model-list>

            <tv-screen v-for="(tel, index) in telList" :key="'tel'+index " :television="tel"
            :telOptions="Option.telOptions"
            ></tv-screen> 

            <over-view :overView="overView" :overViewOptions="Option.overViewOptions"></over-view>
            
            <raycaster></raycaster>
          </scene>
          <map-scene >
               <sand-map  :SandMap="SandMap"></sand-map>
            </map-scene>

        </renderer>
      </div>
  </div>
</template>
<script>
import * as gui from './model1-gui'
import Progress from '../components/common/Progress'


import SandMap from "../components/combine/SandMap";
import AudioList from "../components/combine/AudioList";
import TipsList from "../components/combine/TipList";
// import LandMark from "../components/combine/LandMark";
import ModelList from "../components/combine/ModelList";
import OverView from "../components/combine/OverView";
import tvScreen from '../components/combine/tvScreen';


export default {
  
  name: "model1",
  data() {
    let uiSetup = gui.setupPanel;
    let ui = gui.getModel();
    

    return {

      previousModel:3,
      ui,
      uiSetup,
      showMap: false,
      // renderComplete: false,
      renderProcess: 0,
      renderOptions:{
        size: {
        w: window.innerWidth,
        h: window.innerHeight,
        },
        insetsize: {
        w: 200,
        h: 300,
        },
        alpha:true
      },
      cameraInt:ui.modeldata.camera[0],
      Tipslist: ui.modeldata.Tipslist,
      audioList: ui.modeldata.audioList,
      landmarklist: ui.modeldata.landmarklist,
      modelList: ui.modeldata.modelList,
      telList: ui.modeldata.telList,
      overView: ui.modeldata.overView,
      SandMap:ui.modeldata.SandMap,
      Option:ui.modelOption
    };
  },
  created() {
    // this.changeMoeld()
    // hack: loop animation via vue key prop
    // setInterval(() => {
    //   this.ui.sysKey += 1;
    // }, 15000);
  },
  methods: {
    changeMap() {
      this.$bus.$on("showMap", (mes) => {
        this.showMap = mes;
      });
    },
   
  },
  components: {

    // ModelProcess,

    SandMap,
    AudioList,
    TipsList,
    // LandMark,
    ModelList,
    OverView,
    tvScreen,
    Progress
  },
  mounted() {
    this.changeMap();
   
    
  },
  beforeDestroy(){
    this.$global.modelcount+=this.itemsTotal
  }
};
</script>

<style>
body {
  margin: 0;
  overflow: hidden;
}
#process {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  /* background-image: url('../../public/1111437.jpg'); */
  /* opacity: 0.5; */
}
#process img {
  width: 100%;
  height: 100vh;
  /* opacity: 0.8; */
}
.process-icon {
  position: absolute;
  left: 35%;
  top: 35%;
}
.render-process {
  font-weight: 1000;
  color: rgb(239, 239, 247);
  font-size: 25px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
  color: rgb(0.5, 0.5, 0.5);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.box{
  width: 100%;
  height: 100vh;
}
</style>
