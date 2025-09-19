function Todo({title, para}) {
    return (
        <div>
            <h2>{title}</h2>
            <p>{para}</p>
            <span></span>
            <button>Delete</button>
        </div>
    )
}

export default Todo