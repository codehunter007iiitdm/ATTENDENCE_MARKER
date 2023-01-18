import {FaTrashAlt} from 'react-icons/fa'

const LineStudent=({student,handleCheck,handledelete})=>{
    return(
        <li className="item">
        <input
            type="checkbox"
            onChange={()=>handleCheck(student.id)}
            checked={student.checked}
            />
            <label 
            style={(student.checked)? {textDecoration:
            'line-through'}:null}
            onDoubleClick={()=>handleCheck(student.id)}
            htmlFor="">{student.student}</label>
            <FaTrashAlt 
            onClick={()=>handledelete(student.id)}
            role="button" 
            tabIndex="0" 
            aria-label={`Delete ${student.student}`}/>
        </li>
    )
}

export default LineStudent