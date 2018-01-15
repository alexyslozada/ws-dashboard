const myData = [5, 12, 7, 1, 22];
const updateData = (i, v) => {
    myData[i] += v;
};

const ctx = document.getElementById("myChart").getContext('2d');
const producto = document.getElementById('producto');
const cantidad = document.getElementById('cantidad');
const btnSend = document.getElementById('send');

const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Pantalones", "Camisas", "Zapatos", "Vestidos", "Accesorios"],
        datasets: [{
            label: '# Ventas',
            data: myData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }],
            xAxes:[]
        },
        responsive: true,
        maintainAspectRatio: false
    }
});

const ws = new WebSocket('ws://localhost:1323/ws');

ws.onopen = () => {
    console.log('Conectado');
};

ws.onerror = e => {
    console.log('error en la conexión', e);
};

ws.onmessage = e => {
    console.log(e.data);
    const msg = JSON.parse(e.data);
    updateData(msg.producto, msg.cantidad);
    myChart.update();
};

btnSend.addEventListener('click', e => {
    e.preventDefault();
    const msg = {
        producto: parseInt(producto.value, 10),
        cantidad: parseInt(cantidad.value, 10)
    };
    ws.send(JSON.stringify(msg));
});