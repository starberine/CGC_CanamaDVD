const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

const dvdGeometry = new THREE.PlaneGeometry(0.4, 0.3);
const dvdMaterial = new THREE.MeshBasicMaterial();
const dvd = new THREE.Mesh(dvdGeometry, dvdMaterial);
scene.add(dvd);

dvd.position.set(0, 0, 0);
dvd.material.color.setRGB(Math.random(), Math.random(), Math.random());
let velocity = new THREE.Vector2(0.005, 0.005);
let bouncesLeft = 8;

function animate() {
    requestAnimationFrame(animate);

    dvd.position.x += velocity.x;
    dvd.position.y += velocity.y;

    const dvdHalfWidth = dvdGeometry.parameters.width / 2;
    const dvdHalfHeight = dvdGeometry.parameters.height / 2;

    if (dvd.position.x + dvdHalfWidth > 1 || dvd.position.x - dvdHalfWidth < -1) {
        dvd.material.color.setRGB(Math.random(), Math.random(), Math.random());
        velocity.x *= -1;
        dvd.scale.y -= 0.1;
        dvd.scale.x -= 0.1;
        bouncesLeft--;
        console.log("Bounces Left: "+bouncesLeft);
    }

    if (dvd.position.y + dvdHalfHeight > 1 || dvd.position.y - dvdHalfHeight < -1) {
        dvd.material.color.setRGB(Math.random(), Math.random(), Math.random());
        velocity.y *= -1;
        dvd.scale.y -= 0.1;
        dvd.scale.x -= 0.1;
        bouncesLeft--;
        console.log("Bounces Left: "+bouncesLeft);
    }

    if ((dvd.position.x + dvdHalfWidth > 1 && dvd.position.y + dvdHalfHeight > 1) ||
        (dvd.position.x - dvdHalfWidth < -1 && dvd.position.y + dvdHalfHeight > 1) ||
        (dvd.position.x + dvdHalfWidth > 1 && dvd.position.y - dvdHalfHeight < -1) ||
        (dvd.position.x - dvdHalfWidth < -1 && dvd.position.y - dvdHalfHeight < -1)) {
        dvd.material.color.setRGB(Math.random(), Math.random(), Math.random());
        velocity.x *= -1;
        velocity.y *= -1;
        dvd.scale.y -= 0.1;
        dvd.scale.x -= 0.1;
        bouncesLeft--;
    }

    if (bouncesLeft <= 0) {
        console.log("Object Not Found");
        dvd.visible = false;
        
    }

    renderer.render(scene, camera);
}

animate();
