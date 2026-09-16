// ---------------------------------------------------------------------------
// HOW TO ADD YOUR OWN PROJECT PHOTOS
// ---------------------------------------------------------------------------
// 1. Put your image files inside:  src/assets/projects/
//
// 2. Import each one at the top of this file:
//    import sparklehub from "../assets/projects/sparklehub.jpg";
//
// 3. Add an entry to `projectImages` below. The key just needs to be a
//    lowercase word/phrase that appears in that project's title.
//    - "image" = small preview shown on the card (crop/use anything, even a
//      big busy screenshot — it'll be scaled down safely)
//    - "full"  = (optional) shown in a popup when the user clicks the image.
//      If you skip this, clicking just shows the "image" bigger.
//    - "logo"  = (optional) small round badge shown on the corner.
// ---------------------------------------------------------------------------

import campusPulse from "../assets/projects/campus-pulse.jpeg";
import campusPulseFull from "../assets/projects/campus-pulse-full.jpeg";
import campusPulseLogo from "../assets/projects/campus-pulse-logo.jpeg";

const projectImages = {
  "campus pulse": { image: campusPulse, full: campusPulseFull, logo: campusPulseLogo },
  // "sparklehub": { image: sparklehub },
};

export function getProjectImage(title = "") {
  const lower = title.toLowerCase();
  const key = Object.keys(projectImages).find((k) => lower.includes(k));
  return key ? projectImages[key] : null;
}