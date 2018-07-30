import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import Dropzone from 'react-dropzone';
import NestedDirectories from './NestedDirectories';
import logo from './css/images/logo.png';
import './css/App.css'


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      height                : '500px',
      width                 : '700px',
      overflow              : 'scroll'
    }
  };



export default class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            sourceFiles: [],
            resultFiles:[],
            description: '',
            files: [],
            showModal: false
        }
    }

    handleClose() {
        this.setState({
            showModal: false
        });
    }

    handleSubmit() {
        console.log("hello")
    }

    handleShow() {
        this.setState({
            showModal: true
        });
    }

    afterOpenModal() {
        this.subtitle.style.color = '#f00';
      }

    onSourceDrop(sourceFiles) {
        this.setState({
            sourceFiles
        });
    }

    onResultDrop(resultFiles) {
        this.setState({
            resultFiles
        });
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="App">
                    <header className="App-header">
                        <div className="header-all">
                            <img src={logo} alt="DDSLogo"/>
                            <div className="header-text">
                                <h1 className="title-text">Duke Data Service Desktop Client</h1>
                                <Button
                                    className="chooseProj-button" 
                                    bsSize="default"
                                    onClick={this.handleShow}
                                >
                                    Choose Project and Workflow
                                </Button>
                            </div>
                        </div>

                        <section className="choose-project">
                            <div className="static-modal">
                                <Modal
                                    isOpen={this.state.showModal}
                                    onAfterOpen={this.afterOpenModal}
                                    onRequestClose={this.state.handleClose}
                                    style={customStyles}
                                    contentLabel='file browser'
                                >
                                    <h2 ref={subtitle => this.subtitle = subtitle}>File Browser</h2>
                                    <NestedDirectories />
                                    <Button
                                        bsStyle="success"
                                        bsSize="default"
                                        onClick={this.handleClose}
                                    >
                                        Select
                                    </Button>
                                    <Button
                                        bsStyle="danger"
                                        bsSize="default"
                                        onClick={this.handleClose}
                                    >
                                        Cancel
                                    </Button>
                                </Modal>
                            </div>
                        </section>
                    </header>
                    <main>
                        <section className="work-description">
                            <form onSubmit={this.handleSubmit}> 
                                <label>
                                    Description of Workflow:
                                    <input type="text" name="description" />
                                </label>
                            </form>
                        </section>

                        <section className="file-drop">
                            <div className="drop1">
                                <Dropzone 
                                    className="source-dropzone"
                                    onDrop={this.onSourceDrop.bind(this)} 
                                    multiple={true}
                                >
                                    <p>Drop source files here or click to upload</p>
                                </Dropzone>
                                <aside className="dropped-files">
                                    <h2 className="filler-text">Dropped Source Files</h2>
                                    <ul>
                                        {
                                            this.state.sourceFiles.map(f => <li key={f.name}>{f.name} - {f.size } bytes </li>)
                                        }
                                    </ul>
                                </aside>
                            </div>

                            <div className="drop2">
                                <Dropzone 
                                    className="result-dropzone"
                                    onDrop={this.onResultDrop.bind(this)}
                                    multiple={true}
                                >
                                    <p>Drop result files here or click to upload</p>
                                </Dropzone>
                                <aside className="dropped-files">
                                    <h2 className="filler-text">Dropped Result Files</h2>
                                    <ul>
                                        {
                                            this.state.resultFiles.map(f => <li key={f.name}>{f.name} - {f.size } bytes </li>)
                                        }
                                    </ul>
                                </aside>
                            </div>
                        </section>
                    </main>
                    <footer className="App-footer">
                        <Button className="cancel-button" bsSize="large" type="cancel"> Cancel</Button>
                        <Button className="submit-button" bsSize="large" type="submit"> Submit</Button>
                    </footer>
                </div>
            </form>

        );
    }


    



}

