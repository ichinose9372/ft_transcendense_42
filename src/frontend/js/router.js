// const state = { page: "" };
// const setState = (key, value) => { state[key] = value; };

const homeComponent = () => {
  return `<h1>Home  画面</h1>`;
};
const aboutComponent = () => {
  return `<h1>About 画面</h1>`;
};

pages = {
  "/": homeComponent,
  "/about": aboutComponent,
};

import matcherToParamExtractor, { Params } from "./matcherToParamExtractor";
export default router = (
  pages, // : { [key: string]: ((params: Params) => string) | string }
  notfound, // : string
  element // : HTMLElement
) => {
  const updateView = () => {
    const mount = (html) => {
      element.innerHTML = html;
    };
    const path = window.location.pathname;
    const page = pages[path] || notfound;
    mount(page);
  };

  //アンカーリンクにルーターのリンクを仕込む
  document.querySelectorAll("a").forEach((a) => {
    a.onclick = (event) => {
      event.preventDefault();
      window.history.pushState(null, "", a.href);
      updateView();
    };
  });

  //ブラウザバックを監視
  window.addEventListener("popstate", () => {
    updateView();
  });

  //初期化
  updateView();
};

router(pages, `<h1>404 : Not Found<h1>`, document.getElementById("app"));
