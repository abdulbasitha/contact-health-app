import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';
import Feed from './Screens/FeedBack';
import PermissionHome from './PermissionHome';
import Home from './Home';
import Test from './Test';

AppRegistry.registerComponent(appName, () => PermissionHome);
