import { type } from "os";
import "./EmployeeList.style.css"
import { IEmployee } from "./Employee.type";
import EmployeeModel from "./EmployeeModel";
import { useState } from "react";
type Props = {
    list: IEmployee[],
    deletedata: any,
    pageShow: any,
    EditData: (id: string) => void,
}
const EmployeeList = (props: Props) => {
    const { list, deletedata, pageShow, EditData } = props;
    const [showModel, setShowModel] = useState(false);

    const [viewData, setViewData] = useState([] as IEmployee[])
    const DelFun = (id: string) => {
        if (id) {
            const UpdateData = list && list.filter((val) => val.id !== id)
            deletedata(UpdateData)
        }



    }
    const ViewFun = (id: string) => {
        const UpdateData1 = list && list.filter((val) => val.id === id)
        setViewData(UpdateData1)
        setShowModel(true)

    }
    const EditFun = (id: string) => {
        EditData(id);
        // const UpdateData1 = list && list.filter((val) => val.id === id)
        // setViewData(UpdateData1)
        pageShow("edit");

    }
    const closePopup = () => setShowModel(false)
    return (
        <div>
            <article className="empList">
                <h3>Employee List</h3>
            </article>
            <table>
                <tr>
                    <th>Full Name</th>
                    <th>Email Id</th>
                    <th>Action</th>
                </tr>
                {list.map((val) => {
                    return <>

                        <tr key={val.id}>
                            <td>{`${val.firstName}  ${val.lastName}`}</td>
                            <td>{val.email}</td>
                            <td>
                                <input type="button" value={"view"} onClick={() => ViewFun(val.id)} />
                                <input type="button" value={"edit"} onClick={() => EditFun(val.id)} />
                                <input type="button" value={"delete"} onClick={() => DelFun(val.id)} />
                            </td>
                        </tr>
                    </>
                })}
            </table>
            {showModel && <EmployeeModel onClose={closePopup} data={viewData} />}
        </div>
    )
}

export default EmployeeList;