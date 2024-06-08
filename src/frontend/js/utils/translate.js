const glot = new Glottologist();

const language = "en";

glot.assign("pong", {
  ja: "ポン",
  en: "Pong",
  fr: "Pong",
});

glot.assign("start", {
  ja: "スタート",
  en: "Start",
  fr: "Commencer",
});

glot.assign("dashboard", {
  ja: "ダッシュボード",
  en: "Dashboard",
  fr: "Tableau de bord",
});

function translate(language) {
  glot.render(language);
}
translate(language);
