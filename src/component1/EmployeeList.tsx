
import { memo, useEffect, useState } from "react"
import "./EmployeeList.style.css"
import axios from 'axios';
import EditEmployee from "./EditEmployee";

const EmployeeList = memo(() => {
    const [list, setList] = useState<any>([]);
    const [editVal, setEditVal] = useState(false);
    const [ids, setId] = useState<String>('');
    const tokenSet = () => {
        axios.post('http://localhost:3000/api/Employee/generateTokenn').then((res: any) => {
            sessionStorage.clear();
            sessionStorage.setItem("token", res.data.token);
            console.log("tokennnnnnnn", res.data.token)
        })
    };
    setInterval(() => {
        tokenSet();
    }, 60000)
    // const [token, setToken] = useState<String>('');
    const token = sessionStorage.getItem("token");

    const Respose = async () => {



        const data = await axios.get('http://localhost:3000/api/Employee', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        setList(data.data);

    }

    useEffect(() => {
        setTimeout(() => {
            Respose();

        }, 3000)
    }, [])
    console.log(list);
    const ViewFun = (id: String) => {

    }
    const EditFun = (id: String) => {
        console.log("ssssssssss", id)

        setEditVal(true);
        setId(id);
    }
    const DelFun = (id: String) => {
        axios.delete(`http://localhost:3000/api/Employee/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(() => {
            Respose();

        })

    }
    return (
        <div>
            {!editVal && <div><article className="empList">
                <h3>Employee List</h3>
            </article>
                <table>
                    <tr>
                        <th>Full Name</th>
                        <th>Email Id</th>
                        <th>Action</th>
                    </tr>
                    {list.map((val: any) => {
                        return <>

                            <tr key={val.id}>
                                <td>{`${val.firstName} ${val.lastName}`}</td>
                                <td>{val.email}</td>
                                <td>
                                    <input type="button" value={"view"} onClick={() => ViewFun(val.id)} />
                                    <input type="button" value={"edit"} onClick={() => EditFun(val._id)} />
                                    <input type="button" value={"delete"} onClick={() => DelFun(val._id)} />
                                </td>
                            </tr>
                        </>
                    })}
                </table></div>}
            {/* {showModel && <EmployeeModel onClose={closePopup} data={viewData} />} */}
            {editVal && <EditEmployee backVal={setEditVal} ids={ids} Respose={Respose} />}
        </div>
    )
})

export default EmployeeList;