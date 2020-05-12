export let container;

export function setContainer(c) {
  container = c;
}

export function show() {
  console.log(container);
  if (!container) {
    return;
  }

  const nameField = $("<p></p>").text("Name: Anbdrei");
  const surnameField = $("<p></p>").text("Surname: Gorbenko");
  const groupField = $("<p></p>").text("Group: M3306");

  container.append(nameField);
  container.append(surnameField);
  container.append(groupField);
}

export function hide() {
  if (!container) {
    return;
  }

  container.empty();
}
