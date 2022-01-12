
$(document).ready(
    $('#register-button').click((event) => {
        console.log("working")
                event.preventDefault();
                var form = $('#submit-form')
                var action = form.attr('action');
                var data = form.serializeArray().reduce(function (obj, item) {
                    obj[item.name] = item.value;
                    return obj;
                }, {});;
                let token;
                $('#err-box').remove();
                let d = document.createElement('div')
                $(d).addClass("alert alert-warning")
                    .attr('id', 'err-box')
                    .appendTo("#err-msg")
                console.log(data);
                $.ajax({
                    type: "POST",
                    url: action,
                    headers:{"Content-Type": "application/json"},
                    data: JSON.stringify(data),
                    success: (data, err) => {
                        console.log({ "data": data, "err": err });
                        if (data.redirect) {
                            window.location.replace(data.redirect)
                        }
                        if(typeof data === "object"){
                            console.log({ "drt": data });
                            let err = data['error'];
                            console.log(typeof err);
                            $(d).val('');
                            if (typeof err === "string") {
                                $(d).append(err).css('color', 'red');
                                $('section').css("height", "fit-content");
                                return;
                            }
                            $.each(err, (index, err) => {
                                console.log(err);
                                console.log({ "err": err });
                                $.each(err,(key, value) => {
                                    console.log({ "error": value });
                                    $(d).append(value + "<br>").css('color', 'red');
                                    $('section').css("height", "fit-content");
                                })
                        })
                        }
                    },
                    error: (err, status, req) => {
                        const error = err.responseJSON
                        console.log({ "error": error.error })
                        $(d).append(error.error + "<br>").css('color', 'red');
                        $('section').css("height", "fit-content");
                    },
                    complete: (data, err, req) => {
                        console.log({ "dt": data, "err": err, "req": req });
                        console.log({ "data": data.getAllResponseHeaders() });
                        const token = data.getResponseHeader('access_token');
                        localStorage.setItem("access_token", token);
                        console.log(localStorage.getItem('access_token'));
                        const header = data.getResponseHeader('Location');
                        window.location.replace(header);
                        console.log(header, token);
                    }
                    
                })

    })
)


