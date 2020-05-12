import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  setContainer as setProfileContainer,
  show as showProfile,
  hide as hideProfile,
} from "./profile";
import {
  setContainer as setPockemonContainer,
  show as showPockemon,
  hide as hideProckemon,
} from "./pockemon";

const showTabs = {
  profile: showProfile,
  pockemon: showPockemon,
};

const hideTabs = {
  profile: hideProfile,
  pockemon: hideProckemon,
};

setProfileContainer($("#profile"));
setPockemonContainer($("#pockemon"));

$('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
  const active = e.target.getAttribute("aria-controls");

  showTabs[active]();
});

$('a[data-toggle="tab"]').on("hide.bs.tab", function (e) {
  const active = e.target.getAttribute("aria-controls");

  hideTabs[active]();
});
