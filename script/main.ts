class Block {
  public element: HTMLElement;
  public gridAreaName: string;
  public type: string;

  constructor(public row: number, public col: number) {
    this.gridAreaName = `block-${row}-${col}`;
    this.type = 'grass';
    this.element = this.createBlockElement();;
  }

  private createBlockElement(): HTMLElement {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.gridArea = this.gridAreaName;
    block.dataset.posX = String(this.row);
    block.dataset.posY = String(this.col);
    return block;
  }

  public updateState() {
    if (this.type === 'patch') {
      this.type = 'grass';
      this.element.style.backgroundColor = '#3d8847';
    } else {
      this.type = 'patch';
      this.element.style.backgroundImage = 'none';
      this.element.style.backgroundColor = '#b86f50';
      return { row: this.row, col: this.col };
    }
  }

  public updateClassName(element: HTMLElement, className: string, classNameDop: string | null = null) {
    element.className = '';
    element.classList.add('block', className);
    if (classNameDop) element.classList.add(classNameDop);
  }
  public addBorderToNeighbors(arrNeighbors: string[][]) {
    // console.log(JSON.parse(JSON.stringify(arrNeighbors)));
    // Угловые стороны
    if (arrNeighbors[1][0] === 'bottom') {
      arrNeighbors[1][0] = 'bottomCornerRight';
      const element = document.querySelector(`[data-pos-x="${this.row}"][data-pos-y="${this.col - 1}"]`);
      if (element instanceof HTMLElement) this.updateClassName(element, 'block-cornerSide');
    }
    if (arrNeighbors[1][2] === 'bottom') {
      arrNeighbors[1][2] = 'bottomCornerLeft';
      const element = document.querySelector(`[data-pos-x="${this.row}"][data-pos-y="${this.col + 1}"]`);
      if (element instanceof HTMLElement) this.updateClassName(element, 'block-cornerSide', 'block-cornerSide-90');
    }

    if (arrNeighbors[1][0] === 'top') {
      arrNeighbors[1][0] = 'topCornerRight';
      const element = document.querySelector(`[data-pos-x="${this.row}"][data-pos-y="${this.col - 1}"]`);
      if (element instanceof HTMLElement) this.updateClassName(element, 'block-cornerSide', 'block-cornerSide-270');
    }

    if (arrNeighbors[1][2] === 'top') {
      arrNeighbors[1][2] = 'topCornerLeft';
      const element = document.querySelector(`[data-pos-x="${this.row}"][data-pos-y="${this.col + 1}"]`);
      if (element instanceof HTMLElement) this.updateClassName(element, 'block-cornerSide', 'block-cornerSide-180');
    }
// ************************
    if (arrNeighbors[0][1] === 'left') {
      arrNeighbors[0][1] = 'bottomCornerLeft';
      const element = document.querySelector(`[data-pos-x="${this.row - 1}"][data-pos-y="${this.col}"]`);
      if (element instanceof HTMLElement) this.updateClassName(element, 'block-cornerSide', 'block-cornerSide-90');
    }
// **************************

    // Проверяем соседние клетки
    if (arrNeighbors[0][1] !== 'bottomCornerLeft' &&
        arrNeighbors[0][1] !== 'patch' && (
          arrNeighbors[1][0] === 'patch' ||
          arrNeighbors[1][2] === 'patch' ||
          arrNeighbors[2][1] === 'patch')
      ) {
      arrNeighbors[0][1] = 'bottom';
      const element = document.querySelector(`[data-pos-x="${this.row - 1}"][data-pos-y="${this.col}"]`);
      if (element instanceof HTMLElement) this.updateClassName(element, 'block-side');
    }

    if (arrNeighbors[1][2] !== 'topCornerLeft' &&
        arrNeighbors[1][2] !== 'bottomCornerLeft' &&
        arrNeighbors[1][2] !== 'patch' && (
          arrNeighbors[1][0] === 'patch' ||
          arrNeighbors[0][1] === 'patch' ||
          arrNeighbors[2][1] === 'patch')
      ) {
      arrNeighbors[1][2] = 'left';
      const element = document.querySelector(`[data-pos-x="${this.row}"][data-pos-y="${this.col + 1}"]`);
      if (element instanceof HTMLElement) this.updateClassName(element, 'block-side', 'block-side-90');
    }

    if (arrNeighbors[2][1] !== 'patch' && (
          arrNeighbors[1][0] === 'patch' ||
          arrNeighbors[0][1] === 'patch' ||
          arrNeighbors[1][2] === 'patch')
      ) {
      arrNeighbors[2][1] = 'top';
      const element = document.querySelector(`[data-pos-x="${this.row + 1}"][data-pos-y="${this.col}"]`);
      if (element instanceof HTMLElement) this.updateClassName(element, 'block-side', 'block-side-180');
    }

    if (arrNeighbors[1][0] !== 'bottomCornerRight' &&
        arrNeighbors[1][0] !== 'topCornerRight' &&
        arrNeighbors[1][0] !== 'patch' && (
          arrNeighbors[2][1] === 'patch' ||
          arrNeighbors[0][1] === 'patch' ||
          arrNeighbors[1][2] === 'patch')
      ) {
      arrNeighbors[1][0] = 'right';
      const element = document.querySelector(`[data-pos-x="${this.row}"][data-pos-y="${this.col - 1}"]`);
      if (element instanceof HTMLElement) this.updateClassName(element, 'block-side', 'block-side-270');
    }


    // Проверяем и обновляем стороны
    if (arrNeighbors[0][1] === 'grass') {
      arrNeighbors[0][1] = 'bottom';
      document.querySelector(`[data-pos-x="${this.row - 1}"][data-pos-y="${this.col}"]`)?.classList.add('block-side');
    }
    if (arrNeighbors[1][0] === 'grass') {
      arrNeighbors[1][0] = 'right';
      document.querySelector(`[data-pos-x="${this.row}"][data-pos-y="${this.col - 1}"]`)?.classList.add('block-side', 'block-side-270');
    }
    if (arrNeighbors[1][2] === 'grass') {
      arrNeighbors[1][2] = 'left';
      document.querySelector(`[data-pos-x="${this.row}"][data-pos-y="${this.col + 1}"]`)?.classList.add('block-side', 'block-side-90');
    }
    if (arrNeighbors[2][1] === 'grass') {
      arrNeighbors[2][1] = 'top';
      document.querySelector(`[data-pos-x="${this.row + 1}"][data-pos-y="${this.col}"]`)?.classList.add('block-side', 'block-side-180');
    }


    // Проверяем и обновляем углы
    if (arrNeighbors[0][0] === 'grass' &&
        arrNeighbors[0][1] === 'bottom' && (
          arrNeighbors[1][0] === 'right' ||
          arrNeighbors[1][0] === 'bottomCornerRight')
      ) {
      arrNeighbors[0][0] = 'bottomRight';
      document.querySelector(`[data-pos-x="${this.row - 1}"][data-pos-y="${this.col - 1}"]`)?.classList.add('block-corner');
    }

    if (arrNeighbors[0][2] === 'grass' && (
          arrNeighbors[0][1] === 'bottom' ||
          arrNeighbors[0][1] === 'bottomCornerLeft') && (
          arrNeighbors[1][2] === 'left' ||
          arrNeighbors[1][2] === 'bottomCornerLeft')
    ) {
      arrNeighbors[0][2] = 'bottomLeft';
      document.querySelector(`[data-pos-x="${this.row - 1}"][data-pos-y="${this.col + 1}"]`)?.classList.add('block-corner', 'block-corner-90');
    }

    if (arrNeighbors[2][0] === 'grass' &&
        arrNeighbors[2][1] === 'top' && (
          arrNeighbors[1][0] === 'right' ||
          arrNeighbors[1][0] === 'topCornerRight')
      ) {
      arrNeighbors[2][0] = 'topRight';
      document.querySelector(`[data-pos-x="${this.row + 1}"][data-pos-y="${this.col - 1}"]`)?.classList.add('block-corner', 'block-corner-270');
    }

    if (arrNeighbors[2][2] === 'grass' &&
        arrNeighbors[2][1] === 'top' && (
        arrNeighbors[1][2] === 'left' ||
        arrNeighbors[1][2] === 'topCornerLeft')
      ) {
      arrNeighbors[2][2] = 'topLeft';
      document.querySelector(`[data-pos-x="${this.row + 1}"][data-pos-y="${this.col + 1}"]`)?.classList.add('block-corner', 'block-corner-180');
    }

    console.log(JSON.parse(JSON.stringify(arrNeighbors)));
    return arrNeighbors;
  }
}

