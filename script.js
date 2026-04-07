window.onload = function() {
    const container = document.getElementById('globe-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); 
    container.appendChild(renderer.domElement);

    const globe = new THREE.Mesh(
        new THREE.SphereGeometry(1, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xffa500, wireframe: true, opacity: 0.6, transparent: true })
    );
    globe.scale.set(1.5, 1.5, 1.5); 
    scene.add(globe);

    function animate() {
        requestAnimationFrame(animate);
        globe.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animate();
};
