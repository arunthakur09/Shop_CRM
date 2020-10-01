import { combineReducers } from 'redux';
import LoginReducer  from './loginReducer';
import ChangeStateReducer from './changeStateReducer';
import CustomerReducer from './customerReducer';
import CollectorReducer from './collectorReducer';
import RoutesReducer from './routesReducer';
import DevicesReducer from './devicesReducer';
import TransactionsReducer from './transactionsReducer';
import BarcodeReducer from './barcodeReducer';
import PaymentsReducer from './paymentsReducer';
import CustomerBarcodeReducer from './customerbarcodeReducer';
import ServiceRequestReducer from './servicerequestsReducer';
import PickupHistoryReducer from './historyReducer';
import NoteListReducer from './notelistReducer';
import UserReducer from './userReducer';
import PickuprouteReducer from './pickuproutesReducer';
import NoteReducer from './noteReducer'

// combine all reducers here
export default combineReducers({
  user: LoginReducer,
  sidebarShow: ChangeStateReducer,
  customerData: CustomerReducer,
  collector: CollectorReducer,
  routes: RoutesReducer,
  devices: DevicesReducer,
  transactions: TransactionsReducer,
  barcodes: BarcodeReducer,
  payments: PaymentsReducer,
  customerbarcodes: CustomerBarcodeReducer,
  servicerequests: ServiceRequestReducer,
  pickups: PickupHistoryReducer,
  noteslist: NoteListReducer,
  users: UserReducer,
  pickroutes: PickuprouteReducer,
  notes: NoteReducer
})
