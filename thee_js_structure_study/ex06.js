import * as THREE from 'three';

// 주제:getElapsedTime 대신에 getDelta 사용하기

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
const clock = new THREE.Clock();
function draw(){
   
    const delta = clock.getDelta(); // getElapsedTime 이랑 같이 쓰면 동작오류남 
    /* oldTime이 설정된 이후로부터 지난 초를 가져오며 oldTime을 현재 시간으로 설정합니다.
    autoStart가 true 이고 시계가 멈춰있는 상태라면, 시계를 시작시킵니다.
    delta... 시간 차라고 생각하면 됨*/
    // mesh.rotation.y += THREE.MathUtils.degToRad(2); 
    // mesh.position.y += 0.01;
    mesh.rotation.y += 2 * delta; // delta만 쓰면 rotate가 안됨+=delta 해줘야함
    mesh.position.y += delta;
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


