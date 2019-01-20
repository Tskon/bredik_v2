export function getCollisionObject(options) {
  const object = options.object;
  const objectTranslationY = options.objectTranslationY || 0;
  const targetTranslationY = options.targetTranslationY || 0;
  const targets = options.targets;

  const collisions = [];

  targets.forEach((target, i, targets) => {
    if (target.position.x < object.position.x + object.size.width &&
      target.position.x + target.size.width > object.position.x &&
      target.position.y - targetTranslationY < object.position.y - objectTranslationY + object.size.height &&
      target.size.height + target.position.y - targetTranslationY > object.position.y - objectTranslationY) {

      // определение направления где происходит коллизия
      let up = (target.size.height + target.position.y - targetTranslationY) - (object.position.y - objectTranslationY);
      up = ['up', (up < 0) ? up * -1 : up];
      let down = (target.position.y - targetTranslationY) - (object.position.y - objectTranslationY + object.size.height);
      down = ['down', (down < 0) ? down * -1 : down];
      let left = (target.position.x + target.size.width) - (object.position.x);
      left = ['left', (left < 0) ? left * -1 : left];
      let right = (target.position.x) - (object.position.x + object.size.width);
      right = ['right', (right < 0) ? right * -1 : right];
      let closeDirection = ['', 999];
      [up, down, left, right].forEach((item)=>{
        if (closeDirection[1] > item[1]) closeDirection = item;
      });

      collisions.push({target, collisionFrom: closeDirection[0]});

    }
  });

  return collisions;
}