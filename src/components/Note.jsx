

const Note = ({title, body, date})=>{
return(
    <div className="note">
        <h2>{title}</h2>
        <p>{body}</p>
        <p className="date">{date}</p>
    </div>
)
}

export default Note;