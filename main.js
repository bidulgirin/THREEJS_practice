import * as THREE from 'three';

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement); // render.domElement는 canvas와 같다

const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true //부드럽게하는 장면, 성능이 저하됨
}); //canvas:canvas
renderer.setSize(window.innerWidth, window.innerHeight); 

const scene = new THREE.Scene(); //장면 가져오기 
const camera = new THREE.PerspectiveCamera(
75, //시야각 
window.innerWidth / window.innerHeight, //종횡비(aspect)
 0.1, // near
 1000 //far
 );
//camera
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5;
scene.add( camera ); //씬에 카메라를 넣는다
//  Mesh 
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 'red'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh); //씬에 mesh를 넣는다 
renderer.render(scene, camera); //카메라랑 씬을 그려준다