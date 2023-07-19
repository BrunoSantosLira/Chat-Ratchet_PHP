var conn = new WebSocket('ws://localhost:8080');
conn.onopen = function(e) {
    console.log("Connection established!");
};

conn.onmessage = function(e) {
   console.log(e.data);
   showMessages('other', e.data);
};

let nome = document.getElementById('nome');
let msg = document.getElementById('mensagem');
let btn_env = document.getElementById('btn1');
let content = document.getElementById('content');
let form = document.getElementById('form1');

btn_env.addEventListener('click', function(){
    if(msg.value != ''){
        let mensagem = {'nome': nome.value, 'msg': msg.value}
        mensagem = JSON.stringify(mensagem)
        console.log(mensagem)

        conn.send(mensagem)

        showMessages('me', mensagem);

        msg.value = ''
    }
})

function showMessages(how, data) {
    data = JSON.parse(data);

    console.log(data);

    if (how == 'me') {
        var img_src = "assets/imgs/Icon awesome-rocketchat.png";
    } else if (how == 'other') {
        var img_src = "assets/imgs/Icon awesome-rocketchat-1.png";
    }

    var div = document.createElement('div');
    div.setAttribute('class', how);

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