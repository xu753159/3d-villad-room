
<template>
  <div>
    <slot> </slot>
  </div>
</template>
<script>
import * as THREE from "three";
export default {
  name: "animationAction",
  props: {
    edition: Number,
    play: {
      // 播放暂停
      type: Boolean,
      default() {
        return true;
      },
    },
    loop: {
      //循环模式
      type: Number,
      default() {
        return THREE.LoopRepeat;
        /** 必须是以下值之一：
         *  THREE.LoopOnce - 只执行一次
            THREE.LoopRepeat - 重复次数为repetitions的值, 且每次循环结束时候将回到起始动作开始下一次循环。
            THREE.LoopPingPong - 重复次数为repetitions的值, 且像乒乓球一样在起始点与结束点之间来回循环。
        */
      },
    },
    time: {
      // 动作开始的时间点 (单位是秒, 从0开始计时).  第一次 播放的第几秒的那一帧
      type: Number,
      default() {
        return 0;
      },
    },
    weight: {
      //动作的影响程度 (取值范围[0, 1]). 0 (无影响)到1（完全影响）之间的值可以用来混合多个动作。默认值是1
      //控制，动画模型活动范围
      type: Number,
      default() {
        return 1;
      },
    },
    repetitions: {
      // 动画播放次数  默认值是Infinity
      type: Number,
      default() {
        return Infinity;
      },
    },
    timeScale: {
      // 时间(time)的比例因子. 值为0时会使动画暂停。值为负数时动画会反向执行。默认值是1。
      type: Number,
      default() {
        return 1;
      },
    },
    setEffectiveTimeScale: {
      // 时间比例值越大播放越快
      type: Number,
      default() {
        return 1;
      },
    },
  },
  provide() {
    return {
      Action: this,
    };
  },
  data() {
    const clock = new THREE.Clock();
    return {
      animationAction: null,
      frame: null,
      mixer: null,
      clock,
    };
  },
  watch: {
    play(v) {
      if (this.animationAction) {
        if (v) {
          this.setAnimation();
        } else {
          this.setAnimation();
        }
      }
    },
    loop() {
      if (this.animationAction) {
        this.setAnimation();
      }
    },
    time() {
      if (this.animationAction) {
        this.setAnimation();
      }
    },
    weight() {
      if (this.animationAction) {
        this.setAnimation();
      }
    },
    repetitions() {
      if (this.animationAction) {
        this.setAnimation();
      }
    },
    timeScale() {
      if (this.timeScale) {
        this.setAnimation();
      }
    },
    animationAction() {
      if (this.animationAction) {
        this.setAnimation();
      }
    },
    mixer(v) {
      if (v) {
        this.startAnimation();
      }
    },
  },
  methods: {
    /**动画设置
     */
    setAnimation() {
      if (this.play) {
        for (let i = 0; i < this.animationAction.length; i++) {
          const aniAction = this.animationAction[i];
          aniAction.play();
          aniAction.loop = this.loop; // 动画循环模式
          aniAction.time = this.time; // 第一次播放的几秒那一帧
          aniAction.weight = this.weight; //控制，动画模型活动范围
          aniAction.repetitions = this.repetitions; // 控制动画 播放次数
          aniAction.timeScale = this.timeScale; // 控制 播放状态
        }
      } else {
        for (let i = 0; i < this.animationAction.length; i++) {
          const aniAction = this.animationAction[i];
          aniAction.stop();
        }
      }
    },
    startAnimation() {
      this.frame = requestAnimationFrame(this.startAnimation);
      if (this.mixer) this.mixer.update(this.clock.getDelta());
    },
  },
  mounted() {},
  beforeDestroy() {
    cancelAnimationFrame(this.frame);
  },
};
</script>