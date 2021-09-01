import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:5000/api/activities").then(response=>{
      console.log(response);
      setActivities(response.data);
    })
  },[]);

  return (
    <div>
        <Header as="h2" content="Activities" icon="users"></Header> 
        <List>
         {activities.map((act:any)=>(
           <List.Item key={act.id}>
             {act.title}
             </List.Item>
         ))}
       </List>
    </div>
  );
}

export default App;
