import mapboxgl from "mapbox-gl";
import { atom } from "recoil";

const element = document.createElement("div");
element.style.width = "100vw";
element.style.height = "100vh";
element.style.boxSizing = "initial";
const newMap = new mapboxgl.Map({
  accessToken:
    "pk.eyJ1IjoibW9oYW1tYWRyYXVmemFoZWQiLCJhIjoiY2w1NnJyMGxtMWlzbDNqbjllazVzeGJ3dCJ9.i3QS34J5kFlVaS3fLkj0Tw",
  container: element,
});

const mapState = atom({
  key: "map",
  default: newMap,
});

export default mapState;
