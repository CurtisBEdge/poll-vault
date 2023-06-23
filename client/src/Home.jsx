import { useContext } from 'react';
import AppContext from './context';
import Polls from './Polls';
import Login from "./Login";

const Home = () => {
  const { token } = useContext(AppContext);

  if (token) {
    return (<Polls/>)
  }

  return (<Login/>);
};

export default Home;