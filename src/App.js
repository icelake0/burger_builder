import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import MyMapComponent from './containers/MyMapComponent/MyMapComponent';
import Firebase from 'firebase';
import Error from './components/Error/Error'
import Success from './components/Success/Success'

class App extends Component {

  constructor(props){
    super(props);
    Firebase.initializeApp({
      apiKey: "AIzaSyDE-2KmG3Zuk6cn3xys7JQa-ET1_rhhj-o",
      authDomain: "tracker-243516.firebaseapp.com",
      databaseURL: "https://tracker-243516.firebaseio.com",
      projectId: "tracker-243516",
      storageBucket: "tracker-243516.appspot.com",
      messagingSenderId: "81905204798",
      appId: "1:81905204798:web:2700c33b27e0cf76"
    });

    this.state = {
      locations : [],
      location :{
        lat: -34.397,
        lng: 150.644
      },
      error: null,
      success:null,
      currentLocation : null
    }
  }  
  getUserData = () => {
    let ref = Firebase.database().ref('/locations');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      this.setState({locations : state});
      console.log('this system state :', this.state.locations);
    });
    console.log('DATA RETRIEVED');
  }

  componentDidMount() {
    this.getUserData();
    
  }

  render() {
    return (
      <div>
       <Layout>
         <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            location={this.state.location}
          />
          <div className='row'>
            <div className='col-xl-12'>
              <h1>Find Someone</h1>
              {(this.state.error)?
              <Error message={this.state.error} /> : null}
              {(this.state.success)?
              <Success message={this.state.success} /> : null}
              <form onSubmit={ this.handleSubmit }>
                <div className="form-row">
                  <input type='hidden' ref='uid' />
                  <div className="form-group col-md-6">
                    <label>Email</label>
                    <input type="text" ref='email' className="form-control" placeholder="Email" />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Access Code</label>
                    <input type="text" ref='accessCode' className="form-control" placeholder="Access Code" />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Find</button>
              </form>
            </div>
          </div>
       </Layout>
      </div>
    );
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({error: null, success: null});
    console.log('fired');
    let email = this.refs.email.value;
    let accessCode = this.refs.accessCode.value;
  
    if (email && accessCode ){
      let { locations } = this.state;
      let locationIndex = this.getLocationIndex(locations, email, accessCode)
      if(locationIndex){
        let location = locations[locationIndex];
        //at this point the location was matched, do the fallowing
        //1 start leastening to the location found cange
        this.leastenToLocationChange(locationIndex);
        //2 show a success message that the person id found
        this.setState({success:`We found the person you are looking for : ${email}`});
        //3 clear the form submitted
        this.refs.email.value='';
        this.refs.accessCode.value='';
        //4 change the map location to the longitude and latitude of the location found
        this.setState({location})
      }else{
        //show and error message that the credencial is not valid
        this.setState({error:'We cant find the person you are looking for in our record'})
      }
    }
    else{
      // show an error message that validation is not good
      this.setState({error:'Your inputs are not valid'})
    }
  }

  setCurrentLocationIndex = (index) => {
    if(index){
      this.setState({currentLocation : index})
    }
  }
  getLocationIndex = (locations, email, accessCode) => {
    let index = null;
    try{
      Object.keys(locations).forEach(key => {
        let location = locations[key];
        if(location.email === email && location.accessCode === accessCode){
          index = key;
          throw {message : 'found the location'};
        }
      })
    }catch(e){}
    return index;
  }

  leastenToLocationChange = (key)=>{
    let ref = Firebase.database().ref(`/locations/${key}`);
    ref.on('value', snapshot => {
      const location = snapshot.val();
      console.error(location);
      this.setState({location : location});
    });
  }
  
}

export default App;
