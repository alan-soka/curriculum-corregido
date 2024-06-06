// Seleccionar el contenedor específico
const container = document.getElementById('scene-container');

// Crear la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x212121); // Fondo negro para mejor contraste

// Configurar la cámara
const camera = new THREE.PerspectiveCamera(5, container.clientWidth / container.clientHeight, 0.1, 100);
camera.position.z = 1.5;

// Configurar el renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Suavizar los movimientos
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.minDistance = -1;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI / 2;

// Luz direccional roja a la izquierda
const redLight = new THREE.DirectionalLight(0xec5353, 2);
redLight.position.set(-5, 5, -2).normalize();
scene.add(redLight);

// Luz direccional azul a la derecha
const blueLight = new THREE.DirectionalLight(0x00ffff, 1);
blueLight.position.set(5, -5, -2).normalize();
scene.add(blueLight);


// Aquí cargamos y agregamos el modelo 3D de la nave espacial utilizando OBJLoader
const objLoader = new THREE.OBJLoader();
objLoader.load('torsofemale.obj', function (object) {
    scene.add(object);
    object.position.set(0, -0.06, 0);
    object.rotation.x = Math.PI / 2; // Rota 90 grados alrededor del eje X
    object.rotation.y = Math.PI / 1; // Alternativamente, puedes probar rotando alrededor del eje Y
    object.rotation.z = Math.PI / 1; // Alternativamente, puedes probar rotando alrededor del eje Z
    object.name = "torsofemale"; // Establece un nombre para el objeto

}, undefined, function (error) {
    console.error(error);
});

// Animación
function animate() {
    requestAnimationFrame(animate);

    // Obtener el objeto 3D de la escena
    const object = scene.getObjectByName("torsofemale"); // Nombre del objeto cargado desde el archivo OBJ

    // Comprobar si el objeto existe antes de intentar rotarlo
    if (object) {
        // Rotar el objeto hacia la derecha (en el eje Y)
        object.rotation.z += 0.01; // Puedes ajustar la velocidad de rotación según sea necesario
    }

    renderer.render(scene, camera);
}
animate();

// Ajustar el renderizado cuando se cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
