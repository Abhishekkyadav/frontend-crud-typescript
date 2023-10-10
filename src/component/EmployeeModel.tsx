import "./EmployeeModel.style.css"
type Props = {
    onClose: () => void;
    data: any
}
const EmployeeModel = (props: Props) => {
    const { onClose, data } = props;
    const dataIs = data[0];
    return <>
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>Employee Data</h3>
                {data && <div>
                    <div>
                        <label>First Name: {dataIs.firstName}</label>
                    </div>
                    <div>
                        <label>Last Name: {dataIs.lastName}</label>
                    </div>
                    <div>
                        <label>Email Add.: {dataIs.email}</label>
                    </div>
                </div>}
            </div>

        </div>

    </>
}
export default EmployeeModel;