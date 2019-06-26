<template lang="pug">
  .hello
    .ui.form(v-show="step == 0")
      .field
        label.big 玩家人數
        .ui.icon.input
          input(type="number", min = "2", max = "10", step = "1" v-model = "playerNums")
          i.users.icon
      .field
        button.ui.huge.green.button(@click = "reset()") 開始玩!!
    .ui.grid.container(v-if="step > 0")
      .ui.row
        .ui.center.aligned.column
          h2(v-if = "!isWin").ui.header 輪到玩家 {{ turn+1 }}了
            .sub.header {{ lastWork }}
          h2(v-else).ui.header {{ lastWork }}
            br
            button.ui.huge.green.button(@click = "restart()") 再來一局!!
      .ui.two.column.row
        .column(v-for = "(p, idx) in players") 玩家{{ idx + 1 }}: 目前 {{ p }} 分
      .ui.three.column.row
        .ui.column(v-for = "(i, idx) in items")
          a(v-bind:class="{'last' : lastIdx1 == idx || lastIdx2 == idx, 'done' : dones[idx], pick: idx == myIdx}", @click="pick(i, idx)")
            span(v-show = "opens[idx]") {{i}}
            span(v-show = "!opens[idx]") ? 

</template>

<script>
export default {
  name: 'Multiplayer',
  props: {
  },
  data () {
    return {
      playerNums: 2,
      players: [],
      step: 0,
      isWin: false,
      turn: 0,
      hand: undefined,
      myIdx: undefined,
      lastWork: '',
      lastIdx1: undefined,
      lastIdx2: undefined,
      items: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9],
      opens: [false, false, false, false, false, false,
              false, false, false, false, false, false,
              false, false, false, false, false, false],
      dones: [false, false, false, false, false, false,
              false, false, false, false, false, false,
              false, false, false, false, false, false]
    }
  },
  methods: {
    restart () {
      this.step = 0;
      this.isWin = false;
      this.lastWork = '';
      this.turn = 0;
      this.players = [];
      this.opens = 
  [false, false, false, false, false, false, 
   false, false, false, false, false, false,
   false, false, false, false, false, false];
      this.dones = 
  [false, false, false, false, false, false,
   false, false, false, false, false, false,
   false, false, false, false, false, false];
    },
    reset () {
      this.step = 1;
      this.items.sort(() => {return Math.random() - 0.5});
      for (var i = 0; i < this.playerNums; i++) {
        this.players.push(0)
      }
    },
    done (a, b) {
      this.dones[a] = true;
      this.dones[b] = true;
      this.lastIdx1 = a;
      this.lastIdx2 = b;
    },
    close () {
      if (this.opens.filter((a) => { return a }).length >= this.dones.filter((a) => { return a }).length + 2) {
        this.opens = this.dones.slice();
      }
    },
    next () {
      this.turn++
      this.turn = this.turn % this.playerNums;
    },
    pick (i, idx) {
      if (this.dones[idx]) { return }
      this.close();
      this.opens[idx] = true;
      if (!this.hand) {
        this.hand = i;
        this.myIdx = idx;
        this.lastWork = i + '+ ? = 10'       
      } else {
        if (this.hand + i == 10 && idx != this.myIdx) {
          this.players[this.turn] += 1;
          this.done(idx, this.myIdx);
        }
        this.lastWork = this.hand + '+' + i + ' = ' + (this.hand + i) 
        this.hand = undefined;
        this.myIdx = undefined;
        this.next();
      }
      if (this.checkWin()) {
        this.win()
      }
    },
    checkWin() {
      var ans = true;
      for (var i = 0; i < this.dones.length; i++) {
        if (!this.dones[i]) {
          ans = false
        }
      }
      return ans;
    },
    win() {
      this.lastWork = '玩家' + this.players.slice()
          .map((a, idx) => { return {idx : idx, n: a }})
          .sort((a,b) => { return b.n - a.n })
          .map((o) => { return o.idx + 1 })[0] +'勝利了!!';
      this.turn = 0;
      this.isWin = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
  color: #42b983;
}

.row .column a {
  border: 1px solid black;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 7vmin;
  font-weight: bold;
  width: 2.5em;
  height: 2.5em;
  border-radius: 15px;
  background-color: white;
  box-shadow: black 1px 1px 1px 1px;
}

.pick {
  background-color: #f99 !important;  
}

.done {
  background-color: #9f9 !important;
  color: #9f9;
}

.done.last {
  color: black !important;
}

.big {
  line-height: 1.6;
  font-size: 2em !important;
}
</style>
