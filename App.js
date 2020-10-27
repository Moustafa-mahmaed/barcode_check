import React, {Component} from "react"
import { StyleSheet, View, Text, Platform, TouchableOpacity, Linking, PermissionsAndroid } from 'react-native';

import SplashScreen from 'react-native-splash-screen'

import { CameraKitCameraScreen, } from 'react-native-camera-kit';

export default class App extends Component {
  constructor() {

    super();

    this.state = {
      torchOn: false,
      country:"",

      QR_Code_Value: '',

      Start_Scanner: false,

    };
  }

 componentDidMount() {
    	
        SplashScreen.hide();
    }
 checkcountry=(code)=> {
console.log("first code" +code);
  code = parseInt(code.substr(0, 3), 10);
console.log("second" +code);
   if (code === 622) {
     this.setState({
       country:"منتج بلدنا  "
     })
    
    // return 'EG';
  } else if ((300 <= code && code <= 379)) {
  this.setState({
       country:"منتج فرنسى "
     })
  }
  else if ((868 <= code && code <= 869)) {
    this.setState({
       country:"منتج تركي "
     })}
     else {
     this.setState({
       country:" منتج غير تركي "
     })
  }
}
 



  openLink_in_browser = () => {
that.setState({ QR_Code_Value: '' ,country:"" });
    Linking.openURL(this.state.QR_Code_Value);
    

  }

  onQR_Code_Scan_Done = (QR_Code) => {

    this.setState({ QR_Code_Value: QR_Code });

    this.setState({ Start_Scanner: false });
   
    this.checkcountry(QR_Code)
      
      
   
  }

  open_QR_Code_Scanner=()=> {

    var that = this;

    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA, {
              'title': 'Camera App Permission',
              'message': 'Camera App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            that.setState({ QR_Code_Value: '' });
            that.setState({ Start_Scanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err", err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      that.setState({ QR_Code_Value: '' });
      that.setState({ Start_Scanner: true });
    }
  }
  render() {
    if (!this.state.Start_Scanner) {

      return (
        <View style={styles.MainContainer}>

          <Text style={{ fontSize: 22, textAlign: 'center' }}>React Native Scan QR Code Example</Text>

          <Text style={styles.QR_text}>
            {this.state.QR_Code_Value ? 'Scanned QR Code: ' + this.state.QR_Code_Value : ''}
            
          </Text>
           <Text style={styles.QR_text}> 
           country: -->
           { this.state.country }
           </Text>

          {this.state.QR_Code_Value.includes("http") ?
            <TouchableOpacity
              onPress={this.openLink_in_browser}
              style={styles.button}>
              <Text style={{ color: '#FFF', fontSize: 14 }}>Open Link in default Browser</Text>
            </TouchableOpacity> : null
          }

          <TouchableOpacity
            onPress={this.open_QR_Code_Scanner}
            style={styles.button}>
            <Text style={{ color: '#FFF', fontSize: 14 }}>
              Open QR Scanner
            </Text>
          </TouchableOpacity>

        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>

        <CameraKitCameraScreen
          showFrame={true}
          scanBarcode={true}
          laserColor={'#FF3D00'}
          frameColor={'#00C853'}
          colorForScannerFrame={'black'}
          onReadCode={event =>
            this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
          }
        />

      </View>
    );
  }
}
const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  QR_text: {
    color: '#000',
    fontSize: 19,
    padding: 8,
    marginTop: 12
  },
  button: {
    backgroundColor: '#2979FF',
    alignItems: 'center',
    padding: 12,
    width: 300,
    marginTop: 14
  },
});