import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
// import {EditProvider} from './components/EditContext';
const AppRoute = () => {
    return(
        // <EditProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StudentList/>}/>
                <Route path='/students' element={<StudentForm/>}/>
            </Routes>
        </BrowserRouter>
        // </EditProvider>
       
    );
}
export default AppRoute;