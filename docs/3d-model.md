# Interactive exterior model

The WebGL exterior is based on **Subaru Impreza WRX STi 2004 Custom** by **MAC ULT ARTS**:

- Source: https://sketchfab.com/3d-models/subaru-impreza-wrx-sti-2004-custom-08296bc950364621b6174a3078bb19e0
- License: Creative Commons Attribution 4.0 International (CC BY 4.0)
- Source geometry: 77,062 triangles / 43,657 vertices
- Delivery asset: `public/assets/models/sti-blobeye.gltf`

The public viewer geometry was converted to glTF and adapted for this project. The material system was rebuilt in Three.js, all four wheel transforms were reconstructed from the original scene matrices, five paint materials and two wheel finishes were added, and the obvious custom diffuser, tow-hook group, canards, splitter and bumper attachments were hidden. A studio environment, physical clearcoat, glass, chrome, soft lighting and contact shadows provide the final presentation.

The reflections come from **Studio Small 09** by **Sergej Majboroda**, downloaded from [Poly Haven](https://polyhaven.com/a/studio_small_09) under the CC0 public-domain dedication. The renderer uses the 1K HDR version so the lighting remains practical on phones.

The controls allow unrestricted horizontal rotation and a small vertical tilt. Zoom and pan are disabled. The matching studio image is displayed while the model loads and remains the fallback when WebGL is unavailable.

This is a close Blobeye mesh rather than factory Subaru CAD. The underlying model still contains approximate or modified hood, roof, grille, bumper, mirror and exhaust geometry. It should be treated as an interactive historical reconstruction, not a dimensional reference.

## Attachment audit

The source GLTF stores some accessory parts at their object origins rather than
their assembled positions. The misplaced HKS exhaust, aftermarket horns and
loose trunk lock are hidden. The exhaust outlet is rebuilt as a hollow, rolled
single tip beneath the driver's-side rear bumper. The duplicate stock rear
bumper is hidden while the flared bumper remains.

Grille and trunk emblems are attached using ray intersections with their named
body surfaces rather than guessed fore/aft coordinates. Rear lettering faces
outward and reads correctly. The trunk uses a Subaru wordmark instead of the
later oval emblem. The original authored paint normals are preserved; clear
headlamp reflectors are no longer assigned the amber turn-signal material.
The rectangular studio lights now initialize Three.js's required area-light
uniforms.

Placement is visually checked from front, side and rear views. Geometry remains
an approximation: these corrections do not turn this modified base mesh into
a factory-accurate scan or make it indistinguishable from photography.
