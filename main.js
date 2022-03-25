import * as THREE from 'three';

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement); // render.domElement는 canvas와 같다

const canvas =cocument.querySelector('#three-canvas');
const renderer = new HTMLPreElement.WebGLRenderer({canvas}); //canvas:canvas
renderer.setSize(window.innerWidth, window.innerHeight);