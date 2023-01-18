
import StudentsList from './StudentsList'

const Content=({students,handleCheck,handledelete})=>{
    

    return(
        <>
        {students.length?(
            <StudentsList 
            students={students}
            handleCheck={handleCheck}
            handledelete={handledelete}
            />
            
        ):(
            <p style={{marginTop:'2rem'}}>Empty.</p>
        )}
        </>
    )
}

export default Content;