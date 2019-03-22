import "normalize.css";
import "../scss/common";
import "github-markdown-css";
import "gitting/dist/gitting.css";
import Highway from "@dogstudio/highway";
import Transition from "./transition";
import VanillaTilt from "vanilla-tilt";
import loading from 'app-loading';
const { website } = __config__;
import { smoothScroll, scrollFixed } from "./utils";

const H = new Highway.Core({
  renderers: {
    index: () => import(/* webpackChunkName: "index" */ "./index"),
    about: () => import(/* webpackChunkName: "about" */ "./about"),
    archive: () => import(/* webpackChunkName: "archive" */ "./archive"),
    message: () => import(/* webpackChunkName: "message" */ "./message"),
    friends: () => import(/* webpackChunkName: "friends" */ "./friends"),
    post: () => import(/* webpackChunkName: "post" */ "./post"),
    404: () => import(/* webpackChunkName: "404" */ "./404")
  },
  transitions: {
    default: Transition
  }
});

Object.defineProperty(Highway, 'update', {
  value: () => {
    const allLinks = document.querySelectorAll('a');
    H.detach(allLinks);
    H.attach(allLinks);
  }
});

VanillaTilt.init(document.querySelector(".logo .inner"));

let scrollMenuView = false;
scrollFixed('.layout', 0, type => {
  scrollMenuView = type;
});

function currentMenu() {
  const pageName = window.location.pathname;
  const menuList = Array.from(document.querySelectorAll('.menu .menu-item'));
  const current = menuList.find(item => item.href.includes(pageName));
  menuList.forEach(item => item.classList.remove('current'));
  if (current) {
    current.classList.add('current');
  }
}

H.on('NAVIGATE_OUT', (from, location) => {
  loading.setColor(website.plugins.loading).start();
});

currentMenu();
H.on('NAVIGATE_IN', (to, location) => {
  currentMenu();
});

H.on('NAVIGATE_END', (from, to, location) => {
  scrollMenuView && setTimeout(smoothScroll, 100, to.view);
  setTimeout(loading.stop.bind(loading), 500);
});