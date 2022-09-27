import MyLogin from "./components/Login";
import BaseView from "./views/BaseView";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyRegister from "./components/Register";
import CreateFoodForm from "./components/createFoodForm";
import FoodList from "./components/foodList";
import ChefList from "./components/chefList";
import TaskBox from "./views/TaskBox";
import AddChefForm from "./components/addChefForm";
import ReducerComponent from "./components/Reducer";

function toTop(){
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
console.log('afterEach')
}

function App() {
  let loggedIn = window.localStorage.getItem('isLoggedIn');
  console.log(loggedIn);
  return (
   <BrowserRouter>
    <Routes>
      <Route path={'/'} exact element={loggedIn? <TaskBox/>: <BaseView/>} >
        <Route index path={""} exact element={loggedIn? <FoodList/>: <MyLogin />}/>
        <Route path={'login'} element={<MyLogin/>}/>
        <Route path={'register'} element={<MyRegister/>}/>
        <Route path={'reducer'} element={<ReducerComponent/>}></Route>
      </Route>
      <Route path={'TaskBox'} element={<TaskBox/>}>
        <Route index path={""} element={<FoodList/>} />
        <Route path={"foods"} element={<FoodList/>} />
        <Route path={'chefs'} element={<ChefList/>}/>
        <Route path={"createFood"} element={<CreateFoodForm/>} />
        <Route path={"addChef"} element={<AddChefForm/>} />
      </Route> 
    </Routes>
   </BrowserRouter>
  );

 
  
}

export default App;
