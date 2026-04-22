let coins = [];
const MAX_COINS = 30;

export function spawnCoin(scene, position, amount = 1){

 if(coins.length > MAX_COINS) return;

 for(let i = 0; i < amount; i++){

  let c = new THREE.Mesh(
   new THREE.SphereGeometry(0.15, 4, 4),
   new THREE.MeshBasicMaterial({color: 0xffcc00})
  );

  c.position.copy(position);
  c.position.x += (Math.random() - 0.5) * 0.5;

  coins.push(c);
  scene.add(c);
 }
}

export function updateCoins(scene, player, onCollect, delta){

 for(let i = coins.length - 1; i >= 0; i--){

  let c = coins[i];

  let dx = player.position.x - c.position.x;
  let dz = player.position.z - c.position.z;

  let dist = Math.sqrt(dx*dx + dz*dz);

  // Magnet
  if(dist < 5){
   dx /= dist;
   dz /= dist;

   c.position.x += dx * 0.2 * delta;
   c.position.z += dz * 0.2 * delta;
  }else{
   c.position.z += 0.2 * delta;
  }

  // Einsammeln
  if(dist < 1){
   if(onCollect) onCollect();

   scene.remove(c);
   coins.splice(i,1);
   continue;
  }

  if(c.position.z > 10){
   scene.remove(c);
   coins.splice(i,1);
  }
 }
}