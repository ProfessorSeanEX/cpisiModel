// FLAGSHIP: The "Living Backdrop" of the Dawndusk
// Decoupled from the main chat logic.

function initFlagship() {
    const canvas = document.getElementById("game-of-life-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const CELL_SIZE = 4;
    const ALIVE_COLOR = "rgba(77, 255, 184, 0.4)"; /* Living Emerald */
    const DEAD_COLOR = "transparent";

    let width, height, cells;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        width = Math.floor(canvas.width / (CELL_SIZE + 1));
        height = Math.floor(canvas.height / (CELL_SIZE + 1));
        cells = new Int8Array(width * height).map(() => Math.random() > 0.90 ? 1 : 0);
    }

    function getIndex(row, col) {
        return (row % height) * width + (col % width);
    }

    function step() {
        const next = new Int8Array(width * height);
        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                const idx = getIndex(r, c);
                let neighbors = 0;
                for (let dr of [-1, 0, 1]) {
                    for (let dc of [-1, 0, 1]) {
                        if (dr === 0 && dc === 0) continue;
                        neighbors += cells[getIndex(r + dr + height, c + dc + width)];
                    }
                }
                if (cells[idx] === 1 && (neighbors === 2 || neighbors === 3)) next[idx] = 1;
                else if (cells[idx] === 0 && neighbors === 3) next[idx] = 1;
            }
        }
        cells = next;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = ALIVE_COLOR;
        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                if (cells[getIndex(r, c)] === 1) {
                    ctx.fillRect(c * (CELL_SIZE + 1), r * (CELL_SIZE + 1), CELL_SIZE, CELL_SIZE);
                }
            }
        }
    }

    window.addEventListener('resize', resize);
    resize();

    function loop() {
        step();
        draw();
        setTimeout(() => requestAnimationFrame(loop), 120);
    }
    loop();
}

window.addEventListener('DOMContentLoaded', initFlagship);
