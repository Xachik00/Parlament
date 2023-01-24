import { NavLink, useNavigate} from "react-router-dom";
import useLogout from "../../hooks/AdminHooks/useLogout";
import "./Admin.scss"

const Admin = () => {

    const navigate = useNavigate();
    const logout = useLogout();
    
    const signOut = async () => {
        await logout();
        navigate('/admin');
    }
    return (
        <>
        <section className="section">
            <div className="pannel">
                <h1>Ազգային Ժողով</h1> 
                <NavLink to="Admin">Գլխավոր</NavLink>
                <NavLink to="/admindocCirculation">Քաղաքացիների ընդունելության և  փաստաթղթաշրջանառության կարգը</NavLink>
                <NavLink to="/admintimeTable">Քաղաքացիների ընդունելության ժամանակացույց</NavLink>
                <NavLink to="/admincommittees">Մշտական հանձնաժողովները և նրանց գործունեության ոլորտները</NavLink>
                <NavLink to="adminmeetingsSchedule">ԱԺ նիստերի ժամանակացույց</NavLink>
                <NavLink to="adminmPNumbers">Պատգամավորների աշխատանքային հեռախոսահամարները</NavLink>
                <NavLink to="admindepNumbers">Կառուցվածքային ստորաբաժանումների հեռախոսահամարներ</NavLink>
                <div className="flexGrow">
                    <button onClick= {signOut}>Դուրս գալ</button>
                </div>
            </div>
            
       
        </section>
        </>
    )
}

export default Admin
