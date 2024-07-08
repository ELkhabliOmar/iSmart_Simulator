const { RPCServer, createRPCError } = require("ocpp-rpc"); 
const io = require('./socket/socketConnection'); // Import the ioconnection module

const server = new RPCServer({
    protocols: ["ocpp1.6"], // server accepts ocpp1.6 subprotocol
    // enable strict validation of requests & responses
});

server.auth((accept, reject, handshake) => {
    accept();
});

server.on("client", async (client) => {
    
    let roomkey;
    let isIdentified = false;
    client.handle("startSession", (req) => {
        roomkey = req.params.idTag;
        console.log("session started");
        io.emit("joiningroom", { idTag:roomkey });
        
    });
    // check if id Tag is existe in our data base ; if it's existe open a room and start transaction else don't do nothing
    if (roomkey == "idtag in data base ") {
        // check if user have some money
        isIdentified = true;
    }

    console.log("server sended the current rfid ");

    // create a specific handler for handling BootNotification requests
    client.handle("BootNotification", ({ params }) => {
        console.log(`Server got BootNotification from ${client.identity}:`, params);

        // respond to accept the client
        return {
            status: "Accepted",
            interval: 300,
            currentTime: new Date().toISOString(),
        };
    });


    // create a specific handler for handling Heartbeat requests
    client.handle("Heartbeat", ({ params }) => {
        console.log(`Server got Heartbeat from ${client.identity}:`, params);

        // respond with the server's current time.
        return {
            currentTime: new Date().toISOString(),
        };
    });

    // create a specific handler for handling StatusNotification requests
    client.handle("StatusNotification", ({ params }) => {
        console.log(
            `Server got StatusNotification from ${client.identity}:`,
            params
        );
        return {};
    });
     // Create a specific handler for handling ChangeAvailability requests
     client.handle("ChangeAvailability", ({ params }) => {
        console.log(
            `Server got ChangeAvailability from ${client.identity}:`,
            params
        );

        // Here you can implement your logic for handling ChangeAvailability request
        // For example, change the status of the connector in your system

        // Respond to indicate the status change has been accepted or rejected
        return {
            status: "Accepted", // or "Rejected" based on your logic
        };
    });

        // Create a specific handler for handling AuthorizationStatus requests
        client.handle("AuthorizationStatus", ({ params }) => {
            console.log(
                `Server got AuthorizationStatus from ${client.identity}:`,
                params
            );
    
            // Here you can implement your logic for handling AuthorizationStatus request
            // For example, check the authorization status of the user
    
            // Respond to indicate the authorization status
            return {
                idTagInfo: {
                    status: "Accepted", // or other status based on your logic (e.g., "Blocked", "Expired", etc.)
                    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(), // example expiry date
                    parentIdTag: "parentIdTagExample" // example parent ID tag
                }
            };
        });




});

server.listen(5001);

// time_in_hes_mobile_phone = 09:22 - 8 => 09:14 ;
// real time = 09:14 - 00:13  = 09:01
