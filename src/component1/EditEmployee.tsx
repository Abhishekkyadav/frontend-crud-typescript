import { memo, useEffect, useState } from "react";
import { IEmployee } from "./Employee.type";
import axios from 'axios';
type Props = {
    backVal: any,
    Respose: any,
    ids: String
}

const EditEmployee = memo((props: Props) => {
    const { backVal, ids, Respose } = props;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [ApiData, setApiData] = useState<any>([]);
    const Fun = () => {
        axios.get(`http://localhost:3000/api/Employee/${ids}`).then((data) => {
            setApiData(data.data);
            console.log("njjkkkkkkkkkkk", data)


        })
    }
    useEffect(() => {
        Fun();
    }, [])
    const HandleSubmit = (e: any, id: string) => {
        e.preventDefault();
        const firstNameIs = (document.getElementById("firstNameIs") as HTMLInputElement).value;
        const lastNameIs = (document.getElementById("lastNameIs") as HTMLInputElement).value;
        const emailIs = (document.getElementById("emailIs") as HTMLInputElement).value;
        console.log(!firstNameIs || !lastNameIs || !emailIs);
        if (!firstNameIs || !lastNameIs || !emailIs) {
            alert("Please fill all details");
        } else {
            const dataIs: IEmployee = {
                id: new Date().toJSON().toString(),
                firstName: firstName ? firstName : firstNameIs ? firstNameIs : "",
                lastName: lastName ? lastName : lastNameIs ? lastNameIs : "",
                email: email ? email : emailIs ? emailIs : ""
            }
            axios.put(`http://localhost:3000/api/Employee/${ids}`, dataIs).then((data) => {

                backVal(false)
                Respose()

            })
            // updatedata(data)
            // backButton()
        }

    }
    console.log("njjk", ApiData)
    return (
        <div className="form-container">
            <div >
                <h3>Add Employee Form</h3>
            </div>
            <form>
                <div>
                    <label>First Name:</label>
                    <input type="text" id="firstNameIs" defaultValue={ApiData && ApiData.firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" id="lastNameIs" defaultValue={ApiData && ApiData.lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                    <label>Email Add:</label>
                    <input type="text" id="emailIs" defaultValue={ApiData && ApiData.email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div>
                    <input type="button" value={"Back"} onClick={() => backVal(false)} />
                    <input type="submit" value={"Employee Update"} onClick={(e) => HandleSubmit(e, "editId")} />
                </div>
            </form>
        </div>
    )
})

export default EditEmployee