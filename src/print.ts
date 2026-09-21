import { buildDocument } from "./export";
import { decode, initial } from "./engine";
const content = new DOMParser().parseFromString(
  buildDocument(decode(location.search) || initial),
  "text/html",
);
document.title = content.title;
document.head.append(...content.head.querySelectorAll("style"));
document.body.replaceChildren(...content.body.childNodes);
