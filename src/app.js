import "./styles.css";
import { init } from "./framework";

const list = (state, setState) => {
  const handleRemove = (txt) => {
    setState({
      ...state,
      items: state.items.filter((i) => i !== txt),
    });
  };

  return ul(
    state.items.map((txt) =>
      li(
        span([
          txt,
          button("x", {
            className: "remove-btn",
            click: () => handleRemove(txt),
          }),
        ])
      )
    )
  );
};

const app = (state, setState) => {
  const handleInputKeyup = (e) => {
    setState({
      ...state,
      inputValue: e.target.value,
    });
    setTimeout(() => document.querySelector("input").focus(), 0);
  };

  const handleAdd = () => {
    if (!state.inputValue) return;
    setState({
      ...state,
      inputValue: "",
      items: [...state.items, state.inputValue],
    });
  };

  const handleSort = () => {
    setState({
      ...state,
      items: state.items.sort(),
    });
  };

  return div([
    span([
      input("", { value: state.inputValue, keyup: handleInputKeyup }),
      button("add", { click: handleAdd }),
    ]),
    button("sort", { click: handleSort }),
    list(state, setState),
    div([span("STATE:"), pre(JSON.stringify(state, null, 2))]),
  ]);
};

init({
  rootSelector: "#app",
  initialState: {
    items: ["foo", "bar", "baz"],
  },
  app,
});
