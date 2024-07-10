const {whatToDo}   = require("./client_config");
process.stdin.setEncoding("utf8");



// // connect to the OCPP server
// const runclient =async ()=>{
//     await cli.connect();

//     // send a BootNotification request and await the response
//     const bootResponse = await cli.call('BootNotification', {
//         chargePointVendor: "ocpp-rpc",
//         chargePointModel: "ocpp-rpc",
//     });

//     // check that the server accepted the client
//     if (bootResponse.status === 'Accepted') {

//         // send a Heartbeat request and await the response
//       setInterval(async() => {
//         const heartbeatResponse = await cli.call('Heartbeat', { });
//         console.log('Server time is:', heartbeatResponse.currentTime);
//       }, 2000);
//         // read the current server time from the response

//         // send a StatusNotification request for the controller
//         await cli.call('StatusNotification', {
//             connectorId: 0,
//             errorCode: "NoError",
//             status: "Available",
//         });
//     }
// }
// runclient()

  const ismartMessage = `
  ██╗ ███████╗  ███╗   ███╗   █████╗  ██████╗ ███████╗  ~~~~~~~GEP~~~~~~~
  ██║ ██╔════╝  ████╗ ████║  ██╔══██╗ ██╔══██╗   ██╔═╝       CLIENT
  ██║ ███████╗  ██╔████╔██║  ███████║ ██████╔╝   ██║       SIMULATOR
  ██║ ╚════██║  ██║╚██╔╝██║  ██╔══██║ ██╔══██╗   ██║           BY 
  ██║ ███████║  ██║ ╚═╝ ██║  ██║  ██║ ██║  ██║   ██║     EL-KHABLI Omar
  ╚═╝  ╚═════╝  ╚═╝     ╚═╝  ╚═╝  ╚═╝ ╚═╝  ╚═╝   ╚═╝    ~~~~~~~GEP~~~~~~~
`;

  const display_help = () => {
    const gradientColors = [
      '\x1b[35m', // Magenta
      '\x1b[32m', // Green
    
      '\x1b[33m', // Yellow
      '\x1b[36m', // Cyan
      '\x1b[34m', // Blue
      '\x1b[31m', // Red
    ];

    let commands = [
      " Please enter one of the following commands:",
      "     'c' - Connect to the server",
      "     'h' - Send a BootNotification ",
      "     'b' - Send a heartbeat signal",
      "     's' - Send a status notification",
      "     'av' - Send a change availability request",
      "     'au' - Send an authorization status request",
      "     'd' - Disconnect from the server",
      "     'e' - Exit the program",
    ];


    for (let i = 0; i < commands.length; i++) {
      const color = gradientColors[i % gradientColors.length];
      console.log(color + commands[i]);
    }
  
    // Reset the color to default
    console.log('\x1b[0m');
  };
  
 
  console.log('\x1b[34m%s\x1b[0m',ismartMessage);
  display_help()

  process.stdin.on("data", async(data) => {
    whatToDo(data.trim());
    console.log('\x1b[35m%s\x1b[0m', '-------------------------------------------------------------------------------------');
      display_help()
  });
   
  
  