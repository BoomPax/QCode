const globalServerAddress = "http://localhost:8181";
const serverAddress = "http://localhost";
const openProtocol = "qcodecloudagent://";
const expectedVersion = "2.0";
const globalPort = "8181";

function makeGlobalRequest(uri:string,body:string):Promise<object> {
    return makeRequest(uri,body,globalPort)
}

function makeRequest(uri:string,body:string,port:string):Promise<object> {
    return new Promise((resolve, reject) => {
        fetch(globalServerAddress+":"+port + "/" + uri, {
            method: "POST",
            body: body,
        }).then(async (response: Response) => {
            console.log(response);
            if (response.ok) {
                let json = await response.json()
                if(json.success) {
                    resolve(json);
                }else{
                    console.log(json);
                    reject(json)
                }
            } else {
                reject("failed to connect to could agent")
            }
        }).catch((e) => {
            reject("failed to connect to could agent");
        })
    });
}



export {makeGlobalRequest,makeRequest,openProtocol}