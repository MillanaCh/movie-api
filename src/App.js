import './App.css';
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modalpage from './components/Modalpage';

class App extends React.Component {
  constructor() {
    super()
    this.state = ({
      actors: [],
      imageURL: "https://image.tmdb.org/t/p/w185",
      isTheModalOn: false,
      selectedActor: []
    })
    this.turnModal = this.turnModal.bind(this)
    //we say that this.turnModal  component belong to App component
  }
  async componentDidMount() {
    const URL = "https://api.themoviedb.org/3/person/popular?api_key=e937d2db91264759338fd811e670c0b4";
    //fetch(URL).then((response) => response.json()).then((data) => this.setState({ actors: data.result })).catch((err) => console.log(err))
    //with async
    try {
      const resp = await fetch(URL)
      const data = await resp.json()// will wait responce which will json()
      this.setState({ actors: data.results })
    }
    catch (err) {
      console.log(err)
    }
  }
  toggleModal(id) {
    this.setState({ isTheModalOn: true })
    const selectedActor = this.state.actors.filter((actor) => actor.id === id)
    this.setState({ selectedActor })
  }
  turnModal(status) {
    this.setState({ isTheModalOn: status })
  }
  render() {
    const { actors, imageURL } = this.state
    //console.log(actors) here we have list of array with objects
    //destructoring
    return (
      <>
        <h1 className="title"> Movie stars</h1>
        <div className='App'>
          <div className='movies'>
            {actors.map((actor) => {
              const { name, profile_path, known_for, id } = actor
              return <div className='actor' onClick={() => this.toggleModal(id)}>
                <h1 className="actor-name">{name}</h1>
                <figure>
                  <img src={imageURL + profile_path} className="img-actor" />
                </figure>
                <figure className="eachFilms">
                  <p className='known-for'>Known for:</p>
                  {known_for.map((films) => {
                    const { title, name } = films
                    return <>
                      <h3 className="eachFilm">{title}</h3>
                      <h3 className="eachFilm">{name}</h3>
                    </>
                  })}
                </figure>
              </div>
            })}
          </div>
          {this.state.isTheModalOn ? <Modalpage turnModal={this.turnModal} dataActor={this.state.selectedActor} /> : null}
        </div>
      </>
    )
  }
}

export default App;


/* 
what we need 


MAIN
*  connect API - json -> construct text to object
*  use data and work with render and return
   * in return make structure
   *  work with map
      * make photo as state, documantation
* work with pop up(modalpage)
* tell to make false when we close pop up

*/
