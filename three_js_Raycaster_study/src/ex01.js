import * as THREE from 'three';
import { Points } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: 

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
	const lineMaterial = new THREE.LineBasicMaterial({color:'yellow'});
	const points = [];
	points.push(new THREE.Vector3(0, 0, 100)); //시각적인 광선
	points.push(new THREE.Vector3(0, 0, -100));
		//bufferGeometry가 points에서 설정한것을 기반으로 셋팅함
	const LineGeometry = new THREE.BufferGeometry().setFromPoints(points);
	const guide = new THREE.Line(LineGeometry, lineMaterial);	
	scene.add(guide);

	const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
	const boxMaterial = new THREE.MeshStandardMaterial({ color:'plum' });
	const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
	boxMesh.name = 'box';

	const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
	const torusMaterial = new THREE.MeshStandardMaterial({color: 'lime'});
	const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
	torusMesh.name = 'torus';
	
	scene.add(boxMesh, torusMesh);
	const meshes = [boxMesh, torusMesh]; //광선에 맞았는지 한번에 체크하기 편해서 배열에 넣음
	
	const raycaster = new THREE.Raycaster();
	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		//const delta = clock.getDelta();
		const time = clock.getElapsedTime(); // sin에서는 각도를 늘려줘야하니까 getDelta대신에 값이 증가하는 함수인 getElapsedTime 메서드를이용
		
		boxMesh.position.y = Math.sin(time) * 2; // 위아래로 움직이게 하는 함수
		torusMesh.position.y = Math.cos(time) * 2;
		boxMesh.material.color.set('plum'); // 광선에 안닿을때의 기본값을 설정해 둬야 광선에 닿은것 안닿은것 구분가능
		torusMesh.material.color.set('lime');


		const origin = new THREE.Vector3(0, 0, 100); //실제광선 raycaster은 시작점과 방향으로 설정됨
		const direction = new THREE.Vector3(0, 0, -1); 
		 /*raycaster에서 방향을 정할때는 정규화를 해야한데 그래야 인식함
		 	방향을 정함 정규화해서 -1 이기때문에 -100을 -1로 바꾼것임
			그대로 -100으로 사용하고 싶다면 direction.normalize(); 라는 메서드를 사용해서 정규화 해주면됨 
		 	length 가 100에서 1로 변화함 */
		
		raycaster.set(origin, direction); // 광선을 세팅함

		
		const intersect = raycaster.intersectObjects(meshes);
		intersect.forEach(item=>{ // intersect의 각 원소를 foreach로 돌면서 아래 명령어를 실행함
			console.log(item.object.name); //  raycaster 에 닿는 object의 이름을 출력
			item.object.material.color.set('red'); // 이런식으로 닿는 object로 접근하여 조작할수있음
		});

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
