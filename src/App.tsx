import { ChakraProvider } from "@chakra-ui/react";
import { HashRouter, Route, Routes } from "react-router-dom";

import { Auth } from "./Auth";
import { ThemeProvider } from "./Theme";
import { Home } from "./pages/Home";
import { TextEditor } from "./pages/TextEditor";

export const App = () => {
  return (
    <ChakraProvider>
      <Auth>
        <HashRouter>
          <Routes>
            <Route path="/" element={<ThemeProvider />}>
              <Route index element={<Home />} />
              <Route path="/#/:id" element={<TextEditor />} />
            </Route>
          </Routes>
        </HashRouter>
      </Auth>
    </ChakraProvider>
  );
};