class GardenMap {
  private gardenContainer!: HTMLElement;
  private gardenMap!: HTMLElement;
  private isMouseDown: boolean = false;
  private isDragging: boolean = false;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private sizeMap: number = 15;
  private arrayMap: Block[][] = [];

  constructor() {
    this.generate();
    this.addEventListeners();
  }

  private generate() {
    // Инициализация контейнера
    const container = document.querySelector('.garden-container');
    if (!(container instanceof HTMLElement)) throw new Error('Container element not found');
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

  private updateBlock(block: Block) {
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

  public updateArrayMap(partOfArray: string[][], x: number, y: number) {
    for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        this.arrayMap[i][j].type = partOfArray[i - (x - 1)][j - (y - 1)];
      }
    }
  }

  public getNeighbors(posX: number, posY: number) {
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

  private setGridTemplateAreas() {
    this.gardenMap.style.gridTemplateAreas = '"' + this.arrayMap
      .map(row => row.map(item => item.gridAreaName).join(' '))
      .join('" "') + '"';
  }

  private handleMouseDown = (e: MouseEvent) => {
    this.isMouseDown = true;
    this.isDragging = false;
    this.offsetX = e.clientX - this.gardenMap.offsetLeft;
    this.offsetY = e.clientY - this.gardenMap.offsetTop;
    this.gardenContainer.style.cursor = 'grabbing';
  }

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isMouseDown) return;
    this.isDragging = true;
    const moveX = e.clientX - this.offsetX;
    const moveY = e.clientY - this.offsetY;
    this.gardenMap.style.left = `${moveX}px`;
    this.gardenMap.style.top = `${moveY}px`;
  }

  private handleMouseUp = () => {
    this.isMouseDown = false;
    this.gardenContainer.style.cursor = 'grab';
  }

  private addEventListeners() {
    this.gardenContainer.addEventListener('mousedown', this.handleMouseDown);
    this.gardenContainer.addEventListener('mousemove', this.handleMouseMove);
    this.gardenContainer.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mouseup', this.handleMouseUp);
  }
}

const map = new GardenMap();
