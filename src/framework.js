export const init = ({ rootSelector, app, initialState }) => {
  const createTag = (tag) => (
    content,
    { value, className, ...handlers } = {}
  ) => {
    const item = document.createElement(tag);

    if (content) {
      if (Array.isArray(content)) {
        item.append(...content);
      } else {
        item.append(content);
      }
    }

    if (handlers) {
      Object.keys(handlers).forEach((event) => {
        item.addEventListener(event, handlers[event]);
      });
    }

    if (value !== undefined) {
      item.value = value;
    }

    if (className) {
      item.classList.add(className);
    }

    return item;
  };

  ["li", "button", "ul", "span", "div", "input", "pre"].forEach(
    (tag) => (window[tag] = createTag(tag))
  );

  const root = document.querySelector(rootSelector);
  const setState = (state) => render(state);

  const render = (state) => {
    root.innerHTML = "";
    const view = app(state, setState);
    root.append(view);
  };

  render(initialState);
};
