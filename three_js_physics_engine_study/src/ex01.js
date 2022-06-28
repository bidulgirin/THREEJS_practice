import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as CANNON from 'cannon-es';
// ----- 주제: cannon.js 기본 세팅 cannon-es로 설치했음 (최신코드)

// cannon.js 문서
// http://schteppe.github.io/cannon.js/docs/
// 주의! https 아니고 http

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

	//Cannon(물리엔진)
	const cannonWorld = new CANNON.World(); // 물리엔진이 적용될 무대 생성
	cannonWorld.gravity.set(0, -10, 0); //중력만 생성 바로 물체에 적용 되지 않음

	const floorShape = new CANNON.Plane();
	const floorBody = new CANNON.Body({
		mass: 0, //바닥은 움직이지 않게 (중력에 영향받지 않게) mass를 0으로 하는것임
        position:new CANNON.Vec3(0, 0, 0),
        shape: floorShape
	});

	floorBody.quaternion.setFromAxisAngle( //CANNON의 바닥면의 기본값이 수직으로 되어있기때문에 돌려주는것
		new CANNON.Vec3(-1, 0, 0), //x축기준으로돌린다고 생각해라
		Math.PI / 2
	);
	cannonWorld.addBody(floorBody); //floorBody를 cannonWorld에 불러옴

	const boxShape = new CANNON.Box(new CANNON.Vec3(0.25, 2.5, 0.25)); //박스에 물리엔진을 적용하기 위한 box 중심으로 부터 떨어진거리
	const boxBody = new CANNON.Body({
		mass: 1, //뭘 만들지에 따라서 달라짐, kg이라고 생각하고 설정함
		position: new CANNON.Vec3(0, 10, 0),
		shape: boxShape
	});
	cannonWorld.addBody(boxBody);
	// Mesh
				
	const floorMesh = new THREE.Mesh( //물리엔진을 이용해서 충돌할 바닥면 만들기 
		new THREE.PlaneGeometry(10, 10), //기본값은 세로로 서있음
		new THREE.MeshStandardMaterial({
			color:'slategray'
		})
	);
	floorMesh.rotation.x = -( Math.PI / 2 ); //앞면을 위로 올리기 위해서 부호를 반대로한것임
	
	const boxGeometry = new THREE.BoxGeometry(0.5, 5, 0.5);
	const boxMaterial = new THREE.MeshStandardMaterial({
		color: 'seagreen'
	});
	scene.add(floorMesh);
	const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
	boxMesh.position.y = 0.5; // 땅바닥위로 올리기, y값에 반절만 올리는 것임
	scene.add(boxMesh);

	// 그리기
	const clock = new THREE.Clock();

	function draw() { //draw 함수에서 물리엔진을 위해 만든 물체들을 연결시킴
		const delta = clock.getDelta();

		// 화면주사율이 다를경우 오류(벽뚫기등등)가 생기는 것을 방지하기위한 코드
		let cannonStepTime = 1/60; 
		if ( delta < 0.01) cannonStepTime = 1/120; 
		cannonWorld.step(cannonStepTime, delta, 3); //초당 60fps로 설정(일정한 값만 넣을 수 있음), 시간차를 이용한 함수, 성능에따라 벌어진 차이를 메꾸려고 하는 횟수
		// floorBody.position.copy(floorBody.position); floor의 위치는 딱히 갱신할 필요없으므로 삭제
		boxMesh.position.copy(boxBody.position); //boxMesh 의 위치를 boxBody의 위치를 복사 (CANNON이랑 THREE의 물체가 같이 움직임)
		boxMesh.quaternion.copy(boxBody.quaternion) // boxMesh의 회전을 boxBody의 회전에 복사 그래야 넘어지는 모션을 적용할수있음 (CANNON이랑 THREE의 물체가 같이 기울어짐)
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
