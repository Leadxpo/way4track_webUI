import React, {useState} from "react";
import Sidebar from "./containers/sidebar";
import BodyLayout from "./containers/bodyLayout";
import Login from "./containers/login";
const App = () => {
  const [role, setRole] = useState('ceo'); // You can switch between 'ceo' and 'subdealer'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginFlag = () =>{
    setIsLoggedIn(true);
  }
  return (
    <div>
      {!isLoggedIn?
      <div>
        <Login handleLoginFlag={handleLoginFlag}/>
      </div>
      :<div className="flex min-h-screen">
          <div className="h-auto min-h-full">
            <Sidebar role={role} />
          </div>
          <div className="w-3/4 flex-1 h-auto min-h-full">
            <BodyLayout>
                {/* The rest of your app content */}
            </BodyLayout>
          </div>
      </div>}
    </div>
  );
};
export default App;

//https://www.figma.com/design/q4KI2M3gUliZlg28FF3NBG/Way4Track-CEO-Dashboard?node-id=0-1&node-type=canvas&t=qwxm1Hw9bpqQzXAq-0