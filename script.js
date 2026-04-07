window.onload = function() {
    const container = document.getElementById('globe-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const globe = new THREE.Mesh(
        new THREE.SphereGeometry(1, 10, 10), 
        new THREE.MeshBasicMaterial({ 
            color: 0xff9d00, /* Matching the new Vibrant Amber */
            wireframe: true, 
            opacity: 0.4, 
            transparent: true 
        })
    );
    
    globe.scale.set(1.9, 1.9, 1.9);
    scene.add(globe);

    function animate() {
        requestAnimationFrame(animate);
        globe.rotation.y += 0.0018;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
};
