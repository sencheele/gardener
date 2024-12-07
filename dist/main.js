"use strict";
class Block {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.gridAreaName = `block-${row}-${col}`;
        this.type = 'grass';
        this.element = this.createBlockElement();
        ;
    }
    createBlockElement() {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.gridArea = this.gridAreaName;
        block.dataset.posX = String(this.row);
        block.dataset.posY = String(this.col);
        return block;
    }
    updateState() {
        if (this.type === 'patch') {
            this.type = 'grass';
            this.element.style.backgroundColor = '#3d8847';
        }
        else {
            this.type = 'patch';
            this.element.style.backgroundImage = 'none';
            this.element.style.backgroundColor = '#b86f50';
            return { row: this.row, col: this.col };
        }
    }
    updateClassName(element, className, classNameDop = null) {
        element.className = '';
        element.classList.add('block', className);
        if (classNameDop)
            element.classList.add(classNameDop);
    }
    addBorderToNeighbors(arrNeighbors) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        // console.log(JSON.parse(JSON.stringify(arrNeighbors)));
        // Угловые стороны
        if (arrNeighbors[1][0] === 'bottom') {
            arrNeighbors[1][0] = 'bottomCornerRight';
            const element = document.querySelector(`[data-pos-x="${this.row}"][data-pos-y="${this.col - 1}"]`);
            if (element instanceof HTMLElement)
                this.updateClassName(element, 'block-cornerSide');
        }
        if (arrNeighbors[1][2] === 'bottom') {
            arrNeighbors[1][2] = 'bottomCornerLeft';
            const element = document.querySelector(`[data-pos-x="${this.row}"][data-pos-y="${this.col + 1}"]`);
            if (element instanceof HTMLElement)
                this.updateClassName(element, 'block-cornerSide', 'block-cornerSide-90');
        }
        if (arrNeighbors[1][0] === 'top') {
            arrNeighbors[1][0] = 'topCornerRight';
            const element = document.querySelector(`[data-pos-x="${this.row}"][data-pos-y="${this.col - 1}"]`);
            if (element instanceof HTMLElement)
                this.updateClassName(element, 'block-cornerSide', 'block-cornerSide-270');
        }
        if (arrNeighbors[1][2] === 'top') {
            arrNeighbors[1][2] = 'topCornerLeft';
            const element = document.querySelector(`[data-pos-x="${this.row}"][data-pos-y="${this.col + 1}"]`);
            if (element instanceof HTMLElement)
                this.updateClassName(element, 'block-cornerSide', 'block-cornerSide-180');
        }
        // ************************
        if (arrNeighbors[0][1] === 'left') {
            arrNeighbors[0][1] = 'bottomCornerLeft';
            const element = document.querySelector(`[data-pos-x="${this.row - 1}"][data-pos-y="${this.col}"]`);
            if (element instanceof HTMLElement)
                this.updateClassName(element, 'block-cornerSide', 'block-cornerSide-90');
        }
        // **************************
        // Проверяем соседние клетки
        if (arrNeighbors[0][1] !== 'bottomCornerLeft' &&
            arrNeighbors[0][1] !== 'patch' && (arrNeighbors[1][0] === 'patch' ||
            arrNeighbors[1][2] === 'patch' ||
            arrNeighbors[2][1] === 'patch')) {
            arrNeighbors[0][1] = 'bottom';
            const element = document.querySelector(`[data-pos-x="${this.row - 1}"][data-pos-y="${this.col}"]`);
            if (element instanceof HTMLElement)
                this.updateClassName(element, 'block-side');
        }
        if (arrNeighbors[1][2] !== 'topCornerLeft' &&
            arrNeighbors[1][2] !== 'bottomCornerLeft' &&
            arrNeighbors[1][2] !== 'patch' && (arrNeighbors[1][0] === 'patch' ||
            arrNeighbors[0][1] === 'patch' ||
            arrNeighbors[2][1] === 'patch')) {
            arrNeighbors[1][2] = 'left';
            const element = document.querySelector(`[data-pos-x="${this.row}"][data-pos-y="${this.col + 1}"]`);
            if (element instanceof HTMLElement)
                this.updateClassName(element, 'block-side', 'block-side-90');
        }
        if (arrNeighbors[2][1] !== 'patch' && (arrNeighbors[1][0] === 'patch' ||
            arrNeighbors[0][1] === 'patch' ||
            arrNeighbors[1][2] === 'patch')) {
            arrNeighbors[2][1] = 'top';
            const element = document.querySelector(`[data-pos-x="${this.row + 1}"][data-pos-y="${this.col}"]`);
            if (element instanceof HTMLElement)
                this.updateClassName(element, 'block-side', 'block-side-180');
        }
        if (arrNeighbors[1][0] !== 'bottomCornerRight' &&
            arrNeighbors[1][0] !== 'topCornerRight' &&
            arrNeighbors[1][0] !== 'patch' && (arrNeighbors[2][1] === 'patch' ||
            arrNeighbors[0][1] === 'patch' ||
            arrNeighbors[1][2] === 'patch')) {
            arrNeighbors[1][0] = 'right';
            const element = document.querySelector(`[data-pos-x="${this.row}"][data-pos-y="${this.col - 1}"]`);
            if (element instanceof HTMLElement)
                this.updateClassName(element, 'block-side', 'block-side-270');
        }
        // Проверяем и обновляем стороны
        if (arrNeighbors[0][1] === 'grass') {
            arrNeighbors[0][1] = 'bottom';
            (_a = document.querySelector(`[data-pos-x="${this.row - 1}"][data-pos-y="${this.col}"]`)) === null || _a === void 0 ? void 0 : _a.classList.add('block-side');
        }
        if (arrNeighbors[1][0] === 'grass') {
            arrNeighbors[1][0] = 'right';
            (_b = document.querySelector(`[data-pos-x="${this.row}"][data-pos-y="${this.col - 1}"]`)) === null || _b === void 0 ? void 0 : _b.classList.add('block-side', 'block-side-270');
        }
        if (arrNeighbors[1][2] === 'grass') {
            arrNeighbors[1][2] = 'left';
            (_c = document.querySelector(`[data-pos-x="${this.row}"][data-pos-y="${this.col + 1}"]`)) === null || _c === void 0 ? void 0 : _c.classList.add('block-side', 'block-side-90');
        }
        if (arrNeighbors[2][1] === 'grass') {
            arrNeighbors[2][1] = 'top';
            (_d = document.querySelector(`[data-pos-x="${this.row + 1}"][data-pos-y="${this.col}"]`)) === null || _d === void 0 ? void 0 : _d.classList.add('block-side', 'block-side-180');
        }
        // Проверяем и обновляем углы
        if (arrNeighbors[0][0] === 'grass' &&
            arrNeighbors[0][1] === 'bottom' && (arrNeighbors[1][0] === 'right' ||
            arrNeighbors[1][0] === 'bottomCornerRight')) {
            arrNeighbors[0][0] = 'bottomRight';
            (_e = document.querySelector(`[data-pos-x="${this.row - 1}"][data-pos-y="${this.col - 1}"]`)) === null || _e === void 0 ? void 0 : _e.classList.add('block-corner');
        }
        if (arrNeighbors[0][2] === 'grass' && (arrNeighbors[0][1] === 'bottom' ||
            arrNeighbors[0][1] === 'bottomCornerLeft') && (arrNeighbors[1][2] === 'left' ||
            arrNeighbors[1][2] === 'bottomCornerLeft')) {
            arrNeighbors[0][2] = 'bottomLeft';
            (_f = document.querySelector(`[data-pos-x="${this.row - 1}"][data-pos-y="${this.col + 1}"]`)) === null || _f === void 0 ? void 0 : _f.classList.add('block-corner', 'block-corner-90');
        }
        if (arrNeighbors[2][0] === 'grass' &&
            arrNeighbors[2][1] === 'top' && (arrNeighbors[1][0] === 'right' ||
            arrNeighbors[1][0] === 'topCornerRight')) {
            arrNeighbors[2][0] = 'topRight';
            (_g = document.querySelector(`[data-pos-x="${this.row + 1}"][data-pos-y="${this.col - 1}"]`)) === null || _g === void 0 ? void 0 : _g.classList.add('block-corner', 'block-corner-270');
        }
        if (arrNeighbors[2][2] === 'grass' &&
            arrNeighbors[2][1] === 'top' && (arrNeighbors[1][2] === 'left' ||
            arrNeighbors[1][2] === 'topCornerLeft')) {
            arrNeighbors[2][2] = 'topLeft';
            (_h = document.querySelector(`[data-pos-x="${this.row + 1}"][data-pos-y="${this.col + 1}"]`)) === null || _h === void 0 ? void 0 : _h.classList.add('block-corner', 'block-corner-180');
        }
        console.log(JSON.parse(JSON.stringify(arrNeighbors)));
        return arrNeighbors;
    }
}
class GardenMap {
    constructor() {
        this.isMouseDown = false;
        this.isDragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.sizeMap = 15;
        this.arrayMap = [];
        this.handleMouseDown = (e) => {
            this.isMouseDown = true;
            this.isDragging = false;
            this.offsetX = e.clientX - this.gardenMap.offsetLeft;
            this.offsetY = e.clientY - this.gardenMap.offsetTop;
            this.gardenContainer.style.cursor = 'grabbing';
        };
        this.handleMouseMove = (e) => {
            if (!this.isMouseDown)
                return;
            this.isDragging = true;
            const moveX = e.clientX - this.offsetX;
            const moveY = e.clientY - this.offsetY;
            this.gardenMap.style.left = `${moveX}px`;
            this.gardenMap.style.top = `${moveY}px`;
        };
        this.handleMouseUp = () => {
            this.isMouseDown = false;
            this.gardenContainer.style.cursor = 'grab';
        };
        this.generate();
        this.addEventListeners();
    }
    generate() {
        // Инициализация контейнера
        const container = document.querySelector('.garden-container');
        if (!(container instanceof HTMLElement))
            throw new Error('Container element not found');
        this.gardenContainer = container;
        // Создание карты
        this.gardenMap = document.createElement('div');
        this.gardenMap.classList.add('garden-map');
        this.gardenContainer.append(this.gardenMap);
        // Установка размеров карты
        this.gardenMap.style.display = 'grid';
        this.gardenMap.style.width = '150%';
        const widthMap = this.gardenMap.offsetWidth;
        const sizeBlock = widthMap / this.sizeMap;
        this.gardenMap.style.height = `${widthMap}px`;
        this.gardenMap.style.gridTemplateColumns = `repeat(${this.sizeMap}, ${sizeBlock}px)`;
        this.gardenMap.style.gridTemplateRows = `repeat(${this.sizeMap}, ${sizeBlock}px)`;
        // Центрирование карты в контейнере
        const containerWidth = this.gardenContainer.offsetWidth;
        const containerHeight = this.gardenContainer.offsetHeight;
        this.gardenMap.style.left = `${(containerWidth - widthMap) / 2}px`;
        this.gardenMap.style.top = `${(containerHeight - widthMap) / 2}px`;
        // Генерация блока
        for (let i = 0; i < this.sizeMap; i++) {
            const row = [];
            for (let j = 0; j < this.sizeMap; j++) {
                const block = new Block(i, j);
                row.push(block);
                this.gardenMap.append(block.element);
                if (i !== 0 && i !== this.sizeMap - 1 && j !== 0 && j !== this.sizeMap - 1) {
                    block.element.addEventListener('click', () => {
                        this.updateBlock(block);
                    });
                }
            }
            this.arrayMap.push(row);
        }
        this.setGridTemplateAreas();
    }
    updateBlock(block) {
        if (!this.isDragging) {
            const coordinates = block.updateState();
            if (coordinates) {
                const { row, col } = coordinates;
                const blockNeighbors = this.getNeighbors(row, col);
                block.addBorderToNeighbors(blockNeighbors);
                this.updateArrayMap(blockNeighbors, row, col);
            }
        }
    }
    updateArrayMap(partOfArray, x, y) {
        for (let i = x - 1; i < x + 2; i++) {
            for (let j = y - 1; j < y + 2; j++) {
                this.arrayMap[i][j].type = partOfArray[i - (x - 1)][j - (y - 1)];
            }
        }
    }
    getNeighbors(posX, posY) {
        const arrNeighbors = [];
        for (let i = posX - 1; i < posX + 2; i++) {
            const row = [];
            for (let j = posY - 1; j < posY + 2; j++) {
                row.push(this.arrayMap[i][j].type);
            }
            arrNeighbors.push(row);
        }
        return arrNeighbors;
    }
    setGridTemplateAreas() {
        this.gardenMap.style.gridTemplateAreas = '"' + this.arrayMap
            .map(row => row.map(item => item.gridAreaName).join(' '))
            .join('" "') + '"';
    }
    addEventListeners() {
        this.gardenContainer.addEventListener('mousedown', this.handleMouseDown);
        this.gardenContainer.addEventListener('mousemove', this.handleMouseMove);
        this.gardenContainer.addEventListener('mouseup', this.handleMouseUp);
        document.addEventListener('mouseup', this.handleMouseUp);
    }
}
const map = new GardenMap();
