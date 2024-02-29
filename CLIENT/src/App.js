import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { redirect } from "react-router-dom";
import Addform from "./components/Addform";
import DataPage from "./components/DataPage";
import Navbar from "./components/Navbar";
import UpdateForm from "./components/UpdateForm";
import Searchitem from "./components/Searchitem";
import NotFound from "./components/NotFound";
import About from "./components/About";
import Download from "./components/Download";
import Upload from "./components/Upload";
import Login from "./components/auth/login/index";
import Signup from "./components/auth/register/index";  
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { AuthProvider } from "./contexts/authContext";
import { useAuth } from "./contexts/authContext";
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://stock-manager-graphql.onrender.com/" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
const userLoggedin = useAuth()


  return (
    <AuthProvider>
    <ApolloProvider client={client}>
      <Router>
        <div className="min-h-screen min-w-screen overflow-hidden bg-gradient-to-br from-gray-900 to-gray-900 via-gray-800">
          <div className="bg-gradient-to-tr from-transparent to-rgba(114, 114, 114, 0.3) via-rgba(114, 114, 114, 0.3) h-1/2"></div>
          <div className="bg-gradient-to-tr from-transparent to-rgba(114, 114, 114, 0.3) via-rgba(114, 114, 114, 0.3) h-1/2 transform rotate-90"></div>

          <Navbar />

          <Routes>
              <Route path="/" element={<DataPage />} />
              <Route path="/add" element={<Addform />}/>
              <Route path="/update/:id" element={<UpdateForm />} />
              <Route path="/getbyitem" element={<Searchitem />} />
              <Route path="/About" element={<About />} />
              <Route path="/Upload" element={<Upload />} />
              <Route path="/Download" element={<Download />} />

             <Route path="/Login" element={<Login />} />
             <Route path="/register" element={<Signup />} />
             <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
