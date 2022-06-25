import * as THREE from 'three';

// 주제: animation 


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
//그리는 것을 함수로 만듦
function draw(){
    //animation
    //mesh.rotation.y += 0.02;
    //360 도는 2파이 ... -> 각도는 radian을 사용한다고 함
    mesh.rotation.y += THREE.MathUtils.degToRad(2); // -> 요값이 우리가 잘알고있는 360도가 기준임
    mesh.position.y += 0.01;
    if(mesh.position.y > 3){
        mesh.position.y = 0;
    }
    renderer.render(scene, camera); 
       //renderer.setAnimationLoop(draw); // ->같은 기능이긴한데 vr같은거 만들때 꼭 이걸 사용해야함
    window.requestAnimationFrame(draw); // 함수를 계속 호출시킴으로써 빙글뱅글 돌게함
 
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


