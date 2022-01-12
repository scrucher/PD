
function GetData() {
    console.log({ "token":localStorage.getItem('access_token') })
        $.ajaxSetup({
            xhrFields: {
                withCredentials: true,
                headers: {
                    'Authorization': localStorage.getItem('acess_token'),
                }
            }
        });
        $.ajax({
            type: "GET",
            url: "/Admin/Profile",
            xhrFields: {
                withCredentials: true,
            },
            contentType: "application/json",
            dataType: "json",
            crossDomain: true,
            success: (msg, status, req) => {
                console.log({
                    "msg": msg,
                    "status": status,
                    "req": req
                })
            },
            err: (err, status, req) => {
                console.log({
                    "msg": err,
                    "status": status,
                    "req": req
                })
            },
            complete: (msg, status) => {
                console.log({
                    "msg": msg,
                    "status": status,
                })
                console.log(msg.getAllResponseHeaders());
                const header = msg.getResponseHeader('Location');
                window.location.replace(header);
                console.log(document.cookie)
            },
        })
    // fetch("/Admin/Profile/Data", {
    //     method: "GET",
    //     headers: { "Content-type": "application/json" }
    // }).then((data, err) => {
    //     console.log({
    //         "data": data,
    //         "error": err,
    //     })
    // }).catch(err => console.log({ "err": err }));
}
setInterval(GetData, 30000);
GetData();
    
