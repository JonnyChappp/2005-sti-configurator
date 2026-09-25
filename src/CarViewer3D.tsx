import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const paintColors: Record<string, string> = {
  blue: "#063d91",
  black: "#05070a",
  white: "#e6e7e2",
  silver: "#a8afb4",
  gray: "#50555a",
};
const paintFinish: Record<string, { metalness: number; roughness: number }> = {
  blue: { metalness: 0.38, roughness: 0.19 },
  black: { metalness: 0.34, roughness: 0.16 },
  white: { metalness: 0.08, roughness: 0.22 },
  silver: { metalness: 0.68, roughness: 0.24 },
  gray: { metalness: 0.52, roughness: 0.22 },
};

const defaultViewDirection = new THREE.Vector3(5, 1.94, 6.3).normalize();

function cameraDistanceForAspect(aspect: number) {
  const wide = THREE.MathUtils.clamp((aspect - 1.55) / 0.75, 0, 1);
  return THREE.MathUtils.lerp(8.3, 6.75, wide);
}

function paintMicroTexture() {
  const size = 128;
  const data = new Uint8Array(size * size * 4);
  let seed = 2005;
  for (let i = 0; i < data.length; i += 4) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const grain = 116 + ((seed >>> 24) % 25);
    data[i] = data[i + 1] = data[i + 2] = grain;
    data[i + 3] = 255;
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(22, 22);
  texture.needsUpdate = true;
  return texture;
}

