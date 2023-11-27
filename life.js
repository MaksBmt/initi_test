export default class Life {
    constructor(canvas, row, column, sizeCell) {
        this.canvas = canvas;
        this.row = row;
        this.column = column;
        this.sizeCell = sizeCell;

        this.ctx = canvas.getContext('2d');
        this.ctx.fillStyle = 'blue';
        this.field = [];

        this._goLife();
        this._drawField();

        this._clickFieldHandler = this._clickFieldHandler.bind(this);
        this._startLife = this._startLife.bind(this);
    }

    _goLife() {
        this.field = Array(this.column).fill(0).map(() => Array(this.row).fill(0));
    }

    _drawField() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.field.forEach((column, i) => {
            column.forEach((ceil, j) => {
                if (this.field[i][j] == 1) {
                    this.ctx.fillRect(j * this.sizeCell, i * this.sizeCell, this.sizeCell, this.sizeCell);
                }
            });
        });
    }

    _clickFieldHandler(event) {
        const x = Math.floor((event.pageX - event.currentTarget.offsetLeft) / this.sizeCell);
        const y = Math.floor((event.pageY - event.currentTarget.offsetTop) / this.sizeCell);

        this.field[y][x] = !this.field[y][x];
        this._drawField();
    }

    init() {
        this.canvas.addEventListener('click', this._clickFieldHandler);
    }

    getRandomCell(time) {

        this._goLife();

        Array(this.column).fill(0).forEach((column, index) => {
            column = this._randomArray(this.row);
            column.forEach((row) => {

                this.field[index][row] = true;
            });
        });

        this.initSrart(time)
    }

    _randomArray(max) {
        const randomQuantity = this._randomInteger(1, max - 1);
        let randomIndex = [];

        Array(randomQuantity).fill(0).forEach((i) => {

            i = this._randomInteger(0, max - 1);
            randomIndex.push(i);
        });

        return randomIndex = Array.from(new Set(randomIndex)).sort((a, b) => a - b);
    }

    _randomInteger(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    _startLife() {
        const newGeneration = [];
        
        for (let i = 0; i < this.field.length; i++) {
            newGeneration[i] = [];

            for (let j = 0; j < this.field[i].length; j++) {
                let neighbors = 0;
                if (this.field[this._fpmY(i) - 1][j] == 1) neighbors++ //up
                if (this.field[i][this._fppX(j, i) + 1] == 1) neighbors++ //right
                if (this.field[this._fppY(i) + 1][j] == 1) neighbors++ //bottom
                if (this.field[i][this._fpmX(j, i) - 1] == 1) neighbors++ //left
                if (this.field[this._fpmY(i) - 1][this._fppX(j, i) + 1] == 1) neighbors++ //top-right
                if (this.field[this._fppY(i) + 1][this._fppX(j, i) + 1] == 1) neighbors++ //bottom-right
                if (this.field[this._fppY(i) + 1][this._fpmX(j, i) - 1] == 1) neighbors++ //bottom-left
                if (this.field[this._fpmY(i) - 1][this._fpmX(j, i) - 1] == 1) neighbors++ //top-left

                if (this.field[i][j]) {
                    (neighbors == 3 || neighbors == 2) ? newGeneration[i][j] = 1 : newGeneration[i][j] = 0;
                } else {
                    (neighbors == 3) ? newGeneration[i][j] = 1 : newGeneration[i][j] = 0;
                }
            }

        }
        this.field = newGeneration;
        this._drawField();
    }

    initSrart(time) {
        this.idTimer = setInterval(this._startLife, time)
    }

    /**
     * при достижении индекса цикла по оси Y значения 0 - смещает его в конец
     * @param {number} v индекс цикла по оси Y 
     * @returns новый индекс если есть крайняя позиция
     */
    _fpmY(v) {
        if (v === 0) return this.field.length
        else return v;
    }

    /**
     * при достижении индекса цикла по оси X значения 0 - смещает его в конец
     * @param {number} g индекс цикла по оси X 
     * @returns новый индекс если есть крайняя позиция
     */
    _fpmX(g, i) {
        if (g === 0) return this.field[i].length
        else return g;
    }

    /**
     * при достижении индекса цикла по оси Y предпоследнего - смещает его в начало
     * @param {number} v индекс цикла по оси Y 
     * @returns -1 если индекс достиг предпоследнего значения
     */
    _fppY(v) {
        if (v === this.field.length - 1) return -1
        else return v;
    }

    /**
     * при достижении индекса цикла по оси X предпоследнего значения - смещает его в начало
     * @param {number} g индекс цикла по оси X 
     * @returns -1 если индекс достиг предпоследнего значения
     */
    _fppX(g, i) {
        if (g === this.field[i].length - 1) return -1
        else return g;
    }

    stop() {
        if (this.idTimer) {
            clearInterval(this.idTimer);
            this.idTimer = null;
            this._goLife();
            this._drawField();
        }
    }
}