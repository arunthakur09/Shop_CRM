export const weekDays = ["---","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
export const states=['---', "FL","MI", "TP","OL","JV","DT","NP"]
export const primaryAddresses=['Unknown', "Yes" , "No"]
export const collectorData=['collector01-01 test', "collector02-02 test" , "collector03-03 test", "collector04-04 test", "collector05-05 test"]
export const coinTypes=['-----', "digital" , "non-digital"]
export const currencyTypes=['-----', "coin" , "cc"]
export const barcodes=['-----', "Barcode 9999-898989 for customer01" , "Barcode 9999-898989 for customer02", "Barcode 9999-898989 for customer03", "Barcode 9999-898989 for customer04", "Barcode 9999-898989 for customer05" , "Barcode 9999-898989 for customer06"]
export const customers=['-----', "customer01" , "customer02", "customer03", "customer04", "customer05" , "customer06"]

export const amounts = ["200", "500" , "600", "150", "100" ]

export const plannerData = [

    { add: 1, name: "hializzle", address: '123 sw 8 street', address2:'' ,city:"Miami", state:"FL" ,zipcode:"33131" , mobile:'7862222222', phone:'	3056677777'},
    { add: 2, name: "hializzle", address: '123 sw 8 street', address2:'' ,city:"Miami",state:"FL",zipcode:"33131" , mobile:'7862222222', phone:'	3056677777' },
    { add: 3, name: "hializzle", address: '123 sw 8 street', address2:'',city:"Miami", state:"FL" ,zipcode:"33131" , mobile:'7862222222', phone:'	3056677777' },

];


export const plannerRouteData = [
    { add: 1, name: "hializzle", address: '123 sw 8 street', address2:'' ,city:"Miami", state:"FL" ,zipcode:"33131" , mobile:'7862222222', phone:'	3056677777'},
    { add: 1, name: "hializzle", address: '123 sw 8 street', address2:'' ,city:"Miami",state:"FL",zipcode:"33131" , mobile:'7862222222', phone:'	3056677777' },
    { add: 0, name: "hializzle", address: '123 sw 8 street', address2:'',city:"Miami", state:"FL" ,zipcode:"33131" , mobile:'7862222222', phone:'	3056677777' },
    { add: 0, name: "hializzle", address: '123 sw 8 street', address2:'' ,city:"Miami",state:"FL",zipcode:"33131" , mobile:'7862222222', phone:'	3056677777' },
    { add: 0, name: "hializzle", address: '123 sw 8 street', address2:'',city:"Miami", state:"FL" ,zipcode:"33131" , mobile:'7862222222', phone:'	3056677777' },
];

export const pickupData = [

    { add: 1,addedToRpute:'Oct. 9, 2017, 1:16 a.m.',  name: "hializzle",collector:'collector01-01 test',customerName:'customer01', address: '123 sw 8 street', address2:'' ,city:"Miami", state:"FL" ,zipcode:"33131" },
    { add: 2,addedToRpute:'Oct. 9, 2017, 1:16 a.m.', name: "hializzle",collector:'collector01-01 test',customerName:'customer02', address: '123 sw 8 street', address2:'' ,city:"Miami",state:"FL",zipcode:"33131"  },
    { add: 3,addedToRpute:'Oct. 9, 2017, 1:16 a.m.', name: "hializzle", collector:'collector01-01 test',customerName:'customer03',address: '123 sw 8 street', address2:'',city:"Miami", state:"FL" ,zipcode:"33131" },

];

export const deviceData = [

    {barcode:'Barcode 9999-898989 for customer01', 	deviceName:'vac01',model:'vac99x',serialNumber:'99999991', description:'test barcodes'},
    {barcode:'Barcode 12 for customer01',deviceName:'vac02',model:'	vac1000x',serialNumber:'8888881	', description:'Test device'},
    {barcode:'Barcode 111111-0909 for customer02',deviceName:'vac03',model:'vac999x',serialNumber:'111111101', description:'test device'},
    {barcode:'Barcode 9999-898989 for customer01',deviceName:'other-vac01',model:'vac989xx',serialNumber:'999912		', description:'test device'},
    {barcode:'Barcode 070707-0001 for Customer-03',	deviceName:'vac04',model:'rewrwer',serialNumber:'8888881	', description:'test device'},


];

export const barcodeData = [

    {barcode:'9999-898989', customer:'customer01' 	},
    {barcode:'56565-55555', customer:'customer02' },
    {barcode:'111111-0909' , customer:'customer03' },
    {barcode:'56565-55555', customer:'customer04' },
    {barcode:'22222-0909', customer:'customer05' }


];

export const transactionData = [

    {collectionDate:'Feb. 16, 2018, 8:26 p.m.', customer:'customer01', barcodeValue:'', amount :'100.00' , comments:'test'	},
    {collectionDate:'Feb. 17, 2018, 8:26 p.m.', customer:'customer01', barcodeValue:'', amount :'100.00', comments:'test'	},
    {collectionDate:'Feb. 18, 2018, 8:26 p.m.', customer:'customer02', barcodeValue:'', amount :'100.00' , comments:'test'	},
    {collectionDate:'Feb. 19, 2018, 8:26 p.m.', customer:'customer02', barcodeValue:'', amount :'100.00' , comments:'test'	},
    {collectionDate:'Feb. 20, 2018, 8:26 p.m.', customer:'customer01', barcodeValue:'', amount :'100.00' , comments:'test'	},
    {collectionDate:'Feb. 21, 2018, 8:26 p.m.', customer:'customer01', barcodeValue:'', amount :'100.00', comments:'test'	},
    {collectionDate:'Feb. 22, 2018, 8:26 p.m.', customer:'customer03', barcodeValue:'', amount :'100.00', comments:'test'	},
    {collectionDate:'Feb. 23, 2018, 8:26 p.m.', customer:'customer03', barcodeValue:'', amount :'100.00', comments:'test'	},
    {collectionDate:'Feb. 24, 2018, 8:26 p.m.', customer:'customer01', barcodeValue:'', amount :'100.00' , comments:'test'	},


];

export const paymentsData = [

    {id:'25',	amount:'250.00', commRate:'40.00%', commission:'100.00' ,salesTax:'	7.00',commAfterTax:'93.00',	collected:'150.00' },
    {id:'26',	amount:'250.00', commRate:'40.00%', commission:'100.00' ,salesTax:'	7.00',commAfterTax:'93.00',	collected:'150.00' },
    {id:'27',	amount:'250.00', commRate:'40.00%', commission:'100.00' ,salesTax:'	7.00',commAfterTax:'93.00',	collected:'150.00' },
    {id:'28',	amount:'250.00', commRate:'40.00%', commission:'100.00' ,salesTax:'	7.00',commAfterTax:'93.00',	collected:'150.00' },
    {id:'29',	amount:'250.00', commRate:'40.00%', commission:'100.00' ,salesTax:'	7.00',commAfterTax:'93.00',	collected:'150.00' },
    {id:'30',	amount:'250.00', commRate:'40.00%', commission:'100.00' ,salesTax:'	7.00',commAfterTax:'93.00',	collected:'150.00' },
    {id:'31',	amount:'250.00', commRate:'40.00%', commission:'100.00' ,salesTax:'	7.00',commAfterTax:'93.00',	collected:'150.00' },
    {id:'32',	amount:'250.00', commRate:'40.00%', commission:'100.00' ,salesTax:'	7.00',commAfterTax:'93.00',	collected:'150.00' },
    {id:'33',	amount:'250.00', commRate:'40.00%', commission:'100.00' ,salesTax:'	7.00',commAfterTax:'93.00',	collected:'150.00' },
    {id:'34',	amount:'250.00', commRate:'40.00%', commission:'100.00' ,salesTax:'	7.00',commAfterTax:'93.00',	collected:'150.00' },
];





