import * as THREE from 'three';
import dat from 'dat.gui';
// ----- 주제: gui 컨트롤 해보기 npm i dat.gui

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
	
	// Dat GUI
	const gui = new dat.GUI(); //gui 메뉴를 만들어준다
	//1번째 방법
	//gui.add(mesh.position,'y', -5, 5, 0.01).name('메쉬의 y 위치'); // gui.add(object,'변화시킬값',최소값,최대값,단계)
	//2번째 방법
	gui.add(mesh.position, 'z')
		.min(-5)
		.max(5)
		.step(0.01)
		.name('메쉬의 z값')
		
	// 카메라도 gui 해보자
	gui.add(camera.position,'x' ,-5,5,0.01).name('카메라x');
	// 카메라가 mesh를 진득하게 쳐다보게 만들고 싶다
	camera.lookAt(mesh.position); // draw 애니메이션에다가도 이 코드를 입력해 줍시다
	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const time = clock.getElapsedTime();
		mesh.rotation.y = time;
		camera.lookAt(mesh.position);
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