function badgeTexture(kind: "subaru" | "sti") {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, 256, 128);
  if (kind === "subaru") {
    ctx.fillStyle = "#081d58";
    ctx.strokeStyle = "#d8e2ea";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.ellipse(128, 64, 112, 49, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f7fbff";
    const stars = [[88, 64, 12], [137, 42, 7], [164, 55, 6], [142, 76, 6], [176, 82, 5], [115, 86, 5]];
    for (const [x, y, radius] of stars) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
      ctx.restore();
    }
  } else {
    ctx.font = "italic 900 78px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#4e001c";
    ctx.strokeText("STi", 128, 67);
    ctx.fillStyle = "#e41257";
    ctx.fillText("STi", 128, 67);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function studioBackdropTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  const vertical = ctx.createLinearGradient(0, 0, 0, 512);
  vertical.addColorStop(0, "#f7f9fa");
  vertical.addColorStop(0.62, "#e9edef");
  vertical.addColorStop(1, "#d5dbde");
  ctx.fillStyle = vertical;
  ctx.fillRect(0, 0, 512, 512);
  const glow = ctx.createRadialGradient(256, 260, 10, 256, 260, 280);
  glow.addColorStop(0, "rgba(255,255,255,.82)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 512, 512);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function contactShadowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const shadow = ctx.createRadialGradient(128, 128, 18, 128, 128, 126);
  shadow.addColorStop(0, "rgba(15,22,26,.72)");
  shadow.addColorStop(0.45, "rgba(20,28,32,.42)");
  shadow.addColorStop(1, "rgba(30,38,42,0)");
  ctx.fillStyle = shadow;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}

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
    if (paint.current) {
      const finish = paintFinish[color] || paintFinish.blue;
      paint.current.metalness = finish.metalness;
      paint.current.roughness = finish.roughness;
      paint.current.needsUpdate = true;
    }
  }, [color]);
  useEffect(() => {
    rim.current?.color.set(wheels === "gold" ? "#a97e2d" : "#aeb5bb");
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
    const backdrop = studioBackdropTexture();
    scene.background = backdrop;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.AgXToneMapping;
    renderer.toneMappingExposure = 1.08;
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
    let environment = pmrem.fromScene(new RoomEnvironment(), 0.035);
    scene.environment = environment.texture;
    new RGBELoader().load(
      publicAsset("assets/environment/studio-small-09.hdr"),
      (hdr) => {
        if (stopped) {
          hdr.dispose();
          return;
        }
        const photographicEnvironment = pmrem.fromEquirectangular(hdr);
        hdr.dispose();
        environment.dispose();
        environment = photographicEnvironment;
        scene.environment = environment.texture;
      },
    );
    const key = new THREE.DirectionalLight("#fff9f0", 2.15);
    key.position.set(4.5, 7, 5.5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = key.shadow.camera.bottom = -5;
    key.shadow.camera.right = key.shadow.camera.top = 5;
    key.shadow.bias = -0.00012;
    key.shadow.normalBias = 0.025;
    key.shadow.radius = 5;
    scene.add(key);
    const fill = new THREE.DirectionalLight("#dbeaff", 0.62);
    fill.position.set(-5, 3, -4);
    const strip = new THREE.RectAreaLight("#f4f7ff", 16, 5.5, 1.8);
    strip.position.set(-3.5, 5, 2.5);
    strip.lookAt(0, 0.7, 0);
    const rimLight = new THREE.RectAreaLight("#fff4df", 10, 3.5, 2);
    rimLight.position.set(3.8, 3.2, -4.5);
    rimLight.lookAt(0, 0.8, 0);
    scene.add(fill, strip, rimLight, new THREE.HemisphereLight("#f8fbff", "#5f6569", 0.42));
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.ShadowMaterial({ color: "#29343a", opacity: 0.2 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0.018;
    ground.receiveShadow = true;
    scene.add(ground);
    const contactMap = contactShadowTexture();
    const contactShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(2.55, 5.1),
      new THREE.MeshBasicMaterial({
        map: contactMap,
        transparent: true,
        opacity: 0.44,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.03;
    contactShadow.renderOrder = 2;
    scene.add(contactShadow);

    const paintGrain = paintMicroTexture();
    const finish = paintFinish[color] || paintFinish.blue;
    const bodyPaint = new THREE.MeshPhysicalMaterial({
      color: paintColors[color] || paintColors.blue,
      metalness: finish.metalness,
      roughness: finish.roughness,
      clearcoat: 1,
      clearcoatRoughness: 0.045,
      envMapIntensity: 1.55,
      bumpMap: paintGrain,
      bumpScale: 0.0017,
      ior: 1.5,
      specularIntensity: 1,
    });
    paint.current = bodyPaint;
    const wheelMetal = new THREE.MeshPhysicalMaterial({
      color: wheels === "gold" ? "#a97e2d" : "#aeb5bb",
      metalness: 1,
      roughness: 0.23,
      clearcoat: 0.35,
      envMapIntensity: 1.45,
    });
    rim.current = wheelMetal;
    const chrome = new THREE.MeshPhysicalMaterial({ color: "#cfd5da", metalness: 1, roughness: 0.12, envMapIntensity: 1.65 });
    const darkChrome = new THREE.MeshPhysicalMaterial({ color: "#333a3f", metalness: 0.92, roughness: 0.2 });
    const rubber = new THREE.MeshStandardMaterial({ color: "#090b0c", roughness: 0.92, metalness: 0.01 });
    const blackPlastic = new THREE.MeshStandardMaterial({ color: "#0c1114", roughness: 0.62, metalness: 0.03 });
    const lowerDark = new THREE.MeshStandardMaterial({ color: "#121619", roughness: 0.78, metalness: 0.08 });
    const glass = new THREE.MeshPhysicalMaterial({
      color: "#101b22", metalness: 0, roughness: 0.06, transmission: 0.18,
      thickness: 0.015, ior: 1.52, attenuationColor: "#1d333e", attenuationDistance: 0.7,
      opacity: 1, clearcoat: 1, envMapIntensity: 1.35, side: THREE.DoubleSide,
    });
    const clearLens = new THREE.MeshPhysicalMaterial({
      color: "#e8f1f3", roughness: 0.055, transmission: 0.72,
      thickness: 0.012, ior: 1.49, opacity: 1, clearcoat: 1,
      envMapIntensity: 1.5, side: THREE.DoubleSide,
    });
    const redLens = new THREE.MeshPhysicalMaterial({
      color: "#9b0711", emissive: "#1c0002", emissiveIntensity: 0.16,
      roughness: 0.12, clearcoat: 1, transmission: 0.06, thickness: 0.01,
    });
    const amberLens = new THREE.MeshPhysicalMaterial({
      color: "#e77714", emissive: "#381100", emissiveIntensity: 0.35, roughness: 0.18, clearcoat: 1,
    });
    const brakeRotor = new THREE.MeshStandardMaterial({ color: "#697076", metalness: 0.92, roughness: 0.34 });
    const brakeCaliper = new THREE.MeshPhysicalMaterial({
      color: "#b88726", metalness: 0.72, roughness: 0.24, clearcoat: 0.7,
    });
    const subaruBadgeMap = badgeTexture("subaru");
    const stiBadgeMap = badgeTexture("sti");
    const subaruBadge = new THREE.MeshBasicMaterial({
      map: subaruBadgeMap, transparent: true, depthWrite: false, toneMapped: false,
    });
    const stiBadge = new THREE.MeshBasicMaterial({
      map: stiBadgeMap, transparent: true, depthWrite: false, toneMapped: false,
    });
    const hiddenParts = [
      "Rear Bumper Diffuser", "Front Bumper Attachment", "Front Canards", "Front Bumper Skirt",
    ];
    const materials = [
      bodyPaint, wheelMetal, chrome, darkChrome, rubber, blackPlastic, lowerDark,
      glass, clearLens, redLens, amberLens, brakeRotor, brakeCaliper,
      subaruBadge, stiBadge,
    ];

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
          if (/Car Paint/.test(name)) {
            // The source scan was aggressively optimized. Rebuilding the paint
            // normals removes the faceted shading that otherwise reads as a game model.
            object.geometry.computeVertexNormals();
            object.geometry.normalizeNormals();
            object.material = bodyPaint;
          }
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

        const rotorGeometry = new THREE.CylinderGeometry(0.295, 0.295, 0.025, 48);
        const caliperGeometry = new THREE.BoxGeometry(0.055, 0.18, 0.31, 2, 2, 4);
        const wheelCenters = [
          { x: 1.00895, y: -1.79103 },
          { x: -1.00895, y: -1.79103 },
          { x: 1.00895, y: 1.62606 },
          { x: -1.00895, y: 1.62606 },
        ];
        for (const wheel of wheelCenters) {
          const rotor = new THREE.Mesh(rotorGeometry, brakeRotor);
          rotor.rotation.z = Math.PI / 2;
          rotor.position.set(wheel.x, wheel.y, 0.41599);
          rotor.castShadow = true;
          car.add(rotor);
          const caliper = new THREE.Mesh(caliperGeometry, brakeCaliper);
          caliper.position.set(wheel.x, wheel.y + (wheel.y < 0 ? 0.16 : -0.16), 0.43);
          caliper.rotation.x = 0.08;
          caliper.castShadow = true;
          car.add(caliper);
        }

        const addBadge = (
          material: THREE.Material,
          width: number,
          height: number,
          position: [number, number, number],
          front: boolean,
        ) => {
          const badge = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
          badge.position.set(...position);
          badge.rotation.x = front ? Math.PI / 2 : -Math.PI / 2;
          badge.renderOrder = 4;
          car.add(badge);
        };
        addBadge(subaruBadge, 0.25, 0.105, [0, -3.236, 0.77], true);
        addBadge(stiBadge, 0.18, 0.09, [-0.31, -3.238, 0.63], true);
        addBadge(subaruBadge, 0.24, 0.1, [0, 2.855, 1.14], false);
        addBadge(stiBadge, 0.17, 0.085, [0.31, 2.858, 1.03], false);

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
      const direction = viewCamera.position.clone().sub(orbit.target).normalize();
      viewCamera.position.copy(orbit.target).addScaledVector(direction, cameraDistanceForAspect(viewCamera.aspect));
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
      backdrop.dispose();
      contactMap.dispose();
      contactShadow.material.dispose();
      paintGrain.dispose();
      subaruBadgeMap.dispose();
      stiBadgeMap.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      paint.current = rim.current = null;
      camera.current = controls.current = null;
    };
  }, [failed]);

  const reset = () => {
    if (!camera.current || !controls.current) return;
    controls.current.target.set(0, 0.76, 0);
    camera.current.position
      .copy(controls.current.target)
      .addScaledVector(defaultViewDirection, cameraDistanceForAspect(camera.current.aspect));
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
