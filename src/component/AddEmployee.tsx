import { useState } from "react";
import "./EmployeeForm.style.css";
import { IEmployee } from "./Employee.type";
type Props = {
    backButton: () => void,
    AddFun: (data: IEmployee) => void

}
const AddEmployee = (props: Props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const { backButton, AddFun } = props;
    const HandleSubmit = (e: any) => {
        e.preventDefault();
        console.log(firstName, lastName, email)
        if (!firstName || !lastName || !email) {
            alert("Please fill all details");
        } else {
            const data: IEmployee = {
                id: new Date().toJSON().toString(),
                firstName: firstName,
                lastName: lastName,
                email: email,
            }
            AddFun(data);
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
                    <input type="button" value={"Back"} onClick={backButton} />
                    <input type="submit" value={"Employee Add"} onClick={HandleSubmit} />
                </div>
            </form>
        </div>
    )
}

export default AddEmployee