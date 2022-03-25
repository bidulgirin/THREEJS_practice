import * as THREE from 'three';

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement); // render.domElement는 canvas와 같다

const canvas =cocument.querySelector('#three-canvas');
const renderer = new HTMLPreElement.WebGLRenderer({canvas}); //canvas:canvas
renderer.setSize(window.innerWidth, window.innerHeight); 

const scene = new THREE.Scene(); //장면 가져오기 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z= 5;
scene.add( camera );