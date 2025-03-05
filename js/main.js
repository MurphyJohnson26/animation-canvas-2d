const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Dimensiones fijas del canvas
const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

class Circle {
  constructor(x, y, radius, color, speed) {
    this.radius = Math.min(radius, window_width / 4, window_height / 4);
    this.posX = Math.max(this.radius, Math.min(x, window_width - this.radius));
    this.posY = Math.max(this.radius, Math.min(y, window_height - this.radius));
    this.color = color;
    this.speed = speed;
    this.bounceCount = 0; // Contador de rebotes

    // Asegurar que la dirección inicial sea diferente de 0
    this.dx = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1 + 1) * this.speed;
    this.dy = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1 + 1) * this.speed;
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.bounceCount, this.posX, this.posY); // Mostrar el contador
    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update(context) {
    this.draw(context);

    // Detectar colisión con los bordes y aumentar el contador
    if (this.posX + this.radius >= window_width || this.posX - this.radius <= 0) {
      this.dx *= -1;
      this.posX = Math.min(Math.max(this.radius, this.posX), window_width - this.radius);
      this.bounceCount++; // Incrementar el contador en cada rebote
    }
    if (this.posY + this.radius >= window_height || this.posY - this.radius <= 0) {
      this.dy *= -1;
      this.posY = Math.min(Math.max(this.radius, this.posY), window_height - this.radius);
      this.bounceCount++; // Incrementar el contador en cada rebote
    }

    // Actualizar posición
    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// Crear un círculo aleatorio asegurando que no esté fuera de los límites
let randomX = Math.random() * (window_width - 60) + 30;
let randomY = Math.random() * (window_height - 60) + 30;
let randomRadius = Math.floor(Math.random() * 40 + 20); // Radio entre 20 y 60

let miCirculo = new Circle(randomX, randomY, randomRadius, "blue", 1.5);

function updateCircle() {
  requestAnimationFrame(updateCircle);
 ctx.clearRect(0, 0, window_width, window_height);
  miCirculo.update(ctx);
}

updateCircle();
