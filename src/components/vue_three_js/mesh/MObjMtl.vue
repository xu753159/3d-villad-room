<script>
import Base from "../components/Base";
import * as THREE from "three";
import ModelStorage from "./ModelStorage";

import { DDSLoader } from "three/examples/jsm/loaders/DDSLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default {
  name: "MObjMtl",
  mixins: [Base, ModelStorage],
  inject: ["meshVm"],
  props: {
    process: Function,
    mtlUrl: String,
    objUrl: String,
  },
  data() {
    return {
      manager: null,
      mtlLoader: null,
      objLoader: null,
    };
  },
  created() {
    this.initial(this.objUrl);
  },
  methods: {
    requireModel() {
      let { baseUrl, objUrl, mtlUrl } = this;
      new Promise((resolve) => {
        this.manager = new THREE.LoadingManager();
        this.manager.addHandler(/\.dds$/i, new DDSLoader());

        this.mtlLoader = new MTLLoader(this.manager);
        if (baseUrl) {
          // mtlLoader.set(baseUrl)
          this.mtlLoader.setPath(baseUrl);
        }
        this.mtlLoader.load(mtlUrl, (materials) => {
          materials.preload();

          this.objLoader = new OBJLoader(this.manager);
          this.objLoader.setMaterials(materials);
          if (baseUrl) {
            this.objLoader.setPath(baseUrl);
          }
          this.objLoader.load(objUrl, (obj) => {
            this.meshVm.curObj = obj;
            let model = {
              name: this.objUrl,
              model: obj.toJSON(),
              edition: this.edition,
              animation: [], // worker 传入对对象必须是可以拷贝的
            };
            resolve(model);
          });
        });
      }).then((model) => {
        this.manager.dispose();
        this.mtlLoader.dispose();
        this.objLoader.dispose();
        this.WorkerSave(model);
      });
    },
  },
  beforeDestroy() {
    this.manager.dispose();
    this.mtlLoader.dispose();
    this.objLoader.dispose();
    this.manager = null;
    this.mtlLoader = null;
    this.objLoader = null;
    this.meshVm.curObj = null;
  },
};
</script>
