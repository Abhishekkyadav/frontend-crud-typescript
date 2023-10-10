import { useEffect, useState } from 'react';
import AddEmployee from './AddEmployee';
import EmployeeList from './EmployeeList';
import './Home.style.css'
import BasicCard from './Card';
import axios from 'axios';

const Home = () => {
    const [add, setAdd] = useState(false);

    const tokenSet = () => {
        sessionStorage.setItem("token", "null");
        axios.post('http://localhost:3000/api/Employee/generateTokenn').then((res: any) => {
            sessionStorage.clear();
            sessionStorage.setItem("token", res.data.token);

        })
    };
    useEffect(() => {

        tokenSet();


    }, [4000])

    return <>
        <article className="header-styles">
            <header>
                <h1>Typescript Employee</h1>

            </header>
        </article>

        <section className='section-content'>
            {<>
                <input type='button' value={"Add Employee"} className='addBtn' onClick={() => setAdd(true)} />
                {!add && <EmployeeList />}
                {add && <AddEmployee back={setAdd} />}
            </>}

        </section>
        <div className='cardCss'>
            <BasicCard newIs="Word of the Day" />
            <BasicCard propsDataIs="Word of the Day1" />
            <BasicCard dataIs="Word of the Day2" />
            <BasicCard des="Word of the Day3 is the valid" />

        </div>
    </>
}
export default Home;