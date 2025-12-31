class Wizard {
  constructor(name, startingHealth, startingMana) {
    this.name = name;
    this._health = startingHealth;
    this._mana = startingMana;
    this.maxHealth = startingHealth;
    this.maxMana = startingMana;
  }

  isAlive() {
    return this._health > 0;
  }

  getStatus() {
    return {
      name: this.name,
      health: this._health,
      mana: this._mana
    };
  }

  receiveDamage(amount) {
    if (amount <= 0) return;
    this._health = this._health - amount;
    if (this._health < 0) {
      this._health = 0;
    }
  }

  spendMana(cost) {
    if (cost <= 0) return false; 

    if (this._mana < cost) {
      return false;
    }

    this._mana = this._mana - cost;
    return true;
  }
  castSpell(opponent) {
    console.log("Generic wizard spell (optional message)");
  }
}

class FireWizard extends Wizard {
  castSpell(opponent) {
    if (this.isAlive() === false) {
      console.log("cannot act");
      return;
    }
    const manaCost = 15;
    const damage = 20;
    if (this.spendMana(manaCost) === false) {
      console.log("not enough mana");
      return;
    }
    opponent.receiveDamage(damage);
    console.log(`${this.name} casts FIRE on ${opponent.name} for ${damage} damage`);
  }
}

class IceWizard extends Wizard {
  castSpell(opponent) {
    if (this.isAlive() === false) {
      console.log("cannot act");
      return;
    }
    const manaCost = 12;
    const damage = 16;
    if (this.spendMana(manaCost) === false) {
      console.log("not enough mana");
      return;
    }
    opponent.receiveDamage(damage);
    const oppStatus = opponent.getStatus();
    if (oppStatus.mana <= 10) {
      opponent.receiveDamage(4);
    }
    console.log(`${this.name} casts ICE on ${opponent.name} for ${damage} damage`);
  }
}

class Duel {
  constructor(wizardA, wizardB) {
    this.wizardA = wizardA;
    this.wizardB = wizardB;
    this.roundNumber = 1;
  }
  printRoundStatus() {
    console.log(this.wizardA.getStatus());
    console.log(this.wizardB.getStatus());
  }

  run() {
    console.log("Duel begins!");
    this.printRoundStatus();
    while (this.wizardA.isAlive() && this.wizardB.isAlive()) {
      console.log("Round " + this.roundNumber);
      this.wizardA.castSpell(this.wizardB);
      if (this.wizardB.isAlive() === false) {
        break;
      }
      this.wizardB.castSpell(this.wizardA);
      this.printRoundStatus();
      this.roundNumber = this.roundNumber + 1;
    }

    if (this.wizardA.isAlive()) {
      console.log("Winner: " + this.wizardA.name);
    } else {
      console.log("Winner: " + this.wizardB.name);
    }
  }
}

const wizard1 = new FireWizard("FireOne", 90, 80);
const wizard2 = new IceWizard("IceTwo", 95, 70);
const duel = new Duel(wizard1, wizard2);
duel.run();