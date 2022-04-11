import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

// ----- 주제: FirstPersonControls
// FlyControl의 대체 구현이므로 비슷하다!

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 1.5;
	camera.position.z = 4;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Controls
	const controls = new FirstPersonControls(camera, renderer.domElement);
	//controls.movementSpeed = 10; //움직임 속도 설정
	controls.activeLook = false; // 움직임을 멈춤
	//controls.lookSpeed = .1; // rollspeed랑 똑같은거임
	controls.autoForward = true; // 자동으로 앞으로 움직임 

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	let mesh;
	let material;
	for (let i= 0; i < 20; i++){//random으로 색정하기색깔범위가 255가지이므로
		material = new THREE.MeshStandardMaterial({ //밝은 색을 구하기 위해 50을 더하고 255에서 50을 뺀것임
			color:`rgb(
				${ 50+ Math.floor(Math.random() * 205)}, 
				${ 50+ Math.floor(Math.random() * 205)}, 
				${ 50+ Math.floor(Math.random() * 205)}
				)`
		});	
		// 위치 랜덤
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = (Math.random() -0.5)*5;
		mesh.position.y = (Math.random() -0.5)*5;
		mesh.position.z = (Math.random() -0.5)*5;
		scene.add(mesh);
	}
	

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();
		controls.update(delta); // FlyControls는 update에다가 delta값을 넣어 줘야함
		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
