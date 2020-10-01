export default [
  
  {
    _tag: 'CSidebarNavTitle',
    _children: ['General']
  },{
    _tag: 'CSidebarNavDropdown',
    name: 'User Management',
    route: '/user',
    icon: 'cil-file',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Show Users',
        to: '/user/show-user',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'New User',
        to: '/user/new-user',
      },

    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Customers',
    route: '/customer',
    icon: 'cilHome',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Show Customers',
        to: '/customer/show-customer',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'New Customer',
        to: '/customer/new-customer',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Pickup History',
        to: '/customer/pickup-history',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Collectors',
    route: '/collectors',
    icon: 'cil-pencil',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Show Collectors',
        to: '/collectors/show-collector',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'New Collector',
        to: '/collectors/new-collector',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Collector History',
        to: '/collectors/collector-history',
      },
    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Routes',
    route: '/routes',
    icon: 'cil-pencil',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Show Routes',
        to: '/routes/show-routes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'New Routes',
        to: '/routes/new-routes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Route History',
        to: '/routes/routes-history',
      },

    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Devices',
    route: '/devices',
    icon: 'cil-pencil',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Show Devices',
        to: '/devices/show-devices',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'New Devices',
        to: '/devices/new-devices',
      },

    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Barcodes',
    route: '/barcodes',
    icon: 'cil-file',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Show Barcodes',
        to: '/barcodes/show-barcodes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'New Barcodes',
        to: '/barcodes/new-barcodes',
      },

    ],
  },


  {
    _tag: 'CSidebarNavDropdown',
    name: 'Transaction',
    route: '/transaction',
    icon: 'cil-file',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Show Transaction',
        to: '/transaction/show-transaction',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'New Transaction',
        to: '/transaction/new-transaction',
      },

    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Payments',
    route: '/payments',
    icon: 'cil-file',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Show Payments',
        to: '/payments/show-payment',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'New Payments',
        to: '/payments/new-payment',
      },

    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Service Requests',
    route: '/payments',
    icon: 'cil-file',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Show Requests',
        to: '/services/show-request',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'New Requests',
        to: '/services/new-request',
      },

    ],
  },


]

