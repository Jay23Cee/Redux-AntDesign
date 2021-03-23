import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './components/Homepage'
import {IRootState} from './store'
import { connect } from 'react-redux'

import { Dispatch } from 'redux';
import * as asyncactions from './store/books/async-actions';
import { BookActions } from './store/books/types';


//import Homepage from './components/Homepage'

// function App() {
  
//   return (
//     <div >
//      <Homepage/>
//     </div>
//   );
// }

const mapStateToProps = ({ demo }: IRootState) => {
  const { list, title, author } = demo;
  return { list, title,author };
}

const mapDispatcherToProps = (dispatch: Dispatch<BookActions>) => {
  return {
    addItem: (item: string) => asyncactions.addItemAsync(dispatch, item)
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;

interface IState {
  inputText: string
}

class App extends React.Component<ReduxType, IState> {
  public state: IState = {
    inputText: ''
  }

  public onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({inputText: e.target.value});
  }

  public onAddClick = () => {
    this.props.addItem(this.state.inputText);
    this.setState({inputText: ''});
  }

  public render() {
    const { list, title, author } = this.props;
  return (
    
    <div >
     <Homepage/>
    </div>
    // return (
    //   <div style={{margin: '20px'}}>
    //     <input value={this.state.inputText} onChange={this.onInputChange}/>
    //     <button onClick={this.onAddClick}>Add</button>
    //     {loading && <div>Loading...</div>}
    //     <ul>
    //       {list.map(l => <li key={l}>{l}</li>)}
    //     </ul>
    //   </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(App);