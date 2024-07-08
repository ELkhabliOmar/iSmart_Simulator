
module.exports = io => socket => {
    socket.on( "connection", ( ) => {
        console.log("user is connected");
    }) 
    socket.on("disconnection" , ()=>{
        console.log("user is disconnected");

    })
    socket.on('joiningroom', (req)=>{
        console.log("they ask for joining room ");
    })
}
