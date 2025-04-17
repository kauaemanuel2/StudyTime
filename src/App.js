import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Navbar from "./componentes/layout/Navbar";
import Container from "./componentes/layout/Container";
import Footer from "./componentes/layout/Footer";
import Main from "./componentes/pages/Main";
import Formulario from "./componentes/pages/Formulario";
import Dashboard from './componentes/pages/Dashboard'
import Materias from "./componentes/pages/Materias";


function App() {
  return (
    <Router>
      <div className="appWrapper">
        <Navbar />
        <Container customClass = "min-heigth">
          <Routes>
            <Route path = "/" element = {<Main />}/>
            <Route path = "/formulario" element = {<Formulario />}/>
            <Route path = "/dashboard" element = {<Dashboard />}/>
            <Route path = "/materias" element = {<Materias />}/>
          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
