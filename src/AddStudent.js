import {FaPlus} from 'react-icons/fa';
import {useRef} from 'react';

const AddStudent=({newStudent,setNewStudent,handleSubmit})=>{
    const inputRef=useRef();
    
    return(
        <form className="addForm" onSubmit={handleSubmit}>
            <label htmlFor="addStudent">Add Student</label>
            <input 
                    autofocus
                    ref={inputRef}
                    id='addStudent' 
                    type='text'
                    placeholder='Add Student'
                    required
                    value={newStudent}
                    onChange={(e)=> setNewStudent(e.target.value)}
            />
            <button 
                type='submit'
                aria-label='Add Student'
                onClick={()=>inputRef.current.focus()}
            >
            <FaPlus />
            </button>
        </form>
    )
}

export default AddStudent