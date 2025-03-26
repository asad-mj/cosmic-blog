import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { initScrollAnimations } from "./lib/animations";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StarsBackground from "./components/StarsBackground";

// Pages
import Home from "./pages/Home";
import Article from "./pages/Article";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/articles/:slug" component={Article} />
      <Route path="/categories/:slug" component={CategoryPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Initialize scroll animations when the app mounts
    initScrollAnimations();
  }, []);

  return (
    <>
      <StarsBackground />
      <Navbar />
      <Router />
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
