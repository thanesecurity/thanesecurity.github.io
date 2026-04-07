window.onload = function() {
    const container = document.getElementById('globe-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // RESTORED WIREFRAME GLOBE
    const geometry = new THREE.SphereGeometry(1, 14, 14); // Fewer segments make the wireframe look sharper
    const material = new THREE.MeshBasicMaterial({ 
        color: 0xff9d00, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.35 
    });
    
    const globe = new THREE.Mesh(geometry, material);
    globe.scale.set(1.9, 1.9, 1.9);
    scene.add(globe);

    function animate() {
        requestAnimationFrame(animate);
        // Only rotating on the Y axis for a cleaner "spinning radar" look
        globe.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
};
