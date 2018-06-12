/**
 * 
 * @file Content Picker Popup Component
 * @author Box
 */

import makePopup from '../makePopup';
import ContentPicker from './ContentPicker';
import { CLIENT_NAME_CONTENT_PICKER } from '../../constants';

export default makePopup(CLIENT_NAME_CONTENT_PICKER)(ContentPicker);