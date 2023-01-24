import { Routes, Route } from "react-router-dom"
import { CommitteesPage } from './pages/Committees/CommitteesPage';
import { DepNumbersPage } from './pages/depNumbers/DepNumbersPage';
import { DocCirculationPage } from './pages/DocCirculation/DocCirculationPage';
import { HomePage } from "./pages/HomePage/HomePage";
import { MeetingsSchedulePage } from './pages/MeetingsSchedule/MeetingsSchedulePage';
import { MPNumbersPage } from "./pages/MPnumbers/MPNumbersPage";
import { TimeTablePage } from './pages/timeTable/TimeTablePage';
import  Admin from "../src/pages/Admin/Admin";
import  AdminHomepage  from "./components/Admin/components/AdminHomepage";
import Login from './components/Admin/components/Login';
import useAuth from "./hooks/AdminHooks/useAuth";
import RequireAuth from './components/Admin/components/RequireAuth';
import PersistLogin from './components/Admin/components/PersistLogin';


const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  const { auth }: any = useAuth();
  return (
    <div className={auth.roles ? "admin" :' App'}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/DocCirculation' element={<DocCirculationPage />} />
        <Route path='/TimeTable' element={<TimeTablePage />} />
        <Route path='/Committees' element={<CommitteesPage />} />
        <Route path='/MeetingsSchedule' element={<MeetingsSchedulePage />} />
        <Route path='/MPNumbers' element={<MPNumbersPage />} />
        <Route path='/DepNumbers' element={<DepNumbersPage />} />
        <Route path="/" element={<PersistLogin />} >
          <Route path="/admin" element={!auth?.accessToken ? <Login /> :< AdminHomepage /> } />
          {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/Admin" element={< AdminHomepage />} />
          </Route> */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/admindocCirculation" element={<DocCirculationPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admintimeTable" element={<TimeTablePage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admincommittees" element={<CommitteesPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="adminmeetingsSchedule" element={<MeetingsSchedulePage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="adminmPNumbers" element={<MPNumbersPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admindepNumbers" element={<DepNumbersPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;