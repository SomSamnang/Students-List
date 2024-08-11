const API_URL ="https://crud-render-h6q5.onrender.com/api/students";

export const getStudent = async ()=>{
    const response = await fetch(API_URL);
    return response.json();

}
export const getStudentById = async (id) =>{
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export const updateStudent = async (student)=>{
    const response = await fetch(API_URL+"/update",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(student),
    });
    return response.text();
}
export const createStudent = async (student)=>{
    const response = await fetch(API_URL+"/create",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(student),
    });
    return response.text();
}
export const deleteStudent = async (student)=>{
    const response = await fetch(API_URL+"/delete",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(student),
    });
    return response.text();
}

