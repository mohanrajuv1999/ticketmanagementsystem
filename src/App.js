import Home from './components/Home';
import Create from './components/Admin/Create'
import { useNavigate, Route, Routes } from 'react-router-dom';
import Read from './components/Admin/Read';
import Edit from './components/Admin/Edit';
import TicketHome from './components/Tickets/TicketHome';
import CreateTicket from './components/Tickets/CreateTicket';
import Status from './components/Tickets/Status';
import Loginpage from './components/MainPage/Loginpage';
import AuthProvider from './components/securityAuth/AuthContext';
import { useAuth } from './components/securityAuth/AuthContext';
import ErrorPage from './components/ErrorPage';
import Headers from './components/Navigationbar/Headers';
import "./StyleSheet/Loginpage.css";
import "./StyleSheet/Status.css";
import "./StyleSheet/Read.css";
import "./StyleSheet/Assign.css";
import "./StyleSheet/Create.css";
import Delete from './components/Tickets/Delete';
import Assign from './components/Tickets/Assign';
import Userpage from './components/Admin/Userpage';
import "./StyleSheet/TicketHome.css";
import Password from './components/Admin/Password';
import EditTicket from './components/Tickets/EditTicket';




 function CheckAuthRoute({children}){
   const AuthContext=useAuth();
   const navigate = useNavigate();
   AuthContext.Verify();
   if(AuthContext.isAuthenticated)
   {
     return children;
   }
    navigate("/login");
 }


function App() {
  return (
    <div className="App">
      
      <AuthProvider> 
      <Headers/>
      <Routes>
       
        <Route  path='/login' element={<Loginpage/>}></Route>
        <Route exact path='/Home' element={<CheckAuthRoute><Home/></CheckAuthRoute>}></Route>
        <Route exact path='/read' element={<CheckAuthRoute><Read/></CheckAuthRoute>}></Route>
        <Route exact path='/profile' element={<CheckAuthRoute><Userpage/></CheckAuthRoute>}></Route>
        <Route exact path='/password' element={<CheckAuthRoute><Password/></CheckAuthRoute>}></Route>
        <Route exact path='/create' element={<CheckAuthRoute><Create/></CheckAuthRoute>}></Route>
        <Route exact path='/edit' element={<CheckAuthRoute><Edit/></CheckAuthRoute>}></Route>
        <Route exact path='/TicketHome' element={<CheckAuthRoute><TicketHome/></CheckAuthRoute>}></Route>
        <Route exact path='/CreateTicket' element={<CheckAuthRoute><CreateTicket/></CheckAuthRoute>}></Route>
        <Route exact path='/status/:id' element={<CheckAuthRoute><Status/></CheckAuthRoute>}></Route>  
         <Route exact path='/delete/:id' element={<CheckAuthRoute><Delete/></CheckAuthRoute>}></Route>  
         <Route exact path='/assign/:id' element={<CheckAuthRoute><Assign/></CheckAuthRoute>}></Route>  
         <Route exact path='/edit/:id' element={<CheckAuthRoute><EditTicket/></CheckAuthRoute>}></Route>      
      </Routes>
       </AuthProvider> 
    </div>
  );
}

export default App;

// function App() {
//   return (
//     <div className="App">

//   <BrowserRouter>
//   <Routes>
//     <Route path='/Create' element={<Create></Create>} ></Route>
//     <Route path='/' element={<Form></Form>} ></Route>
//   </Routes>
//   </BrowserRouter>


  

//      <Read/>
      
//       <Create/>  
//       <Form/>      */
//       <Home/>
//       /* <FunctionClick/>
//     </div>
//   );
// }

// export default App;
