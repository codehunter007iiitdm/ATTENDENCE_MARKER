import {FaTrashAlt} from 'react-icons/fa'
import LineStudent from './LineStudent.js'

const StudentsList=({students,handleCheck,handledelete})=>{
    return(
        <ul>
        {students.map((student)=>(
              <LineStudent
                key={student.id}
                student={student}
                handleCheck={handleCheck}
                handledelete={handledelete}
                />
))}
    </ul>
    )
}

export default StudentsList