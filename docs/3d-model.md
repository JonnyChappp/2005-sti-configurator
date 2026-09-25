# Interactive exterior model

The WebGL exterior is based on **Subaru Impreza WRX STi 2004 Custom** by **MAC ULT ARTS**:

- Source: https://sketchfab.com/3d-models/subaru-impreza-wrx-sti-2004-custom-08296bc950364621b6174a3078bb19e0
- License: Creative Commons Attribution 4.0 International (CC BY 4.0)
- Source geometry: 77,062 triangles / 43,657 vertices
- Delivery asset: `public/assets/models/sti-blobeye.gltf`

The public viewer geometry was converted to glTF and adapted for this project. The material system was rebuilt in Three.js, all four wheel transforms were reconstructed from the original scene matrices, five paint materials and two wheel finishes were added, and the obvious custom diffuser, tow-hook group, canards, splitter and bumper attachments were hidden. A studio environment, physical clearcoat, glass, chrome, soft lighting and contact shadows provide the final presentation.

The controls allow unrestricted horizontal rotation and a small vertical tilt. Zoom and pan are disabled. The matching studio image is displayed while the model loads and remains the fallback when WebGL is unavailable.

This is a close Blobeye mesh rather than factory Subaru CAD. The underlying model still contains approximate or modified hood, roof, grille, bumper, mirror and exhaust geometry. It should be treated as an interactive historical reconstruction, not a dimensional reference.
