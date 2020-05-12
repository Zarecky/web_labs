import request from "./request";

export let container;

export function setContainer(c) {
  container = c;
}

export function show() {
  if (!container) {
    return;
  }

  request({ url: "https://pokeapi.co/api/v2/pokemon/45/" })
    .then((data) => {
      const { name, abilities } = JSON.parse(data);

      const nameElement = $("<h2></h2>").text(name);
      const abilitiesTitleElement = $("<h3></h3>").text("Abilities:");
      const abilitiesElement = $("<ul></ul>").append(
        abilities.map(({ ability: { name } }) => $("<li></li>").text(name))
      );

      container.append(nameElement);
      container.append(abilitiesTitleElement);
      container.append(abilitiesElement);
    })
    .catch((e) => {
      container.append($("<p></p>").text(e));
    });
}

export function hide() {
  if (!container) {
    return;
  }

  container.empty();
}
