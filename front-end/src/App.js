import Groups from "./Components/Groups/Groups";
import NewGroup from "./Components/NewGroup/NewGroup";
import Header from "./Components/UI/Header";
import React, {useState} from 'react'

const DUMMY_GROUPS = [
  {
    id: "e1",
    title: "Concerts",
  },
  { id: "e2",
  title: "Groupe de parole écologie",
  },
  {
    id: "e3",
    title: "Football",
  },
  {
    id: "e4",
    title: "Groupe de parole féminisme",
  },
];

function App() {
  const [groups, setGroups] = useState(DUMMY_GROUPS);

  const addGroupHandler = (group) => {
    setGroups((prev_groups) => {
      return [group, ...prev_groups];
    });
  };

  return (

    <div>
      <Header/>
      <NewGroup onAddGroup = {addGroupHandler}/>
      <Groups items = {groups}/>
    </div>
  );
}

export default App;
