import * as THREE from 'three';
import { Points, Vector2 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: 클릭한 메쉬 선택하기

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
	camera.position.set(5, 1.5, 4);
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
	// Mesh
	
	const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
	const boxMaterial = new THREE.MeshStandardMaterial({ color:'plum' });
	const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
	boxMesh.name = 'box';

	const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
	const torusMaterial = new THREE.MeshStandardMaterial({color: 'lime'});
	const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
	torusMesh.name = 'torus';
	
	scene.add(boxMesh, torusMesh);
	const meshes = [boxMesh, torusMesh]; 
	
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2(); //vector2 는 2차원 값을 갖는다.
	
	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		
		const time = clock.getElapsedTime(); 
		
		boxMesh.position.y = Math.sin(time) * 2; 
		torusMesh.position.y = Math.cos(time) * 2;
		boxMesh.material.color.set('plum'); 
		torusMesh.material.color.set('lime');

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}
	function checkIntersects(){
		raycaster.setFromCamera(mouse, camera); 
		/* origin을 카메라에 있다고 생각하셈,
			raycaster를 camera시점 기준으로 mouse에 클릭한 지점에다가 광선을 셋팅하는것임
		*/
		const intersects = raycaster.intersectObjects(meshes); 
		for (const item of intersects){ //forEach 대신에 쓴것임
			item.object.color.set('red');
			break; // break로 첫번째 관통된 물체만 선택,  break를 안하면 for of문이 배열을 돌면서 관통한 물체들을 전부 선택함
			
			// if (intersects[0]){ --> intersect의 첫번째 배열이 있다면 그것의 이름만 출력하여라, 라고 해야 오류안뜸
			//	console.log(intersect[0].object.name) }이런식으로 사용해도 됨 ...쓰기 나름임 
			
		}

	}
	// 이벤트
	window.addEventListener('resize', setSize);
	canvas.addEventListener('click', e =>{

		console.log(e.clientX , e.clientY); 
		/* 
			--마우스 위치 정규화 하기
			마우스로 클릭한 위치를 return 함 왼쪽위모서리가 기준임, 
			하지만 threeJs에서는 맨가운데가 기준이므로 설정을 맞춰줘야한다!
			three.js기준으로 clientX,Y값으로 맞춰준것임
		
		*/
		
		mouse.x = e.clientX / canvas.clientWidth * 2 - 1; // 식 설명: 클릭한위치/ 캔버스크기 => 비율이 나옴 비율에 두배 해주고 절반값인 1을 빼주면 중간 값이 나옴
		mouse.y = -(e.clientY / canvas.clientHeight * 2 - 1); // threejs에서는 위쪽이 y가 +이므로 -을붙혀 값을 맞춰준다 걍 외우자~~~
		checkIntersects();
	});
	draw();
}
