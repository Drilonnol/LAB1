
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Header from './components/layout/header';
import Sidebar from './components/layout/sidebar';
import LogoutButton from './components/logoutButton';
import Signin from './actions/Regjister/sigin';
import SignupPage from './actions/Regjister/registerForm';
import QytetiList from './components/qytetelist';
import AddQyteti from './components/Qytete/addQytete';
import UpdateQyteti from './components/Qytete/uptadeQyteti';
import SpitaliList from './components/spitalilist';
import AddSpitali from './components/Spitali/createSpitali';
import UpdateSpitali from './components/Spitali/uptadeSpitali';
import RepartiList from './components/repartlist';
import AddReparti from './components/Reparti/addReparti';
import UpdateReparti from './components/Reparti/updateReparti';
import MjketList from './components/mjekteList';
import AddMjket from './components/Mjkete/addMjeket';
import PacinetList from './components/pacinetList';
import AddPacinet from './components/Pacinet/addPacinet';
import UpdatePacienti from './components/Pacinet/uptadePacinet';
import UptadeMjeket from './components/Mjkete/updateMjket';
import InfermierList from './components/infermieretList';
import AlergjiaListList from './components/alergjiaList';
import AddAlergjia from './components/Alergjia/addAlergjia';
import TaskList from './components/taskimetlist';
import AddTask from './components/Takimet/AddTakimet';
import UpdateTask from './components/Takimet/uptadeTakimet';
import UpdateAlergjia from './components/Alergjia/uptadeAlergjia';
import UptadeSpecializimii from './components/Specializimi/uptadeSpecializimi';
import CreateSpecializimiForm from './components/Specializimi/createSpecializimi';
import SpecializimiComponent from './components/Specializimi/specializimi';
import AddReceta from './components/Receta/addReceta';
import RecetaList from './components/recetaList';
import UpdateReceta from './components/Receta/updateReceta';
import CreatePacienti from './components/Pacinet/createPacienet';
import ListPacinet from './components/Pacinet/listaPacient';
import CreateAlergjiaS from './components/Pacinet/creteAlergjiaS';
import CreateMjeketS from './components/Mjkete/createMjeketS';
import ListMjeketS from './components/Mjkete/listMjeketS';
import CreateTakimiS from './components/Mjkete/createTakimiS';
import UserList from './components/userList';
import UserProfile from './components/USER/userProfile';
import TakimiByIdList from './components/takimibyIDlist';
import Home from './components/layout/home';
import ShfaqInfoTak from './components/Takimet/shfaqinfo';
import AddInfermieret from './components/Infermieret/addInferminert';
import UpdateInfermieret from './components/Infermieret/uptade';

