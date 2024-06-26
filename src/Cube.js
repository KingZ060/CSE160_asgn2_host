class Cube{
    constructor(){
        this.type = "cube";
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
    }

    render(){
        var rgba = this.color;
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // Front
        drawTriangle3D([0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0]);
        drawTriangle3D([0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0]);

        gl.uniform4f(u_FragColor, rgba[0] * .90, rgba[1] * .90, rgba[2] * .90, rgba[3]);
        // Back
        drawTriangle3D([0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0]);
        drawTriangle3D([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0]);
        // Top
        gl.uniform4f(u_FragColor, rgba[0] * .80, rgba[1] * .80, rgba[2] * .80, rgba[3]);
        drawTriangle3D([0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0]);
        drawTriangle3D([0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0]);
        // Bottom
        drawTriangle3D([0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0]);
        drawTriangle3D([1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0]);
        // Left
        drawTriangle3D([0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0]);
        drawTriangle3D([0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
        // Right
        drawTriangle3D([1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0]);
        drawTriangle3D([1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0]);
        
    }
}

//Get helped by Chatgpt
class Cylinder {
    constructor(radius = 1, height = 1, segments = 36) {
        this.radius = radius;
        this.height = height;
        this.segments = segments;
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
    }

    render() {
        var rgba = this.color;
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        this.renderCaps();
        this.renderSideWalls();
    }

    renderCaps() {
        var step = 2 * Math.PI / this.segments;
        var x, y;

        // Top cap
        for (let i = 0; i < this.segments; i++) {
            x = this.radius * Math.cos(i * step);
            y = this.radius * Math.sin(i * step);
            drawTriangle3D([
                0, 0, this.height / 2, // Center top
                this.radius * Math.cos((i + 1) * step), this.radius * Math.sin((i + 1) * step), this.height / 2, // Next vertex
                x, y, this.height / 2 // Current vertex
            ]);
        }

        // Bottom cap
        for (let i = 0; i < this.segments; i++) {
            x = this.radius * Math.cos(i * step);
            y = this.radius * Math.sin(i * step);
            drawTriangle3D([
                0, 0, -this.height / 2, // Center bottom
                x, y, -this.height / 2, // Current vertex
                this.radius * Math.cos((i + 1) * step), this.radius * Math.sin((i + 1) * step), -this.height / 2 // Next vertex
            ]);
        }
    }

    renderSideWalls() {
        var step = 2 * Math.PI / this.segments;
        var x0, y0, x1, y1;

        for (let i = 0; i < this.segments; i++) {
            x0 = this.radius * Math.cos(i * step);
            y0 = this.radius * Math.sin(i * step);
            x1 = this.radius * Math.cos((i + 1) * step);
            y1 = this.radius * Math.sin((i + 1) * step);

            // Each quad is composed of two triangles
            drawTriangle3D([
                x0, y0, this.height / 2,
                x1, y1, this.height / 2,
                x0, y0, -this.height / 2
            ]);

            drawTriangle3D([
                x1, y1, this.height / 2,
                x1, y1, -this.height / 2,
                x0, y0, -this.height / 2
            ]);
        }
    }
}
