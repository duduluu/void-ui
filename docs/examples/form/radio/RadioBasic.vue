<template>
  <div>
    <!-- <DemoBoard v-for="board in 1"
               :key="board"
               :genre="board%2===1?'lite':'dark'"> -->
    <p @click="checked=!checked">未点击和已点击</p>
    <VdRadio v-for="item in 2"
             :key="item"
             :genre="item%2===1?'lite':'dark'"
             v-model="radioModelBasic"
             :checked="item===2"
             :tag="item">选项{{item}}
    </VdRadio>
    <!-- </DemoBoard> -->
  </div>
</template>
<script lang="ts">
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Vue,
  Watch,
} from 'vue-property-decorator';
@Component
export default class RadioBasic extends Vue {
  @Provide() radioModelBasic = 3;
  @Provide() checked = false;
}
</script>
