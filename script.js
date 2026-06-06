// ===========================
// LOADER
// ===========================

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader =
            document.getElementById("loader");

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }, 2000);

});

// ===========================
// THREE JS SETUP
// ===========================

const scene = new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(
75,
window.innerWidth /
window.innerHeight,
0.1,
1000
);

const renderer =
new THREE.WebGLRenderer({

canvas:
document.querySelector("#bg"),

antialias:true

});

renderer.setPixelRatio(
window.devicePixelRatio
);

renderer.setSize(
window.innerWidth,
window.innerHeight
);

camera.position.setZ(30);

renderer.render(
scene,
camera
);

// ===========================
// LIGHTS
// ===========================

const pointLight =
new THREE.PointLight(
0x00ffff,
2
);

pointLight.position.set(
20,
20,
20
);

const ambientLight =
new THREE.AmbientLight(
0xffffff,
0.5
);

scene.add(
pointLight,
ambientLight
);

// ===========================
// STARS
// ===========================

function addStar(){

const geometry =
new THREE.SphereGeometry(
0.15,
24,
24
);

const material =
new THREE.MeshBasicMaterial({

color:0xffffff

});

const star =
new THREE.Mesh(
geometry,
material
);

const [x,y,z] =
Array(3)
.fill()
.map(() =>
THREE.MathUtils.randFloatSpread(
200
)
);

star.position.set(
x,
y,
z
);

scene.add(star);

}

Array(800)
.fill()
.forEach(addStar);

// ===========================
// EARTH
// ===========================

const earthGeometry =
new THREE.SphereGeometry(
5,
64,
64
);

const earthMaterial =
new THREE.MeshStandardMaterial({

color:0x00ffff,

wireframe:true

});

const earth =
new THREE.Mesh(
earthGeometry,
earthMaterial
);

earth.position.set(
0,
0,
0
);

scene.add(earth);

// ===========================
// AI CUBE
// ===========================

const cubeGeometry =
new THREE.BoxGeometry(
3,
3,
3
);

const cubeMaterial =
new THREE.MeshStandardMaterial({

color:0x8a2be2,

wireframe:true

});

const cube =
new THREE.Mesh(
cubeGeometry,
cubeMaterial
);

cube.position.set(
12,
0,
-10
);

scene.add(cube);

// ===========================
// QUANTUM SPHERE
// ===========================

const quantumGeometry =
new THREE.SphereGeometry(
2,
32,
32
);

const quantumMaterial =
new THREE.MeshStandardMaterial({

color:0xffffff,

wireframe:true

});

const quantumSphere =
new THREE.Mesh(
quantumGeometry,
quantumMaterial
);

quantumSphere.position.set(
-12,
0,
-10
);

scene.add(
quantumSphere
);

// ===========================
// ROBOT OBJECT
// ===========================

const robotGeometry =
new THREE.ConeGeometry(
2,
5,
32
);

const robotMaterial =
new THREE.MeshStandardMaterial({

color:0x00ffcc,

wireframe:true

});

const robot =
new THREE.Mesh(
robotGeometry,
robotMaterial
);

robot.position.set(
0,
-8,
-15
);

scene.add(robot);

// ===========================
// SCROLL CAMERA MOVEMENT
// ===========================

document.body.onscroll =
moveCamera;

function moveCamera(){

const t =
document.body.getBoundingClientRect()
.top;

camera.position.z =
30 + t * -0.01;

camera.position.x =
t * -0.0002;

camera.rotation.y =
t * -0.0002;

}

// ===========================
// GSAP
// ===========================

gsap.registerPlugin(
ScrollTrigger
);

gsap.from(
"#hero .content",
{
opacity:0,
y:100,
duration:1.5
}
);

gsap.from(
"#ai .glass-card",
{
scrollTrigger:"#ai",
opacity:0,
x:-200,
duration:1.5
}
);

gsap.from(
"#quantum .glass-card",
{
scrollTrigger:"#quantum",
opacity:0,
x:200,
duration:1.5
}
);

gsap.from(
"#robotics .glass-card",
{
scrollTrigger:"#robotics",
opacity:0,
scale:0.5,
duration:1.5
}
);

gsap.from(
"#future .content",
{
scrollTrigger:"#future",
opacity:0,
y:150,
duration:1.5
}
);

// ===========================
// MOUSE INTERACTION
// ===========================

document.addEventListener(
"mousemove",
(event)=>{

const mouseX =
(event.clientX /
window.innerWidth)
*2-1;

const mouseY =
(event.clientY /
window.innerHeight)
*2-1;

earth.rotation.y +=
mouseX * 0.005;

earth.rotation.x +=
mouseY * 0.002;

}
);

// ===========================
// ANIMATION LOOP
// ===========================

function animate(){

requestAnimationFrame(
animate
);

earth.rotation.y +=
0.002;

cube.rotation.x +=
0.01;

cube.rotation.y +=
0.01;

quantumSphere.rotation.y +=
0.008;

robot.rotation.z +=
0.01;

renderer.render(
scene,
camera
);

}

animate();

// ===========================
// RESIZE
// ===========================

window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

}
);