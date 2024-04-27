import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  isStreaming: boolean,
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component
{
  constructor(props: {}) {
    super(props);

    this.state = {
      data: [],
      isStreaming: false,
      // Set showGraph to false initially
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    // Render the graph only if showGraph is true
    if (this.state.showGraph) {
      return (<Graph data={this.state.data}/>);
    } else {
      return null; // If showGraph is false, return null (don't render the graph)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    // Start streaming
    this.setState({ isStreaming: true });

    // Use setInterval to continuously fetch data from the server
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        // Update the state with new data
        this.setState((prevState) => ({ data: [...prevState.data, ...serverResponds] }));
      });

      // If streaming is stopped, clear the interval
      if (!this.state.isStreaming) {
        clearInterval(interval);
      }
    }, 100);
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}
