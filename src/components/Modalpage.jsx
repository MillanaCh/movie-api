import React from "react";
import {Modal, ModalBody, ModalHeader, ModalFooter} from "reactstrap"

class Modalpage extends React.Component{
    constructor(){
        super()
        this.state = ({
            modalIsOpen:true,
            photoUrl:"https://image.tmdb.org/t/p/w185/" 
        })
    }
    hundlerToggle(){
        this.setState({modalIsOpen: !this.state.modalIsOpen})
        this.props.turnModal(!this.state.modalIsOpen)
    }

    render(){
        console.log(this.props.turnModal)
        const { modalIsOpen, photoUrl } = this.state
        const {name, popularity, profile_path, known_for} = this.props.dataActor[0]
        return(
            <>
            <Modal isOpen={modalIsOpen} toggle={() => this.hundlerToggle()}>
                <ModalHeader>{name}</ModalHeader>
                <ModalBody>
                    <img src={photoUrl + profile_path} className="star-photo"></img>
                    <h2>Popularity: {popularity}</h2>
                    <p className='known-for'>Known for:</p>
                    <div>
                    {known_for.map((each) => {
                        const {poster_path} = each
                        return <img src={photoUrl + poster_path} className="film"></img>
                    })}
                    </div>
                </ModalBody>
                <ModalFooter>this is footer</ModalFooter>
            </Modal>
            </>
        )
    }
}
export default Modalpage