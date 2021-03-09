
<script>
import * as THREE from "three";
import Dexie from "dexie";
import Worker from "worker-loader!./worker.js";
export default {
  name: "ModelStorage",
  inject: {
    Action: {
      name: "Action",
      default() {
        return null;
      },
    },
  },
  data() {
    var db = new Dexie("ModelDatabase");
    db.version(1).stores({
      // 创建表
      modelList: "++id,name,model,edition,animation",
    });
    return {
      db,
      animationAction: [],
      animationMixer: null,
    };
  },
  props: {
    edition: Number,
  },
  created() {},
  beforeDestroy() {
    this.animationAction = null;
    this.animationMixer = null;
  },
  methods: {
    /**线程 保存
     *@param obj: obj保存的对象
     */
    WorkerSave(obj) {
      let worker = new Worker();
      worker.postMessage(obj).catch((e) => {
          console.log("postMessage error " + e);
          worker.terminate();
          this.process();
      });
      worker.onmessage = (e) => {
        console.log("Received message " + e.data);
        worker.terminate();
          this.process();
      };
    },
    /**该方法用于读取数据库模型文件
     *@param modelName: 数据库存储的模型 名字
     **/
    async readModel(modelName) {
      let dbmodel = null;
      await this.db.modelList
        .where("name")
        .equalsIgnoreCase(modelName)
        .first()
        .then((res) => {
          if (res) {
            if (res.edition != this.edition) {
              this.db.modelList.delete(res.id);
              dbmodel = null;
            } else {
              //返回模型
              dbmodel = res;
            }
          } else {
            // 加载模型文件
            dbmodel = null;
          }
        })
        .catch((err) => {
          console.log("数据读取失败", err);
          dbmodel = null;
        });

      return dbmodel;
    },
    /** 加载 three 对象
     * @param resModel: 需要解析的模型
     */
    loaderModel(res) {
      let loader = new THREE.ObjectLoader(); //加载 three 对象
      new Promise(() => {
        loader.parse(res.model, (model) => {
          this.meshVm.curObj = model;
          //加载动画
          this.loaderAnimations(res.animation, model);

            this.db.close();
            this.process();
            res = null
            this.db = null
        });
      });
    },
    /**加载数据库动画动画
     * @param animations: 动画数据
     * @param obj: 模型数据
     */
    loaderAnimations(animations, obj) {
        if (this.Action) {
            if (animations && animations.length) {
                animations = new THREE.AnimationLoader().parse(animations); //转换  AnimationClip 对象
                const mixer = new THREE.AnimationMixer(obj);
                for (let i = 0; i < animations.length; i++) {
                    //  animations[i]   THREE.AnimationClip.parse(animations[i])
                    const animation = animations[i];
                    // There's .3333 seconds junk at the tail of the Monster animation that
                    // keeps it from looping cleanly. Clip it at 3 seconds
                    //animation.duration = 3;
                    // 保存动画 ACtion
                    this.animationAction.push(mixer.clipAction(animation))
                }
                this.animationMixer = mixer;
            }
        }
    },
    /** 加载模型动画
     * @param animations: 动画数据
     * @param obj: 模型数据
     */
    animation(animations, obj) {
      let animationList = []; // 保存 动画数据
        if (this.Action) {
            if (animations && animations.length) {
                const mixer = new THREE.AnimationMixer(obj);
                for (let i = 0; i < animations.length; i++) {
                    const animation = animations[i];
                    // There's .3333 seconds junk at the tail of the Monster animation that
                    // keeps it from looping cleanly. Clip it at 3 seconds
                    //animation.duration = 3;
                    // 保存动画 ACtion
                    this.animationAction.push(mixer.clipAction(animation))
                    animationList.push(THREE.AnimationClip.toJSON(animation));
                }
                this.animationMixer = mixer;
            }
        }
      return animationList;
    },
    /** 初始化函数
     * @param fileName : 文件名称
     */
    async initial(fileName) {
      // 查看数据有没有 模型
      //读取数据库
      await this.readModel(fileName).then((dbmodel) => {
        if (dbmodel) {
          // 解析模型
          this.loaderModel(dbmodel);

        } else {
          // 重新加载模型
            this.db.close();
          this.requireModel();

        }
      });
     // 把动画对象 传给 ACtion
      if (this.Action) {
        this.Action.animationAction = this.animationAction;
        this.Action.mixer = this.animationMixer;
      }
    },
    /**
     * 加载 文件model
     */
    requireModel() {},
  },
};
</script>

<style>
</style>
