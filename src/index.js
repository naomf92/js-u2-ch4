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
    const main = document.getElementById('main');
    const p = document.createElement('p');

    if (this.hp <= 0) {//攻撃しているキャラが死んだ場合
      p.innerHTML = `${this.name}は死亡したので攻撃できません`;
      return main.appendChild(p);
    }
    if (defender.hp <= 0) {//defenceしているキャラが死んだ場合
      p.innerHTML = `${defender.name}は死亡したので攻撃できません`;
      return main.appendChild(p);
    }

    const damage = this.calcAttackDamage(defender);

    if (defender.hp <= 0) {
      p.innerHTML = `${this.name}が${defender.name}に与えたダメージは${damage}`;
      p.innerHTML = `${defender.name}は死亡しました`;
      main.appendChild(p);
    } else {
      p.innerHTML = `${defender.name}はダメージを${damage}受けました`;
      main.appendChild(p);
    }

  }

  /*ダメージは単純に攻撃力から防御力を引いて計算する。ダメージが0未満の場合は、最低のダメージ1を与える*/
  calcAttackDamage(defender) {
   let damage = this.offensePower - defender.defencePower;
   if (damage <= 0) damage = 1;
   return damage;
  }

}

class Sorcerer extends Character {
  constructor(props) {
    super(props);
  }

  /*回復魔法は3のMPを消費する。相手のHPを15回復する。魔法使いが死んでいる場合はその旨を表示する。相手が死んでいる場合は回復が出来ないためその旨を表示する。MPが足りない場合はその旨を表示する。*/
  healSpell(target) {
    const main = document.getElementById('main');
    const p = document.createElement('p');

    if (this.hp <= 0) {//魔法使いが死んでいる場合
      p.innerHTML = `${this.name}は死んでいるので効果はありません`;
      return main.appendChild(p);
    }
    if (target.hp <= 0) {//相手が死んでいる場合
      p.innerHTML = `${target.name}は死んでいるので効果はありません`;
      return main.appendChild(p);
    }
    if (this.mp >= 3) {
      this.mp = this.mp - 3;
      target.hp = target.hp + 15;
      p.innerHTML = `${target.name}のhpを15回復しました`;
    } else {
      p.innerHTML = `${this.name}のMPは足りません`;
    }
    return main.appendChild(p);
  }

  /*攻撃魔法は2のMPを消費する。相手に10のダメージを与える。魔法使いが死んでいる場合はその旨を表示する。相手が死んでいる場合は攻撃が出来ないためその旨を表示する。MPが足りない場合はその旨を表示する。*/
  fireSpell(target) {
    const main = document.getElementById('main');
    const p = document.createElement('p');

    if (this.hp <= 0) {//魔法使いが死んでいる場合
      p.innerHTML = `${this.name}は死んでいるので攻撃できません`;
      return main.appendChild(p);
    }
    if (target.hp <= 0) {//相手が死んでいる場合
      p.innerHTML = `${target.name}は死んでいるので攻撃できません`;
      return main.appendChild(p);
    }
    //MPが足りない場合はその旨を表示する。/攻撃魔法は2のMPを消費する。/相手に10のダメージを与える。
    if (this.mp >= 2) {
      this.mp = this.mp - 2;
      target.mp = target.mp - 10;
      p.innerHTML = `${target.name}はダメージを10受けました`;
    } else {
      p.innerHTML = `${this.name}のMPは足りません`;
    }
    return main.appendChild(p);
  }
}

{
  const fighter = new Character({
    name: '武道家',
    hp: 40,
    mp: 0,
    offensePower: 15,
    defencePower: 10
  })
  const sorcerer = new Sorcerer({
    name: '魔法使い',
    hp: 25,
    mp: 10,
    offensePower: 8,
    defencePower: 10
  })
  const monster = new Character({
    name: 'モンスター',
    hp: 60,
    mp: 0,
    offensePower: 30,
    defencePower: 10
  })

  fighter.attack(monster);
  sorcerer.attack(monster);
  monster.attack(sorcerer);
  fighter.attack(monster);
  sorcerer.healSpell(sorcerer);
  monster.attack(fighter);
  fighter.attack(monster);
  sorcerer.fireSpell(monster);
  monster.attack(fighter);
  fighter.showStatus();
  sorcerer.showStatus();
  monster.showStatus();
}