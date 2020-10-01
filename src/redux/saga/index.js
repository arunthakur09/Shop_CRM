import { fork } from 'redux-saga/effects';
import {watcherLoginRequestSaga} from './login';
import {watcherCustomerRequestSaga} from './customer';
import {watcherCollectorRequestSaga} from './collector';
import {watcherRoutesRequestSaga} from './routes';
import {watcherDevicesRequestSaga} from './devices';
import {watcherTransactionsRequestSaga} from './transactions';
import {watcherBarcodeRequestSaga} from './barcode';
import {watcherPaymentsRequestSaga} from './payments';
import {watcherCustomerBarcodeRequestSaga} from './customerbarcode';
import {watcherServiceRequestsRequestSaga} from './servicerequest';
import {watcherPickupHistoryRequestSaga} from './history';
import {watcherNoteRequestSaga} from './note';
import {watcherusersRequestSaga} from './user';
import {watcherPickuprouteRequestSaga} from './pickuproutes';

export default function* rootSaga() {
 yield fork(watcherLoginRequestSaga);
 yield fork(watcherCustomerRequestSaga);
 yield fork(watcherCollectorRequestSaga);
 yield fork(watcherRoutesRequestSaga);
 yield fork(watcherDevicesRequestSaga);
 yield fork(watcherTransactionsRequestSaga);
 yield fork(watcherBarcodeRequestSaga);
 yield fork(watcherPaymentsRequestSaga);
 yield fork(watcherCustomerBarcodeRequestSaga);
 yield fork(watcherServiceRequestsRequestSaga);
 yield fork(watcherPickupHistoryRequestSaga);
 yield fork(watcherNoteRequestSaga);
 yield fork(watcherusersRequestSaga);
 yield fork(watcherPickuprouteRequestSaga);
}
