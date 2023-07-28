    
let nome = document.getElementById('nome');
let msg = document.getElementById('mensagem');
let btn_env = document.getElementById('btn1');
let content = document.getElementById('content');
let form = document.getElementById('form1');
var conn;
var conn_status = false;

window.onload = connect;


function connect(){
    if(conn_status){
        conn.close();
        conn_status = false;
        content.innerHTML = ''
    }

    let sala = document.getElementById('room').value;

    conn = new ab.Session('ws://localhost:8080',
    function() {
        conn_status = true
        conn.subscribe(sala, function(topic, data) {

            if(typeof data == 'string'){
                data = JSON.parse(data)
                for(var i = 0; i < data.length; i++){
                    showMessages(data[i])
                }
            }else{
                showMessages(data)
            }
        });
    },
    function() {
        console.warn('WebSocket connection closed');
    },
    {'skipSubprotocolCheck': true}
    );
}    


btn_env.addEventListener('click', function(){
    let salas = document.getElementById('room').value;
    if(msg.value != ''){
        let mensagem = {'nome': nome.value, 'msg': msg.value}
        mensagem = JSON.stringify(mensagem)

        console.log(salas)
        conn.publish(salas, mensagem)
        showMessages(mensagem)

        msg.value = ''
    }
})


function showMessages(data) {
    data = JSON.parse(data);

    console.log(data);
    var img_src = "assets/imgs/Icon awesome-rocketchat.png";


    var div = document.createElement('div');
    div.setAttribute('class', 'me');

    var img = document.createElement('img');
    img.setAttribute('src', img_src);

    var div_txt = document.createElement('div');
    div_txt.setAttribute('class', 'text');

    var h5 = document.createElement('h5');
    h5.textContent = data.nome;

    var p = document.createElement('p');
    p.textContent = data.msg;

    div_txt.appendChild(h5);
    div_txt.appendChild(p);

    div.appendChild(img);
    div.appendChild(div_txt);

    content.appendChild(div);
}