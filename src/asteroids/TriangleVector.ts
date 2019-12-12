export class TriangleVector {

    draw(ctx: CanvasRenderingContext2D, x: number, y: number, widht: number, height: number, angle) {

        const top = this.pointTop(x + (widht / 2), y, angle,widht,height)
        const left = this.pointTop(x, y + height, angle,widht,height)
        const right = this.pointTop(x + widht, y + height, angle,widht,height)
        ctx.fillStyle = "red"
        ctx.fillRect(top.x, top.y, 1, 1)
        ctx.fillRect(left.x, left.y, 1, 1)
        ctx.fillRect(right.x, right.y, 1, 1);
        ctx.fillStyle = "black"
        ctx.beginPath();
        ctx.moveTo(top.x, top.y);
        ctx.lineTo(left.x, left.y);
        ctx.lineTo(right.x, right.y);
        ctx.closePath();

        

        // the fill color
        ctx.fillStyle = "#FFCC00";
        ctx.fill();
    }
    pointTop(x, y, angle,widht,height) {
        x = x + widht * Math.cos(angle * Math.PI / 90);
        y = y + height * Math.sin(angle * Math.PI / 90);
        return { x, y }
    }
}