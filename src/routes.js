import React from 'react';

const ShowCustomer = React.lazy(() => import('./views/customers/showCustomer'));
const NewCustomer = React.lazy(() => import('./views/customers/editCustomer'));
const PickupHistory = React.lazy(() => import('./views/customers/pickupHistory'));

const ShowCollector = React.lazy(() => import('./views/collector/showCollector'));
const NewCollector = React.lazy(() => import('./views/collector/editCollector'));
const CollectorHistory = React.lazy(() => import('./views/collector/collectorHistory'));

const ShowRoutes = React.lazy(() => import('./views/routes/showRoutes'));
const NewRoutes = React.lazy(() => import('./views/routes/editRoutes'));
const RoutesHistory = React.lazy(() => import('./views/routes/routesHistory'));
const RoutesPlanner = React.lazy(() => import('./views/routes/routesPlanner'));
const RoutesPickup = React.lazy(() => import('./views/routes/routesPickup'));

const ShowDevices = React.lazy(() => import('./views/device/showDevice'));
const NewDevices = React.lazy(() => import('./views/device/editDevice'));

const ShowBarcodes = React.lazy(() => import('./views/barcode/showBarcode'));
const NewBarcodes = React.lazy(() => import('./views/barcode/editBarcode'));
const ViewBarcodes = React.lazy(() => import('./views/barcode/barcodeView'));

const ShowTransaction = React.lazy(() => import('./views/transaction/showTransaction'));
const EditTransaction = React.lazy(() => import('./views/transaction/editTransaction'));

const ShowPayments = React.lazy(() => import('./views/payment/showPayment'));
const EditPayment = React.lazy(() => import('./views/payment/editPayment'));

const ShowService = React.lazy(() => import('./views/service requests/showService'));
const EditService = React.lazy(()=> import('./views/service requests/editService'));

const Notes = React.lazy(()=> import('./views/service requests/shownotes'));
const Editnotes = React.lazy(()=> import('./views/service requests/editnotes'));

const Showuser = React.lazy(()=> import('./views/user/showuser'));
const Edituser = React.lazy(()=> import('./views/user/edituser'));
const Editprofile = React.lazy(()=> import('./views/user/editprofile'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: ShowCustomer },

  { path: '/customer', exact: true, name: 'Customer', component: ShowCustomer },
  { path: '/customer/show-customer', name: 'Customer List', component: ShowCustomer },
  { path: '/customer/new-customer', name: 'Edit Customer', component: NewCustomer },
  { path: '/customer/pickup-history', name: 'Pickup History', component: PickupHistory },

  { path: '/collectors', exact: true, name: 'Collectors', component: ShowCollector },
  { path: '/collectors/show-collector', name: 'Show Collector', component: ShowCollector },
  { path: '/collectors/new-collector', name: 'New Collector', component: NewCollector },
  { path: '/collectors/collector-history', name: 'Collector History', component: CollectorHistory },

  { path: '/routes', exact: true, name: 'Routes', component: ShowRoutes },
  { path: '/routes/show-routes', name: 'Show Routes', component: ShowRoutes },
  { path: '/routes/new-routes', name: 'New Routes', component: NewRoutes },
  { path: '/routes/routes-history', name: 'Routes History', component: RoutesHistory },
  { path: '/routes/planner', name: 'Routes Planner', component: RoutesPlanner },
  { path: '/routes/pickup', name: 'Routes Pickup', component: RoutesPickup },
 
  { path: '/devices', exact: true, name: 'Devices', component: ShowDevices },
  { path: '/devices/show-devices', name: 'Show Devices', component: ShowDevices },
  { path: '/devices/new-devices', name: 'New Devices', component: NewDevices },

  { path: '/barcodes', exact: true, name: 'Barcodes', component: ShowBarcodes },
  { path: '/barcodes/show-barcodes', name: 'Show barcodes', component: ShowBarcodes },
  { path: '/barcodes/new-barcodes', name: 'New Barcodes', component: NewBarcodes },
  { path: '/barcodes/:id', name: 'Barcode View', component: ViewBarcodes },

  { path: '/transaction', exact: true, name: 'Transactions', component: ShowTransaction },
  { path: '/transaction/show-transaction', name: 'Show Transactions', component: ShowTransaction },
  { path: '/transaction/new-transaction', name: 'New Transaction', component: EditTransaction },

  { path: '/payments', exact: true, name: 'Payments', component: ShowPayments },
  { path: '/payments/show-payment', name: 'Show Payments', component: ShowPayments },
  { path: '/payments/new-payment', name: 'New Payment', component: EditPayment },

  { path: '/services', exact: true, name: 'Service Requests', component: ShowService },
  { path: '/services/show-request', name: 'Show Requests', component: ShowService },
  { path: '/services/new-request', name: 'New Request', component: EditService },
  
  { path: '/services/notes', name: 'New Request', component: Notes },
  { path: '/services/notes-edit/:id', name: 'New Request', component: Editnotes },

  { path: '/user', exact: true, name: 'Users', component: Showuser },
  { path: '/user/show-user', name: 'Show Users', component: Showuser },
  { path: '/user/new-user', name: 'New User', component: Edituser },
  { path: '/user/edit-profile', name: 'Edit Profile', component: Editprofile },

];

export default routes;