function AuthenticatedApp() {
  const role = localStorage.getItem('role');
  const location = useLocation();

  const isAuthPage = location.pathname === '/' || location.pathname === '/s';

  if (role !== "admin") {
    return (
      <div>
        <Header />
        <hr />
        {!isAuthPage && <LogoutButton />}
        <div className="d-flex">
          {!isAuthPage && <Sidebar />}
          <Routes>
            <Route exact path='/' element={<Signin />} />
            <Route exact path='/s' element={<SignupPage />} />
            <Route exact path='/qytetiList' element={<QytetiList />} />
            <Route exact path='/employeeList/:qyteti_id' element={<SpitaliList />} />
            <Route exact path="/repartiList/:qytetiId/:spitaliId" element={<RepartiList />} />
            <Route exact path="/mjeketList/:qytetiId/:spitaliId/:repartiId" element={<MjketList />} />
            <Route exact path='/CreatePacienti/:qytetiId/:spitaliId/:repartiId' element={<CreatePacienti />} />
            <Route exact path="/ListPacinet/:qytetiId/:spitaliId/:repartiId" element={<ListPacinet />} />
            <Route exact path="/CreateTakimiS/:repartiId/:mjekuId" element={<CreateTakimiS />} />
            <Route exact path='/profile' element={<UserProfile />} />
            <Route exact path='/takimet/:userProfileId' element={<TakimiByIdList />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/info/:repartiId/:mjketId/:takimiId' element={<ShfaqInfoTak />} />
            <Route exact path="/updateTask/:repartiId/:mjketId/:takimiId" element={<UpdateTask />} />
            <Route exact path="/updateInfermieri/:qytetiId/:spitaliId/:repartiId/:infermieretId" element={<UpdateInfermieret />} />
              <Route exact path="/addInfermieret/:qytetiId/:spitaliId/:repartiId" element={<AddInfermieret />} /> {/* Add this Route */}
              <Route exact path="/infermiertList/:qytetiId/:spitaliId/:repartiId" element={<InfermierList />} />
          </Routes>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <hr />
        {!isAuthPage && <LogoutButton />}
        <div className="d-flex">
          {!isAuthPage && <Sidebar />}
          <Routes>
            <Route exact path='/' element={<Signin />} />
            <Route exact path='/s' element={<SignupPage />} />
            <Route exact path='/qytetiList' element={<QytetiList />} />
            <Route exact path='/createQytetiForm' element={<AddQyteti />} />
            <Route exact path='/uptadeQytetiform/:id' element={<UpdateQyteti />} />
            <Route exact path='/employeeList/:qyteti_id' element={<SpitaliList />} />
            <Route exact path="/createSpitaliForm/:qytetiId" element={<AddSpitali />} />
            <Route exact path="/updateSpitaliForm/:qytetiId/:spitaliId" element={<UpdateSpitali />} />
            <Route exact path="/repartiList/:qytetiId/:spitaliId" element={<RepartiList />} />
            <Route exact path="/createRepartiForm/:qytetiId/:spitaliId" element={<AddReparti />} />
            <Route exact path='/updateRepartiform/:qytetiId/:spitaliId/:repartiId' element={<UpdateReparti />} />
            <Route exact path="/mjeketList/:qytetiId/:spitaliId/:repartiId" element={<MjketList />} />
            <Route exact path='/addMjeket/:qytetiId/:spitaliId/:repartiId' element={<AddMjket />} />
            <Route exact path="/updateMjekeForm/:qytetiId/:spitaliId/:repartiId/:mjketId" element={<UptadeMjeket />} />
            <Route exact path="/pacinetList/:qytetiId/:spitaliId/:repartiId" element={<PacinetList />} />
            <Route exact path='/addPacinet/:qytetiId/:spitaliId/:repartiId' element={<AddPacinet />} />
            <Route exact path="/updatePacinetiForm/:qytetiId/:spitaliId/:repartiId/:pacientId" element={<UpdatePacienti />} />
            <Route exact path="/alergjiaList/:repartiId/:pacinetiId" element={<AlergjiaListList />} />
            <Route exact path="/createAlergjiaForm/:repartiId/:pacinetiId" element={<AddAlergjia />} />
            <Route exact path="/taskList/:repartiId/:mjketId" element={<TaskList />} />
            <Route exact path="/addTask/:repartiId/:mjketId" element={<AddTask />} />
            <Route exact path="/updateTask/:repartiId/:mjketId/:takimiId" element={<UpdateTask />} />
            <Route exact path="/updateAlergjiaForm/:repartiId/:pacinetiId/:alergjiaId" element={<UpdateAlergjia />} />
            <Route exact path="/specializimi/:mjketId" element={<SpecializimiComponent />} />
            <Route exact path="/create-specializimi/:mjketId" element={<CreateSpecializimiForm />} />
            <Route exact path="/update-specializimi/:specializimiId" element={<UptadeSpecializimii />} />
            <Route exact path="/recetaList/:repartiId/:mjekuId" element={<RecetaList />} />
            <Route exact path="/addreceta/:mjekuId" element={<AddReceta />} />
            <Route exact path="/updatereceta/:mjekuId" element={<UpdateReceta />} />
            <Route exact path='/CreatePacienti/:qytetiId/:spitaliId/:repartiId' element={<CreatePacienti />} />
            <Route exact path="/ListPacinet/:qytetiId/:spitaliId/:repartiId" element={<ListPacinet />} />
            <Route exact path="/CreateAlergjiaS/:repartiId/:pacinetiId" element={<CreateAlergjiaS />} />
            <Route exact path='/CreateMjeket/:qytetiId/:spitaliId/:repartiId' element={<CreateMjeketS />} />
            <Route exact path="/ListMjeket/:qytetiId/:spitaliId/:repartiId" element={<ListMjeketS />} />
            <Route exact path="/CreateTakimiS/:repartiId/:mjekuId" element={<CreateTakimiS />} />
            <Route exact path='/userList' element={<UserList />} />
            <Route exact path='/profile' element={<UserProfile />} />
            <Route exact path='/takimet/:userProfileId' element={<TakimiByIdList />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/info/:repartiId/:mjketId/:takimiId' element={<ShfaqInfoTak />} />
            <Route exact path="/updateInfermieri/:qytetiId/:spitaliId/:repartiId/:infermieretId" element={<UpdateInfermieret />} />
            <Route exact path="/addInfermieret/:qytetiId/:spitaliId/:repartiId" element={<AddInfermieret />} /> {/* Add this Route */}
            <Route exact path="/infermiertList/:qytetiId/:spitaliId/:repartiId" element={<InfermierList />} />
          </Routes>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthenticatedApp />
      </Router>
    </Provider>
  );
}

export default App;



/*import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from './components/layout/header';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import QytetiList from './components/qytetelist';
import AddQyteti from './components/Qytete/addQytete';
import UpdateQyteti from './components/Qytete/uptadeQyteti';
import SpitaliList from './components/spitalilist';
import AddSpitali from './components/Spitali/createSpitali';
import UpdateSpitali from './components/Spitali/uptadeSpitali';
import RepartiList from './components/repartlist';
import AddReparti from './components/Reparti/addReparti';
import UpdateReparti from './components/Reparti/updateReparti';
import MjketList from './components/mjekteList';
import AddMjket from './components/Mjkete/addMjeket';
import PacinetList from './components/pacinetList';
import AddPacinet from './components/Pacinet/addPacinet';
import UpdatePacienti from './components/Pacinet/uptadePacinet';
import UptadeMjeket from './components/Mjkete/updateMjket';
import InfermierList from './components/infermieretList';
import AlergjiaListList from './components/alergjiaList';
import AddAlergjia from './components/Alergjia/addAlergjia';
import TaskList from './components/taskimetlist';
import AddTask from './components/Takimet/AddTakimet';
import UpdateTask from './components/Takimet/uptadeTakimet';
import UpdateAlergjia from './components/Alergjia/uptadeAlergjia';
import UptadeSpecializimii from './components/Specializimi/uptadeSpecializimi';
import CreateSpecializimiForm from './components/Specializimi/createSpecializimi';
import SpecializimiComponent from './components/Specializimi/specializimi';
import AddReceta from './components/Receta/addReceta';
import RecetaList from './components/recetaList';
import UpdateReceta from './components/Receta/updateReceta';
import SignupPage from './actions/Regjister/registerForm';
import Signin from './actions/Regjister/sigin';
import React from 'react';
import Sidebar from './components/layout/sidebar';
import CreatePacienti from './components/Pacinet/createPacienet';
import ListPacinet from './components/Pacinet/listaPacient';
import CreateAlergjiaS from './components/Pacinet/creteAlergjiaS';
import CreateMjeketS from './components/Mjkete/createMjeketS';
import ListMjeketS from './components/Mjkete/listMjeketS';
import CreateTakimiS from './components/Mjkete/createTakimiS';
import LogoutButton from './components/logoutButton';
import UserList from './components/userList';
import UserProfile from './components/USER/userProfile';
import TakimiByIdList from './components/takimibyIDlist';
import Home from './components/layout/home';
import ShfaqInfoTak from './components/Takimet/shfaqinfo';



function AuthenticatedApp() {
  const role= localStorage.getItem('role');
  console.log(role)

  if (role !== "admin") {
    return (
      <div>
      <Header />
      
      <hr></hr>
          <LogoutButton/>
      <div className="d-flex">
        <Sidebar />
      <Routes>
        <Route exact path='/' element={<Signin/>} />
        <Route exact path='/s' element={<SignupPage/>} />
        <Route exact path='/qytetiList' element={<QytetiList/>}></Route>
        <Route exact path='/employeeList/:qyteti_id' element={<SpitaliList/>}></Route>
        <Route exact path="/repartiList/:qytetiId/:spitaliId" element={ <RepartiList/>}></Route>
        <Route exact path="/mjeketList/:qytetiId/:spitaliId/:repartiId" element={<MjketList/>}></Route>
        <Route exact path='/CreatePacienti/:qytetiId/:spitaliId/:repartiId' element={<CreatePacienti/>}></Route>
        <Route exact path="/ListPacinet/:qytetiId/:spitaliId/:repartiId" element={<ListPacinet/>}></Route>
        <Route exact path="/CreateTakimiS/:repartiId/:mjekuId" element={<CreateTakimiS/>}></Route>
        <Route exact path='/profile' element={<UserProfile/>}></Route>
        <Route exact path='/takimet/:userProfileId' element={<TakimiByIdList/>}></Route>
        <Route exact path='/home' element={<Home/>}></Route>
        <Route exact path='/info/:repartiId/:mjketId/:takimiId' element={<ShfaqInfoTak/>}></Route>
        <Route exact path="/updateTask/:repartiId/:mjketId/:takimiId" element={<UpdateTask/>}></Route>
        <Route exact path="/pacinetList/:qytetiId/:spitaliId/:repartiId" element={<PacinetList/>}></Route>
        <Route exact path="/CreateAlergjiaS/:repartiId/:pacinetiId" element={<CreateAlergjiaS/>}></Route>
        <Route exact path="/alergjiaList/:repartiId/:pacinetiId" element={<AlergjiaListList/>}></Route>
      </Routes>
      </div>
      </div>
    );
  }else{
  return (
 
    <div>
      <Header />
      <hr />
      <hr></hr>
          <LogoutButton/>
      <div className="d-flex">
        <Sidebar/>


        <Routes>
        <Route exact path='/' element={<Signin/>}></Route>
            <Route exact path='/s' element={<SignupPage/>}></Route>
             
        
              <Route exact path='/qytetiList' element={<QytetiList/>}></Route>
              <Route exact path='/createQytetiForm' element={<AddQyteti/>}></Route>
              <Route exact path='/uptadeQytetiform/:id' element={ <UpdateQyteti/>}></Route>
              <Route exact path='/employeeList/:qyteti_id' element={<SpitaliList/>}></Route>
              <Route exact path="/createSpitaliForm/:qytetiId" element={<AddSpitali/>}></Route>
              <Route exact path="/updateSpitaliForm/:qytetiId/:spitaliId" element={<UpdateSpitali/>}></Route>
              <Route exact path="/repartiList/:qytetiId/:spitaliId" element={ <RepartiList/>}></Route>
              <Route exact path="/createRepartiForm/:qytetiId/:spitaliId" element={<AddReparti/>}></Route>
              <Route exact path='/updateRepartiform/:qytetiId/:spitaliId/:repartiId' element={<UpdateReparti/> }></Route>
              <Route exact path="/mjeketList/:qytetiId/:spitaliId/:repartiId" element={<MjketList/>}></Route>
              <Route exact path='/addMjeket/:qytetiId/:spitaliId/:repartiId' element={<AddMjket/>}></Route>
              <Route exact path="/updateMjekeForm/:qytetiId/:spitaliId/:repartiId/:mjketId" element={<UptadeMjeket/>}></Route>
              <Route exact path="/pacinetList/:qytetiId/:spitaliId/:repartiId" element={<PacinetList/>}></Route>
              <Route exact path='/addPacinet/:qytetiId/:spitaliId/:repartiId' element={<AddPacinet/>}></Route>
              <Route exact path="/updatePacinetiForm/:qytetiId/:spitaliId/:repartiId/:pacientId" element={<UpdatePacienti/>}></Route>
            
              <Route exact path="/alergjiaList/:repartiId/:pacinetiId" element={<AlergjiaListList/>}></Route>
              <Route exact path="/createAlergjiaForm/:repartiId/:pacinetiId" element={<AddAlergjia/>}></Route>
              <Route exact path="/taskList/:repartiId/:mjketId" element={<TaskList/>}></Route>
              <Route exact path="/addTask/:repartiId/:mjketId" element={<AddTask/>}></Route>
              <Route exact path="/updateTask/:repartiId/:mjketId/:takimiId" element={<UpdateTask/>}></Route>
              <Route exact path="/updateAlergjiaForm/:repartiId/:pacinetiId/:alergjiaId" element={<UpdateAlergjia/>}></Route>
              <Route exact path="/specializimi/:mjketId" element={<SpecializimiComponent />} />
              <Route exact path="/create-specializimi/:mjketId" element={<CreateSpecializimiForm />} />
              <Route exact path="/update-specializimi/:specializimiId" element={<UptadeSpecializimii/>} />
              <Route exact path="/recetaList/:repartiId/:mjekuId" element={<RecetaList/>}></Route>
              <Route exact path="/addreceta/:mjekuId" element={<AddReceta/>}></Route>
              <Route exact path="/updatereceta/:mjekuId" element={<UpdateReceta/>}></Route>

              
              
              <Route exact path='/CreatePacienti/:qytetiId/:spitaliId/:repartiId' element={<CreatePacienti/>}></Route>
              <Route exact path="/ListPacinet/:qytetiId/:spitaliId/:repartiId" element={<ListPacinet/>}></Route>
              <Route exact path="/CreateAlergjiaS/:repartiId/:pacinetiId" element={<CreateAlergjiaS/>}></Route>

              <Route exact path='/CreateMjeket/:qytetiId/:spitaliId/:repartiId' element={<CreateMjeketS/>}></Route>
              <Route exact path="/ListMjeket/:qytetiId/:spitaliId/:repartiId" element={<ListMjeketS/>}></Route>
              <Route exact path="/CreateTakimiS/:repartiId/:mjekuId" element={<CreateTakimiS/>}></Route>

              <Route exact path='/userList' element={<UserList/>}></Route>
              <Route exact path='/profile' element={<UserProfile/>}></Route>
              <Route exact path='/takimet/:userProfileId' element={<TakimiByIdList/>}></Route>

              <Route exact path='/home' element={<Home/>}></Route>
              <Route exact path='/info/:repartiId/:mjketId/:takimiId' element={<ShfaqInfoTak/>}></Route>
              

        </Routes>
      </div>
    </div>
  
  );
}
}







function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthenticatedApp />
      </Router>
    </Provider>
  );
}
export default App;
*/