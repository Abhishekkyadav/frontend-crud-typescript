import { useState } from 'react';
import './Home.style.css'
import { IEmployee } from './Employee.type';
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import axios from 'axios';
const Home = () => {
    const [employeeList, setEmployeeList] = useState([] as IEmployee[])
    const [showPage, setShowPage] = useState("list");
    const [editId, setId] = useState("");
    const ChangePage = () => {

        setShowPage("add");
    }
    const BackFun = () => {
        setShowPage("list");

    }
    const EditData = (id: string) => {
        console.log(id)
        setId(id);
        // setShowPage("list");

    }
    const AddFun = (data: IEmployee) => {
        setEmployeeList([...employeeList, data])
        setShowPage("list");

    }
    axios.get('http://localhost:3000/api/Employee').then((data: any) => {
        console.log(data);
    })
    return (
        <>
            <article className="header-styles">
                <header>
                    <h1>Typescript Employee</h1>
                </header>
            </article>
            <section className='section-content'>
                {showPage === "list" && <>
                    <input type='button' value={"Add Employee"} className='addBtn' onClick={ChangePage} />
                    <EmployeeList list={employeeList} deletedata={setEmployeeList} pageShow={setShowPage} EditData={EditData} />
                </>}
                {showPage === "add" && <>

                    <AddEmployee backButton={BackFun} AddFun={AddFun} />
                </>}
                {showPage === "edit" && <EditEmployee backButton={BackFun} list={employeeList} updatedata={setEmployeeList} editId={editId} />}

            </section>
        </>
    )
}
export default Home;