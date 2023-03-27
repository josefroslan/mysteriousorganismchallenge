// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

console.log("Random DNA base is " + returnRandBase());
console.log("Random 15 DNA bases are " + mockUpStrand());

const pAequorFactory = (specimenNum, dna) => {
  const organism = {
    specimenNum: specimenNum,
    dna: dna,
    mutate: function() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = this.dna[randomIndex];
      while (newBase === this.dna[randomIndex]) {
        newBase = returnRandBase();
      } 
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA: function(otherOrganism) {
      const commonBases = this.dna.reduce((count, base, index) => {
        if (base === otherOrganism.dna[index]) {
          return count + 1;
        }
        return count;
      }, 0);
      const percentCommon = ((commonBases / this.dna.length) * 100).toFixed(2);
      console.log(`specimen #${this.specimenNum} and specimen #${otherOrganism.specimenNum} have ${percentCommon}% DNA in common.`);
    },
    willLikelySurvive: function() {
      const cOrg = this.dna.filter(base => base === 'C' || base === 'G');
      const percentage = (cOrg.length / this.dna.length) * 100;
      return percentage >= 60;
    },
    complementStrand: function() {
      const complement = [];
      for (let i = 0; i < this.dna.length; i++) {
        switch (this.dna[i]) {
          case 'A':
          complement.push('T');
          break;
          case 'T':
          complement.push('A');
          break;
          case 'C':
          complement.push('G');
          break;
          case 'G':
          complement.push('C');
          break;
        }
      }
      return complement;
    }
  };
  return organism;
}

const pAequorArray = [];

let specimenNum = 1;
while (pAequorArray.length < 30) {
  const dna = [];
  for (let i = 0; i < 15; i++) {
    dna.push(returnRandBase());
  }
  const pAequor = pAequorFactory(specimenNum, dna);
  if (pAequor.willLikelySurvive()) {
    pAequorArray.push(pAequor);
  }
  specimenNum++;
}

console.log(pAequorArray);











