import AppRoute from "./AppRoute";
import {EditProvider} from "./components/EditContext"
const App = () => {
  return(
<EditProvider><AppRoute/></EditProvider>


  );
}
export default App;