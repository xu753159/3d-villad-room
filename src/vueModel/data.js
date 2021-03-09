import * as THREE from "three";
let modeldata = {
    camera: [{
        type: "相机",
        position: {
            x: -35,
            y: 35,
            z: -100
        },
        rotation: {
            x: 0,
            y: -3.14,
            z: 0
        }
    }],
    lights: [{
            type: '光线1',
            position: {
                x: -90,
                y: 60,
                z: 50
            }
        },
        {
            type: '光线2',
            position: {
                x: 90,
                y: 60,
                z: -50
            }
        },
        {
            type: '光线3',
            position: {
                x: 90,
                y: 60,
                z: -50
            }

        }
    ],
    // 声音
    audioList: [
        //     {
        //     type: "声音1",
        //     audiosrc: "static/SoundPosition.MP3",
        //     paused: false,
        //     position: {
        //         x: -50,
        //         y: 50,
        //         z: 0
        //     },
        // },
        {
            type: "声音2",
            audiosrc: "static/SoundPosition2.MP3",
            paused: false,
            position: {
                x: -10,
                y: 15,
                z: 45
            }
        }
    ],
    //地面标记 landmark
    landmarklist: [{
            id: 0,
            type: '地标',
            landmarkposipostion: {
                x: -35,
                y: -10,
                z: -52
            },
            position: {
                x: -35,
                y: 50,
                z: -52
            },
            rotation: {
                x: 0,
                y: -3.14,
                z: 0
            },
        },
        {
            id: 1,
            type: '地标',
            landmarkposipostion: {
                x: -23,
                y: 10,
                z: 83
            },
            position: {
                x: -23,
                y: 50,
                z: 83
            },
            rotation: {
                x: 0,
                y: -0.05,
                z: 0
            },
        },
        {
            id: 2,
            type: '地标',
            landmarkposipostion: {
                x: -105,
                y: 10,
                z: -39
            },
            position: {
                x: -105,
                y: 50,
                z: -39
            },
            rotation: {
                x: 0,
                y: 0.53,
                z: 0
            },
        },

        {
            id: 3,
            type: '地标',
            landmarkposipostion: {
                x: -121,
                y: 10,
                z: 124
            },
            position: {
                x: -121,
                y: 50,
                z: 124
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
        },
        {
            id: 4,
            type: '地标',
            landmarkposipostion: {
                x: 47,
                y: 10,
                z: -51
            },
            position: {
                x: 60,
                y: 50,
                z: -63
            },
            rotation: {
                x: 0,
                y: -2.53,
                z: 0
            },
        },
        {
            id: 5,
            type: '地标',
            landmarkposipostion: {
                x: 140,
                y: 10,
                z: 62
            },
            position: {
                x: 140,
                y: 50,
                z: 62
            },
            rotation: {
                x: 0,
                y: 0.57,
                z: 0
            },
        },
        {
            id: 6,
            type: '地标',
            landmarkposipostion: {
                x: 2.25,
                y: 10,
                z: -98
            },
            position: {
                x: 2.25,
                y: 50,
                z: -98
            },
            rotation: {
                x: 0,
                y: -1.36,
                z: 0
            },
        },
        {
            id: 7,
            type: '地标',
            landmarkposipostion: {
                x: 62,
                y: 10,
                z: -93
            },
            position: {
                x: 62,
                y: 50,
                z: -93
            },
            rotation: {
                x: 0,
                y: 1.27,
                z: 0
            },
        },
        {
            id: 8,
            type: '地标',
            landmarkposipostion: {
                x: 106,
                y: 10,
                z: -60
            },
            position: {
                x: 106,
                y: 50,
                z: -60
            },
            rotation: {
                x: 0,
                y: 0.2,
                z: 0
            },
        },
    ],
    //信息提示
    Tipslist: [{
            id: 0,
            type: "tips",
            tipsShow: false,
            position: {
                x: 50,
                y: 50,
                z: 80
            },
            rotation: {
                x: 0,
                y: -1.57,
                z: 0
            },
            title: "水调歌头·明月几时有",
            describe: "明月几时有？把酒问青天。不知天上宫阙,今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间",
        },
        {
            id: 1,
            type: "tips",
            tipsShow: false,
            position: {
                x: 100,
                y: 50,
                z: 100
            },
            rotation: {
                x: 0,
                y: -1.57,
                z: 0
            },
            title: "提示二2222",
            describe: "这是提示",
        },
    ],
    modelList: [{
            id: 17,
            modelsrc: "bookroomDraco.gltf",
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            renderorder: 1,
            edition: 1,
            scale: 50
        },
        {
            id: 17,
            modelsrc: "combineDraco.gltf",
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            renderorder: 0,
            edition: 1,
            scale: 50
        },
        {
            id: 17,
            modelsrc: "roomDraco.gltf",
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            renderorder: 2,
            edition: 1,
            scale: 50
        },
        {
            id: 17,
            modelsrc: "washroomDraco.gltf",
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            renderorder: 4,
            edition: 1,
            scale: 50

        },
        {
            id: 17,
            modelsrc: "sleepDraco.gltf",
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            renderorder: 3,
            edition: 1,
            scale: 50
        },
    ],
    // 电视机视屏
    telList: [{
        position: {
            x: -74.8,
            y: 41,
            z: 55
        },
        rotation: {
            x: 0,
            y: 3.14,
            z: 0
        },
        telurl: "static/1605010398457.mp4",
    }, ],
    // 环境贴图球
    overView: {
        rotation: {
            x: 1.57,
            y: 0,
            z: 0
        },
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: {
            x: -1,
            y: 1,
            z: 1
        },
        viewurl: 'static/BackgroundMap.jpg'
    },
    SandMap: {
        assistCamer: {
            position: {
                x: 0,
                y: 450,
                z: 0
            },
            rotation: {
                x: 1.57,
                y: 3.14,
                z: 0
            }
        },
        spherePosition: {
            x: -35,
            y: 200,
            z: -191
        }
    },
}
let modelOption = {
    audioOptions: {
        scale: 1,
        args: [5, 5],
        matOpts: {
            // color: 0x00ffff,
            side: THREE.DoubleSide,
            // blending: THREE.AdditiveBlending,
            opacity: 1,
            // depthWrite: false,
            transparent: true,
        }
    },
    landmarkOptions: {
        scale: 1,
        args: [8, 8],
        matOpts: {
            // color: 0x00ffff,
            side: THREE.DoubleSide,
            // blending: THREE.AdditiveBlending,
            opacity: 0.5,
            // depthWrite: false,
            transparent: true,
        },
    },
    tipOptions: {
        scale: 2,
        args: [10, 10],
        matOpts: {
            color: 0xffffff,
            side: THREE.DoubleSide,
            // blending: THREE.AdditiveBlending,
            opacity: 1,
            // depthWrite: false,
            transparent: true,
        }
    },
    modelOptions: {
        scale: 50
    },
    telOptions: {
        scale: 4,
        args: [9, 5],
        matOpts: {

            // color: 0x00ffff,
            side: THREE.DoubleSide,
            // blending: THREE.AdditiveBlending,
            opacity: 1,
            // depthWrite: false,
            transparent: true,

        },
    },
    overViewOptions: {
        args: [640, 40, 40],
        matOpts: {
            // color: 0x808000,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            opacity: 1,
            // depthWrite: false,
            // transparent: true,

        },

    }
}
// export default modeldata
export {
    modeldata,
    modelOption
}
