import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { CartProvider } from "./context/CartContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Header from "./pages/Header";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Help from "./pages/Help";
import Checkout from "./pages/CheckOut";
import Footer from "./pages/Footer";

import ProductPage from "./pages/Product Page/ProductPage";
import Category from "./pages/Categories Pages/Category";
import Genres from "./pages/Categories Pages/GenresPage";
import Err404 from "./pages/err404";

import { Toaster } from "react-hot-toast";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={client}>
        <CartProvider>
          <Toaster />
          <Router>
            <ScrollToTop />
            <div className="bg-slate-50 min-h-screen">
              <div className="mx-auto 2xl:max-w-3/4">
                <Header />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <main>
                        <Home />
                      </main>
                    }
                  />
                  <Route
                    path="/Footer"
                    element={
                      <footer>
                        <Footer />
                      </footer>
                    }
                  />
                  <Route
                    path="/Product/:id"
                    element={
                      <main>
                        <ProductPage />
                      </main>
                    }
                  />
                  <Route
                    path="/Category/:categoryId"
                    element={
                      <main>
                        <Category />
                      </main>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <main>
                        <Err404 />
                      </main>
                    }
                  />
                  <Route
                    path="/Genre/:slug"
                    element={
                      <main>
                        <Genres />
                      </main>
                    }
                  />
                  <Route
                    path="/CartPage"
                    element={
                      <main>
                        <CartPage />
                      </main>
                    }
                  />
                  <Route
                    path="/Help"
                    element={
                      <main>
                        <Help />
                      </main>
                    }
                  />
                  <Route
                    path="/Checkout"
                    element={
                      <main>
                        <Checkout />
                      </main>
                    }
                  />
                </Routes>
                <Footer />
              </div>
            </div>
          </Router>
        </CartProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
