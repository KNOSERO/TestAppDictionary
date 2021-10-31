import { useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch 
} from 'react-router-dom';
import { register } from './api/dictionary';
import './App.css';
import Home from './pages/Home';

const App = () => {

  useEffect(() => {
    register({
      name: 'test',
      password: 'asdf1234',
    });
  });

  return (
    <Router>
      <div id='background'>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>  
        </Switch>
      </div>
    </Router>
  );
}

export default App;
