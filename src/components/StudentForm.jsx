/* eslint-disable no-unused-vars */
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {useState, useContext,useEffect} from 'react';
import {EditContext} from './EditContext'
import StudentList from './StudentList';
import { InputGroup } from 'react-bootstrap';
import {updateStudent,createStudent} from '../services/apiServices';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoadingProgressBar from "../loadingprogress/LoadingProgressBar";


const StudentForm=()=>{
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true)
    const {editItem, setEditItem} = useContext(EditContext);
    const [form, setForm]=useState({id:'',name:'',address:'',dob:'',status:''});

    useEffect(()=>{
      let interval;
      
        if(editItem){
          setForm(editItem);
          console.log("EditItem", editItem);
          interval =setInterval(()=>{
            setProgress((prev)=> Math.min(prev + 10, 90));
        }, 100);
        setTimeout(()=>{
          clearInterval(interval);
          setProgress(100);
          setLoading(false)

        },1000);
      }else{
        setLoading(false);
      }
      return ()=>{
        setEditItem(null);
        clearInterval(interval);    
    }
    },[editItem, setEditItem]);
    
    
    const onBack=()=>{
        navigate("/");
    }
    const onSubmit = async (e) => {
      e.preventDefault();
      if(form.id){
        console.log("Student",form);
        const result = await updateStudent(form);
        console.log(result);
      }else{
        const result = await createStudent(form);
        console.log(result)
      }
      
      navigate("/");
      // console.log("Hello")
    }
    const handleChange=(e)=>{
      setEditItem({...form,[e.target.name]: e.target.value});
    }
    return(
        <div>
          <LoadingProgressBar progress={progress} />
            <h1>Student Form</h1>
            <Button variant="primary" onClick={()=> onBack()}>Back To Student List</Button>

    <Form onSubmit={onSubmit}>

            <InputGroup>
              <InputGroup.Text>Name:</InputGroup.Text>
              <Form.Control value={form.name} name='name' onChange={handleChange}  aria-label="Name"/>
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>Address:</InputGroup.Text>
              <Form.Control value={form.address} name='address' onChange={handleChange} aria-label="Address"/>
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>POB:</InputGroup.Text>
              <Form.Control value={form.dob} name='dob' onChange={handleChange} aria-label="DOB"/>
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>Status:</InputGroup.Text>
              <Form.Control value={form.status} name='status' onChange={handleChange} aria-label="Status"/>
            </InputGroup>
      
      <Button variant="primary" type="submit">
        {form.id ? 'update' : 'Create'}
      </Button>
    </Form>
        </div>
    );
}
export default StudentForm;