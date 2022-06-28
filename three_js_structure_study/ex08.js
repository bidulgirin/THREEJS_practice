import * as THREE from 'three';
import gsap from 'gsap';
// 주제: 라이브러리를 이용한 애니메이션


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

renderer.setClearColor(0X000000); 
renderer.setClearAlpha(1);

//Scene
const scene = new THREE.Scene();
//scene 에 안개를 설정해준다
scene.fog = new THREE.Fog('black', 1, 6); // Fog('color',near,far);

//Camera
const camera = new THREE.PerspectiveCamera(
 75, 
 window.innerWidth / window.innerHeight, 
 0.1, 
 1000 
 );

camera.position.set(1,1,5);
camera.lookAt(0,0,0);
camera.zoom = 0.2;
camera.updateProjectionMatrix();
scene.add( camera ); 
// Light
const light = new THREE.DirectionalLight(0xffffff ,1); 
light.position.set(1,1,1);
scene.add(light);
//  Mesh 
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ 
    color: 'aqua'
});

const meshes = []; //meshes라는 배열값을 만든 이유는..?
let mesh;
for(let i = 0; i < 10; i++){
   
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5;
    //mesh.position.y = Math.random() * 5;
    mesh.position.z = Math.random() * 5;
    scene.add(mesh);
    meshes.push(mesh);
}



//그리기
let time = Date.now() 
function draw(){
    const newTime = Date.now();
    const deltaTime = newTime - time ; 
    time = newTime;  
    renderer.render(scene, camera); 
    window.requestAnimationFrame(draw); 
 
}
// gsap (애니메이션 라이브러리)
gsap.to(
    mesh.position,
    {
        duration:1,
        y :1,
        z:2,
    }
)

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


