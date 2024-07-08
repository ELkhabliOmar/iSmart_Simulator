const { RPCClient } = require("ocpp-rpc");
const { v4: uuidv4 } = require("uuid");
const cli = new RPCClient({
  endpoint: "ws://localhost:5001", // the OCPP endpoint URL
  identity: uuidv4(), // the OCPP identity
  protocols: ["ocpp1.6"], // client understands ocpp1.6 subprotocol
   // enable strict validation of requests & responses
});



// // connect to the OCPP server
// const runclient =async ()=>{
//     await cli.connect();

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

// Register a specific handler for handling StatusNotification requests
cli.handle("StatusNotification", ({ params }) => {
  console.log(
    `Server got StatusNotification from ${cli.identity}:`,
    params
  );
  return {};
});


let  bootResponse ; 

exports.whatToDo = async (data) => {
  try {
    switch (data) {
      case "c":
        await cli.connect( ); 
        await cli.call('startSession', {
          idTag: 'ABC123'
      })
        console.log("\x1b[32m%s\x1b[0m", "Connected to the server.");
        break;
      case "b":
        // send a BootNotification request and await the response

       try {
        bootResponse = await cli.call("BootNotification", {
            chargePointVendor: "ocpp-rpc",
            chargePointModel: "ocpp-rpc",
          });
       } catch (error) {
        throw Error("you need to be connected first ")
       }
        console.log("\x1b[32m%s\x1b[0m", "Connected to the server.");
        break;
      case "h":
        const heartbeatResponse = await cli.call('Heartbeat', { });
        console.log("\x1b[33m%s\x1b[0m", "Sending heartbeat signal...");
        console.log('Server time is:', heartbeatResponse.currentTime);
        // Implement heartbeat logic here
        break;
        case "t":
          const transaction = await cli.call('Heartbeat', { });
          console.log("\x1b[33m%s\x1b[0m", "Sending heartbeat signal...");
          console.log('Server time is:', heartbeatResponse.currentTime);
          // Implement heartbeat logic here
          break;
          //////////////////////////////////////////////
        case "s":
            if (!bootResponse || bootResponse.status !== 'Accepted') {
              throw new Error("Boot notification must be accepted before sending status notifications.");
            }
            const statusNotificationResponse = await cli.call('StatusNotification', {
              connectorId: 0,
              errorCode: "NoError",
              status: "Available",
            });
            console.log("\x1b[33m%s\x1b[0m", "Status notification sent:", statusNotificationResponse);
            break;
            ////////////////////////////////////////
      case "av":
        const availabilityResponse = await cli.call('ChangeAvailability', {
          connectorId: 0,
          type: "Inoperative" // or "Operative" based on your requirement
        });
        console.log("\x1b[33m%s\x1b[0m", "Change availability response:", availabilityResponse);
        break;
      /////////////////////////////////      
      case "au":
        const authorizationStatusResponse = await cli.call('AuthorizationStatus', {
          idTag: 'ABC123'
        });
        console.log("\x1b[33m%s\x1b[0m", "Sending authorization status...");
        console.log('Authorization status:', authorizationStatusResponse.idTagInfo.status);
        break;
        ///////////////
      case "disconnect":
        console.log("\x1b[34m%s\x1b[0m", "Disconnecting from the server...");
        // Implement disconnect logic here
        break;
      case "exit":
        console.log("\x1b[31m%s\x1b[0m", "Exiting the process...");
        process.exit(); // Exit the script after handling input
        break;
        case "help" :
        
        break;
        case "about" : 
        const about = `
        ISMART_CLIENT  is an RPC Client Simulator is a lightweight program designed to simulate the client section
        of the RPC (Remote Procedure Call) protocol. This simple yet powerful simulator allows users
        to interact with the RPC server and emulate various RPC calls and responses directly from the terminal.
        `;
        console.log("\x1b[32m%s\x1b[0m",about);
        break;
      default:
        console.log(
          "\x1b[31m%s\x1b[0m",
          "Invalid input. Please enter 'connect', 'boot', 'h','disconnect','help' , 'about', or 'exit'."
        );
        break;
    }
  } catch (error) {
    return console.log("\x1b[31m%s\x1b[0m", error);
  }
};
