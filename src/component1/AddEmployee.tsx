import { useState } from "react";
import "./EmployeeForm.style.css";
import { IEmployee } from "./Employee.type";
import axios from 'axios';
type Props = {
    back: any
}

const AddEmployee = (props: Props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { back } = props;
    const HandleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(firstName, lastName, email, password)
        if (!firstName || !lastName || !email || !password) {
            alert("Please fill all details");
        } else {
            const data: IEmployee = {
                // id: new Date().toJSON().toString(),
                userId: Date.now(),
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }

            axios.post('http://localhost:3000/api/Employee', data).then(() => {

                back(false)
            })


        }

    }

    return (
        <div className="form-container">
            <div >
                <h3>Add Employee Form</h3>
            </div>
            <form>
                <div>
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                    <label>Email Add:</label>
                    <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div>
                    <input type="button" value={"Back"} onClick={() => back(false)} />
                    <input type="submit" value={"Employee Add"} onClick={HandleSubmit} />
                </div>
            </form>
        </div>
    )
}

export default AddEmployee