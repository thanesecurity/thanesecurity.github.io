window.onload = function() {
  const container = document.getElementById('globe-container');
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a1a);

  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Wireframe globe (less dense, darker orange)
  const globeGeometry = new THREE.SphereGeometry(1, 16, 16);
  const globeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffa500,
    wireframe: true,
    opacity: 0.9,
    transparent: true
  });
  const globe = new THREE.Mesh(globeGeometry, globeMaterial);
  globe.scale.set(1.8, 1.8, 1.8); // larger
  globe.position.x = 0.2;          // move to the right
  globe.position.y = -0.4           //move down slightly
  scene.add(globe);

  // Optional subtle yellow highlight
  //const highlightMaterial = new THREE.MeshBasicMaterial({
    //color: 0xffff00,
    //wireframe: true,
    //opacity: 0.15,
    //transparent: true
  //});
  //const highlightGlobe = new THREE.Mesh(globeGeometry.clone(), highlightMaterial);
  //highlightGlobe.scale.set(1.5, 1.5, 1.5);
  //scene.add(highlightGlobe);

  // Static OSINT Stats Callouts
  const stats = ["Profiles:128", "Emails:54", "Weak Passwords:12", "Linked Accounts:23"];
  stats.forEach((text, i) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.font = "30px Arial";
    ctx.fillStyle = "#1a1a1a";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }));

    // Static positions around globe
    const angle = (i / stats.length) * Math.PI * 2;
    const radius = 3.0; //position further out from the globe
    const yoffset = 0.5; //keep them slightly above the globe's equator
    sprite.position.set(Math.cos(angle) * radius, 0.5, Math.sin(angle) * radius);

    scene.add(sprite);
  });

  // Animate globe rotation only
  function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.002; // slower rotation
    //highlightGlobe.rotation.y += 0.002;
    renderer.render(scene, camera);
  }

  animate();

  // Responsive resizing
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
};
