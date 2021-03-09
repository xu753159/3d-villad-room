<template>
  <div id="modelEEEEEEEEEE">
    <model-process
    >
      <div v-show="renderComplete" class="box">
         <!-- :size="renderOptions.size" -->
        <renderer :insetsize="renderOptions.insetsize" >
          <dat-gui :setup="uiSetup" :model="ui"></dat-gui>
          <scene>
            <pointer-lock-controls
              wallname="_1"
              :renderComplete="renderComplete"
            >
              <camera :position="cameraInt.position" :rotation="cameraInt.rotation"></camera>
              <audio-listener></audio-listener>
            </pointer-lock-controls>

            <direction-light
              hex="#fff"
              :intensity="1.5"
              :position="ui.lights[0].position"
              :rotation="{ x: 0, y: 0, z: 0 }"
            ></direction-light>
            <direction-light
              hex="#fff"
              :intensity="1.5"
              :position="ui.lights[1].position"
              :rotation="{ x: 0, y: 0, z: 0 }"
            ></direction-light>
 
            <ambient-light hex="0xffffff" :intensity="0.3"></ambient-light>

            <sand-map v-if="showMap" :SandMap="SandMap"></sand-map>

            <audio-list v-for="(audio, index) in audioList" :audio="audio" :key="index + 'audio'"
            :audioOptions="Option.audioOptions"
            ></audio-list>

            <tips-list v-for="(tips, index) in Tipslist" :key="index + 'tips'" :tips="tips" 
            :tipOptions="Option.tipOptions"
            ></tips-list>

            <land-mark v-for="(landmark, index) in landmarklist" :key="index + 'landmark'" :landmark="landmark"
            :landmarkOption="Option.landmarkOptions"
            ></land-mark>

            <model-list v-for="(model, index) in modelList" :key="'model'+ index" :model="model"
            :modelOptions="Option.modelOptions"
            ></model-list>

            <tv-screen v-for="(tel, index) in telList" :key="'tel'+index " :television="tel"
            :telOptions="Option.telOptions"
            ></tv-screen> 

            <!-- <over-view :overView="overView" :overViewOptions="Option.overViewOptions"></over-view> -->
          
            <raycaster></raycaster>
          </scene>
        </renderer>
      </div>
    </model-process>
  </div>
</template>
<script>
// import * as gui from "../components/gui";
import * as gui from './model1-gui'
import * as THREE from "three";


import SandMap from "../components/combine/SandMap";
import AudioList from "../components/combine/AudioList";
import TipsList from "../components/combine/TipList";
import LandMark from "../components/combine/LandMark";
import ModelList from "../components/combine/ModelList";
import tvScreen from '../components/combine/tvScreen';
// import OverView from "../components/combine/OverView";



import ModelProcess from "../components/common/ModelProcess";


export default {
  
  name: "model2",
  data() {
    let uiSetup = gui.setupPanel;
    let ui = gui.getModel();

    return {
      ui,
      uiSetup,
      showMap: false,
      itemsLoaded: 0,
      itemsTotal: 0,
      renderComplete: false,
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
      cameraInt:{
        position:{x: -35, y: 50, z:-191},
        rotation:{x: 0, y: -3.14, z: 0}
      },
      Tipslist: ui.Tipslist,
      audioList: ui.audioList,
      landmarklist: ui.landmarklist,
      modelList:0,// ui.modelList
      telList: ui.telList,
      overView: ui.overView,
      SandMap:ui.SandMap,
      Option:{
        audioOptions:{
          scale:1,
          args:[5,5],
          matOpts:{
          // color: 0x00ffff,
          side: THREE.DoubleSide,
          // blending: THREE.AdditiveBlending,
          opacity: 1,
          // depthWrite: false,
          transparent: true,
          }
        },
        landmarkOptions:{
          scale:1,
          args:[8,8],
          matOpts:{
        // color: 0x00ffff,
           side: THREE.DoubleSide,
        // blending: THREE.AdditiveBlending,
           opacity: 0.5,
        // depthWrite: false,
            transparent: true,
      },
        },
        tipOptions:{
          scale:2,
          args:[10,10],
          matOpts:{
            color: 0xffffff,
            side: THREE.DoubleSide,
            // blending: THREE.AdditiveBlending,
            opacity: 1,
            // depthWrite: false,
            transparent: true,
          }
        },
        modelOptions:{
          scale:60
        },
        telOptions:{
          scale:4,
          args:[14,8],
          matOpts:{
            
        // color: 0x00ffff,
        side: THREE.DoubleSide,
        // blending: THREE.AdditiveBlending,
        opacity: 1,
        // depthWrite: false,
        transparent: true,
      
          },
        },
        overViewOptions:{
            args:[640, 40, 40],
            matOpts:{
              // color: 0x808000,
              side: THREE.DoubleSide,
              blending: THREE.AdditiveBlending,
              opacity: 1,
              // depthWrite: false,
              // transparent: true,
      
            },
           
        }

      }
    };
  },
  created() {

  },
  methods: {
    
    changeMap() {
      this.$bus.$on("showMap", (mes) => {
        this.showMap = mes;
      });
    },
  },
  components: {
    ModelProcess,
    SandMap,
    AudioList,
    TipsList,
    LandMark,
     tvScreen,
    ModelList,
    // OverView,
   
  },
  mounted() {
    this.changeMap();    
    THREE.DefaultLoadingManager.onLoad = () => {
        this.renderComplete = true;
    };
    THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      this.itemsTotal=itemsTotal-this.$global.modelcount
      this.itemsLoaded =itemsLoaded-this.$global.modelcount
    };
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
