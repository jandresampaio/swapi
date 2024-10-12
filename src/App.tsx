import './App.css'
import { Route, Routes } from 'react-router-dom';
import CharactersTable from './views/CharactersTable';
import NotFound from './components/NotFound';

const ROUTES = {
  home: {
    href: '/',
    name: 'Home',
  },
}

const App = () => {

  return (
    <Routes>
    <Route
      path={`${ROUTES.home.href}`} element={<CharactersTable />}
   />


    <Route path="*" element={<NotFound />} />
  </Routes>
  )
}

export default App
