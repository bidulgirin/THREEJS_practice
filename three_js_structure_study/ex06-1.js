import * as THREE from 'three';

// 주제: clock 대신에 자바스크립트 date 이용해서 애니메이션 실행하기


export default function example(){
// Renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
}); 
renderer.setSize( window.innerWidth, window.innerHeight); 
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); 

renderer.setClearColor(0X00ff00); 
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
camera.zoom = 0.5;
camera.updateProjectionMatrix();
scene.add( camera ); 
// Light
const light = new THREE.DirectionalLight(0xffffff ,1); 
light.position.set(1,2,5);
scene.add(light);
//  Mesh 
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ 
    color: 'pink'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
//
//그리기
let oldTime = Date.now() //1970년대부터...쭉 더해지던 값임 변수값이 대입이 되야하니까 let으로 함
function draw(){
   const newTime = Date.now();// 새로운 now.date임
   const deltaTime = newTime - oldTime ; //deltaTime 은 시간 차 값이고 계속 늘어나므로
   oldTime = newTime;  // 현재 시점의 newTime을 oldTime에 넣어주어야 제대로된 시간차값이 입력된다 
   mesh.rotation.y += deltaTime * 0.01;
   mesh.position.y += deltaTime * 0.001;
    if(mesh.position.y > 3){
        mesh.position.y = 0;
    }
    renderer.render(scene, camera); 
       
    window.requestAnimationFrame(draw); 
 
}


// resize event
function setSize(){
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

window.addEventListener( 'resize' , setSize);
draw();
}


