import Header from './Header';
import SearchStudent from './SearchStudent'
import AddStudent from './AddStudent'
import Content from './Content';
import Footer from './Footer'
import {useState,useEffect} from 'react'
import apiRequest from './apiRequest'

function App() {
  const API_URL='http://localhost:3500/students';
  const [students,setStudents]=useState([]);
  const[newStudent,setNewStudent]=useState('');
  const[search,setSearch]=useState('');
  const [fetchError,setFetchError]=useState(null);
  const [isLoading,setIsLoading]=useState(true);

useEffect(()=>{
  const fetchStudents=async()=>{
    try{
      const response=await fetch(API_URL);
      if(!response.ok) throw Error('Did not received the data')
      const listStudents=await response.json();
      setStudents(listStudents);
      setFetchError(null);
    }catch(err){
      setFetchError(err.message);
    }finally{
      setIsLoading(false);
    }
  }
  setTimeout(()=>{
    (async ()=> await fetchStudents())();
  },2000)
},[])



const addStudent=async (student)=>{
  const id=students.length ? students[students.length-1].id+1:1;
  const myNewStudent={id,checked:false,student};
  const listStudents=[...students,myNewStudent];
  setStudents(listStudents);

  const postOptions={
    method:'POST',
    headers:{
      'content-Type':'application/json'
    },
    body: JSON.stringify(myNewStudent)
  }
  const result=await apiRequest(API_URL,postOptions);
  if(result) setFetchError(result);

}

const handleCheck=async(id)=>{
  const listStudents= students.map((student)=>student.id===id? {...student,
      checked: !student.checked}:student);
      setStudents(listStudents);

      const myStudent=listStudents.filter((student)=>student.id!==id);
      const updateOptions={
        method:'PATCH',
        headers:{
          'content-Type':'application/json'
        },
        body:JSON.stringify({checked:myStudent[0].checked})
      };
      const reqUrl=`${API_URL}/${id}`;
      const result=await apiRequest(reqUrl,updateOptions)
      if(result) setFetchError(result);
    }

const  handledelete=async(id)=>{
  const listStudents=students.filter((student)=>student.id!==id);
  setStudents(listStudents);

  const deleteOptions={method:'DELETE'};
  const reqUrl=`${API_URL}/${id}`
  const result=await apiRequest(reqUrl,deleteOptions);
  if(result) setFetchError(result);
}

const handleSubmit=(e)=>{
    e.preventDefault();
    if(!newStudent) return;
    addStudent(newStudent)
    setNewStudent('');
}

  return (
    <div className="App">
      <Header />
      <AddStudent 
      newStudent={newStudent}
      setNewStudent={setNewStudent}
      handleSubmit={handleSubmit}
      />
       <SearchStudent
        search={search}
        setSearch={setSearch}
        />
        <main>
        {isLoading && <p>Loading List...</p>}
        {fetchError && <p style={{color:"red"}}>{`Error:${fetchError}`}</p>}
      {!fetchError && !isLoading &&<Content 
      students={students.filter(student=>((student.student).toLowerCase()).includes
        (search.toLowerCase()))}
      handleCheck={handleCheck}
      handledelete={handledelete}
      />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
