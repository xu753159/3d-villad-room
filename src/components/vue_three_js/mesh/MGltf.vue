
<script>
import Base from "../components/Base";
import ModelStorage from "./ModelStorage";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export default {
  name: "MGltf",
  mixins: [Base, ModelStorage],
  inject: ["meshVm"],
  props: {
    process: Function,
    gltfUrl: String,
    edition: Number,
  },
  data() {
    return {
      dracoLoader: null,
      loader: null,
    };
  },
  created() {
   this.initial(this.gltfUrl)
  },
  beforeDestroy() {
    this.loader.dispose();
    if (this.dracoLoader) {
      this.dracoLoader.dispose();
    }
    this.loader = null;
    this.dracoLoader = null;
  },
  destroyed() {
    let arr = this.meshVm.curObj.children.filter((x) => x);
    arr.forEach((a) => {
      this.dispose(this.meshVm.curObj, a);
    });
    this.meshVm.curObj = null;
  },
  methods: {
    dispose(parent, child) {
      if (child.children.length) {
        let arr = child.children.filter((x) => x);
        arr.forEach((a) => {
          this.dispose(child, a);
        });
      }
      if (child.material) {
        if (child.material.map) {
          child.material.map.dispose();
        }
        child.material.dispose();
      }
      if (child.geometry) {
        child.geometry.dispose();
      }
      child.remove();
      parent.remove(child);
    },
    // 读取模型
    /**该方法用于读取模型文件
     **/
    requireModel() {
      // 读取数据  console.log("读取数据");
      let scope = this;
      new Promise((resolve) => {
        this.loader = new GLTFLoader().setPath(this.baseUrl);
        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath("static/threex/draco/gltf/");
        this.loader.setDRACOLoader(this.dracoLoader);
        this.loader.load(this.gltfUrl, (gltf) => {
          let object = gltf.scene;
          //  Box3 方法的作用
          //  计算和世界轴对齐的一个对象 Object3D （含其子对象）的包围盒，计算对象和子对象的世界坐标变换。
          var objBbox = new THREE.Box3().setFromObject(gltf.scene);
          objBbox.setFromObject(object);
          object.traverse(function (node) {
            if (node.isMesh) {
              if (node.isMesh || node.isLight) node.castShadow = true;
            }
          });

          const animations = gltf.animations;
          // 加载动画返回动画
          let animationList = this.animation(animations, object);
          //
          // Manipulate and Query Database
          //
          scope.meshVm.curObj = object;
          let model = {
            name: this.gltfUrl,
            model: object.toJSON(),
            edition: this.edition,
            animation: animationList, // worker 传入对对象必须是可以拷贝的
          };
          resolve(model);
          object = null;
        });
      }).then((model) => {
        this.dracoLoader.dispose();
        this.WorkerSave(model);
      });
    },
  },
};
</script>


<style scoped>
</style>
