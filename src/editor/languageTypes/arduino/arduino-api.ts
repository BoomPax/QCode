const serverAddress = "http://localhost:8181";
const openProtocol = "qcodecloudagent://";

class Sketch{
    readonly name: string;
    constructor(name:string) {
        this.name = name;
        this.makeRequest("create","").catch(e=>{});
    }

    private makeRequest(type:string,body:string):Promise<object> {
        return new Promise((resolve, reject) => {
            fetch(serverAddress + "/" + type + "/" + this.name, {
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
                    reject("failed")
                }
            }).catch((e) => {
                reject("failed")
            })
        });
    }

    writeCode(code:string):Promise<object> {
        return this.makeRequest("write", code)
    }

    compile():Promise<object> {
        return this.makeRequest("compile", "")
    }

    upload():Promise<object> {
        return this.makeRequest("upload", "")
    }
}


function startSketchServer(name:string):Promise<Sketch>{
    return new Promise((resolve, reject) => {
        fetch(serverAddress+"/status",{
            method: "GET",
            mode:"no-cors",
        }).then(r => {
            resolve(new Sketch(name));
        }).catch(err=>{
            window.location.href = openProtocol;
            setTimeout(()=>{
                window.location.reload();
            },5000);
        })
    });
}


export {serverAddress,Sketch,startSketchServer}