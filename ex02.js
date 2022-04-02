import * as THREE from 'three';
// 주제: resize
export default function example(){
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true 
}); 
renderer.setSize( window.innerWidth, window.innerHeight); 
renderer.setPixelRatio(window.devicePixelRatio); //디바이스마다 화면비율이다르니까 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
 75, //시야각 
 window.innerWidth / window.innerHeight, //종횡비(aspect)
 0.1, // near
 1000 //far
 );

camera.position.set(1,2,5);
camera.lookAt(0,0,0);
camera.zoom = 0.5;
camera.updateProjectionMatrix(); // 카메라 설정을 바꿧으면 업뎃해줘야한다...
scene.add( camera ); //씬에 카메라를 넣는다
//  Mesh 
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 'pink'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh); //씬에 mesh를 넣는다 
renderer.render(scene, camera); //카메라랑 씬을 그려준다

// window 창 변화에 따라 바뀌는 이벤트
function setSize(){
    camera.aspect = window.innerWidth / window.innerHeight; //여기에서 계속 오류남 camera가 정의가 안됐다고 뜸
    //updateProjectionMatrix 카메라 투영에 관련된 값에 변화가 있을경우 실행함
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

window.addEventListener( 'resize' , setSize);

}


