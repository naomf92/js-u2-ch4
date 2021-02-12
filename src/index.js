class Character {
  constructor(props) {
    this.name = props.name
    this.hp = props.hp
    this.initialHP = props.initialHP
    this.mp = props.mp
    this.initialMP = props.initialMP
    this.offensePower = props.offensePower
    this.defencePower = props.defencePower
  }
/*キャラクターの名前、HP、MPを表示する。*/
  showStatus() {
    const p = document.createElement('p');
    p.innerHTML = `
    <p>名前: ${this.name}</p>
    <p>HP: ${this.hp}</p>
    <p>MP: ${this.mp}</p>
    `;
    document.body.appendChild(p);
  }

  /*キャラクターが死んでいる場合は攻撃出来ないので、それを表示する。死んでいない場合は相手に与えたダメージを表示。相手が死んだ場合は相手に与えたダメージと死んだことを表示する。*/
  attack(defender) {
    console.log(`引数thisの名前: ${this.name}`);
    console.log(`引数defenderの名前: ${defender.name}`);
    // 関数attack呼び出しの記述を確認すると、fighter.attack(monster); とあるので、「fighterがmonsterに攻撃する」ということを意味することを踏まえると、thisは攻撃キャラ、defendは防御キャラということがわかります

    // if (this.hp === 0 && defender.hp > 0) {//自分死んでいる&相手生きている
    //   console.log('攻撃できないです');
    // } else if (this.hp > 0 && defender.hp === 0) {//自分生きている&相手死んでいる
    //   console.log(`${defender.name}死亡`);
    //   console.log(`${this.offensePower}を与えました`);
    // }

    // ここのブロックはthis（攻撃キャラ）の死亡した場合だけを取り扱う
    if (this.hp > 0) {//自分生きてる(相手は？) → 相手が確実に死んでいることを示すには、条件式は相手が死んだ状態にするのが確実です
      console.log(`${defender.name}死亡`);
      console.log(`${this.offensePower}を与えました`);
    } else {//自分死んでる → elseではそれ以外なので「攻撃キャラがhp 0とそれ未満」「防御キャラがhp どの数値でも」が当てはまるので、条件式が必要そうです
      console.log('攻撃できないです');
    }

    // ここのブロックはdefender（防御キャラ）の死亡した場合だけを取り扱う

    //自分生きている、相手(defender)死んだ　(自分が相手に与えたダメージ) → 上記で取り掛かります
    //自分死んでいる、相手生きている　(攻撃不可) → 上記で取り掛かります
    //(自分生きている&相手生きている←？) → calcAttackDamageを実装してから取り掛かります
  }

  calcAttackDamage(defender) {
    /*
      ダメージは単純に攻撃力から防御力を引いて計算する。
      ダメージが0未満の場合は、最低のダメージ1を与える。
    */
  }
}

//以下のインスタンス化されたCharacterの記述が呼び出しになります

// class Sorcerer extends Character {
//   constructor() {

//   }

//   healSpell(target) {
//     /*
//       回復魔法は3のMPを消費する。
//       相手のHPを15回復する。
//       魔法使いが死んでいる場合はその旨を表示する。
//       相手が死んでいる場合は回復が出来ないためその旨を表示する。
//       MPが足りない場合はその旨を表示する。
//     */
//   }

//   fireSpell(target) {
//     /*
//       攻撃魔法は2のMPを消費する。
//       相手に10のダメージを与える。
//       魔法使いが死んでいる場合はその旨を表示する。
//       相手が死んでいる場合は攻撃が出来ないためその旨を表示する。
//       MPが足りない場合はその旨を表示する。
//     */
//   }
// }

{
  const fighter = new Character({
    name: '武道家',
    hp: 0,//40
    mp: 0,
    offensePower: 15,
    defencePower: 10
  })
  // const sorcerer = new Sorcerer({
  //   name: '魔法使い',
  //   hp: 25,
  //   mp: 10,
  //   offensePower: 8,
  //   defencePower: 10
  // })
  const monster = new Character({
    name: 'モンスター',
    hp: 60,//60
    mp: 0,
    offensePower: 30,
    defencePower: 10
  })

  fighter.attack(monster);
  // sorcerer.attack(monster);
  // monster.attack(sorcerer);
  fighter.attack(monster);
  // sorcerer.healSpell(sorcerer);
  monster.attack(fighter);
  fighter.attack(monster);
  // sorcerer.fireSpell(monster);
  monster.attack(fighter);
  fighter.showStatus();
  // sorcerer.showStatus();
  monster.showStatus();
}