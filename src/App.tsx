import { HashRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Wrapper from "./layout/Wrapper"
import Faqs from "./pages/Faqs"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import TermsAndConditions from "./pages/TermsAndConditions"
import Guide from "./pages/Guide"
import Bookmarks from "./pages/Bookmarks"
import About from "./pages/About"

export default function Page() {

  return (
    <HashRouter>
      <Wrapper>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Wrapper>
    </HashRouter>
  )
}
