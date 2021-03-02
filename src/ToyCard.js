

function ToyCard(props){

    function deleteToy(e) {
        // const id = props.id
        // fetch(`http://localhost:3000/toys/${props.id}`, {method: "DELETE"})
        props.removeToy(props.id)
    }

    function likeToy(e) {
        console.log(props.likes + 1)
        fetch(`http://localhost:3000/toys/${props.id}`, {
            method: "PATCH", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({likes: props.likes + 1})})
        .then(response => response.json())
        .then(json => props.addLike(json))
    }
    // const {id, image, name} = props.toy // destructuring is an option
    return(
        <div class="card" id={`toy-${props.id}`}>
            <h2>{props.name}</h2>
            <img src={props.image} class="toy-avatar"/>
            <p>{props.likes} Likes </p>
            <button onClick={likeToy} class="like-btn">Like &lt;3</button>
            <button onClick={deleteToy} class="delete-btn">Delete</button>
        </div>
    )
}

export default ToyCard