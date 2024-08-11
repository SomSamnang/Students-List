/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { getStudent, deleteStudent, getStudentById } from "../services/apiServices";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { EditContext } from './EditContext';
import StatusIndicator from "../statusIndicator/StatusIndicator";
import LoadingProgressBar from "../loadingprogress/LoadingProgressBar";


const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { setEditItem } = useContext(EditContext);

    const loadStudents = async () => {
        setLoading(true);
        setProgress(0);
        let interval;

        try{
            interval = setInterval(()=>{
                setProgress((prev)=> Math.min(prev + 10, 98));
            }, 100);
            
            const data = await getStudent();
            if(data){
                setStudents(data);
                clearInterval(interval);
                setProgress(100);
                console.log(data);
            }

        }catch(error){
            console.log("Error loading students", error);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStudents();
        
    }, []);

    const getId = async (id) => {
        const data = await getStudentById(id);
        setEditItem(data);
        navigate("/students");
        console.log("Student", data);
    }

    const onEdit = (student) => {
        setEditItem(student);
        navigate("/students");
        console.log("Student", student);
    }

    const onDelete = async (id) => {
        await deleteStudent(id);
        console.log("Deleted student", id);
        loadStudents();
    }

    const StudentForm = () => {
        navigate("/students");
    }

    return (
        <div>
        <LoadingProgressBar progress={progress} />
            <h1>Student List</h1>
            <Button variant="outline-primary" onClick={StudentForm}>Create</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>POB</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.address}</td>
                            <td>{student.dob}</td>
                            <td><StatusIndicator status={student.status} /></td>
                            <td>
                                <Button variant="primary" onClick={() => onEdit(student)}>Edit</Button>
                                <Button variant="info" onClick={() => getId(student.id)}>Edit By ID</Button>
                                <Button variant="danger" onClick={() => onDelete(student.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
export default StudentList;
