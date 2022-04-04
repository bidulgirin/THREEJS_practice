import * as THREE from 'three';

// ----- 주제: AxesHelper, GridHelper 축, 그리드 헬퍼

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
	camera.position.x = 1;
	camera.position.y = 4;
	camera.position.z =0;
	scene.add(camera);

	//Lights

	const ambientLight = new THREE.AmbientLight('white' , 0.5);
	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(ambientLight, directionalLight);
	
	//AxesHelper
	const axesHelper = new THREE.AxesHelper(3); // 축 helper 숫자로 크기 조절 가능 0,0,0 위치에 있어서 mesh를 움직일때 편하다
	scene.add(axesHelper);

	//GridHelper
	const gridHelper = new THREE.GridHelper(5); // 그리드를 그려준다
	scene.add(gridHelper);
	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		color: 'seagreen'
	});
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = 2;
	scene.add(mesh);
	// mesh 를 바라보게 해줘
	camera.lookAt(mesh.position);

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const time = clock.getElapsedTime();

		mesh.rotation.y = time;

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
