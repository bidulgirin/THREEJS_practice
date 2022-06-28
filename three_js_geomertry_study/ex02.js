import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// ----- 주제: Geometry 기본

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
	camera.position.z = 4;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);
	// Controls --> 카메라 궤도등을 조정한다
	const controls = new OrbitControls(camera , renderer.domElement); 
	// renderer.dom Element 는 canvas를 말하는것임
	//OrbitControls( object : Camera, domElement : HTMLDOMElement )
	/*object: (필수) 제어할 카메라 객체 입니다. 해당 객체가 장면에 포함되지 않을 경우 다른 객체의 자식이 아니여야 합니다..*/
	// Mesh
	const geometry = new THREE.SphereGeometry(5, 64,64);
	const material = new THREE.MeshStandardMaterial({
		color: 'hotpink',
		wireframe: true,
		side: THREE.DoubleSide // 카메라가 메쉬 안쪽에 들어가도 껍떼기가 보이게
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

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

