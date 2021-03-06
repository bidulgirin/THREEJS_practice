import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: OrbitControls

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
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true; // 부드럽게 화면 전환이 가능하다 
	// 매번 실행되는 draw함수다가  update 코드 필요 
	//controls.enableZoom = false; // 줌인 줌아웃 막기
	//controls.maxDistance = 10 ; // 10범위까지 멀어진다
	//controls.minDistance = 2
	//controls.minPolarAngle = Math.PI / 4; 
	//controls.maxPolarAngle = Math.PI / 4; 
	// 카메라 각도를 한정할때 사용 THREE.MathUtils.degToRad(45); 도 사용할수있다는걸 염두해두기
    // controls.target.set(2, 2, 2); // 회전의 중심축을 고정시킬때 쓴다
	controls.autoRotate = true; // 자동으로 회전애니메이션이 작동함
	controls.autoRotateSpeed = 50 ; // 회전애니메이션 속도 조정	

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
		controls.update();
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
