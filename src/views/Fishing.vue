<template lang="pug">
  .hello
    h2.ui.header 選兩張牌，相加為10即可消掉
      .sub.header {{ lastWork }}     
    .ui.huge.green.button(v-if = "step == 0" @click="reset()") 按此開始
    
    .ui.list.container(v-if="step == 0")
      .item.ui.header(v-for = "n in [1,2,3,4,5,6,7,8,9]") {{n}} + {{10-n}} = 10

    .ui.grid.container(v-if="step > 0")
      .ui.three.column.row
        .ui.column(v-for = "(i, idx) in items")
          a(v-bind:class="{'last' : lastIdx1 == idx || lastIdx2 == idx, 'done' : dones[idx], pick: idx == myIdx}", @click="pick(i, idx)")
            span(v-show = "opens[idx]") {{i}}
            span(v-show = "!opens[idx]") ? 

</template>

<script>
export default {
  name: 'Fishing',
  props: {
  },
  data () {
    return {
      step: 0,
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
    reset () {
      this.step = 1;
      this.items.sort(() => {return Math.random() - 0.5})
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
          this.done(idx, this.myIdx);
        }
        this.lastWork = this.hand + '+' + i + ' = ' + (this.hand + i) 
        this.hand = undefined;
        this.myIdx = undefined;
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
      this.reset();
      this.lastWork = '你勝利了!!';
      this.step = 0;
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
</style>
