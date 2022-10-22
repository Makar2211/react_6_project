import React, {useState} from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [succsess, setSuccsess] = useState(false)
  const [search, setSearch] = useState('')
  React.useEffect(() => {
    fetch('https://reqres.in/api/users').then(res => res.json()).then(json => {
      setUsers(json.data)
    }).catch(err => {
      console.log(err)
      alert('ошибка при получении пользователей')
    }).finally(() => setLoading(false))
  }, [])

  const onChangeSearchValue = (e) => {
    setSearch(e.target.value)
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev =>  prev.filter(_id => _id !== id))
    } else {
      setInvites(prev =>  [...prev, id])
    }
  }

  const onClickSendInvites = () => {
    setSuccsess(true)
  }

  return (
    <div className="App">
      {
        succsess ? (<Success count={invites.length } />
        )  :   (<Users 
          search={search} 
          onChangeSearchValue={onChangeSearchValue}
          items={users} 
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
     
       
    </div>
  );
}

export default App;
