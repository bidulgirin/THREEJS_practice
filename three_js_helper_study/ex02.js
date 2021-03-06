import * as THREE from 'three';
import Stats from 'stats.js';
// ----- 주제: 초당 프레임 수(fps) 를 체크해보기 //설치해줘야해 npm i stats.js

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
	
	camera.position.y = 1;
	camera.position.z = 5;
	scene.add(camera);

	//Lights

	const ambientLight = new THREE.AmbientLight('white' , 0.5);
	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(ambientLight, directionalLight);
	
	
	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		color: 'seagreen'
	});
	const mesh = new THREE.Mesh(geometry, material);
	
	scene.add(mesh);
	
	// Stats
	const stats = new Stats();
	document.body.append(stats.domElement); // 몇 프레임인지 나타내줌
	
	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const time = clock.getElapsedTime();
		mesh.rotation.y = time;
		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
		stats.update(); // fps 를 보려면 draw함수에서 update해줘야 한다
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
