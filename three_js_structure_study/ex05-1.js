import * as THREE from 'three';

// 주제: 애니메이션 사용해보기


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
    //console.log(clock.getElapsedTime()); //시간이 흐릅니다
    const time = clock.getElapsedTime(); 
    // mesh.rotation.y += THREE.MathUtils.degToRad(2); 
    // mesh.position.y += 0.01;
    mesh.rotation.y = 2 * time; // 컴퓨터 성능에따라 움직임의 부드러움은 바뀌나 움직이는 거리는 같게 합니다.
    mesh.position.y += 0.01;
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


