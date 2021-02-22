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
    if (this.hp <= 0) console.log(`${this.name}は死亡したので攻撃できません`); //攻撃しているキャラが死んだ場合
    if (defender.hp <= 0) console.log(`${defender.name}は死亡したので攻撃できません`);//defenceしているキャラが死んだ場合

    const damage = this.calcAttackDamage(defender);
    // ↓ インスタンスメソッドattackが最終的に関数の返り値として返す値を使って、「どちらも生きている場合」と、片方が生きている場合を実装してみましょう

    //片方生きている → 防御キャラクターのことだけdamageに関しては考えれば良いので、（攻撃キャラはdamage受けない）defenderだけ条件式に含まれていればOKです
    if (this.hp > 0 && defender.hp <= 0) {
      console.log(`${this.name}が${defender.name}に与えたダメージは${damage}`);
      console.log(`${defender.name}は死亡しました`);
    }// elseでdamageを受けた防御キャラがまだ生きている処理を書けますね（これがどちらも生きている条件になります）
    //if (defender.hp > 0 && this.hp <= 0) {
    //}

    //どちらも生きている(与えたダメージのみ表示？) → 実はこのケースは考えなくても大丈夫です
    if (this.hp && defender.hp > 0) {
      console.log(`${this.name}が${defender.name}に与えたダメージは${damage}`);
    }

  }

  /*ダメージは単純に攻撃力から防御力を引いて計算する。ダメージが0未満の場合は、最低のダメージ1を与える*/
  calcAttackDamage(defender) {
   let damage = this.offensePower - defender.defencePower;
   if (damage <= 0) damage = 1;
   return damage;
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
    hp: 40,//40
    mp: 0,
    offensePower: 15,
    defencePower: 10//10
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
    hp: 0,//60
    mp: 0,
    offensePower: 30,
    defencePower: 10//10
  })

  //fighter.attack(monster);
  // sorcerer.attack(monster);
  // monster.attack(sorcerer);
  fighter.attack(monster);
  // sorcerer.healSpell(sorcerer);
  monster.attack(fighter);
  //fighter.attack(monster);
  // sorcerer.fireSpell(monster);
  //monster.attack(fighter);
  fighter.showStatus();
  // sorcerer.showStatus();
  monster.showStatus();
}