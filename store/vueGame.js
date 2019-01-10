export const state = () => ({
    // карта координат. Хранит диапазоны координат и колбеки
    xyMap: {},

    gameMap: {
        size: {
            width: 900,
            height: 600
        },
        yTranslation: 0,
        hitGrid: {} // y100 { y10:{ x100: { x10: { data + callback } } } }
    },

    hero: {
        immortal: false,
        size: {
            width: 80,
            height: 80,
        },
        position: {
            x: 410,
            y: 400,
        },
        ammo: {
            m4a1: false,
            shotgun: false
        },
        parameters: {
            hp: 100,
            armor: 50,
            speed: 5,
        }
    },

    zombie1List: [],


});

export const mutations = {
    hitGridAddObject(state, data) {
        // TODO добавить метод для удаления записей и метод для заполнения записей по всему размеру объекта

        const parsedY = parseNumber(data.y, 'y');
        const parsedX = parseNumber(data.x, 'x');

        if (state.gameMap.hitGrid[parsedY.hundred] && state.gameMap.hitGrid[parsedY.hundred][parsedY.decimal] &&
            state.gameMap.hitGrid[parsedY.hundred][parsedY.decimal][parsedX.hundred] &&
            state.gameMap.hitGrid[parsedY.hundred][parsedY.decimal][parsedX.hundred][parsedX.decimal]) {

            const hitGridObj = state.gameMap.hitGrid[parsedY.hundred][parsedY.decimal][parsedX.hundred][parsedX.decimal];

            if (typeof data.callback === 'function') {
                data.callback();
                // console.log(data.callback === hitGridObj.callback) // true
            }
            if (typeof hitGridObj.callback === 'function') {
                hitGridObj.callback();
            }
            console.log(hitGridObj.object)

        } else {
            if (!state.gameMap.hitGrid.hasOwnProperty(parsedY.hundred)) state.gameMap.hitGrid[parsedY.hundred] = {};
            if (!state.gameMap.hitGrid[parsedY.hundred].hasOwnProperty(parsedY.decimal)) state.gameMap.hitGrid[parsedY.hundred][parsedY.decimal] = {};
            if (!state.gameMap.hitGrid[parsedY.hundred][parsedY.decimal].hasOwnProperty(parsedX.hundred)) state.gameMap.hitGrid[parsedY.hundred][parsedY.decimal][parsedX.hundred] = {};

            state.gameMap.hitGrid[parsedY.hundred][parsedY.decimal][parsedX.hundred][parsedX.decimal] = {
                object: data.self,
                callback: (typeof data.callback === 'function') ? data.callback : () => {
                }
            };
        }


        // console.log(state.gameMap.hitGrid[data.y.hundred][data.y.decimal][data.x.hundred][data.x.decimal]);

        function parseNumber(num, prefix) {
            const hundred = (num < 0) ? Math.ceil(num / 100) * 100 : Math.floor(num / 100) * 100;
            const decimal = prefix + (num < 0) ? Math.ceil((num - hundred) / 10) * 10 : Math.floor((num - hundred) / 10) * 10;
            return {hundred: prefix + hundred, decimal: prefix + decimal}
        }
    },
    heroMove(state, delta) {
        state.hero.position.x += delta.x;
    },
    yTranslationChange(state, delta) {
        state.gameMap.yTranslation -= delta;
    },
    addZombie1(state, zombie) {
        state.zombie1List.push(zombie);
    },
    zombie1Move(state, data) {
        if (data.delta.x) state.zombie1List[data.index].position.x += data.delta.x;
        if (data.delta.y) state.zombie1List[data.index].position.y += data.delta.y;
    },
    zombie1Del(state, i) {
        state.zombie1List[i] = null;
    },
};