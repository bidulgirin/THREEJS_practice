import * as THREE from 'three';

// 주제: 배경색 투명도 설정하기


export default function example(){
// Renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true // 바탕화면이 투명해짐
}); 
renderer.setSize( window.innerWidth, window.innerHeight); 
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); 
//renderer.setClearAlpha(0.5); // 불투명해짐
renderer.setClearColor(0X00ff00); //'#00ff00' 'green' 해도 같음
renderer.setClearAlpha(0.5);

//Scene
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(
 75, 
 window.innerWidth / window.innerHeight, 
 0.1, 
 1000 
 );

camera.position.set(1,2,5);
camera.lookAt(0,0,0);
camera.zoom = 2;
camera.updateProjectionMatrix();
scene.add( camera ); 
// Light
const light = new THREE.DirectionalLight(0xffffff ,1); //DirectionalLight 태양빛이라고 생각하면 편함
light.position.set(1,2,5);
scene.add(light);
//  Mesh 
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ //MeshBasicMaterial 는 빛과 관계없이 사물을 보여주는 material 속성이다 
    color: 'pink'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
renderer.render(scene, camera); 

// resize event
function setSize(){
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

window.addEventListener( 'resize' , setSize);

}


