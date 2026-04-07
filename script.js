window.onload = function() {
    const container = document.getElementById('globe-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 15, 15);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0xe68a00, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.2 
    });
    
    const globe = new THREE.Mesh(geometry, material);
    globe.scale.set(1.9, 1.9, 1.9);
    scene.add(globe);

    function animate() {
        requestAnimationFrame(animate);
        globe.rotation.y += 0.0015;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
    });
};
