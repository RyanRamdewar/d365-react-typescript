import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createStore, StoreProvider } from 'easy-peasy';

import { getAppMode, myTheme } from './common/BusinessLogic';
import { Mode } from './common/Interfaces';
import { initStoreModel } from './common/model/Store';
import Example from './components/Example';
import { initializeIcons, loadTheme } from '@fluentui/react';



function App() {
  // Create Store
  const store = createStore(initStoreModel);
  let entityParams = getAppMode();
  // Initialize icons for Fabric UI
  initializeIcons();
  // Load theme for fabric UI
  loadTheme(myTheme);

  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    entityParams = {
      type: Mode.Example,
      id: "b03ec6ff-5f0b-ec11-b6e6-000d3a5bd21c"
    }
  }
  return (
    <StoreProvider store={store} >
      {entityParams && entityParams.type === Mode.Example ?
        <Example info={entityParams} /> : ""
      }
    </StoreProvider>
  );
}
export default App;
