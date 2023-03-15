import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// 目标：初识材质与纹理

// 1.创建场景
const scene = new THREE.Scene()

// 2.创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera);
// 导入纹理
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('./textures/door/color.jpg');
console.log('doorColorTexture', doorColorTexture);

// 添加物体
const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
    color: "#ffff00",
    map: doorColorTexture,
})
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);


// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)

// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)

// 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 设置控制器阻尼，让控制器更有真实效果, 必须在动画循环里调用.update()。
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)

// 设置时钟
const clock = new THREE.Clock();

window.addEventListener('dblclick', () => {
    const fullScreenElement = document.fullscreenElement;
    if (fullScreenElement) {
        document.exitFullscreen();
    } else {
        // 双击控制屏幕进入全屏，退出全屏
        renderer.domElement.requestFullscreen();
    }

})

function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();


// 监听画面变化，更新渲染画面
window.addEventListener('resize', () => {
    console.log("画面变化了");
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix();
    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
})