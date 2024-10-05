/*import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { store } from "../data/index";
// import { render, RenderOptions } from "@testing-library/react";

const MockedProviders = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

/!**
 * A custom render to setup providers
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 *!/
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: MockedProviders, ...options });

export { customRender as render };*/

const customRender = () => {};
export { customRender as render };
