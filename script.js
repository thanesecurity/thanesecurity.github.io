window.onload = function() {
    const container = document.getElementById('globe-container');
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null; 

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); 
    container.appendChild(renderer.domElement);

    const globeGeometry = new THREE.SphereGeometry(1, 15, 15);
    const globeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffa500,
        wireframe: true,
        opacity: 0.6,
        transparent: true
    });
    
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    // Globe size set to 1.8 to look prominent
    globe.scale.set(1.8, 1.8, 1.8); 
    scene.add(globe);

    function animate() {
        requestAnimationFrame(animate);
        globe.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        // Updated to use container dimensions for better mobile responsiveness
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
};
