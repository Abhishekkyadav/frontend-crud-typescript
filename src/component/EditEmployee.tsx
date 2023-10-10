import { memo, useState } from "react";
import { IEmployee } from "./Employee.type";

type Props = {
    backButton: () => void,
    list: IEmployee[],
    updatedata: any,
    editId: string
}
const EditEmployee = memo((props: Props) => {
    const { backButton, list, editId, updatedata } = props;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
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
                firstName: firstName ? firstName : idData && idData[0].firstName,
                lastName: lastName ? lastName : idData && idData[0].lastName,
                email: email ? email : idData && idData[0].email
            }
            const data: unknown = list.map((val) => {
                console.log("ddd", val)
                return val.id === id ? dataIs : val;
            })
            console.log("ccc", data);

            updatedata(data)
            backButton()
        }

    }
    const idData = list.filter((val) => val.id === editId);
    return (
        <div className="form-container">
            <div >
                <h3>Add Employee Form</h3>
            </div>
            <form>
                <div>
                    <label>First Name:</label>
                    <input type="text" id="firstNameIs" defaultValue={idData && idData[0].firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" id="lastNameIs" defaultValue={idData && idData[0].lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                    <label>Email Add:</label>
                    <input type="text" id="emailIs" defaultValue={idData && idData[0].email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div>
                    <input type="button" value={"Back"} onClick={backButton} />
                    <input type="submit" value={"Employee Update"} onClick={(e) => HandleSubmit(e, editId)} />
                </div>
            </form>
        </div>
    )
})

export default EditEmployee