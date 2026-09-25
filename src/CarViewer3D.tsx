import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const paintColors: Record<string, string> = {
  blue: "#0753a6",
  black: "#080b0e",
  white: "#e7e8e3",
  silver: "#aeb4b7",
  gray: "#5a5d60",
};

type Props = { color: string; wheels: string; fallback: string; alt: string };

export default function CarViewer3D({ color, wheels, fallback, alt }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const paint = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const rim = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const controls = useRef<OrbitControls | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    paint.current?.color.set(paintColors[color] || paintColors.blue);
    if (paint.current) paint.current.needsUpdate = true;
  }, [color]);
  useEffect(() => {
    rim.current?.color.set(wheels === "gold" ? "#b68d35" : "#b9bec2");
    if (rim.current) rim.current.needsUpdate = true;
  }, [wheels]);
  useEffect(() => {
    host.current?.querySelector("canvas")?.setAttribute("aria-label", alt);
  }, [alt]);

  useEffect(() => {
    const container = host.current;
    if (!container || failed) return;
    setReady(false);
    let stopped = false;
    let frame = 0;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#edf0f2");
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute("aria-label", alt);
    renderer.domElement.setAttribute("role", "img");
    container.appendChild(renderer.domElement);

    const viewCamera = new THREE.PerspectiveCamera(29, 1, 0.1, 100);
    viewCamera.position.set(5, 2.7, 6.3);
    camera.current = viewCamera;
    const orbit = new OrbitControls(viewCamera, renderer.domElement);
    orbit.target.set(0, 0.76, 0);
    orbit.enablePan = false;
    orbit.enableZoom = false;
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.075;
    orbit.rotateSpeed = 0.62;
    orbit.minPolarAngle = 1.14;
    orbit.maxPolarAngle = 1.44;
    orbit.update();
    controls.current = orbit;

    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(new RoomEnvironment(), 0.035);
    scene.environment = environment.texture;
    const key = new THREE.DirectionalLight("#fff8ed", 3.25);
    key.position.set(4.5, 7, 5.5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = key.shadow.camera.bottom = -5;
    key.shadow.camera.right = key.shadow.camera.top = 5;
    scene.add(key);
    const fill = new THREE.DirectionalLight("#d6e6ff", 1.85);
    fill.position.set(-5, 3, -4);
    scene.add(fill, new THREE.HemisphereLight("#f7fbff", "#6b7175", 1.25));
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.ShadowMaterial({ color: "#33414a", opacity: 0.22 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0.018;
    ground.receiveShadow = true;
    scene.add(ground);

    const bodyPaint = new THREE.MeshPhysicalMaterial({
      color: paintColors[color] || paintColors.blue,
      metalness: 0.42,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.075,
      envMapIntensity: 1.85,
    });
    paint.current = bodyPaint;
    const wheelMetal = new THREE.MeshPhysicalMaterial({
      color: wheels === "gold" ? "#b68d35" : "#b9bec2",
      metalness: 0.94,
      roughness: 0.18,
      clearcoat: 0.5,
      envMapIntensity: 2,
    });
    rim.current = wheelMetal;
    const chrome = new THREE.MeshPhysicalMaterial({ color: "#d9dee1", metalness: 1, roughness: 0.13 });
    const darkChrome = new THREE.MeshPhysicalMaterial({ color: "#41484c", metalness: 0.9, roughness: 0.22 });
    const rubber = new THREE.MeshStandardMaterial({ color: "#101214", roughness: 0.86, metalness: 0.02 });
    const blackPlastic = new THREE.MeshStandardMaterial({ color: "#11161a", roughness: 0.58, metalness: 0.08 });
    const lowerDark = new THREE.MeshStandardMaterial({ color: "#171a1c", roughness: 0.72, metalness: 0.14 });
    const glass = new THREE.MeshPhysicalMaterial({
      color: "#263942", metalness: 0.05, roughness: 0.08, transmission: 0.32,
      transparent: true, opacity: 0.74, clearcoat: 1, side: THREE.DoubleSide,
    });
    const clearLens = new THREE.MeshPhysicalMaterial({
      color: "#f2f6f6", roughness: 0.08, transmission: 0.15,
      transparent: true, opacity: 0.84, clearcoat: 1,
    });
    const redLens = new THREE.MeshPhysicalMaterial({
      color: "#a00912", emissive: "#310004", emissiveIntensity: 0.38, roughness: 0.16, clearcoat: 1,
    });
    const amberLens = new THREE.MeshPhysicalMaterial({
      color: "#e77714", emissive: "#381100", emissiveIntensity: 0.35, roughness: 0.18, clearcoat: 1,
    });
    const hiddenParts = [
      "Rear Bumper Diffuser", "Front Bumper Attachment", "Front Canards", "Front Bumper Skirt",
    ];
    const materials = [bodyPaint, wheelMetal, chrome, darkChrome, rubber, blackPlastic, lowerDark, glass, clearLens, redLens, amberLens];

    new GLTFLoader().load(
      publicAsset("assets/models/sti-blobeye.gltf"),
      (gltf) => {
        if (stopped) return;
        const car = gltf.scene;
        car.rotation.x = -Math.PI / 2;
        car.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          const rawName = object.name;
          const name = rawName.replaceAll("_", " ");
          if (/^(Tire|Rim)/.test(rawName)) {
            const rear = /002|003/.test(rawName);
            const left = /001|003/.test(rawName);
            object.position.set(
              left ? -1.00895 : 1.00895,
              rear ? 1.62606 : -1.79103,
              0.41599,
            );
          }
          object.visible = !hiddenParts.some((part) => name.startsWith(part));
          if (/Car Paint/.test(name)) object.material = bodyPaint;
          else if (/^Rim.* Rim/.test(name)) object.material = wheelMetal;
          else if (/Tire/.test(name)) object.material = rubber;
          else if (/Window/.test(name)) object.material = glass;
          else if (/TL Glass Red/.test(name)) object.material = redLens;
          else if (/Turn Signals|Reflector/.test(name)) object.material = amberLens;
          else if (/Clear|HL Glass/.test(name)) object.material = clearLens;
          else if (/Dark Chrome/.test(name)) object.material = darkChrome;
          else if (/Chrome/.test(name)) object.material = chrome;
          else if (/Bottom|Matte \(Rough\)|Grill/.test(name)) object.material = lowerDark;
          else object.material = blackPlastic;
          object.castShadow = object.receiveShadow = true;
        });
        const bounds = new THREE.Box3().setFromObject(car);
        const center = bounds.getCenter(new THREE.Vector3());
        car.position.set(-center.x, -bounds.min.y + 0.06, -center.z);
        scene.add(car);
        setReady(true);
      },
      undefined,
      () => !stopped && setFailed(true),
    );

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height, false);
      viewCamera.aspect = width / height;
      viewCamera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    const draw = () => {
      orbit.update();
      renderer.render(scene, viewCamera);
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      orbit.dispose();
      environment.dispose();
      pmrem.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) object.geometry.dispose();
      });
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
      paint.current = rim.current = null;
      camera.current = controls.current = null;
    };
  }, [failed]);

  const reset = () => {
    if (!camera.current || !controls.current) return;
    camera.current.position.set(5, 2.7, 6.3);
    controls.current.target.set(0, 0.76, 0);
    controls.current.update();
  };
  if (failed) return <img src={fallback} alt={alt} />;
  return (
    <div className="car-3d-shell">
      <img className={ready ? "car-3d-fallback ready" : "car-3d-fallback"} src={fallback} alt="" />
      <div ref={host} className="car-3d-canvas" />
      {!ready && <span className="car-3d-loading">Preparing 360° view…</span>}
      {ready && <>
        <span className="car-3d-hint">Drag to rotate · tilt slightly up or down</span>
        <button type="button" className="car-3d-reset" onClick={reset} aria-label="Reset 3D view">↻ Reset view</button>
      </>}
    </div>
  );
}
