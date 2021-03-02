import toysObj from './database'
import ToyCard from './ToyCard'
import React from 'react'

// when state changes, a rerender is caused 
// if we want to utilize state we need a Class Component 

// const toys = 
   
class ToysContainer extends React.Component{
    // sets INITIAL STATE
    state = {
        toys: [],
        search: "",
        whatever: "hello"
    }

    removeToy = (id) => {
        //update state and remove toy
        // console.log(this)
        this.setState(previousState => {
            // debugger
            return {
                toys: previousState.toys.filter(t => t.id !== id)
            }
        })
    }

    addLike = (object) => {
        //update state and remove toy
        // console.log(this)
        this.setState(previousState => {
            // find the index of the new toy
            const index = previousState.toys.findIndex(t => t.id === object.id)
            return {
                // toys: previousState.toys.filter(t => t.id !== id)
                toys: [
                    // all of the toys before the one we updated
                    ...previousState.toys.slice(0, index), object, ...previousState.toys.slice(index + 1)
                    // toy object we just got back
                    //all toys after the one we updated
                ]
            }
        })
    }


    makeToyCards(){
        //utilize STATE
        let displayedToys = this.state.toys
        console.log(this.state.search)
        if(this.state.search){
            displayedToys = this.state.toys.filter((toy) =>  
            toy.name.toLowerCase().includes(this.state.search.toLowerCase()))
        }

        return displayedToys.map(toy => <ToyCard addLike={this.addLike} removeToy={this.removeToy} toy={toy} id={toy.id} name={toy.name} image={toy.image} likes={toy.likes} />)
    }

    // componentDidUpdate(){
    //     console.log("updatesd", this.state)
    // }

    componentDidMount(){
      // where you make your fetch requests 
      const url ="http://localhost:3000/toys"
      fetch(url)
      .then(res => res.json())
      .then(json => {
          // deal with the json
          console.log(json)
         // this.state.toys = json  //THIS WILL NOT CAUSE A RERENDER
         this.setState({
             toys: json
         })
      })
    }

    handleInputChange = (e) => {
        const search = e.target.value
        this.setState({search: search}) // will cause a rerender
    }


    render(){
        return(
            <div id="toy-container">
                <div>
                    <input type="text" placeholder="Search for a toy..." onChange={this.handleInputChange}/>
                </div>
               {this.makeToyCards()}
            </div>
        ) 
    }
}

export default ToysContainer