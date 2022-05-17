import React, { useEffect, useState } from 'react'
import './bugPage.css'
import { AiOutlinePlus, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import NewCard from '../newCard/NewCard';
import { addDoc, collection, getDocs, setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase/config';

const BugPage = ({project, user}) => {
  const [openNewCard, setOpenNewCard] = useState(false);
  const [newBugs, setNewBugs] = useState(project.bugs.new);
  const [wipBugs, setWipBugs] = useState(project.bugs.wip);
  const projectRef = collection(db, "projects"); 

  const newBug = (title, date, user, desc, id) => (
    <div key={id} className='bugPage__section-card'>
      <h1>{title}</h1>
      <div className='bugPage__section-card--date'>
        <h6>posted: {date}</h6>
      </div>
      <div className='bugPage__section-card--user'>
        <h5>By: {user}</h5>
      </div>
      <p>
        {desc}
      </p>
      <div className='bugPage__section-card--arrow right'>
        <AiOutlineArrowRight className='bugPage__section-card--arrow---icon'/>
      </div>
    </div>
  )

  const newWip = (title, date, dateTake, user, userTake, desc, id) => (
    <div key={id} className='bugPage__section-card'>
      <h1>{title}</h1>
      <div className='bugPage__section-card--date'>
        <h6>posted: {date}</h6>
        <h6>taken: {dateTake}</h6>
      </div>
      <div className='bugPage__section-card--user'>
        <h5>By: {user}</h5>
        <h5>Taken by: {userTake}</h5>
      </div>
      <p>
        {desc}
      </p>
      <div className='bugPage__section-card--arrow right'>
        <AiOutlineArrowRight className='bugPage__section-card--arrow---icon'/>
      </div>
    </div>
  )

  const updateNewBug = async () => {
    //get the data from firebase
    const dataProjects = await getDocs(projectRef);
    const projects = dataProjects.docs.map((doc) => ({...doc.data(), id: doc.id}));

    setNewBugs(projects[0].bugs.new);
  }

  const addNewBug = async (title, date, user, desc) => {
    await setDoc(doc(db, 'projects', 'JyHt9xzH7WxIzN2qbo5h'), {
      bugs: {
        new: arrayUnion({
            title: title,
            description: desc,
            postDate: date,
            user: user
        })
      }
    }, {merge: true})
  }

  return(
  <main className='bugPage'>
      {
        openNewCard && <NewCard setOpenNewCard={setOpenNewCard} addNewBug={addNewBug} updateNewBug={updateNewBug} user={user}/>
      }
      <section className='bugPage__section'>
        <header className='bugPage__section-header'>
          <h1>New</h1>
          <AiOutlinePlus className='bugPage__section-header--icon' onClick={() => setOpenNewCard(true)}/>
        </header>
        {
          newBugs.map((index, id) => (
            newBug(index.title, index.postDate, index.user, index.description, id)
          ))
        }
      </section>
      <section className='bugPage__section'>
        <header className='bugPage__section-header'>
          <h1>Wip</h1>
        </header>
        {
          /*
          wipBugs.map((index, id) => (
            newWip(index.title, index.postDate, index.dateTaken, index.user, index.userTake, index.description, id)
          ))
          */
        }
      </section>
  </main>
  )
}
export default BugPage